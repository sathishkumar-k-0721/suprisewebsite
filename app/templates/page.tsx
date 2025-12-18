'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FaFileAlt, FaImage, FaVideo, FaImages, FaPlus, FaMinus, FaShoppingCart, FaArrowRight, FaEye, FaTimes, FaUser, FaSignOutAlt, FaBars, FaLock, FaMusic } from 'react-icons/fa'
import TemplatePreview from '@/components/TemplatePreview'

interface Template {
  id: string
  name: string
  description: string
  icon: any
  price: number
  features: string[]
  color: string
  preview: string
}

const templates: Template[] = [
  {
    id: 'text-only',
    name: 'Text Only',
    description: 'A simple page with beautiful typography for your heartfelt message',
    icon: FaFileAlt,
    price: 50,
    features: [
      'Custom text message',
      'Beautiful fonts',
      'Color themes',
      'Responsive design'
    ],
    color: 'from-purple-500 to-purple-600',
    preview: '📝'
  },
  {
    id: 'text-with-image',
    name: 'Text with Image',
    description: 'Combine your message with a stunning photo',
    icon: FaImage,
    price: 70,
    features: [
      'Single image upload',
      'Custom text overlay',
      'Image filters',
      'Smooth animations'
    ],
    color: 'from-pink-500 to-pink-600',
    preview: '🖼️'
  },
  {
    id: 'text-with-video',
    name: 'Text with Video',
    description: 'Share a video message that speaks from the heart',
    icon: FaVideo,
    price: 100,
    features: [
      'Video upload (up to 2 min)',
      'Custom introduction text',
      'Video player controls',
      'Autoplay option'
    ],
    color: 'from-red-500 to-red-600',
    preview: '🎥'
  },
  {
    id: 'text-with-audio',
    name: 'Text with Audio',
    description: 'Combine your message with a special audio or voice note',
    icon: FaMusic,
    price: 80,
    features: [
      'Audio file upload',
      'Custom text message',
      'Audio player controls',
      'Background effects'
    ],
    color: 'from-teal-500 to-teal-600',
    preview: '🎵'
  },
  {
    id: 'photo-gallery',
    name: 'Photo Gallery',
    description: 'Create a beautiful slideshow with multiple photos',
    icon: FaImages,
    price: 50,
    features: [
      'Up to 5 photos',
      'Slideshow animation',
      'Custom captions',
      'Auto-play slideshow'
    ],
    color: 'from-orange-500 to-orange-600',
    preview: '📸'
  },
  {
    id: 'treasure-hunt',
    name: 'Treasure Hunt+Audio',
    description: 'Interactive treasure hunt with clues, password unlock, and hidden audio',
    icon: FaLock,
    price: 120,
    features: [
      '3 text clues',
      'Password unlock system',
      'Hidden audio message',
      'Page navigation controls'
    ],
    color: 'from-indigo-500 to-indigo-600',
    preview: '🔐'
  },
  {
    id: 'treasure-hunt-image',
    name: 'Treasure Hunt+Image',
    description: 'Clue-based hunt that reveals a special photo and message',
    icon: FaLock,
    price: 130,
    features: [
      '3 text clues',
      'Password unlock system',
      'Hidden image reveal',
      'Hidden text message'
    ],
    color: 'from-violet-500 to-violet-600',
    preview: '🔐🖼️'
  },
  {
    id: 'treasure-hunt-video',
    name: 'Treasure Hunt+Video',
    description: 'Clue-based hunt that unlocks a surprise video message',
    icon: FaLock,
    price: 150,
    features: [
      '3 text clues',
      'Password unlock system',
      'Hidden video reveal',
      'Hidden text message'
    ],
    color: 'from-fuchsia-500 to-fuchsia-600',
    preview: '🔐🎥'
  }
]

export default function TemplatesPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [selectedTemplates, setSelectedTemplates] = useState<{ [key: string]: number }>({})
  const [showCart, setShowCart] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [previewTemplate, setPreviewTemplate] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check authentication and load cart from database
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login')
    } else if (status === 'authenticated') {
      // Load cart from database
      loadCart()
      setIsLoading(false)
    }
  }, [status, router])

  // Load cart from database
  const loadCart = async () => {
    try {
      const response = await fetch('/api/cart')
      if (response.ok) {
        const data = await response.json()
        // Convert database format to component format
        const items: { [key: string]: number } = {}
        if (data.items && typeof data.items === 'object') {
          Object.keys(data.items).forEach(key => {
            items[key] = data.items[key].quantity || 0
          })
        }
        setSelectedTemplates(items)
      }
    } catch (error) {
      console.error('Failed to load cart:', error)
    }
  }

  // Save cart to database whenever it changes
  const saveCartToDatabase = async (templateId: string, action: 'add' | 'remove') => {
    const template = templates.find(t => t.id === templateId)
    if (!template) return

    try {
      await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          templateId,
          templateName: template.name,
          price: template.price,
          action
        })
      })
    } catch (error) {
      console.error('Failed to save cart:', error)
    }
  }

  const addTemplate = (templateId: string) => {
    setSelectedTemplates(prev => ({
      ...prev,
      [templateId]: (prev[templateId] || 0) + 1
    }))
    saveCartToDatabase(templateId, 'add')
  }

  const removeTemplate = (templateId: string) => {
    setSelectedTemplates(prev => {
      const newCount = (prev[templateId] || 0) - 1
      if (newCount <= 0) {
        const { [templateId]: _, ...rest } = prev
        return rest
      }
      return { ...prev, [templateId]: newCount }
    })
    saveCartToDatabase(templateId, 'remove')
  }

  const getTotalPrice = () => {
    return Object.entries(selectedTemplates).reduce((total, [templateId, count]) => {
      const template = templates.find(t => t.id === templateId)
      return total + (template?.price || 0) * count
    }, 0)
  }

  const getTotalPages = () => {
    return Object.values(selectedTemplates).reduce((sum, count) => sum + count, 0)
  }

  const handleProceedToPayment = async () => {
    // Store selected templates for payment
    localStorage.setItem('selectedTemplates', JSON.stringify(selectedTemplates))
    
    // Show payment success message
    const totalPages = getTotalPages()
    const totalPrice = getTotalPrice()
    
    if (confirm(`✅ Payment Successful!\n\nTotal: ₹${totalPrice}\nPages: ${totalPages}\n\nClick OK to proceed to add your content.`)) {
      // Store payment info
      const paymentInfo = {
        templates: selectedTemplates,
        amount: totalPrice,
        pages: totalPages,
        timestamp: new Date().toISOString(),
        status: 'success',
        userEmail: session?.user?.email
      }
      sessionStorage.setItem('paymentInfo', JSON.stringify(paymentInfo))
      
      // Clear the cart in database
      try {
        await fetch('/api/cart', { method: 'DELETE' })
      } catch (error) {
        console.error('Failed to clear cart:', error)
      }
      
      // Navigate to content creation
      window.location.href = '/create'
    }
  }

  // Show loading while checking authentication
  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-red-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Surprise Website
              </Link>
              <p className="text-sm text-gray-600 mt-1">Choose Your Templates</p>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden p-2 text-gray-700 hover:text-purple-600 transition-colors"
              >
                <FaBars className="text-2xl" />
              </button>

              {/* My Websites Button */}
              <Link
                href="/my-websites"
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full font-semibold hover:bg-purple-200 transition-colors"
              >
                <FaEye />
                My Websites
              </Link>

              {/* User Info */}
              {session?.user && (
                <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
                  <FaUser className="text-purple-600" />
                  <span className="text-sm font-semibold text-gray-700">
                    {session.user.name || session.user.email}
                  </span>
                  <button
                    onClick={async () => {
                      await signOut({ redirect: false })
                      window.location.href = '/'
                    }}
                    className="ml-2 text-gray-500 hover:text-red-600 transition-colors"
                    title="Logout"
                  >
                    <FaSignOutAlt />
                  </button>
                </div>
              )}
              
              {/* Cart Button */}
              <button
                onClick={() => setShowCart(!showCart)}
                className="relative px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold flex items-center gap-2 hover:shadow-lg transition-all"
              >
                <FaShoppingCart />
                {getTotalPages() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
                    {getTotalPages()}
                  </span>
                )}
                <span className="hidden sm:inline">Cart</span>
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          <AnimatePresence>
            {showMobileMenu && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden border-t border-gray-200 bg-white"
              >
                <div className="px-4 py-4 space-y-3">
                  <Link
                    href="/my-websites"
                    className="flex items-center gap-3 px-4 py-3 bg-purple-50 text-purple-700 rounded-lg font-semibold hover:bg-purple-100 transition-colors"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <FaEye />
                    My Websites
                  </Link>
                  
                  {session?.user && (
                    <>
                      <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
                        <FaUser className="text-purple-600" />
                        <span className="text-sm font-semibold text-gray-700">
                          {session.user.name || session.user.email}
                        </span>
                      </div>
                      
                      <button
                        onClick={async () => {
                          await signOut({ redirect: false })
                          window.location.href = '/'
                        }}
                        className="flex items-center gap-3 px-4 py-3 bg-red-50 text-red-600 rounded-lg font-semibold hover:bg-red-100 transition-colors w-full"
                      >
                        <FaSignOutAlt />
                        Logout
                      </button>
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Choose Your Page Templates
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select one or more templates to create your perfect surprise website. You can choose multiple templates to create a multi-page experience!
          </p>
        </motion.div>

        {/* Templates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {templates.map((template, index) => {
            const Icon = template.icon
            const count = selectedTemplates[template.id] || 0

            return (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col"
              >
                {/* Template Preview */}
                <div className={`h-32 bg-gradient-to-br ${template.color} flex items-center justify-center text-6xl`}>
                  {template.preview}
                </div>

                {/* Template Info */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon className={`text-2xl bg-gradient-to-br ${template.color} bg-clip-text text-transparent`} />
                    <h3 className="text-xl font-bold text-gray-900">{template.name}</h3>
                  </div>

                  <p className="text-sm text-gray-600 mb-4 h-10">{template.description}</p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {template.features.map((feature, i) => (
                      <li key={i} className="text-xs text-gray-500 flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Price & Buttons - Aligned at bottom */}
                  <div className="mt-auto space-y-4">
                    {/* Price */}
                    <div className={`text-2xl font-bold bg-gradient-to-r ${template.color} bg-clip-text text-transparent`}>
                      ₹{template.price}
                    </div>

                    {/* Add/Remove Controls */}
                    {/* Add/Remove Controls */}
                    {count === 0 ? (
                      <div className="space-y-2">
                        <button
                          onClick={() => setPreviewTemplate(template.id)}
                          className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-gray-200 transition-all"
                        >
                          <FaEye /> View Sample
                        </button>
                        <button
                          onClick={() => addTemplate(template.id)}
                          className={`w-full py-3 bg-gradient-to-r ${template.color} text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all`}
                        >
                          <FaPlus /> Add Template
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <button
                          onClick={() => setPreviewTemplate(template.id)}
                          className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-gray-200 transition-all"
                        >
                          <FaEye /> View Sample
                        </button>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => removeTemplate(template.id)}
                            className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-gray-300 transition-all"
                          >
                            <FaMinus />
                          </button>
                          <div className="px-6 py-3 bg-gray-100 rounded-lg font-bold text-lg">
                            {count}
                          </div>
                          <button
                            onClick={() => addTemplate(template.id)}
                            className={`flex-1 py-3 bg-gradient-to-r ${template.color} text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all`}
                          >
                            <FaPlus />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Floating Cart Summary */}
        <AnimatePresence>
          {getTotalPages() > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-purple-200 shadow-2xl z-50"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="text-center md:text-left">
                    <h3 className="text-xl font-bold text-gray-900">
                      {getTotalPages()} Page{getTotalPages() > 1 ? 's' : ''} Selected
                    </h3>
                    <p className="text-sm text-gray-600">
                      {Object.entries(selectedTemplates).map(([id, count]) => {
                        const template = templates.find(t => t.id === id)
                        return `${template?.name} (${count})`
                      }).join(', ')}
                    </p>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Total Amount</p>
                      <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        ₹{getTotalPrice()}
                      </p>
                    </div>

                    <button
                      onClick={handleProceedToPayment}
                      className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-bold text-lg flex items-center gap-2 hover:shadow-2xl hover:scale-105 transition-all"
                    >
                      Make Payment <FaArrowRight />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        {getTotalPages() === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🎨</div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">
              No templates selected yet
            </h3>
            <p className="text-gray-600">
              Choose one or more templates above to get started!
            </p>
          </motion.div>
        )}
      </div>

      {/* Cart Modal */}
      <AnimatePresence>
        {showCart && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCart(false)}
              className="fixed inset-0 bg-black/50 z-40"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed right-0 top-0 bottom-0 w-full md:w-96 bg-white shadow-2xl z-50 overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Your Cart</h2>
                  <button
                    onClick={() => setShowCart(false)}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ×
                  </button>
                </div>

                {getTotalPages() === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-4xl mb-4">🛒</div>
                    <p className="text-gray-600">Your cart is empty</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 mb-6">
                      {Object.entries(selectedTemplates).map(([id, count]) => {
                        const template = templates.find(t => t.id === id)
                        if (!template) return null

                        return (
                          <div key={id} className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-gray-900">{template.name}</h4>
                              <span className="font-bold text-purple-600">₹{template.price * count}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <p className="text-sm text-gray-600">Quantity: {count}</p>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => removeTemplate(id)}
                                  className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                                >
                                  <FaMinus className="text-xs" />
                                </button>
                                <span className="w-8 text-center font-bold">{count}</span>
                                <button
                                  onClick={() => addTemplate(id)}
                                  className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center hover:bg-purple-700"
                                >
                                  <FaPlus className="text-xs" />
                                </button>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    <div className="border-t pt-4 mb-6">
                      <div className="flex items-center justify-between text-lg font-bold">
                        <span>Total</span>
                        <span className="text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                          ₹{getTotalPrice()}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={handleProceedToPayment}
                      className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-bold text-lg flex items-center justify-center gap-2 hover:shadow-xl transition-all"
                    >
                      Make Payment <FaArrowRight />
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Preview Modal */}
      <AnimatePresence>
        {previewTemplate && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPreviewTemplate(null)}
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden"
              >
                {/* Close Button */}
                <button
                  onClick={() => setPreviewTemplate(null)}
                  className="absolute top-4 right-4 z-10 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all"
                >
                  <FaTimes className="text-xl text-gray-700" />
                </button>

                {/* Header */}
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
                  <h3 className="text-2xl font-bold">
                    {templates.find(t => t.id === previewTemplate)?.name} - Sample Preview
                  </h3>
                  <p className="text-white/90 mt-1">
                    This is how your page will look with your content
                  </p>
                </div>

                {/* Preview Content */}
                <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
                  <TemplatePreview templateId={previewTemplate} />
                </div>

                {/* Footer Actions */}
                <div className="bg-gray-50 p-6 border-t flex items-center justify-between">
                  <p className="text-gray-600">
                    Like what you see? Add this template to your cart!
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setPreviewTemplate(null)}
                      className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all"
                    >
                      Close
                    </button>
                    <button
                      onClick={() => {
                        addTemplate(previewTemplate)
                        setPreviewTemplate(null)
                      }}
                      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2"
                    >
                      <FaPlus /> Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
