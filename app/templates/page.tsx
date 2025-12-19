'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FaFileAlt, FaImage, FaVideo, FaImages, FaPlus, FaMinus, FaShoppingCart, FaArrowRight, FaEye, FaTimes, FaUser, FaSignOutAlt, FaBars, FaLock, FaMusic, FaCalendarAlt } from 'react-icons/fa'
import TemplatePreview from '@/components/TemplatePreview'
import { IconType } from 'react-icons'

interface Template {
  id: string
  name: string
  description: string
  icon: IconType
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
  // Theme selection state
  const [selectedTheme, setSelectedTheme] = useState<'normal' | 'love' | 'birthday'>('normal')
  // Preview theme state (independent from main selection)
  const [previewTheme, setPreviewTheme] = useState<'normal' | 'love' | 'birthday'>('normal')
  // Date selection state
  const [selectedDuration, setSelectedDuration] = useState<'trial' | 'extended' | 'lifetime'>('trial')
  const [customFromDate, setCustomFromDate] = useState<string>(() => {
    const today = new Date()
    return today.toISOString().split('T')[0] // YYYY-MM-DD format
  })
  const [customToDate, setCustomToDate] = useState<string>(() => {
    const thirtyDaysFromNow = new Date()
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30)
    return thirtyDaysFromNow.toISOString().split('T')[0] // YYYY-MM-DD format
  })
  const [showDateScheduler, setShowDateScheduler] = useState(false)
  // Helper function to open preview modal
  const openPreview = (templateId: string) => {
    setPreviewTemplate(templateId)
    setPreviewTheme(selectedTheme) // Initialize preview theme with current selection
  }

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

  // Auto-switch to extended duration if date range exceeds 30 days
  useEffect(() => {
    if (customFromDate && customToDate && selectedDuration === 'trial') {
      const fromDate = new Date(customFromDate)
      const toDate = new Date(customToDate)
      const daysDiff = Math.ceil((toDate.getTime() - fromDate.getTime()) / (1000 * 3600 * 24))
      if (daysDiff > 30) {
        setSelectedDuration('extended')
      }
    }
  }, [customFromDate, customToDate, selectedDuration])

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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [templateId]: _, ...rest } = prev
        return rest
      }
      return { ...prev, [templateId]: newCount }
    })
    saveCartToDatabase(templateId, 'remove')
  }

  const getThemePrice = () => {
    if (selectedTheme === 'love' || selectedTheme === 'birthday') return 30;
    return 0;
  }

  const getDurationPrice = () => {
    if (selectedDuration === 'lifetime') return 1000;

    // For trial and extended, calculate based on actual date range
    if (selectedDuration === 'trial' || selectedDuration === 'extended') {
      const fromDate = new Date(customFromDate);
      const toDate = new Date(customToDate);
      const timeDiff = toDate.getTime() - fromDate.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Convert to days

      // First 30 days are free
      if (daysDiff <= 30) return 0;

      // Calculate additional 30-day periods
      const additionalDays = daysDiff - 30;
      const additionalPeriods = Math.ceil(additionalDays / 30);
      return additionalPeriods * 30;
    }

    return 0;
  }

  const getTotalPrice = () => {
    const templateTotal = Object.entries(selectedTemplates).reduce((total, [templateId, count]) => {
      const template = templates.find(t => t.id === templateId)
      return total + (template?.price || 0) * count
    }, 0)
    return templateTotal + getThemePrice() + getDurationPrice();
  }

  const getTotalPages = () => {
    return Object.values(selectedTemplates).reduce((sum, count) => sum + count, 0)
  }

  const handleProceedToPayment = async () => {
    // Store selected templates, theme, duration and dates for payment
    localStorage.setItem('selectedTemplates', JSON.stringify(selectedTemplates))
    localStorage.setItem('selectedTheme', selectedTheme)
    localStorage.setItem('selectedDuration', selectedDuration)
    localStorage.setItem('customFromDate', customFromDate)
    localStorage.setItem('customToDate', customToDate)

    // Show payment success message
    const totalPages = getTotalPages()
    const totalPrice = getTotalPrice()
    let themeLabel = 'Normal Theme (Free)';
    if (selectedTheme === 'love') themeLabel = 'Love Theme (+₹30)';
    if (selectedTheme === 'birthday') themeLabel = 'Birthday Theme (+₹30)';

    let durationLabel = '30 Days Free Trial';
    if (selectedDuration === 'extended') durationLabel = '+30 Days (+₹30)';
    if (selectedDuration === 'lifetime') durationLabel = 'Lifetime Access (₹1000)';

    if (confirm(`✅ Payment Successful!\n\nTotal: ₹${totalPrice}\nPages: ${totalPages}\nTheme: ${themeLabel}\nDuration: ${durationLabel}\nActive From: ${new Date(customFromDate).toLocaleDateString()}\nActive To: ${selectedDuration === 'lifetime' ? 'Forever' : new Date(customToDate).toLocaleDateString()}\n\nClick OK to proceed to add your content.`)) {
      // Store payment info
      const paymentInfo = {
        templates: selectedTemplates,
        amount: totalPrice,
        pages: totalPages,
        theme: selectedTheme,
        duration: selectedDuration,
        fromDate: customFromDate,
        toDate: customToDate,
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
    );
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

        {/* Theme Selection */}
        <div className="mb-10 flex flex-col items-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl sm:text-2xl font-bold mb-4 text-gray-800 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent text-center"
          >
            Choose a Theme for Your Website ✨
          </motion.h2>
          <div className="flex gap-4 sm:gap-6 lg:gap-8 flex-wrap justify-center">
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className={`relative px-6 sm:px-8 py-4 sm:py-6 rounded-3xl border-3 font-bold text-base sm:text-lg shadow-lg transition-all duration-300 flex flex-col items-center gap-1 sm:gap-2 overflow-hidden ${
                selectedTheme === 'normal'
                  ? 'border-purple-600 bg-gradient-to-br from-purple-500 to-purple-700 text-white shadow-purple-500/50'
                  : 'border-gray-300 bg-gradient-to-br from-white to-gray-50 text-gray-700 hover:border-purple-400 hover:shadow-purple-200/50'
              }`}
              onClick={() => setSelectedTheme('normal')}
            >
              <div className={`absolute inset-0 opacity-20 ${
                selectedTheme === 'normal'
                  ? 'bg-gradient-to-br from-purple-400 to-purple-600'
                  : 'bg-gradient-to-br from-purple-100 to-purple-200'
              }`} />
              <motion.span
                className="text-3xl sm:text-4xl relative z-10"
                animate={selectedTheme === 'normal' ? { rotate: [0, 10, -10, 0] } : {}}
                transition={{ duration: 0.5, repeat: selectedTheme === 'normal' ? Infinity : 0, repeatDelay: 2 }}
              >
                🎨
              </motion.span>
              <span className="relative z-10 font-bold text-sm sm:text-base">Normal Theme</span>
              <span className={`text-xs sm:text-sm relative z-10 px-2 py-1 rounded-full ${
                selectedTheme === 'normal'
                  ? 'bg-white/20 text-white'
                  : 'bg-green-100 text-green-700'
              }`}>
                Free
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className={`relative px-6 sm:px-8 py-4 sm:py-6 rounded-3xl border-3 font-bold text-base sm:text-lg shadow-lg transition-all duration-300 flex flex-col items-center gap-1 sm:gap-2 overflow-hidden ${
                selectedTheme === 'love'
                  ? 'border-pink-600 bg-gradient-to-br from-pink-500 to-rose-600 text-white shadow-pink-500/50'
                  : 'border-gray-300 bg-gradient-to-br from-white to-gray-50 text-gray-700 hover:border-pink-400 hover:shadow-pink-200/50'
              }`}
              onClick={() => setSelectedTheme('love')}
            >
              <div className={`absolute inset-0 opacity-20 ${
                selectedTheme === 'love'
                  ? 'bg-gradient-to-br from-pink-400 to-rose-500'
                  : 'bg-gradient-to-br from-pink-100 to-rose-100'
              }`} />
              <motion.span
                className="text-3xl sm:text-4xl relative z-10"
                animate={selectedTheme === 'love' ? {
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                } : {}}
                transition={{ duration: 1, repeat: selectedTheme === 'love' ? Infinity : 0, repeatDelay: 1.5 }}
              >
                💕
              </motion.span>
              <span className="relative z-10 font-bold text-sm sm:text-base">Love Theme</span>
              <span className={`text-xs sm:text-sm relative z-10 px-2 py-1 rounded-full font-bold ${
                selectedTheme === 'love'
                  ? 'bg-white/20 text-white'
                  : 'bg-pink-100 text-pink-700'
              }`}>
                +₹30
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className={`relative px-6 sm:px-8 py-4 sm:py-6 rounded-3xl border-3 font-bold text-base sm:text-lg shadow-lg transition-all duration-300 flex flex-col items-center gap-1 sm:gap-2 overflow-hidden ${
                selectedTheme === 'birthday'
                  ? 'border-yellow-500 bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-yellow-500/50'
                  : 'border-gray-300 bg-gradient-to-br from-white to-gray-50 text-gray-700 hover:border-yellow-400 hover:shadow-yellow-200/50'
              }`}
              onClick={() => setSelectedTheme('birthday')}
            >
              <div className={`absolute inset-0 opacity-20 ${
                selectedTheme === 'birthday'
                  ? 'bg-gradient-to-br from-yellow-300 to-orange-400'
                  : 'bg-gradient-to-br from-yellow-100 to-orange-100'
              }`} />
              <motion.span
                className="text-3xl sm:text-4xl relative z-10"
                animate={selectedTheme === 'birthday' ? {
                  scale: [1, 1.1, 1],
                  rotate: [0, -5, 5, 0]
                } : {}}
                transition={{ duration: 0.8, repeat: selectedTheme === 'birthday' ? Infinity : 0, repeatDelay: 2 }}
              >
                🎂
              </motion.span>
              <span className="relative z-10 font-bold text-sm sm:text-base">Birthday Theme</span>
              <span className={`text-xs sm:text-sm relative z-10 px-2 py-1 rounded-full font-bold ${
                selectedTheme === 'birthday'
                  ? 'bg-white/20 text-white'
                  : 'bg-yellow-100 text-yellow-700'
              }`}>
                +₹30
              </span>
            </motion.button>
          </div>
        </div>

        {/* Duration Selection */}
        <div className="mb-10 flex flex-col items-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
          >
            Choose Duration & Schedule 📅
          </motion.h2>

          {/* Duration Options */}
          <div className="flex flex-wrap gap-4 sm:gap-6 justify-center mb-6">
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className={`relative px-4 sm:px-6 py-3 sm:py-4 rounded-2xl border-3 font-bold text-sm sm:text-lg shadow-lg transition-all duration-300 flex flex-col items-center gap-1 sm:gap-2 overflow-hidden min-w-[120px] sm:min-w-[140px] ${
                selectedDuration === 'trial'
                  ? 'border-green-500 bg-gradient-to-br from-green-400 to-green-600 text-white shadow-green-500/50'
                  : 'border-gray-300 bg-gradient-to-br from-white to-gray-50 text-gray-700 hover:border-green-400 hover:shadow-green-200/50'
              }`}
              onClick={() => setSelectedDuration('trial')}
            >
              <div className={`absolute inset-0 opacity-20 ${
                selectedDuration === 'trial'
                  ? 'bg-gradient-to-br from-green-300 to-green-500'
                  : 'bg-gradient-to-br from-green-100 to-green-200'
              }`} />
              <motion.span
                className="text-2xl sm:text-3xl relative z-10"
                animate={selectedDuration === 'trial' ? { rotate: [0, 5, -5, 0] } : {}}
                transition={{ duration: 0.5, repeat: selectedDuration === 'trial' ? Infinity : 0, repeatDelay: 2 }}
              >
                🆓
              </motion.span>
              <span className="relative z-10 font-bold text-center text-xs sm:text-sm">30 Days Free</span>
              <span className={`text-xs sm:text-sm relative z-10 px-2 py-1 rounded-full font-bold ${
                selectedDuration === 'trial'
                  ? 'bg-white/20 text-white'
                  : 'bg-green-100 text-green-700'
              }`}>
                {selectedDuration === 'trial' && customFromDate && customToDate ? `₹${getDurationPrice()}` : 'Free'}
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className={`relative px-4 sm:px-6 py-3 sm:py-4 rounded-2xl border-3 font-bold text-sm sm:text-lg shadow-lg transition-all duration-300 flex flex-col items-center gap-1 sm:gap-2 overflow-hidden min-w-[120px] sm:min-w-[140px] ${
                selectedDuration === 'extended'
                  ? 'border-blue-500 bg-gradient-to-br from-blue-400 to-blue-600 text-white shadow-blue-500/50'
                  : 'border-gray-300 bg-gradient-to-br from-white to-gray-50 text-gray-700 hover:border-blue-400 hover:shadow-blue-200/50'
              }`}
              onClick={() => setSelectedDuration('extended')}
            >
              <div className={`absolute inset-0 opacity-20 ${
                selectedDuration === 'extended'
                  ? 'bg-gradient-to-br from-blue-300 to-blue-500'
                  : 'bg-gradient-to-br from-blue-100 to-blue-200'
              }`} />
              <motion.span
                className="text-2xl sm:text-3xl relative z-10"
                animate={selectedDuration === 'extended' ? {
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                } : {}}
                transition={{ duration: 0.8, repeat: selectedDuration === 'extended' ? Infinity : 0, repeatDelay: 1.5 }}
              >
                ⏰
              </motion.span>
              <span className="relative z-10 font-bold text-center text-xs sm:text-sm">+30 Days</span>
              <span className={`text-xs sm:text-sm relative z-10 px-2 py-1 rounded-full font-bold ${
                selectedDuration === 'extended'
                  ? 'bg-white/20 text-white'
                  : 'bg-blue-100 text-blue-700'
              }`}>
                {selectedDuration === 'extended' && customFromDate && customToDate ? `₹${getDurationPrice()}` : '+₹30'}
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className={`relative px-4 sm:px-6 py-3 sm:py-4 rounded-2xl border-3 font-bold text-sm sm:text-lg shadow-lg transition-all duration-300 flex flex-col items-center gap-1 sm:gap-2 overflow-hidden min-w-[120px] sm:min-w-[140px] ${
                selectedDuration === 'lifetime'
                  ? 'border-purple-500 bg-gradient-to-br from-purple-400 to-purple-600 text-white shadow-purple-500/50'
                  : 'border-gray-300 bg-gradient-to-br from-white to-gray-50 text-gray-700 hover:border-purple-400 hover:shadow-purple-200/50'
              }`}
              onClick={() => setSelectedDuration('lifetime')}
            >
              <div className={`absolute inset-0 opacity-20 ${
                selectedDuration === 'lifetime'
                  ? 'bg-gradient-to-br from-purple-300 to-purple-500'
                  : 'bg-gradient-to-br from-purple-100 to-purple-200'
              }`} />
              <motion.span
                className="text-2xl sm:text-3xl relative z-10"
                animate={selectedDuration === 'lifetime' ? {
                  scale: [1, 1.1, 1],
                  rotate: [0, -3, 3, 0]
                } : {}}
                transition={{ duration: 1, repeat: selectedDuration === 'lifetime' ? Infinity : 0, repeatDelay: 2 }}
              >
                ♾️
              </motion.span>
              <span className="relative z-10 font-bold text-center text-xs sm:text-sm">Lifetime</span>
              <span className={`text-xs sm:text-sm relative z-10 px-2 py-1 rounded-full font-bold ${
                selectedDuration === 'lifetime'
                  ? 'bg-white/20 text-white'
                  : 'bg-purple-100 text-purple-700'
              }`}>
                ₹1000
              </span>
            </motion.button>
          </div>

          {/* Date Selection */}
          {selectedDuration !== 'lifetime' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg p-4 max-w-md w-full"
            >
              {/* Compact Summary */}
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-2">
                  📅 <span className="font-medium">Active:</span> {new Date(customFromDate).toLocaleDateString()} - {new Date(customToDate).toLocaleDateString()}
                </div>
                <div className="text-sm text-gray-600 mb-3">
                  💰 <span className="font-medium">Cost:</span> <span className="text-green-600 font-bold">₹{getDurationPrice()}</span>
                  {getDurationPrice() === 0 && <span className="text-green-600"> (Free!)</span>}
                </div>
                <button
                  onClick={() => setShowDateScheduler(!showDateScheduler)}
                  className="text-purple-600 hover:text-purple-800 text-sm font-medium flex items-center gap-2 mx-auto transition-colors"
                >
                  <FaCalendarAlt className="text-xs" />
                  {showDateScheduler ? 'Hide' : 'Customize'} Dates
                  <motion.span
                    animate={{ rotate: showDateScheduler ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    ▼
                  </motion.span>
                </button>
              </div>

              {/* Expandable Date Scheduler */}
              <AnimatePresence>
                {showDateScheduler && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t pt-4 mt-4 space-y-4">
                      <h4 className="text-md font-semibold text-gray-800 text-center mb-3">Schedule Your Website</h4>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          From Date
                        </label>
                        <input
                          type="date"
                          value={customFromDate}
                          onChange={(e) => {
                            setCustomFromDate(e.target.value)
                            // Auto-calculate to date based on duration
                            if (selectedDuration === 'trial') {
                              const fromDate = new Date(e.target.value)
                              const toDate = new Date(fromDate)
                              toDate.setDate(fromDate.getDate() + 30)
                              setCustomToDate(toDate.toISOString().split('T')[0])
                            } else if (selectedDuration === 'extended') {
                              const fromDate = new Date(e.target.value)
                              const toDate = new Date(fromDate)
                              toDate.setDate(fromDate.getDate() + 60) // 30 + 30 days
                              setCustomToDate(toDate.toISOString().split('T')[0])
                            }
                          }}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none text-gray-900 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          To Date
                        </label>
                        <input
                          type="date"
                          value={customToDate}
                          onChange={(e) => {
                            setCustomToDate(e.target.value)
                            // Auto-switch to extended duration if more than 30 days
                            if (customFromDate && e.target.value) {
                              const fromDate = new Date(customFromDate)
                              const toDate = new Date(e.target.value)
                              const daysDiff = Math.ceil((toDate.getTime() - fromDate.getTime()) / (1000 * 3600 * 24))
                              if (daysDiff > 30 && selectedDuration === 'trial') {
                                setSelectedDuration('extended')
                              }
                            }
                          }}
                          min={customFromDate}
                          className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none text-gray-900 bg-white"
                        />
                      </div>
                      <div className="text-xs text-gray-600 bg-gray-50 p-3 rounded-lg">
                        {getDurationPrice() === 0 && <p className="text-green-600 font-medium">First 30 days are free!</p>}
                        {getDurationPrice() > 0 && <p className="text-blue-600 font-medium">₹30 for each additional 30 days</p>}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </div>

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
                          onClick={() => openPreview(template.id)}
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
                          onClick={() => openPreview(template.id)}
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
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center justify-between">
                  <div className="text-center md:text-left">
                    <h3 className="text-lg font-bold text-gray-900">
                      {getTotalPages()} Page{getTotalPages() > 1 ? 's' : ''} Selected
                    </h3>
                    <p className="text-sm font-semibold text-purple-600">
                      Total: ₹{getTotalPrice()}
                    </p>
                  </div>

                  <button
                    onClick={handleProceedToPayment}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-bold text-base flex items-center gap-2 hover:shadow-lg transition-all transform hover:scale-105"
                  >
                    <FaArrowRight className="text-sm" />
                    Pay ₹{getTotalPrice()}
                  </button>
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
                      {/* Templates Section */}
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

                      {/* Theme Section */}
                      {selectedTheme !== 'normal' && (
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-900">
                              {selectedTheme === 'love' && 'Love Theme'}
                              {selectedTheme === 'birthday' && 'Birthday Theme'}
                            </h4>
                            <span className="font-bold text-purple-600">₹30</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-600">Theme customization</p>
                            <button
                              onClick={() => setSelectedTheme('normal')}
                              className="text-red-500 hover:text-red-700 text-sm font-medium"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Duration Section */}
                      {selectedDuration !== 'trial' && (
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-900">
                              {selectedDuration === 'extended' && 'Extended Duration'}
                              {selectedDuration === 'lifetime' && 'Lifetime Access'}
                            </h4>
                            <span className="font-bold text-purple-600">
                              {selectedDuration === 'extended' && `₹${getDurationPrice()}`}
                              {selectedDuration === 'lifetime' && '₹1000'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-600">
                              {selectedDuration === 'extended' && `${Math.ceil((new Date(customToDate).getTime() - new Date(customFromDate).getTime()) / (1000 * 3600 * 24))} days access`}
                              {selectedDuration === 'lifetime' && 'Unlimited access'}
                            </p>
                            <button
                              onClick={() => {
                                setSelectedDuration('trial')
                                // Reset dates to 30 days when switching back to trial
                                const fromDate = new Date(customFromDate)
                                const toDate = new Date(fromDate)
                                toDate.setDate(fromDate.getDate() + 30)
                                setCustomToDate(toDate.toISOString().split('T')[0])
                              }}
                              className="text-red-500 hover:text-red-700 text-sm font-medium"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      )}
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
                      className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-bold text-base flex items-center justify-center gap-2 hover:shadow-lg transition-all"
                    >
                      <FaArrowRight className="text-sm" />
                      Pay ₹{getTotalPrice()}
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
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-2 sm:p-4"
            >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-7xl h-[95vh] max-h-[95vh] bg-gradient-to-br from-white via-gray-50 to-purple-50 rounded-3xl shadow-2xl overflow-hidden border-4 border-white/50 flex flex-col mx-2 sm:mx-4"
            >

                {/* Header */}
                <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between relative overflow-hidden gap-3 sm:gap-0">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/90 via-pink-500/90 to-orange-500/90" />
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />
                  <div className="relative z-10 flex flex-col text-center sm:text-left">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2 flex items-center justify-center sm:justify-start gap-2 sm:gap-3">
                      <span className="text-2xl sm:text-3xl lg:text-4xl">
                        {previewTheme === 'love' ? '💕' : previewTheme === 'birthday' ? '🎂' : '🎨'}
                      </span>
                      <span className="text-sm sm:text-base lg:text-lg">
                        {templates.find(t => t.id === previewTemplate)?.name} - Sample Preview
                      </span>
                    </h3>
                    <p className="text-white/90 text-sm sm:text-base lg:text-lg">
                      This is how your page will look with your content ✨
                    </p>
                  </div>
                  {/* Theme Switcher and Close Button */}
                  <div className="relative z-10 flex flex-row items-center gap-2 sm:gap-3">
                    <div className="flex flex-wrap gap-1 sm:gap-2 lg:gap-3 items-center justify-center">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`relative px-2 sm:px-3 lg:px-4 py-1 sm:py-2 rounded-lg sm:rounded-xl border-2 font-semibold text-xs sm:text-sm transition-all duration-300 overflow-hidden ${
                          previewTheme === 'normal'
                            ? 'border-white bg-white/20 text-white shadow-lg'
                            : 'border-white/50 bg-white/10 text-white/80 hover:bg-white/20'
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setPreviewTheme('normal');
                        }}
                      >
                        <span className="relative z-10 flex items-center gap-1">
                          <span>🎨</span>
                          <span> Normal</span>
                        </span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`relative px-2 sm:px-3 lg:px-4 py-1 sm:py-2 rounded-lg sm:rounded-xl border-2 font-semibold text-xs sm:text-sm transition-all duration-300 overflow-hidden ${
                          previewTheme === 'love'
                            ? 'border-white bg-white/20 text-white shadow-lg'
                            : 'border-white/50 bg-white/10 text-white/80 hover:bg-white/20'
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setPreviewTheme('love');
                        }}
                      >
                        <span className="relative z-10 flex items-center gap-1">
                          <span>💕</span>
                          <span> Love</span>
                        </span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`relative px-2 sm:px-3 lg:px-4 py-1 sm:py-2 rounded-lg sm:rounded-xl border-2 font-semibold text-xs sm:text-sm transition-all duration-300 overflow-hidden ${
                          previewTheme === 'birthday'
                            ? 'border-white bg-white/20 text-white shadow-lg'
                            : 'border-white/50 bg-white/10 text-white/80 hover:bg-white/20'
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setPreviewTheme('birthday');
                        }}
                      >
                        <span className="relative z-10 flex items-center gap-1">
                          <span>🎂</span>
                          <span> Birthday</span>
                        </span>
                      </motion.button>
                    </div>
                    <button
                      onClick={() => setPreviewTemplate(null)}
                      className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all flex-shrink-0"
                    >
                      <FaTimes className="text-sm sm:text-lg lg:text-xl text-gray-700" />
                    </button>
                  </div>
                </div>

                {/* Preview Content */}
                <div className="flex-1 overflow-y-auto min-h-0">
                  <TemplatePreview templateId={`${previewTemplate}-${previewTheme}`} />
                </div>

                {/* Footer Actions */}
                <div className="bg-gradient-to-r from-gray-100 via-purple-50 to-pink-50 p-4 sm:p-6 border-t-4 border-purple-300 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4 flex-shrink-0">
                  <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
                    <span className="text-xl sm:text-2xl">
                      {previewTheme === 'love' ? '💕' : previewTheme === 'birthday' ? '🎂' : '🎨'}
                    </span>
                    <p className="text-gray-700 font-medium text-sm sm:text-base">
                      Like what you see? Add this template to your cart! 🛒
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setPreviewTemplate(null)}
                      className="px-6 py-3 bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700 rounded-xl font-semibold hover:from-gray-300 hover:to-gray-400 transition-all shadow-md border border-gray-300 w-full sm:w-auto"
                    >
                      Close
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        addTemplate(previewTemplate)
                        setPreviewTemplate(null)
                      }}
                      className="px-6 py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 text-white rounded-xl font-semibold hover:shadow-xl transition-all flex items-center justify-center gap-2 shadow-lg border border-purple-500 w-full sm:w-auto"
                    >
                      <FaPlus className="text-sm" /> Add to Cart
                    </motion.button>
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
