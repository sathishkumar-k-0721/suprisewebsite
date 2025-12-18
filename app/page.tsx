'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaHeart, FaVideo, FaImage, FaMusic, FaGift, FaArrowRight } from 'react-icons/fa'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-20 left-20 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, -90, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-40 right-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          />
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 180, 0],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -bottom-8 left-1/2 w-64 h-64 bg-red-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block"
            >
              <FaGift className="text-5xl md:text-6xl text-pink-500 mb-4 mx-auto" />
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 mb-6">
              Surprise Someone Special
            </h1>

            <p className="text-base md:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto mb-8">
              Create a beautiful, personalized website to surprise your friends and loved ones. 
              Add messages, videos, photos, and music to make it unforgettable!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/preview">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-base font-semibold shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 flex items-center gap-2"
                >
                  See Demo <FaArrowRight />
                </motion.button>
              </Link>

              <Link href="/auth/login?callbackUrl=/templates">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-white text-purple-600 rounded-full text-base font-semibold shadow-xl hover:shadow-purple-500/50 transition-all duration-300 border-2 border-purple-600"
                >
                  Create Your Website
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-purple-600 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-purple-600 rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What You Can Create
            </h2>
            <p className="text-base md:text-lg text-gray-600">
              Choose from our amazing page templates
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-gradient-to-br from-purple-100 to-purple-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <FaHeart className="text-4xl text-purple-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Personal Message
              </h3>
              <p className="text-sm text-gray-600">
                Start with a heartfelt message that will touch their heart
              </p>
              <div className="mt-4 text-purple-600 font-semibold text-lg">₹50</div>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-gradient-to-br from-pink-100 to-pink-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <FaVideo className="text-4xl text-pink-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Video Message
              </h3>
              <p className="text-sm text-gray-600">
                Share a special video message or memorable moment
              </p>
              <div className="mt-4 text-pink-600 font-semibold text-lg">₹100</div>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-gradient-to-br from-red-100 to-red-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <FaImage className="text-4xl text-red-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Photo with Text
              </h3>
              <p className="text-sm text-gray-600">
                Display a beautiful photo with your custom text
              </p>
              <div className="mt-4 text-red-600 font-semibold text-lg">₹70 (+₹20 for audio)</div>
            </motion.div>

            {/* Feature 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-gradient-to-br from-orange-100 to-orange-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <FaMusic className="text-4xl text-orange-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Photo Gallery
              </h3>
              <p className="text-sm text-gray-600">
                Create a stunning gallery with 5 images and optional music
              </p>
              <div className="mt-4 text-orange-600 font-semibold text-lg">₹50 (+₹20/₹40)</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-base md:text-lg text-gray-600">
              Create your surprise website in 4 easy steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: 1, title: 'Choose Pages', desc: 'Select which pages you want to include' },
              { step: 2, title: 'Make Payment', desc: 'Secure payment through Razorpay' },
              { step: 3, title: 'Add Content', desc: 'Upload your photos, videos, and messages' },
              { step: 4, title: 'Share Link', desc: 'Get a unique link to share with anyone' },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6 shadow-2xl"
                >
                  {item.step}
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Create Magic?
            </h2>
            <p className="text-base md:text-lg text-white/90 mb-8">
              Start building your personalized surprise website today!
            </p>
            <Link href="/auth/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-purple-600 rounded-full text-base md:text-lg font-bold shadow-2xl hover:shadow-white/50 transition-all duration-300"
              >
                Get Started Now
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2025 Surprise Website Builder. Made with ❤️ for special moments.
          </p>
        </div>
      </footer>
    </main>
  )
}
