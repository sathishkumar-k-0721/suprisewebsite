'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaCheck, FaCopy, FaEye, FaShareAlt } from 'react-icons/fa'

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const websiteId = searchParams.get('id')
  const uniqueUrl = searchParams.get('url')
  const [copied, setCopied] = useState(false)

  const websiteLink = `${window.location.origin}/w/${uniqueUrl}`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(websiteLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  useEffect(() => {
    // Clear localStorage
    localStorage.removeItem('selectedTemplates')
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="mb-8"
          >
            <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto">
              <FaCheck className="text-5xl text-white" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4"
          >
            🎉 Your Website is Ready!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-gray-600 mb-8"
          >
            Share this link with your loved ones to surprise them!
          </motion.p>

          {/* Shareable Link Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl shadow-xl p-8 mb-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <FaShareAlt className="text-purple-600 text-xl" />
              <h2 className="text-xl font-bold text-gray-900">Your Shareable Link</h2>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-4 break-all">
              <code className="text-purple-600 font-mono text-sm">
                {websiteLink}
              </code>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={copyToClipboard}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <FaCopy />
                {copied ? 'Copied!' : 'Copy Link'}
              </button>

              <Link
                href={`/w/${uniqueUrl}`}
                target="_blank"
                className="flex-1 px-6 py-3 bg-white border-2 border-purple-600 text-purple-600 rounded-full font-semibold hover:bg-purple-50 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <FaEye />
                Preview
              </Link>
            </div>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6 mb-8 text-left"
          >
            <h3 className="font-bold text-blue-900 mb-2">💡 What&apos;s Next?</h3>
            <ul className="text-blue-800 space-y-2 text-sm">
              <li>✅ Your website will auto-play through all pages (5 seconds each)</li>
              <li>✅ Anyone with the link can view it</li>
              <li>✅ Share via WhatsApp, Email, or Social Media</li>
              <li>✅ The website is saved in your account</li>
            </ul>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/my-websites"
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              View My Websites
            </Link>

            <Link
              href="/templates"
              className="px-8 py-3 bg-white border-2 border-purple-600 text-purple-600 rounded-full font-semibold hover:bg-purple-50 transition-all duration-300"
            >
              Create Another
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </main>
  )
}
