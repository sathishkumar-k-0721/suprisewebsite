'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { FaArrowLeft, FaArrowRight, FaHeart, FaMusic } from 'react-icons/fa'

export default function PreviewPage() {
  const [currentPage, setCurrentPage] = useState(1)

  const nextPage = () => {
    if (currentPage < 4) setCurrentPage(currentPage + 1)
  }

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <AnimatePresence mode="wait">
        {/* Page 1: Text Message */}
        {currentPage === 1 && (
          <motion.div
            key="page1"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-700 to-pink-700 p-8"
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
                Happy Birthday, Sarah! 🎉
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="text-2xl md:text-3xl leading-relaxed text-pink-100"
              >
                Today is all about you! Thank you for being such an amazing friend. 
                Here's to another year of wonderful memories together!
              </motion.p>
            </div>
          </motion.div>
        )}

        {/* Page 2: Video Message */}
        {currentPage === 2 && (
          <motion.div
            key="page2"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-900 via-pink-700 to-red-700 p-8"
          >
            <div className="max-w-4xl w-full">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl font-bold mb-8 text-center"
              >
                A Special Message for You
              </motion.h2>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="aspect-video bg-black/50 rounded-2xl flex items-center justify-center backdrop-blur-sm border-2 border-pink-300"
              >
                <p className="text-2xl text-pink-200">
                  [Your video will be displayed here]
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Page 3: Photo with Text */}
        {currentPage === 3 && (
          <motion.div
            key="page3"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-900 via-red-700 to-orange-700 p-8"
          >
            <div className="max-w-4xl w-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="aspect-[4/3] bg-black/50 rounded-2xl mb-8 flex items-center justify-center backdrop-blur-sm border-2 border-red-300"
              >
                <p className="text-2xl text-red-200">
                  [Your photo will be displayed here]
                </p>
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-2xl md:text-3xl text-center leading-relaxed text-red-100"
              >
                Remembering all the amazing times we've shared. You're truly one of a kind!
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-6 flex items-center justify-center gap-2 text-red-200"
              >
                <FaMusic className="text-2xl" />
                <span>[Background music playing]</span>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Page 4: Photo Gallery */}
        {currentPage === 4 && (
          <motion.div
            key="page4"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-900 via-orange-700 to-yellow-700 p-8"
          >
            <div className="max-w-6xl w-full">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl font-bold mb-8 text-center"
              >
                Our Memories Together
              </motion.h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {[1, 2, 3, 4, 5].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="aspect-square bg-black/50 rounded-xl flex items-center justify-center backdrop-blur-sm border-2 border-orange-300"
                  >
                    <span className="text-lg text-orange-200">Photo {i}</span>
                  </motion.div>
                ))}
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="text-2xl text-center text-orange-100"
              >
                Cheers to many more adventures! 🎊
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-full px-8 py-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaArrowLeft />
        </button>
        
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentPage === page ? 'bg-white w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
        
        <button
          onClick={nextPage}
          disabled={currentPage === 4}
          className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaArrowRight />
        </button>
      </div>

      {/* Back to Home */}
      <Link href="/">
        <button className="fixed top-8 left-8 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors flex items-center gap-2">
          <FaArrowLeft />
          Back to Home
        </button>
      </Link>

      {/* Create Your Own */}
      <Link href="/pricing">
        <button className="fixed top-8 right-8 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full hover:shadow-2xl transition-all font-semibold">
          Create Your Own
        </button>
      </Link>
    </main>
  )
}
