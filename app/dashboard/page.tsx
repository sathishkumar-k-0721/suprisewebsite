'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FaPlus, FaEdit, FaEye, FaShareAlt, FaSignOutAlt } from 'react-icons/fa'
import { signOut } from 'next-auth/react'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [websites, setWebsites] = useState([])

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50">
      {/* Header */}
      <nav className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            My Websites
          </h1>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-purple-600 transition-colors"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Welcome Section */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {session?.user?.name}! 👋
            </h2>
            <p className="text-base md:text-lg text-gray-600">
              Manage your surprise websites
            </p>
          </div>

          {/* Create New Website Button */}
          <Link href="/pricing">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-2xl p-8 mb-8 cursor-pointer"
            >
              <div className="flex items-center justify-between text-white">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2">Create New Website</h3>
                  <p className="text-sm text-purple-100">Start building a new surprise for someone special</p>
                </div>
                <FaPlus className="text-4xl md:text-5xl opacity-50" />
              </div>
            </motion.div>
          </Link>

          {/* Websites List */}
          {websites.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
              <div className="text-gray-400 mb-4">
                <FaPlus className="text-5xl mx-auto mb-4" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No websites yet</h3>
              <p className="text-sm text-gray-600 mb-6">
                Create your first surprise website to get started
              </p>
              <Link href="/pricing">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold shadow-lg"
                >
                  Create Website
                </motion.button>
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {websites.map((website: any) => (
                <motion.div
                  key={website.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-lg p-6"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {website.title || 'Untitled Website'}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    Created: {new Date(website.createdAt).toLocaleDateString()}
                  </p>
                  
                  <div className="flex gap-2">
                    <button className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2">
                      <FaEdit /> Edit
                    </button>
                    <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                      <FaEye />
                    </button>
                    <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                      <FaShareAlt />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </main>
  )
}
