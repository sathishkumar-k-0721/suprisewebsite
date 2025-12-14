'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaImage, FaVideo, FaCheck, FaArrowLeft } from 'react-icons/fa'

// Page templates for pricing
interface PageTemplate {
  id: number
  name: string
  description: string
  price: number
  features: string[]
  icon: any
  color: string
}

const PAGE_TEMPLATES: PageTemplate[] = [
  {
    id: 1,
    name: 'Text + Image Page',
    description: 'Create a page with a personal message and a special photo',
    price: 70,
    features: ['Personal message (up to 500 characters)', 'One image upload', 'Beautiful layout'],
    icon: FaImage,
    color: 'purple'
  },
  {
    id: 2,
    name: 'Text + Video Page',
    description: 'Create a page with a heartfelt message and a video',
    price: 100,
    features: ['Personal message (up to 500 characters)', 'One video upload', 'Stunning design'],
    icon: FaVideo,
    color: 'pink'
  }
]

export default function PricingPage() {
  const [selectedPages, setSelectedPages] = useState<number[]>([])

  const togglePage = (pageId: number) => {
    if (selectedPages.includes(pageId)) {
      setSelectedPages(selectedPages.filter(id => id !== pageId))
    } else {
      setSelectedPages([...selectedPages, pageId])
    }
  }

  const calculateTotal = () => {
    return selectedPages.reduce((total, pageId) => {
      const template = PAGE_TEMPLATES.find(t => t.id === pageId)
      return total + (template?.price || 0)
    }, 0)
  }

  const handleCheckout = () => {
    const total = calculateTotal()
    if (total === 0 || selectedPages.length === 0) {
      alert('Please select at least one page template!')
      return
    }
    // Store selection in sessionStorage
    sessionStorage.setItem('selectedPageIds', JSON.stringify(selectedPages))
    sessionStorage.setItem('totalAmount', total.toString())
    // Redirect to signup
    window.location.href = '/auth/signup'
  }

  const total = calculateTotal()

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50">
      {/* Header */}
      <nav className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="flex items-center text-purple-600 hover:text-purple-800 transition-colors">
            <FaArrowLeft className="mr-2" />
            <span className="font-semibold">Back to Home</span>
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 mb-4">
            Choose Your Page Templates
          </h1>
          <p className="text-base md:text-lg text-gray-600">
            Select the page templates you want to add to your surprise website
          </p>
        </motion.div>

        {/* Page Template Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {PAGE_TEMPLATES.map((template, index) => {
            const Icon = template.icon
            const isSelected = selectedPages.includes(template.id)
            const colorConfig: Record<string, {ring: string, bg: string, border: string, text: string}> = {
              purple: {
                ring: 'ring-purple-500',
                bg: 'bg-purple-600',
                border: 'border-purple-600',
                text: 'text-purple-600'
              },
              pink: {
                ring: 'ring-pink-500',
                bg: 'bg-pink-600',
                border: 'border-pink-600',
                text: 'text-pink-600'
              }
            }
            const colors = colorConfig[template.color] || colorConfig.purple

            return (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-white rounded-2xl shadow-xl p-8 cursor-pointer transition-all duration-300 ${
                  isSelected ? `ring-4 ${colors.ring}` : 'hover:shadow-2xl'
                }`}
                onClick={() => togglePage(template.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <Icon className={`text-4xl ${colors.text} mr-4`} />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{template.name}</h3>
                      <p className="text-sm text-gray-600">{template.description}</p>
                    </div>
                  </div>
                  <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    isSelected ? `${colors.bg} ${colors.border}` : 'border-gray-300'
                  }`}>
                    {isSelected && <FaCheck className="text-white text-lg" />}
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-2 mb-4">
                  {template.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <FaCheck className={`${colors.text} mr-2 text-xs`} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className={`text-3xl font-bold ${colors.text}`}>
                  ₹{template.price}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Total and Checkout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-2xl shadow-2xl p-8 sticky bottom-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-2">Total Amount</p>
              <p className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                {calculateTotal()}
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCheckout}
              disabled={selectedPages.length === 0}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-base md:text-lg font-bold shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {selectedPages.length === 0 ? 'Select Pages' : 'Continue to Signup '}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
