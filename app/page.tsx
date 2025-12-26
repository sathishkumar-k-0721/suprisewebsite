'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect, Suspense } from 'react'
import { FaGift, FaArrowRight, FaTimes, FaArrowLeft, FaPause, FaPlay } from 'react-icons/fa'
import dynamic from 'next/dynamic'

// Dynamically import heavy components to reduce initial bundle size
const TemplatePreview = dynamic(() => import('@/components/TemplatePreview'), {
  suspense: true,
  loading: () => <div className="w-full h-full bg-gray-100 animate-pulse rounded-lg flex items-center justify-center">Loading preview...</div>
})

export default function Home() {
  const [showDemo, setShowDemo] = useState(false)
  const [demoStep, setDemoStep] = useState<'theme' | 'demo'>('theme')
  const [selectedDemoTheme, setSelectedDemoTheme] = useState<'normal' | 'love' | 'birthday'>('normal')
  const [currentDemoTemplate, setCurrentDemoTemplate] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-play functionality
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (showDemo && demoStep === 'demo' && isAutoPlaying) {
      interval = setInterval(() => {
        if (currentDemoTemplate < demoTemplates.length - 1) {
          setCurrentDemoTemplate(prev => prev + 1)
        } else {
          // Demo completed
          setShowDemo(false)
          setDemoStep('theme')
          setCurrentDemoTemplate(0)
          setIsAutoPlaying(true)
        }
      }, 8000) // 8 seconds interval - slow transitions
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [showDemo, demoStep, isAutoPlaying, currentDemoTemplate])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!showDemo || demoStep !== 'demo') return

      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        prevTemplate()
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        nextTemplate()
      } else if (event.key === ' ') {
        event.preventDefault()
        setIsAutoPlaying(prev => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [showDemo, demoStep, currentDemoTemplate])

  // Demo templates data
  const demoTemplates = [
    { id: 'text-only', name: 'Text Only Page' },
    { id: 'text-with-image', name: 'Text with Image' },
    { id: 'text-with-video', name: 'Text with Video' },
    { id: 'photo-gallery', name: 'Photo Gallery' },
    { id: 'treasure-hunt', name: 'Treasure Hunt' }
  ]

  const nextTemplate = () => {
    if (currentDemoTemplate < demoTemplates.length - 1) {
      setCurrentDemoTemplate(currentDemoTemplate + 1)
    } else {
      // Demo completed
      setShowDemo(false)
      setDemoStep('theme')
      setCurrentDemoTemplate(0)
    }
  }

  const prevTemplate = () => {
    if (currentDemoTemplate > 0) {
      setCurrentDemoTemplate(currentDemoTemplate - 1)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-20 left-20 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, -90, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-40 right-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          />
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 180, 0],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -bottom-8 left-1/2 w-64 h-64 bg-red-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block"
            >
              <FaGift className="text-5xl md:text-6xl text-pink-500 mb-4 mx-auto" />
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 mb-6">
              Surprise Someone Special
            </h1>

            <p className="text-base md:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto mb-8">
              Create a beautiful, personalized website to surprise your friends and loved ones. 
              Add messages, videos, photos, and music to make it unforgettable!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowDemo(true)}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-base font-semibold shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 flex items-center gap-2"
              >
                See Demo <FaArrowRight />
              </motion.button>

              <Link href="/auth/login?callbackUrl=/templates">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-white text-purple-600 rounded-full text-base font-semibold shadow-xl hover:shadow-purple-500/50 transition-all duration-300 border-2 border-purple-600"
                >
                  Create Your Website
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-purple-600 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-purple-600 rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-base md:text-lg text-gray-600">
              Create your surprise website in 4 easy steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: 1, title: 'Choose Pages', desc: 'Select which pages you want to include' },
              { step: 2, title: 'Make Payment', desc: 'Secure payment through Razorpay' },
              { step: 3, title: 'Add Content', desc: 'Upload your photos, videos, and messages' },
              { step: 4, title: 'Share Link', desc: 'Get a unique link to share with anyone' },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6 shadow-2xl"
                >
                  {item.step}
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Create Magic?
            </h2>
            <p className="text-base md:text-lg text-white/90 mb-8">
              Start building your personalized surprise website today!
            </p>
            <Link href="/auth/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-purple-600 rounded-full text-base md:text-lg font-bold shadow-2xl hover:shadow-white/50 transition-all duration-300"
              >
                Get Started Now
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2025 Surprise Website Builder. Made with ❤️ for special moments.
          </p>
        </div>
      </footer>

      {/* Full-Screen Demo */}
      <AnimatePresence>
        {showDemo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 flex flex-col"
          >
            <AnimatePresence mode="wait">
              {demoStep === 'theme' ? (
                /* Theme Selection */
                <motion.div
                  key="theme"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8"
                >
                  <div className="text-center space-y-6 sm:space-y-8 max-w-2xl mx-auto px-4">
                    <div className="text-4xl sm:text-5xl lg:text-6xl mb-4">
                      {selectedDemoTheme === 'love' ? '💕' : selectedDemoTheme === 'birthday' ? '🎂' : '🎨'}
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">Choose Your Demo Theme</h2>
                    <p className="text-white/90 text-base sm:text-lg mb-6 sm:mb-8">Select a theme to see how your surprise website will look!</p>

                    <div className="flex gap-4 sm:gap-6 justify-center flex-wrap">
                      {[
                        { id: 'normal', name: 'Normal Theme', emoji: '🎨', desc: 'Classic and elegant' },
                        { id: 'love', name: 'Love Theme', emoji: '💕', desc: 'Romantic and sweet' },
                        { id: 'birthday', name: 'Birthday Theme', emoji: '🎂', desc: 'Fun and celebratory' }
                      ].map((theme) => (
                        <motion.button
                          key={theme.id}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setSelectedDemoTheme(theme.id as 'normal' | 'love' | 'birthday')
                            setDemoStep('demo')
                            setIsAutoPlaying(true) // Start auto-playing when demo begins
                          }}
                          className={`px-6 sm:px-8 py-4 sm:py-6 rounded-2xl border-2 font-semibold transition-all flex flex-col items-center gap-2 sm:gap-3 min-w-[160px] sm:min-w-[180px] ${
                            selectedDemoTheme === theme.id
                              ? `border-white bg-white/20 text-white shadow-lg`
                              : 'border-white/50 bg-white/10 text-white/80 hover:bg-white/20'
                          }`}
                        >
                          <span className="text-3xl sm:text-4xl">{theme.emoji}</span>
                          <span className="text-base sm:text-lg font-bold">{theme.name}</span>
                          <span className="text-xs sm:text-sm text-white/70">{theme.desc}</span>
                        </motion.button>
                      ))}
                    </div>

                    <div className="pt-6 sm:pt-8">
                      <button
                        onClick={() => setShowDemo(false)}
                        className="text-white/60 hover:text-white text-base sm:text-lg transition-colors"
                      >
                        Cancel Demo
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                /* Full-Screen Demo */
                <>
                  {/* Demo Header - Simple Line */}
                  <div className="h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>

                  {/* Close Button */}
                  <button
                    onClick={() => setShowDemo(false)}
                    className="absolute top-3 sm:top-4 right-3 sm:right-4 z-30 w-8 h-8 sm:w-10 sm:h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-black/70 transition-all duration-300"
                    title="Close Demo"
                  >
                    <FaTimes className="text-sm sm:text-base" />
                  </button>
                  <div className="absolute top-3 sm:top-4 left-1/2 -translate-x-1/2 z-30 bg-black/50 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2 flex items-center gap-2 sm:gap-3">
                    <div className="flex items-center gap-1 sm:gap-2">
                      {demoTemplates.map((_, index) => (
                        <motion.div
                          key={index}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === currentDemoTemplate
                              ? 'bg-white scale-125'
                              : index < currentDemoTemplate
                              ? 'bg-white/60'
                              : 'bg-white/30'
                          }`}
                          animate={index === currentDemoTemplate ? { scale: [1, 1.2, 1] } : {}}
                          transition={{ duration: 0.5, repeat: index === currentDemoTemplate ? Infinity : 0 }}
                        />
                      ))}
                    </div>
                    <span className="text-white/80 text-xs sm:text-sm font-medium">
                      {currentDemoTemplate + 1} / {demoTemplates.length}
                    </span>
                    <button
                      onClick={() => setIsAutoPlaying(prev => !prev)}
                      className="text-white/80 hover:text-white text-sm sm:text-lg transition-colors ml-1 sm:ml-2"
                      title={isAutoPlaying ? 'Pause auto-play' : 'Resume auto-play'}
                    >
                      {isAutoPlaying ? <FaPause /> : <FaPlay />}
                    </button>
                  </div>

                  {/* Demo Content - Full Template Preview */}
                  <div className="flex-1 overflow-hidden relative">
                    <div className="absolute inset-0 w-full h-full">
                      <Suspense fallback={<div className="w-full h-full bg-gray-100 animate-pulse rounded-lg flex items-center justify-center">Loading preview...</div>}>
                        <TemplatePreview templateId={`${demoTemplates[currentDemoTemplate].id}-${selectedDemoTheme}`} fullScreen={true} />
                      </Suspense>
                    </div>

                    {/* Left Navigation Arrow */}
                    <button
                      onClick={() => {
                        prevTemplate()
                      }}
                      disabled={currentDemoTemplate === 0}
                      className={`absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/90 backdrop-blur-sm border-2 border-white/50 text-purple-600 hover:bg-white hover:shadow-xl transition-all duration-300 flex items-center justify-center text-lg sm:text-2xl shadow-lg ${
                        currentDemoTemplate === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:scale-110'
                      }`}
                    >
                      <FaArrowLeft className="text-sm sm:text-base" />
                    </button>

                    {/* Right Navigation Arrow */}
                    <button
                      onClick={() => {
                        nextTemplate()
                      }}
                      className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/90 backdrop-blur-sm border-2 border-white/50 text-purple-600 hover:bg-white hover:shadow-xl transition-all duration-300 flex items-center justify-center text-lg sm:text-2xl shadow-lg hover:scale-110"
                    >
                      <FaArrowRight className="text-sm sm:text-base" />
                    </button>
                  </div>
                </>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
