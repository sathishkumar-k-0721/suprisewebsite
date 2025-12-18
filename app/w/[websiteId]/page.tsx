'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { FaHeart } from 'react-icons/fa'
import Link from 'next/link'

interface Page {
  id: string
  templateId: string
  order: number
  content: {
    text: string
    imageName?: string
    videoName?: string
    galleryCount?: number
  }
}

interface Website {
  id: string
  title: string
  uniqueUrl: string
  isPublished: boolean
  pages: Page[]
}

export default function WebsitePage() {
  const params = useParams()
  const websiteId = params.websiteId as string
  const [website, setWebsite] = useState<Website | null>(null)
  const [currentPageIndex, setCurrentPageIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

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

  // Auto-cycle through pages every 5 seconds
  useEffect(() => {
    if (!website || website.pages.length === 0) return

    const interval = setInterval(() => {
      setCurrentPageIndex((prev) => (prev + 1) % website.pages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [website])

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
    'text-only': 'from-purple-900 via-purple-700 to-pink-700',
    'text-with-image': 'from-blue-900 via-blue-700 to-cyan-700',
    'text-with-video': 'from-pink-900 via-pink-700 to-red-700',
    'photo-gallery': 'from-green-900 via-green-700 to-teal-700'
  }

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden relative">
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
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-2xl w-full h-[500px] flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-8xl mb-4">📷</div>
                    <p className="text-sm opacity-75">{currentPage.content.imageName || 'Image'}</p>
                  </div>
                </div>
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
                className="bg-black/30 backdrop-blur-sm rounded-2xl p-12 aspect-video flex items-center justify-center"
              >
                <div className="text-center">
                  <div className="text-6xl mb-4">🎬</div>
                  <p className="text-white/60">{currentPage.content.videoName || 'Video'}</p>
                </div>
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
                {Array.from({ length: currentPage.content.galleryCount || 5 }).map((_, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + idx * 0.1 }}
                    className="rounded-xl shadow-xl w-full h-48 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center"
                  >
                    <div className="text-white text-4xl">📷</div>
                  </motion.div>
                ))}
              </motion.div>
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
