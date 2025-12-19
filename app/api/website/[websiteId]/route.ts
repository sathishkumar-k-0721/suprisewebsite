import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(
  req: NextRequest,
  { params }: { params: { websiteId: string } }
) {
  try {
    const { websiteId } = params

    // Check if it's an ObjectId or uniqueUrl
    const isObjectId = websiteId.match(/^[0-9a-fA-F]{24}$/)

    const website = await prisma.website.findFirst({
      where: isObjectId 
        ? { id: websiteId }
        : { uniqueUrl: websiteId },
      include: {
        pages: {
          orderBy: { order: 'asc' }
        }
      }
    })

    if (!website) {
      return NextResponse.json(
        { error: 'Website not found' },
        { status: 404 }
      )
    }

    // Check if website is within valid date range
    const now = new Date()
    const validFrom = new Date(website.validFrom)
    const validTo = website.validTo ? new Date(website.validTo) : null

    // If current date is before validFrom, show message
    if (now < validFrom) {
      return NextResponse.json({
        error: 'Website not yet available',
        message: `This website will be available from ${validFrom.toLocaleDateString()}`,
        availableFrom: validFrom.toISOString(),
        isEarlyAccess: true
      }, { status: 403 })
    }

    // If current date is after validTo (and validTo exists), show expired message
    if (validTo && now > validTo) {
      return NextResponse.json({
        error: 'Website access expired',
        message: `This website was only available until ${validTo.toLocaleDateString()}`,
        expiredAt: validTo.toISOString(),
        isExpired: true
      }, { status: 403 })
    }

    return NextResponse.json(website)
  } catch (error) {
    console.error('Error fetching website:', error)
    return NextResponse.json(
      { error: 'Failed to fetch website' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { websiteId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { websiteId } = params

    // Verify ownership
    const website = await prisma.website.findFirst({
      where: {
        id: websiteId,
        userId: session.user.id
      }
    })

    if (!website) {
      return NextResponse.json(
        { error: 'Website not found or unauthorized' },
        { status: 404 }
      )
    }

    // Delete website (pages will be cascade deleted)
    await prisma.website.delete({
      where: { id: websiteId }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting website:', error)
    return NextResponse.json(
      { error: 'Failed to delete website' },
      { status: 500 }
    )
  }
}
