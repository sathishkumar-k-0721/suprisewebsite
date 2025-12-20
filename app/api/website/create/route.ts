import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { nanoid } from 'nanoid'

interface PageData {
  templateId: string
  content: Record<string, unknown>
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { title, pages, theme, duration, fromDate, toDate } = await req.json()

    // Validate required fields
    if (!pages || !Array.isArray(pages) || pages.length === 0) {
      return NextResponse.json({ error: 'Pages data is required' }, { status: 400 })
    }

    // Validate each page has required fields
    for (const page of pages) {
      if (!page.templateId || !page.content) {
        return NextResponse.json({ error: 'Each page must have templateId and content' }, { status: 400 })
      }
    }

    // Generate unique URL (8 characters, URL-safe)
    const uniqueUrl = nanoid(8)

    // Calculate valid dates based on duration
    const validFrom = new Date(fromDate || new Date())
    let validTo: Date | null = null
    const durationType = duration || 'trial'

    if (durationType === 'trial') {
      validTo = new Date(validFrom)
      validTo.setDate(validFrom.getDate() + 30)
    } else if (durationType === 'extended') {
      validTo = new Date(validFrom)
      validTo.setDate(validFrom.getDate() + 60) // 30 + 30 days
    } else if (durationType === 'lifetime') {
      validTo = null // No expiration for lifetime
    } else if (toDate) {
      validTo = new Date(toDate)
    }

    // Create website with pages
    const website = await prisma.website.create({
      data: {
        userId: session.user.id,
        title: title || 'My Surprise Website',
        uniqueUrl,
        theme: theme || 'normal',
        isPublished: false,
        validFrom,
        validTo,
        durationType,
        pages: {
          create: pages.map((page: PageData, index: number) => ({
            templateId: page.templateId,
            order: index,
            content: page.content,
          }))
        }
      },
      include: {
        pages: true
      }
    })

    // Clear cart after successful creation
    await prisma.cart.deleteMany({
      where: { userId: session.user.id }
    })

    // Clear localStorage templates
    return NextResponse.json({
      success: true,
      websiteId: website.id,
      uniqueUrl: website.uniqueUrl,
      previewUrl: `/w/${website.uniqueUrl}/preview`,
      publishUrl: `/w/${website.uniqueUrl}`
    })
  } catch (error) {
    console.error('Error creating website:', error)
    return NextResponse.json(
      { error: 'Failed to create website' },
      { status: 500 }
    )
  }
}
