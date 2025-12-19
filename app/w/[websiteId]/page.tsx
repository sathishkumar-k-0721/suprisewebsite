'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { FaHeart, FaLock, FaUnlock, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import Link from 'next/link'

// Love Theme Animated Hearts Component for Website View
function LoveThemeHearts() {
  const hearts = Array.from({ length: 20 }, (_, i) => i);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart}
          className="absolute"
          initial={{
            x: Math.random() * 100 + '%',
            y: '100vh',
            scale: Math.random() * 0.5 + 0.3,
            opacity: 0
          }}
          animate={{
            y: '-10vh',
            opacity: [0, 1, 1, 0],
            rotate: [0, 180, 360],
            scale: [0.3, 1, 0.8, 0.3]
          }}
          transition={{
            duration: Math.random() * 10 + 8,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeOut"
          }}
          style={{
            left: `${Math.random() * 100}%`,
          }}
        >
          <FaHeart className="text-red-400 text-opacity-70 drop-shadow-lg" size={Math.random() * 25 + 15} />
        </motion.div>
      ))}

      {/* Floating sparkles */}
      {Array.from({ length: 12 }, (_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute text-yellow-300 drop-shadow-sm"
          initial={{
            x: Math.random() * 100 + '%',
            y: '100vh',
            opacity: 0
          }}
          animate={{
            y: '-10vh',
            opacity: [0, 1, 0],
            scale: [0, 1.2, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: Math.random() * 8 + 6,
            repeat: Infinity,
            delay: Math.random() * 4,
          }}
        >
          ✨
        </motion.div>
      ))}

      {/* Floating rose petals */}
      {Array.from({ length: 8 }, (_, i) => (
        <motion.div
          key={`petal-${i}`}
          className="absolute text-pink-300"
          initial={{
            x: Math.random() * 100 + '%',
            y: '100vh',
            opacity: 0,
            rotate: 0
          }}
          animate={{
            y: '-10vh',
            opacity: [0, 0.8, 0],
            rotate: [0, 360],
            x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`]
          }}
          transition={{
            duration: Math.random() * 12 + 10,
            repeat: Infinity,
            delay: Math.random() * 6,
            ease: "linear"
          }}
        >
          🌸
        </motion.div>
      ))}
    </div>
  );
}

interface Page {
  id: string
  templateId: string
  order: number
  content: {
    text: string
    image?: string
    video?: string
    audio?: string
    gallery?: string[]
    imageName?: string
    videoName?: string
    galleryCount?: number
    clue1?: string
    clue2?: string
    clue3?: string
    password?: string
    audioName?: string
  }
}

interface Website {
  id: string
  title: string
  uniqueUrl: string
  isPublished: boolean
  theme?: 'normal' | 'love' | 'birthday'
  pages: Page[]
}

export default function WebsitePage() {
  const params = useParams()
  const websiteId = params.websiteId as string
  const [website, setWebsite] = useState<Website | null>(null)
  const [currentPageIndex, setCurrentPageIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [showPasswordError, setShowPasswordError] = useState(false)
  const [currentClueIndex, setCurrentClueIndex] = useState(0)

  useEffect(() => {
    const fetchWebsite = async () => {
      try {
        const response = await fetch(`/api/website/${websiteId}`)
        if (!response.ok) {
          throw new Error('Website not found')
        }
        const data = await response.json()
        setWebsite(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchWebsite()
  }, [websiteId])

  // Auto-cycle through pages every 5 seconds (but not for treasure-hunt)
  useEffect(() => {
    if (!website || website.pages.length === 0) return
    
    // Check if current page is treasure hunt variant
    const currentPage = website.pages[currentPageIndex]
    if (currentPage?.templateId?.startsWith('treasure-hunt')) return // Don't auto-cycle for treasure hunt

    const interval = setInterval(() => {
      setCurrentPageIndex((prev) => (prev + 1) % website.pages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [website, currentPageIndex])

  // Auto-cycle through clues for treasure hunt (every 4 seconds)
  useEffect(() => {
    if (!website || website.pages.length === 0) return
    
    const currentPage = website.pages[currentPageIndex]
    if (currentPage?.templateId?.startsWith('treasure-hunt') && !isUnlocked) {
      const interval = setInterval(() => {
        setCurrentClueIndex((prev) => (prev + 1) % 3) // Cycle through 3 clues
      }, 4000)

      return () => clearInterval(interval)
    }
  }, [website, currentPageIndex, isUnlocked])

  // Reset states when page changes
  useEffect(() => {
    setPasswordInput('')
    setIsUnlocked(false)
    setShowPasswordError(false)
    setCurrentClueIndex(0)
  }, [currentPageIndex])

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading your surprise...</p>
        </div>
      </div>
    )
  }

  if (error || !website) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-3xl font-bold mb-4">Website Not Found</h1>
          <p className="mb-6">{error || 'This surprise website doesn\'t exist or has been removed.'}</p>
          <Link href="/" className="px-6 py-3 bg-white text-black rounded-full font-semibold">
            Create Your Own
          </Link>
        </div>
      </div>
    )
  }

  const currentPage = website.pages[currentPageIndex]
  const gradients: Record<string, string> = {
    'text-only': website.theme === 'love' ? 'from-pink-200 via-pink-400 to-red-300' : 'from-purple-900 via-purple-700 to-pink-700',
    'text-with-image': website.theme === 'love' ? 'from-pink-200 via-pink-400 to-red-300' : 'from-blue-900 via-blue-700 to-cyan-700',
    'text-with-video': website.theme === 'love' ? 'from-pink-200 via-pink-400 to-red-300' : 'from-pink-900 via-pink-700 to-red-700',
    'text-with-audio': website.theme === 'love' ? 'from-pink-200 via-pink-400 to-red-300' : 'from-teal-900 via-teal-700 to-cyan-700',
    'photo-gallery': website.theme === 'love' ? 'from-pink-200 via-pink-400 to-red-300' : 'from-green-900 via-green-700 to-teal-700',
    'treasure-hunt': website.theme === 'love' ? 'from-pink-200 via-pink-400 to-red-300' : 'from-indigo-900 via-indigo-700 to-purple-700',
    'treasure-hunt-image': website.theme === 'love' ? 'from-pink-200 via-pink-400 to-red-300' : 'from-violet-900 via-violet-700 to-purple-700',
    'treasure-hunt-video': website.theme === 'love' ? 'from-pink-200 via-pink-400 to-red-300' : 'from-fuchsia-900 via-fuchsia-700 to-purple-700'
  }

  const handlePasswordSubmit = () => {
    if (passwordInput.trim() === currentPage.content.password?.trim()) {
      setIsUnlocked(true)
      setShowPasswordError(false)
      setPasswordInput('')
    } else {
      setShowPasswordError(true)
      setTimeout(() => setShowPasswordError(false), 2000)
    }
  }

  const goToNextPage = () => {
    if (currentPageIndex < website.pages.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1)
      setPasswordInput('')
      setIsUnlocked(false)
      setShowPasswordError(false)
    }
  }

  const goToPrevPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1)
      setPasswordInput('')
      setIsUnlocked(false)
      setShowPasswordError(false)
    }
  }

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Love Theme Animations */}
      {website.theme === 'love' && <LoveThemeHearts />}

      {/* Progress indicator */}
      <div className="absolute top-6 right-6 z-50 flex gap-2">
        {website.pages.map((_, idx) => (
          <div
            key={idx}
            className={`h-1 w-12 rounded-full transition-all duration-300 ${
              idx === currentPageIndex ? 'bg-white' : 'bg-white/30'
            }`}
          />
        ))}
      </div>

      {/* Navigation Buttons - Left and Right */}
      {website.pages.length > 1 && (
        <>
          <button
            onClick={goToPrevPage}
            disabled={currentPageIndex === 0}
            className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50 p-4 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Previous page"
          >
            <FaChevronLeft className="text-2xl" />
          </button>
          
          <button
            onClick={goToNextPage}
            disabled={currentPageIndex === website.pages.length - 1}
            className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 p-4 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Next page"
          >
            <FaChevronRight className="text-2xl" />
          </button>
        </>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={currentPageIndex}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8 }}
          className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${
            gradients[currentPage.templateId] || 'from-purple-900 to-pink-900'
          } p-8`}
        >
          {/* Text Only Template */}
          {currentPage.templateId === 'text-only' && (
            <div className="max-w-3xl text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                <FaHeart className="text-8xl mx-auto mb-8 text-pink-300" />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-xl md:text-2xl leading-relaxed text-white/90 whitespace-pre-wrap"
              >
                {currentPage.content.text}
              </motion.div>
            </div>
          )}

          {/* Text with Image Template */}
          {currentPage.templateId === 'text-with-image' && (
            <div className="max-w-6xl grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="relative"
              >
                {currentPage.content.image ? (
                  <img
                    src={currentPage.content.image}
                    alt="Surprise"
                    className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
                  />
                ) : (
                  <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-2xl w-full h-[500px] flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="text-8xl mb-4">📷</div>
                      <p className="text-sm opacity-75">{currentPage.content.imageName || 'Image'}</p>
                    </div>
                  </div>
                )}
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-xl md:text-2xl leading-relaxed text-white/90 whitespace-pre-wrap">
                  {currentPage.content.text}
                </p>
              </motion.div>
            </div>
          )}

          {/* Text with Video Template */}
          {currentPage.templateId === 'text-with-video' && (
            <div className="max-w-5xl text-center">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-xl md:text-2xl mb-8 text-white/90 whitespace-pre-wrap"
              >
                {currentPage.content.text}
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                {currentPage.content.video ? (
                  <video
                    src={currentPage.content.video}
                    controls
                    className="w-full rounded-2xl shadow-2xl"
                  />
                ) : (
                  <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-12 aspect-video flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-4">🎬</div>
                      <p className="text-white/60">{currentPage.content.videoName || 'Video'}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          )}

          {/* Text with Audio Template */}
          {currentPage.templateId === 'text-with-audio' && (
            <div className="max-w-4xl text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                <div className="text-8xl mb-8">🎵</div>
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-xl md:text-2xl mb-8 text-white/90 whitespace-pre-wrap"
              >
                {currentPage.content.text}
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border-2 border-white/20"
              >
                {currentPage.content.audio ? (
                  <audio
                    src={currentPage.content.audio}
                    controls
                    className="w-full"
                  />
                ) : (
                  <div className="text-center">
                    <div className="text-4xl mb-2">🎧</div>
                    <p className="text-white/60">{currentPage.content.audioName || 'Audio'}</p>
                  </div>
                )}
              </motion.div>
            </div>
          )}

          {/* Photo Gallery Template */}
          {currentPage.templateId === 'photo-gallery' && (
            <div className="max-w-6xl text-center">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-xl md:text-2xl mb-12 text-white/90 whitespace-pre-wrap"
              >
                {currentPage.content.text}
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="grid grid-cols-2 md:grid-cols-3 gap-4"
              >
                {currentPage.content.gallery && currentPage.content.gallery.length > 0 ? (
                  currentPage.content.gallery.map((img, idx) => (
                    <motion.img
                      key={idx}
                      src={img}
                      alt={`Gallery ${idx + 1}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + idx * 0.1 }}
                      className="rounded-xl shadow-xl w-full h-48 object-cover"
                    />
                  ))
                ) : (
                  Array.from({ length: currentPage.content.galleryCount || 5 }).map((_, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + idx * 0.1 }}
                      className="rounded-xl shadow-xl w-full h-48 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center"
                    >
                      <div className="text-white text-4xl">📷</div>
                    </motion.div>
                  ))
                )}
              </motion.div>
            </div>
          )}

          {/* Treasure Hunt Templates (all variations) */}
          {currentPage.templateId?.startsWith('treasure-hunt') && (
            <div className="max-w-4xl w-full">
              {!isUnlocked ? (
                /* Locked State - Show Clues */
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                  >
                    <FaLock className="text-8xl mx-auto mb-8 text-yellow-300" />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-6"
                  >
                    <h2 className="text-4xl font-bold mb-2">Solve the Clues to Unlock! 🔐</h2>
                    <p className="text-xl text-yellow-200">You have only 3 clues to unlock</p>
                  </motion.div>

                  {/* Show current clue with cycling animation */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentClueIndex}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.5 }}
                      className="mb-8"
                    >
                      <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl border-2 border-yellow-300/50 shadow-2xl">
                        <div className="flex items-start gap-4">
                          <span className="text-3xl font-bold text-yellow-300">#{currentClueIndex + 1}</span>
                          <p className="text-2xl text-left flex-1">
                            {currentClueIndex === 0 && currentPage.content.clue1}
                            {currentClueIndex === 1 && currentPage.content.clue2}
                            {currentClueIndex === 2 && currentPage.content.clue3}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Clue indicators */}
                  <div className="flex justify-center gap-2 mb-8">
                    {[0, 1, 2].map((idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentClueIndex(idx)}
                        className={`h-3 w-3 rounded-full transition-all ${
                          idx === currentClueIndex ? 'bg-yellow-300 w-8' : 'bg-white/30'
                        }`}
                      />
                    ))}
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="max-w-md mx-auto"
                  >
                    <input
                      type="text"
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handlePasswordSubmit()}
                      placeholder="Enter the password..."
                      className="w-full p-4 rounded-lg bg-white/20 border-2 border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-yellow-300 text-center text-lg mb-4"
                    />
                    
                    <button
                      onClick={handlePasswordSubmit}
                      className="w-full py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 text-lg"
                    >
                      <FaUnlock /> Unlock
                    </button>

                    <AnimatePresence>
                      {showPasswordError && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="text-red-300 mt-4 font-semibold"
                        >
                          ❌ Incorrect password. Try again!
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              ) : (
                /* Unlocked State - Show Content */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border-2 border-white/20 mb-6"
                  >
                    <p className="text-xl md:text-2xl leading-relaxed whitespace-pre-wrap">
                      {currentPage.content.text}
                    </p>
                  </motion.div>

                  {/* Audio for treasure-hunt */}
                  {currentPage.templateId === 'treasure-hunt' && (currentPage.content.audio || currentPage.content.audioName) && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="bg-white/10 backdrop-blur-md p-6 rounded-xl border-2 border-white/20"
                    >
                      <div className="text-center">
                        <div className="text-5xl mb-4">🎵</div>
                        <p className="text-lg mb-4">Hidden Audio Message</p>
                        {currentPage.content.audio ? (
                          <audio
                            src={currentPage.content.audio}
                            controls
                            className="w-full"
                          />
                        ) : (
                          <p className="text-sm text-white/60">{currentPage.content.audioName}</p>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* Image for treasure-hunt-image */}
                  {currentPage.templateId === 'treasure-hunt-image' && currentPage.content.image && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <img
                        src={currentPage.content.image}
                        alt="Hidden Surprise"
                        className="rounded-2xl shadow-2xl w-full max-w-2xl mx-auto"
                      />
                    </motion.div>
                  )}

                  {/* Video for treasure-hunt-video */}
                  {currentPage.templateId === 'treasure-hunt-video' && currentPage.content.video && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <video
                        src={currentPage.content.video}
                        controls
                        className="rounded-2xl shadow-2xl w-full max-w-3xl mx-auto"
                      />
                    </motion.div>
                  )}
                </motion.div>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Page indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-full">
          <p className="text-sm font-semibold">
            Page {currentPageIndex + 1} of {website.pages.length}
          </p>
        </div>
      </div>
    </main>
  )
}
