import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { nanoid } from 'nanoid'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { title, pages, theme } = await req.json()

    // Generate unique URL (8 characters, URL-safe)
    const uniqueUrl = nanoid(8)

    // Create website with pages
    const website = await prisma.website.create({
      data: {
        userId: session.user.id,
        title: title || 'My Surprise Website',
        uniqueUrl,
        theme: theme || 'normal',
        isPublished: false,
        pages: {
          create: pages.map((page: any, index: number) => ({
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
