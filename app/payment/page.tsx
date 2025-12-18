'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { FaShieldAlt, FaLock } from 'react-icons/fa'
import Script from 'next/script'

export default function PaymentPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [amount, setAmount] = useState(0)
  const [selection, setSelection] = useState<any>(null)

  useEffect(() => {
    // Get selection from localStorage (from templates page)
    const selectedTemplates = localStorage.getItem('selectedTemplates')
    
    if (!selectedTemplates) {
      // Fallback to old pricing flow
      const savedSelection = sessionStorage.getItem('pricingSelection')
      const savedAmount = sessionStorage.getItem('totalAmount')
      
      if (!savedSelection || !savedAmount) {
        router.push('/templates')
        return
      }

      setSelection(JSON.parse(savedSelection))
      setAmount(parseInt(savedAmount))
    } else {
      // New templates flow
      const templates = JSON.parse(selectedTemplates)
      
      // Calculate total amount
      const templatePrices: { [key: string]: number } = {
        'text-only': 50,
        'text-with-image': 70,
        'text-with-video': 100,
        'photo-gallery': 50
      }
      
      const totalAmount = Object.entries(templates).reduce((total, [templateId, count]) => {
        return total + (templatePrices[templateId] || 0) * (count as number)
      }, 0)
      
      setSelection(templates)
      setAmount(totalAmount)
    }
  }, [router])

  const handlePayment = async () => {
    setLoading(true)

    try {
      // Frontend-only Razorpay integration (Test Mode)
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Test Key: rzp_test_1DP5mmOlF5G5ag
        amount: amount * 100, // Convert to paise
        currency: 'INR',
        name: 'Surprise Website Builder',
        description: 'Website Creation Payment',
        handler: async function (response: any) {
          console.log('Payment Success:', response)
          
          // Save payment info (frontend only - for testing)
          const paymentInfo = {
            paymentId: response.razorpay_payment_id,
            amount: amount,
            selection: selection,
            timestamp: new Date().toISOString(),
          }
          
          // Store in sessionStorage for now
          sessionStorage.setItem('paymentInfo', JSON.stringify(paymentInfo))
          
          // Clear pricing selection
          sessionStorage.removeItem('pricingSelection')
          sessionStorage.removeItem('totalAmount')
          
          // Keep selectedTemplates in localStorage for content creation
          // (Do not remove it - page-builder needs it)
          
          // Show success message
          alert('✅ Payment Successful! Redirecting to content upload...')
          
          // Redirect to content upload
          router.push('/create')
        },
        prefill: {
          name: '',
          email: '',
          contact: '',
        },
        theme: {
          color: '#9333ea',
        },
        modal: {
          ondismiss: function() {
            setLoading(false)
            console.log('Payment cancelled by user')
          }
        },
      }

      // @ts-ignore
      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch (error: any) {
      console.error('Payment Error:', error)
      alert(error.message || 'Payment failed. Please try again.')
      setLoading(false)
    }
  }

  if (!selection) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      
      <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 text-center mb-8">
              Complete Your Purchase
            </h1>

            {/* Order Summary */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                {selection.page1 && (
                  <div className="flex justify-between items-center py-3 border-b">
                    <span className="text-gray-700">Personal Message Page</span>
                    <span className="font-semibold text-purple-600">₹50</span>
                  </div>
                )}
                
                {selection.page2 && (
                  <div className="flex justify-between items-center py-3 border-b">
                    <span className="text-gray-700">Video Message Page</span>
                    <span className="font-semibold text-pink-600">₹100</span>
                  </div>
                )}
                
                {selection.page3 && (
                  <>
                    <div className="flex justify-between items-center py-3 border-b">
                      <span className="text-gray-700">Photo with Text Page</span>
                      <span className="font-semibold text-red-600">₹70</span>
                    </div>
                    {selection.page3Audio && (
                      <div className="flex justify-between items-center py-3 border-b pl-6">
                        <span className="text-gray-600 text-sm">+ Background Audio</span>
                        <span className="font-semibold text-red-600">₹20</span>
                      </div>
                    )}
                  </>
                )}
                
                {selection.page4 && (
                  <>
                    <div className="flex justify-between items-center py-3 border-b">
                      <span className="text-gray-700">Photo Gallery Page</span>
                      <span className="font-semibold text-orange-600">₹50</span>
                    </div>
                    {selection.page4Audio && (
                      <div className="flex justify-between items-center py-3 border-b pl-6">
                        <span className="text-gray-600 text-sm">+ Background Audio</span>
                        <span className="font-semibold text-orange-600">₹20</span>
                      </div>
                    )}
                    {selection.page4Video && (
                      <div className="flex justify-between items-center py-3 border-b pl-6">
                        <span className="text-gray-600 text-sm">+ Background Video</span>
                        <span className="font-semibold text-orange-600">₹40</span>
                      </div>
                    )}
                  </>
                )}

                <div className="flex justify-between items-center py-4 pt-6">
                  <span className="text-xl font-bold text-gray-900">Total</span>
                  <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                    ₹{amount}
                  </span>
                </div>
              </div>
            </div>

            {/* Security Badge */}
            <div className="bg-green-50 rounded-xl p-6 mb-6 flex items-center gap-4">
              <FaShieldAlt className="text-4xl text-green-600" />
              <div>
                <h3 className="font-bold text-green-900 mb-1">Secure Payment</h3>
                <p className="text-sm text-green-700">
                  Your payment is secured by Razorpay with 256-bit encryption
                </p>
              </div>
            </div>

            {/* Payment Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePayment}
              disabled={loading}
              className="w-full py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl text-xl font-bold shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              <FaLock />
              {loading ? 'Processing...' : `Pay ₹${amount}`}
            </motion.button>

            <p className="text-center text-gray-500 text-sm mt-4">
              By proceeding, you agree to our Terms of Service and Privacy Policy
            </p>
          </motion.div>
        </div>
      </main>
    </>
  )
}
