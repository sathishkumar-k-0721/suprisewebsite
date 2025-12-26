'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaHeart, FaArrowLeft } from 'react-icons/fa'
import Link from 'next/link'

// Sample data for each template
const templates = [
  {
    id: 1,
    type: 'text-only',
    title: 'Happy Birthday, Sarah! 🎉',
    message: 'Wishing you the most amazing day filled with love, laughter, and wonderful surprises! You deserve all the happiness in the world. May this year bring you endless joy and beautiful memories!',
    gradient: 'from-purple-900 via-purple-700 to-pink-700'
  },
  {
    id: 2,
    type: 'text-with-image',
    title: 'Our Beautiful Memories',
    message: 'Every moment with you is a treasure. This picture reminds me of all the wonderful times we\'ve shared together. Here\'s to many more amazing memories!',
    image: 'https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=800',
    gradient: 'from-blue-900 via-blue-700 to-cyan-700'
  },
  {
    id: 3,
    type: 'text-with-video',
    title: 'A Special Message for You',
    message: 'I created this video montage just for you! Watch all our favorite moments come to life.',
    gradient: 'from-pink-900 via-pink-700 to-red-700'
  },
  {
    id: 4,
    type: 'photo-gallery',
    title: 'Our Journey Together 📸',
    message: 'A collection of our most cherished moments',
    images: [
      'https://images.unsplash.com/photo-1464047736614-af63643285bf?w=400',
      'https://images.unsplash.com/photo-1502635385003-ee1e6a1a742d?w=400',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400',
      'https://images.unsplash.com/photo-1501446529957-6226bd447c46?w=400',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'
    ],
    gradient: 'from-green-900 via-green-700 to-teal-700'
  }
]

export default function PreviewPage() {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Auto-cycle through templates every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % templates.length)
    }, 5000) // 5 seconds per template

    return () => clearInterval(interval)
  }, [])

  const currentTemplate = templates[currentIndex]

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Back button */}
      <Link
        href="/"
        className="absolute top-4 sm:top-6 left-4 sm:left-6 z-50 flex items-center gap-2 px-3 sm:px-4 py-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all text-sm sm:text-base"
      >
        <FaArrowLeft className="text-sm sm:text-base" /> Back to Home
      </Link>

      {/* Progress indicator */}
      <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-50 flex gap-1 sm:gap-2">
        {templates.map((_, idx) => (
          <div
            key={idx}
            className={`h-1 w-8 sm:w-12 rounded-full transition-all duration-300 ${
              idx === currentIndex ? 'bg-white' : 'bg-white/30'
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Text Only Template */}
        {currentTemplate.type === 'text-only' && (
          <motion.div
            key="text-only"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8 }}
            className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${currentTemplate.gradient} p-4 sm:p-6 lg:p-8`}
          >
            <div className="max-w-4xl w-full text-center px-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                <FaHeart className="text-5xl sm:text-6xl lg:text-8xl mx-auto mb-6 sm:mb-8 text-pink-300" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 sm:mb-8 leading-tight"
              >
                {currentTemplate.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-white/90 whitespace-pre-line break-words overflow-wrap-anywhere"
              >
                {currentTemplate.message}
              </motion.p>
            </div>
          </motion.div>
        )}

        {/* Text with Image Template */}
        {currentTemplate.type === 'text-with-image' && (
          <motion.div
            key="text-with-image"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.8 }}
            className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${currentTemplate.gradient} p-4 sm:p-6 lg:p-8`}
          >
            <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center px-4">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="relative order-2 lg:order-1"
              >
                <img
                  src={currentTemplate.image}
                  alt="Memory"
                  className="rounded-2xl shadow-2xl w-full h-64 sm:h-80 md:h-96 lg:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="text-center lg:text-left order-1 lg:order-2"
              >
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                  {currentTemplate.title}
                </h1>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-white/90 whitespace-pre-line break-words overflow-wrap-anywhere">
                  {currentTemplate.message}
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Text with Video Template */}
        {currentTemplate.type === 'text-with-video' && (
          <motion.div
            key="text-with-video"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.8 }}
            className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${currentTemplate.gradient} p-4 sm:p-6 lg:p-8`}
          >
            <div className="max-w-5xl w-full text-center px-4">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight"
              >
                {currentTemplate.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-white/90 whitespace-pre-line break-words overflow-wrap-anywhere"
              >
                {currentTemplate.message}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
                className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 sm:p-8 lg:p-12 aspect-video flex items-center justify-center max-w-4xl mx-auto"
              >
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl lg:text-6xl mb-4">🎬</div>
                  <p className="text-sm sm:text-base text-white/60">Video Player Preview</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Photo Gallery Template */}
        {currentTemplate.type === 'photo-gallery' && (
          <motion.div
            key="photo-gallery"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${currentTemplate.gradient} p-4 sm:p-6 lg:p-8`}
          >
            <div className="max-w-6xl w-full text-center px-4">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 leading-tight"
              >
                {currentTemplate.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-12 text-white/90 whitespace-pre-line break-words overflow-wrap-anywhere"
              >
                {currentTemplate.message}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4"
              >
                {currentTemplate.images?.map((img, idx) => (
                  <motion.img
                    key={idx}
                    src={img}
                    alt={`Gallery ${idx + 1}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + idx * 0.1 }}
                    className="rounded-xl shadow-xl w-full h-32 sm:h-40 md:h-48 object-cover hover:scale-105 transition-transform duration-300"
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Template type indicator */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-white/10 backdrop-blur-md px-4 sm:px-6 py-2 sm:py-3 rounded-full">
          <p className="text-xs sm:text-sm font-semibold">
            {currentTemplate.type === 'text-only' && '✍️ Text Only'}
            {currentTemplate.type === 'text-with-image' && '🖼️ Text with Image'}
            {currentTemplate.type === 'text-with-video' && '🎬 Text with Video'}
            {currentTemplate.type === 'photo-gallery' && '📸 Photo Gallery'}
          </p>
        </div>
      </div>
    </main>
  )
}
