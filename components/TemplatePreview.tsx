'use client'

import { motion } from 'framer-motion'
import { FaHeart, FaPlay } from 'react-icons/fa'

interface TemplatePreviewProps {
  templateId: string
}

export default function TemplatePreview({ templateId }: TemplatePreviewProps) {
  switch (templateId) {
    case 'text-only':
      return <TextOnlyPreview />
    case 'text-with-image':
      return <TextWithImagePreview />
    case 'text-with-video':
      return <TextWithVideoPreview />
    case 'photo-gallery':
      return <PhotoGalleryPreview />
    default:
      return null
  }
}

// Text Only Template Preview
function TextOnlyPreview() {
  return (
    <div className="min-h-[600px] bg-gradient-to-br from-purple-900 via-purple-700 to-pink-700 flex items-center justify-center p-8">
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
          className="text-5xl md:text-7xl font-bold mb-8 text-white"
        >
          Happy Birthday, Sarah! 🎉
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-xl md:text-2xl leading-relaxed text-white/90"
        >
          Wishing you the most amazing day filled with love, laughter, and wonderful surprises! 
          You deserve all the happiness in the world. May this year bring you endless joy and beautiful memories!
        </motion.p>
      </div>
    </div>
  )
}

// Text with Image Template Preview
function TextWithImagePreview() {
  return (
    <div className="min-h-[600px] bg-gradient-to-br from-blue-900 via-blue-700 to-cyan-700 flex items-center justify-center p-8">
      <div className="max-w-6xl grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="relative"
        >
          <img
            src="https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=800"
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
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Our Beautiful Memories
          </h1>
          <p className="text-xl md:text-2xl leading-relaxed text-white/90">
            Every moment with you is a treasure. This picture reminds me of all the wonderful times we&apos;ve shared together. Here&apos;s to many more amazing memories!
          </p>
        </motion.div>
      </div>
    </div>
  )
}

// Text with Video Template Preview
function TextWithVideoPreview() {
  return (
    <div className="min-h-[600px] bg-gradient-to-br from-pink-900 via-pink-700 to-red-700 flex items-center justify-center p-8">
      <div className="max-w-5xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl md:text-6xl font-bold mb-6 text-white"
        >
          A Special Message for You
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl md:text-2xl mb-8 text-white/90"
        >
          I created this video montage just for you! Watch all our favorite moments come to life.
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
    </div>
  )
}

// Photo Gallery Template Preview
function PhotoGalleryPreview() {
  const images = [
    'https://images.unsplash.com/photo-1464047736614-af63643285bf?w=400',
    'https://images.unsplash.com/photo-1502635385003-ee1e6a1a742d?w=400',
    'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400',
    'https://images.unsplash.com/photo-1501446529957-6226bd447c46?w=400',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'
  ]

  return (
    <div className="min-h-[600px] bg-gradient-to-br from-green-900 via-green-700 to-teal-700 flex items-center justify-center p-8">
      <div className="max-w-6xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl md:text-6xl font-bold mb-4 text-white"
        >
          Our Journey Together 📸
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl md:text-2xl mb-12 text-white/90"
        >
          A collection of our most cherished moments
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
        >
          {images.map((img, idx) => (
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
    </div>
  )
}
