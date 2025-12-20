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
        className="absolute top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all"
      >
        <FaArrowLeft /> Back to Home
      </Link>

      {/* Progress indicator */}
      <div className="absolute top-6 right-6 z-50 flex gap-2">
        {templates.map((_, idx) => (
          <div
            key={idx}
            className={`h-1 w-12 rounded-full transition-all duration-300 ${
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
            className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${currentTemplate.gradient} p-8`}
          >
            <div className="max-w-3xl text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                <FaHeart className="text-8xl mx-auto mb-8 text-pink-300" />
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-5xl md:text-7xl font-bold mb-8"
              >
                {currentTemplate.title}
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="text-xl md:text-2xl leading-relaxed text-white/90"
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
            className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${currentTemplate.gradient} p-8`}
          >
            <div className="max-w-6xl grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="relative"
              >
                <img
                  src={currentTemplate.image}
                  alt="Memory"
                  className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl" />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  {currentTemplate.title}
                </h1>
                <p className="text-xl md:text-2xl leading-relaxed text-white/90">
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
            className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${currentTemplate.gradient} p-8`}
          >
            <div className="max-w-5xl text-center">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-6xl font-bold mb-6"
              >
                {currentTemplate.title}
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xl md:text-2xl mb-8 text-white/90"
              >
                {currentTemplate.message}
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
                className="bg-black/30 backdrop-blur-sm rounded-2xl p-12 aspect-video flex items-center justify-center"
              >
                <div className="text-center">
                  <div className="text-6xl mb-4">🎬</div>
                  <p className="text-white/60">Video Player Preview</p>
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
            className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${currentTemplate.gradient} p-8`}
          >
            <div className="max-w-6xl text-center">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-6xl font-bold mb-4"
              >
                {currentTemplate.title}
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xl md:text-2xl mb-12 text-white/90"
              >
                {currentTemplate.message}
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="grid grid-cols-2 md:grid-cols-3 gap-4"
              >
                {currentTemplate.images?.map((img, idx) => (
                  <motion.img
                    key={idx}
                    src={img}
                    alt={`Gallery ${idx + 1}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + idx * 0.1 }}
                    className="rounded-xl shadow-xl w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Template type indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-full">
          <p className="text-sm font-semibold">
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
