'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaDatabase, FaCreditCard, FaCloud, FaKey, FaCheckCircle, FaTimesCircle } from 'react-icons/fa'

export default function SetupPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 text-center mb-4">
            Setup Guide
          </h1>
          <p className="text-xl text-gray-600 text-center mb-12">
            Configure your environment to get started
          </p>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Required Configuration</h2>
            
            <div className="space-y-6">
              {/* MongoDB */}
              <div className="border-l-4 border-purple-600 pl-6 py-4">
                <div className="flex items-start gap-4">
                  <FaDatabase className="text-3xl text-purple-600 mt-1" />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">MongoDB Database</h3>
                    <p className="text-gray-600 mb-3">
                      Required for user authentication and data storage
                    </p>
                    <div className="bg-gray-50 rounded-lg p-4 mb-3">
                      <p className="text-sm font-mono text-gray-700 mb-2">
                        DATABASE_URL="mongodb+srv://username:password@cluster..."
                      </p>
                    </div>
                    <div className="space-y-2 text-sm text-gray-700">
                      <p><strong>Steps:</strong></p>
                      <ol className="list-decimal list-inside space-y-1 ml-4">
                        <li>Create free account at <a href="https://www.mongodb.com/cloud/atlas" target="_blank" className="text-purple-600 hover:underline">MongoDB Atlas</a></li>
                        <li>Create a new cluster</li>
                        <li>Create database user</li>
                        <li>Whitelist your IP (or use 0.0.0.0/0 for development)</li>
                        <li>Copy connection string to .env file</li>
                        <li>Run: <code className="bg-gray-200 px-2 py-1 rounded">npx prisma db push</code></li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>

              {/* NextAuth */}
              <div className="border-l-4 border-pink-600 pl-6 py-4">
                <div className="flex items-start gap-4">
                  <FaKey className="text-3xl text-pink-600 mt-1" />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">NextAuth Secret</h3>
                    <p className="text-gray-600 mb-3">
                      Required for secure authentication
                    </p>
                    <div className="bg-gray-50 rounded-lg p-4 mb-3">
                      <p className="text-sm font-mono text-gray-700">
                        NEXTAUTH_SECRET="your-32-character-secret"
                      </p>
                    </div>
                    <div className="space-y-2 text-sm text-gray-700">
                      <p><strong>Generate with:</strong></p>
                      <p className="bg-gray-200 px-3 py-2 rounded font-mono text-xs">
                        openssl rand -base64 32
                      </p>
                      <p className="text-xs text-gray-500">Or use any random 32-character string</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Razorpay */}
              <div className="border-l-4 border-red-600 pl-6 py-4">
                <div className="flex items-start gap-4">
                  <FaCreditCard className="text-3xl text-red-600 mt-1" />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Razorpay Payment</h3>
                    <p className="text-gray-600 mb-3">
                      Required for payment processing
                    </p>
                    <div className="bg-gray-50 rounded-lg p-4 mb-3">
                      <p className="text-sm font-mono text-gray-700 mb-1">
                        NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_test_xxxxx"
                      </p>
                      <p className="text-sm font-mono text-gray-700">
                        RAZORPAY_KEY_SECRET="your_secret"
                      </p>
                    </div>
                    <div className="space-y-2 text-sm text-gray-700">
                      <p><strong>Steps:</strong></p>
                      <ol className="list-decimal list-inside space-y-1 ml-4">
                        <li>Create account at <a href="https://razorpay.com" target="_blank" className="text-red-600 hover:underline">Razorpay</a></li>
                        <li>Go to Settings → API Keys</li>
                        <li>Generate Test Keys</li>
                        <li>Add to .env file</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cloudinary */}
              <div className="border-l-4 border-orange-600 pl-6 py-4">
                <div className="flex items-start gap-4">
                  <FaCloud className="text-3xl text-orange-600 mt-1" />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Cloudinary Storage</h3>
                    <p className="text-gray-600 mb-3">
                      Required for image, video, and audio uploads
                    </p>
                    <div className="bg-gray-50 rounded-lg p-4 mb-3">
                      <p className="text-sm font-mono text-gray-700 mb-1">
                        NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud"
                      </p>
                      <p className="text-sm font-mono text-gray-700 mb-1">
                        CLOUDINARY_API_KEY="123456"
                      </p>
                      <p className="text-sm font-mono text-gray-700">
                        CLOUDINARY_API_SECRET="your_secret"
                      </p>
                    </div>
                    <div className="space-y-2 text-sm text-gray-700">
                      <p><strong>Steps:</strong></p>
                      <ol className="list-decimal list-inside space-y-1 ml-4">
                        <li>Create account at <a href="https://cloudinary.com" target="_blank" className="text-orange-600 hover:underline">Cloudinary</a></li>
                        <li>Go to Dashboard</li>
                        <li>Copy credentials</li>
                        <li>Add to .env file</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Quick Start</h2>
            <ol className="space-y-3 text-lg">
              <li>✅ Edit <code className="bg-white/20 px-2 py-1 rounded">.env</code> file with your credentials</li>
              <li>✅ Run <code className="bg-white/20 px-2 py-1 rounded">npx prisma db push</code></li>
              <li>✅ Restart server: <code className="bg-white/20 px-2 py-1 rounded">npm run dev</code></li>
              <li>✅ Start building! 🚀</li>
            </ol>
          </div>

          <div className="mt-8 text-center">
            <Link href="/">
              <button className="px-8 py-3 bg-white text-purple-600 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all">
                Back to Home
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
