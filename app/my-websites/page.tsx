'use client'

import { useEffect, useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { FaPlus, FaEye, FaSignOutAlt, FaTrash, FaCopy, FaUser, FaBars } from 'react-icons/fa'

interface Website {
  id: string
  title: string
  uniqueUrl: string
  isPublished: boolean
  createdAt: string
  pages: { id: string }[]
}

export default function MyWebsitesPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [websites, setWebsites] = useState<Website[]>([])
  const [loading, setLoading] = useState(true)
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login?callbackUrl=/my-websites')
    } else if (status === 'authenticated') {
      fetchWebsites()
    }
  }, [status, router])

  const fetchWebsites = async () => {
    try {
      const response = await fetch('/api/website/my-websites')
      if (response.ok) {
        const data = await response.json()
        setWebsites(data)
      }
    } catch (error) {
      console.error('Error fetching websites:', error)
    } finally {
      setLoading(false)
    }
  }

  const copyLink = (uniqueUrl: string) => {
    const link = `${window.location.origin}/w/${uniqueUrl}`
    navigator.clipboard.writeText(link)
    setCopiedUrl(uniqueUrl)
    setTimeout(() => setCopiedUrl(null), 2000)
  }

  const deleteWebsite = async (id: string) => {
    if (!confirm('Are you sure you want to delete this website?')) return

    try {
      const response = await fetch(`/api/website/${id}`, {
        method: 'DELETE'
      })
      if (response.ok) {
        setWebsites(websites.filter(w => w.id !== id))
      }
    } catch (error) {
      console.error('Error deleting website:', error)
      alert('Failed to delete website')
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-red-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50">
      {/* Header */}
      <nav className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <Link href="/" className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-105 transition-transform inline-block">
                Surprise Websites
              </Link>
              <p className="text-sm text-gray-600 mt-1">My Websites</p>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden p-2 text-gray-700 hover:text-purple-600 transition-colors"
              >
                <FaBars className="text-2xl" />
              </button>

              {/* Create Website Button */}
              <Link
                href="/templates"
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full font-semibold hover:bg-purple-200 transition-colors"
              >
                <FaPlus />
                Create Website
              </Link>

              {/* User Info */}
              {session?.user && (
                <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
                  <FaUser className="text-purple-600" />
                  <span className="text-sm font-semibold text-gray-700">
                    {session.user.name || session.user.email}
                  </span>
                  <button
                    onClick={async () => {
                      await signOut({ redirect: false })
                      window.location.href = '/'
                    }}
                    className="ml-2 text-gray-500 hover:text-red-600 transition-colors"
                    title="Logout"
                  >
                    <FaSignOutAlt />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          <AnimatePresence>
            {showMobileMenu && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden border-t border-gray-200 bg-white"
              >
                <div className="px-4 py-4 space-y-3">
                  <Link
                    href="/templates"
                    className="flex items-center gap-3 px-4 py-3 bg-purple-50 text-purple-700 rounded-lg font-semibold hover:bg-purple-100 transition-colors"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <FaPlus />
                    Create Website
                  </Link>
                  
                  {session?.user && (
                    <>
                      <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
                        <FaUser className="text-purple-600" />
                        <span className="text-sm font-semibold text-gray-700">
                          {session.user.name || session.user.email}
                        </span>
                      </div>
                      
                      <button
                        onClick={async () => {
                          await signOut({ redirect: false })
                          window.location.href = '/'
                        }}
                        className="flex items-center gap-3 px-4 py-3 bg-red-50 text-red-600 rounded-lg font-semibold hover:bg-red-100 transition-colors w-full"
                      >
                        <FaSignOutAlt />
                        Logout
                      </button>
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Create New Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            href="/templates"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <FaPlus />
            Create New Website
          </Link>
        </motion.div>

        {/* Websites Grid */}
        {websites.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">🎨</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No websites yet</h2>
            <p className="text-gray-600 mb-6">Create your first surprise website to get started!</p>
            <Link
              href="/templates"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
            >
              <FaPlus />
              Get Started
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {websites.map((website, index) => (
              <motion.div
                key={website.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {website.title || 'Untitled Website'}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {website.pages.length} page{website.pages.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      website.isPublished 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {website.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <p className="text-xs text-gray-500 mb-1">Shareable Link</p>
                    <code className="text-sm text-purple-600 break-all">
                      /w/{website.uniqueUrl}
                    </code>
                  </div>

                  <p className="text-xs text-gray-400 mb-4">
                    Created {new Date(website.createdAt).toLocaleDateString()}
                  </p>

                  <div className="flex gap-2">
                    <Link
                      href={`/w/${website.uniqueUrl}`}
                      target="_blank"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-semibold"
                    >
                      <FaEye />
                      View
                    </Link>
                    <button
                      onClick={() => copyLink(website.uniqueUrl)}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-semibold"
                      title="Copy link"
                    >
                      {copiedUrl === website.uniqueUrl ? '✓' : <FaCopy />}
                    </button>
                    <button
                      onClick={() => deleteWebsite(website.id)}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-semibold"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
