'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { FaImage, FaVideo, FaMusic, FaFileAlt, FaCheck } from 'react-icons/fa'

interface PaymentInfo {
  paymentId: string
  amount: number
  selection: {
    page1: boolean
    page2: boolean
    page3: boolean
    page3Audio: boolean
    page4: boolean
    page4Audio: boolean
    page4Video: boolean
  }
  timestamp: string
}

export default function CreatePage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(false)
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null)
  
  // Form data
  const [page1Text, setPage1Text] = useState('')
  const [page2Video, setPage2Video] = useState<File | null>(null)
  const [page3Image, setPage3Image] = useState<File | null>(null)
  const [page3Text, setPage3Text] = useState('')
  const [page3Audio, setPage3Audio] = useState<File | null>(null)
  const [page4Images, setPage4Images] = useState<File[]>([])
  const [page4Text, setPage4Text] = useState('')
  const [page4Audio, setPage4Audio] = useState<File | null>(null)
  const [page4Video, setPage4Video] = useState<File | null>(null)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login')
      return
    }

    // Get payment info from sessionStorage
    const savedPayment = sessionStorage.getItem('paymentInfo')
    
    if (!savedPayment) {
      alert('No payment information found. Please complete payment first.')
      router.push('/pricing')
      return
    }

    setPaymentInfo(JSON.parse(savedPayment))
  }, [status, router])

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (file: File | null) => void
  ) => {
    const file = e.target.files?.[0]
    if (file) {
      setter(file)
    }
  }

  const handleMultipleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 5) {
      alert('Maximum 5 images allowed')
      return
    }
    setPage4Images(files)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Validate required fields based on selection
      if (paymentInfo?.selection.page1 && !page1Text.trim()) {
        alert('Please enter text for Personal Message page')
        setLoading(false)
        return
      }

      if (paymentInfo?.selection.page2 && !page2Video) {
        alert('Please upload video for Video Message page')
        setLoading(false)
        return
      }

      if (paymentInfo?.selection.page3 && (!page3Image || !page3Text.trim())) {
        alert('Please upload image and enter text for Photo with Text page')
        setLoading(false)
        return
      }

      if (paymentInfo?.selection.page4 && (page4Images.length === 0 || !page4Text.trim())) {
        alert('Please upload at least 1 image and enter text for Gallery page')
        setLoading(false)
        return
      }

      // For now, just show success and redirect to dashboard
      // TODO: Upload to Cloudinary and save to database
      alert('✅ Content uploaded successfully! (Demo mode - Cloudinary integration pending)')
      
      // Clear payment info
      sessionStorage.removeItem('paymentInfo')
      
      // Redirect to dashboard
      router.push('/dashboard')
    } catch (error: any) {
      console.error('Upload Error:', error)
      alert(error.message || 'Failed to upload content. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading' || !paymentInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 text-center mb-4">
            Upload Your Content
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Fill in the content for your selected pages
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Page 1: Personal Message */}
            {paymentInfo.selection.page1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <FaFileAlt className="text-3xl text-purple-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Page 1: Personal Message</h2>
                </div>
                <textarea
                  value={page1Text}
                  onChange={(e) => setPage1Text(e.target.value)}
                  placeholder="Write your heartfelt message here..."
                  className="w-full h-40 p-4 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none text-gray-900 bg-white resize-none"
                  required={paymentInfo.selection.page1}
                />
                <p className="text-sm text-gray-500 mt-2">Maximum 500 characters recommended</p>
              </motion.div>
            )}

            {/* Page 2: Video Message */}
            {paymentInfo.selection.page2 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <FaVideo className="text-3xl text-pink-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Page 2: Video Message</h2>
                </div>
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => handleFileChange(e, setPage2Video)}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-pink-500 focus:outline-none text-gray-900 bg-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100"
                  required={paymentInfo.selection.page2}
                />
                {page2Video && (
                  <p className="text-sm text-green-600 mt-2 flex items-center gap-2">
                    <FaCheck /> Selected: {page2Video.name}
                  </p>
                )}
                <p className="text-sm text-gray-500 mt-2">Supported formats: MP4, MOV, AVI (Max 100MB)</p>
              </motion.div>
            )}

            {/* Page 3: Photo with Text */}
            {paymentInfo.selection.page3 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <FaImage className="text-3xl text-red-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Page 3: Photo with Text</h2>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Upload Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, setPage3Image)}
                      className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none text-gray-900 bg-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                      required={paymentInfo.selection.page3}
                    />
                    {page3Image && (
                      <p className="text-sm text-green-600 mt-2 flex items-center gap-2">
                        <FaCheck /> Selected: {page3Image.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message Text</label>
                    <textarea
                      value={page3Text}
                      onChange={(e) => setPage3Text(e.target.value)}
                      placeholder="Write your message..."
                      className="w-full h-32 p-4 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none text-gray-900 bg-white resize-none"
                      required={paymentInfo.selection.page3}
                    />
                  </div>

                  {paymentInfo.selection.page3Audio && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <FaMusic className="inline mr-2" />
                        Background Audio (Optional)
                      </label>
                      <input
                        type="file"
                        accept="audio/*"
                        onChange={(e) => handleFileChange(e, setPage3Audio)}
                        className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none text-gray-900 bg-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                      />
                      {page3Audio && (
                        <p className="text-sm text-green-600 mt-2 flex items-center gap-2">
                          <FaCheck /> Selected: {page3Audio.name}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Page 4: Image Gallery */}
            {paymentInfo.selection.page4 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <FaImage className="text-3xl text-orange-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Page 4: Image Gallery</h2>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Images (1-5 images)
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleMultipleImages}
                      className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none text-gray-900 bg-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                      required={paymentInfo.selection.page4}
                    />
                    {page4Images.length > 0 && (
                      <p className="text-sm text-green-600 mt-2 flex items-center gap-2">
                        <FaCheck /> Selected: {page4Images.length} image(s)
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gallery Description</label>
                    <textarea
                      value={page4Text}
                      onChange={(e) => setPage4Text(e.target.value)}
                      placeholder="Describe your gallery..."
                      className="w-full h-32 p-4 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none text-gray-900 bg-white resize-none"
                      required={paymentInfo.selection.page4}
                    />
                  </div>

                  {paymentInfo.selection.page4Audio && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <FaMusic className="inline mr-2" />
                        Background Audio (Optional)
                      </label>
                      <input
                        type="file"
                        accept="audio/*"
                        onChange={(e) => handleFileChange(e, setPage4Audio)}
                        className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none text-gray-900 bg-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                      />
                      {page4Audio && (
                        <p className="text-sm text-green-600 mt-2 flex items-center gap-2">
                          <FaCheck /> Selected: {page4Audio.name}
                        </p>
                      )}
                    </div>
                  )}

                  {paymentInfo.selection.page4Video && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <FaVideo className="inline mr-2" />
                        Background Video (Optional)
                      </label>
                      <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => handleFileChange(e, setPage4Video)}
                        className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none text-gray-900 bg-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                      />
                      {page4Video && (
                        <p className="text-sm text-green-600 mt-2 flex items-center gap-2">
                          <FaCheck /> Selected: {page4Video.name}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex justify-center"
            >
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                    Uploading...
                  </span>
                ) : (
                  'Create My Website'
                )}
              </button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </main>
  )
}
