import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'

// GET - Get user's cart
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { cart: true }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Return cart items or empty object
    const items = user.cart?.items || {}
    
    return NextResponse.json({ items })
  } catch (error: any) {
    console.error('Get cart error:', error)
    return NextResponse.json({ error: 'Failed to get cart' }, { status: 500 })
  }
}

// POST - Update cart (add, remove, or set quantity)
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { templateId, templateName, price, action } = await req.json()

    if (!templateId || !templateName || !price) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { cart: true }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Get current items
    let items = user.cart?.items as any || {}

    // Update quantity based on action
    if (action === 'remove') {
      if (items[templateId]) {
        items[templateId].quantity = Math.max(0, items[templateId].quantity - 1)
        if (items[templateId].quantity === 0) {
          delete items[templateId]
        }
      }
    } else {
      // Add or increment
      if (items[templateId]) {
        items[templateId].quantity += 1
      } else {
        items[templateId] = {
          templateId,
          name: templateName,
          price,
          quantity: 1
        }
      }
    }

    // Update or create cart
    let cart
    if (user.cart) {
      cart = await prisma.cart.update({
        where: { id: user.cart.id },
        data: { items }
      })
    } else {
      cart = await prisma.cart.create({
        data: {
          userId: user.id,
          items
        }
      })
    }

    return NextResponse.json({ items: cart.items })
  } catch (error: any) {
    console.error('Update cart error:', error)
    return NextResponse.json({ error: 'Failed to update cart' }, { status: 500 })
  }
}

// DELETE - Clear cart
export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { cart: true }
    })

    if (!user || !user.cart) {
      return NextResponse.json({ message: 'Cart already empty' })
    }

    // Clear items
    await prisma.cart.update({
      where: { id: user.cart.id },
      data: { items: {} }
    })

    return NextResponse.json({ message: 'Cart cleared' })
  } catch (error: any) {
    console.error('Clear cart error:', error)
    return NextResponse.json({ error: 'Failed to clear cart' }, { status: 500 })
  }
}
