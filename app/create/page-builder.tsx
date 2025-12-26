'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaImage, FaVideo, FaFileAlt, FaCheck, FaArrowLeft, FaArrowRight, FaLock } from 'react-icons/fa'

// Template mapping from templates page
const TEMPLATE_CONFIG: Record<string, {
  name: string
  description: string
  contentTypes: ('text' | 'image' | 'video' | 'gallery' | 'clues' | 'password' | 'audio')[]
}> = {
  'text-only': {
    name: 'Text Only',
    description: 'Your heartfelt message',
    contentTypes: ['text']
  },
  'text-with-image': {
    name: 'Text with Image',
    description: 'Message with a photo',
    contentTypes: ['text', 'image']
  },
  'text-with-video': {
    name: 'Text with Video',
    description: 'Message with a video',
    contentTypes: ['text', 'video']
  },
  'text-with-audio': {
    name: 'Text with Audio',
    description: 'Message with audio',
    contentTypes: ['text', 'audio']
  },
  'photo-gallery': {
    name: 'Photo Gallery',
    description: 'Multiple photos slideshow',
    contentTypes: ['text', 'gallery']
  },
  'treasure-hunt': {
    name: 'Treasure Hunt+Audio',
    description: 'Interactive hunt with clues and password',
    contentTypes: ['clues', 'password', 'text', 'audio']
  },
  'treasure-hunt-image': {
    name: 'Treasure Hunt+Image',
    description: 'Hunt with clues revealing image',
    contentTypes: ['clues', 'password', 'text', 'image']
  },
  'treasure-hunt-video': {
    name: 'Treasure Hunt+Video',
    description: 'Hunt with clues revealing video',
    contentTypes: ['clues', 'password', 'text', 'video']
  }
}

export interface PageContent {
  templateId: string
  templateName: string
  text: string
  image: File | null
  video: File | null
  galleryImages: File[]
  clue1?: string
  clue2?: string
  clue3?: string
  password?: string
  audio?: File | null
}

interface PageBuilderProps {
  onComplete: (pages: PageContent[]) => void
  onCancel: () => void
}

export default function PageBuilder({ onComplete, onCancel }: PageBuilderProps) {
  const [pages, setPages] = useState<PageContent[]>([])
  const [currentPageIndex, setCurrentPageIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [currentImage, setCurrentImage] = useState<File | null>(null)
  const [currentVideo, setCurrentVideo] = useState<File | null>(null)
  const [currentGalleryImages, setCurrentGalleryImages] = useState<File[]>([])
  const [currentClue1, setCurrentClue1] = useState('')
  const [currentClue2, setCurrentClue2] = useState('')
  const [currentClue3, setCurrentClue3] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [currentAudio, setCurrentAudio] = useState<File | null>(null)

  // Load selected templates from payment
  useEffect(() => {
    const selectedTemplates = localStorage.getItem('selectedTemplates')
    if (selectedTemplates) {
      const templates = JSON.parse(selectedTemplates)
      const pagesArray: PageContent[] = []
      
      // Create pages based on selected templates
      Object.entries(templates).forEach(([templateId, quantity]) => {
        for (let i = 0; i < (quantity as number); i++) {
          pagesArray.push({
            templateId,
            templateName: TEMPLATE_CONFIG[templateId]?.name || templateId,
            text: '',
            image: null,
            video: null,
            galleryImages: [],
            clue1: '',
            clue2: '',
            clue3: '',
            password: '',
            audio: null
          })
        }
      })
      
      setPages(pagesArray)
    }
  }, [])

  const currentPage = pages[currentPageIndex]
  const currentTemplate = currentPage ? TEMPLATE_CONFIG[currentPage.templateId] : null

  // Save current page and move to next
  const saveAndNext = () => {
    if (!currentTemplate) return

    // Validation
    if (currentTemplate.contentTypes.includes('text') && !currentText.trim()) {
      alert('Please enter some text!')
      return
    }
    
    if (currentTemplate.contentTypes.includes('image') && !currentImage) {
      alert('Please upload an image!')
      return
    }
    
    if (currentTemplate.contentTypes.includes('video') && !currentVideo) {
      alert('Please upload a video!')
      return
    }

    if (currentTemplate.contentTypes.includes('gallery') && currentGalleryImages.length === 0) {
      alert('Please upload at least one image for the gallery!')
      return
    }

    if (currentTemplate.contentTypes.includes('clues') && (!currentClue1.trim() || !currentClue2.trim() || !currentClue3.trim())) {
      alert('Please enter all 3 clues for the treasure hunt!')
      return
    }

    if (currentTemplate.contentTypes.includes('password') && !currentPassword.trim()) {
      alert('Please set a password for the treasure hunt!')
      return
    }

    if (currentTemplate.contentTypes.includes('audio') && !currentAudio) {
      alert('Please upload an audio file for the treasure hunt!')
      return
    }

    // Save current page content
    const updatedPages = [...pages]
    updatedPages[currentPageIndex] = {
      ...currentPage,
      text: currentText,
      image: currentImage,
      video: currentVideo,
      galleryImages: currentGalleryImages,
      clue1: currentClue1,
      clue2: currentClue2,
      clue3: currentClue3,
      password: currentPassword,
      audio: currentAudio
    }
    setPages(updatedPages)

    // Move to next page or complete
    if (currentPageIndex < pages.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1)
      // Load next page content
      const nextPage = updatedPages[currentPageIndex + 1]
      setCurrentText(nextPage.text)
      setCurrentImage(nextPage.image)
      setCurrentVideo(nextPage.video)
      setCurrentGalleryImages(nextPage.galleryImages)
      setCurrentClue1(nextPage.clue1 || '')
      setCurrentClue2(nextPage.clue2 || '')
      setCurrentClue3(nextPage.clue3 || '')
      setCurrentPassword(nextPage.password || '')
      setCurrentAudio(nextPage.audio || null)
    } else {
      // All pages completed
      onComplete(updatedPages)
    }
  }

  // Go to previous page
  const goToPrevious = () => {
    if (currentPageIndex > 0) {
      // Save current state
      const updatedPages = [...pages]
      updatedPages[currentPageIndex] = {
        ...currentPage,
        text: currentText,
        image: currentImage,
        video: currentVideo,
        galleryImages: currentGalleryImages,
        clue1: currentClue1,
        clue2: currentClue2,
        clue3: currentClue3,
        password: currentPassword,
        audio: currentAudio
      }
      setPages(updatedPages)
      
      setCurrentPageIndex(currentPageIndex - 1)
      // Load previous page
      const prevPage = updatedPages[currentPageIndex - 1]
      setCurrentText(prevPage.text)
      setCurrentImage(prevPage.image)
      setCurrentVideo(prevPage.video)
      setCurrentGalleryImages(prevPage.galleryImages)
      setCurrentClue1(prevPage.clue1 || '')
      setCurrentClue2(prevPage.clue2 || '')
      setCurrentClue3(prevPage.clue3 || '')
      setCurrentPassword(prevPage.password || '')
      setCurrentAudio(prevPage.audio || null)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video' | 'gallery' | 'audio') => {
    const files = e.target.files
    if (files) {
      if (type === 'image') {
        setCurrentImage(files[0])
      } else if (type === 'video') {
        setCurrentVideo(files[0])
      } else if (type === 'gallery') {
        setCurrentGalleryImages(Array.from(files).slice(0, 5)) // Max 5 images
      } else if (type === 'audio') {
        setCurrentAudio(files[0])
      }
    }
  }

  if (!currentPage || !currentTemplate) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-red-50">
        <div className="text-center">
          <div className="text-6xl mb-4">📝</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Templates Selected</h2>
          <p className="text-gray-600 mb-6">Please select templates first</p>
          <button
            onClick={onCancel}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  // Content creation interface
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Page {currentPageIndex + 1} of {pages.length}
              </h2>
              <div className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                {currentTemplate.name}
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentPageIndex + 1) / pages.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Page Content Form */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPageIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentTemplate.name}</h2>
                <p className="text-gray-600">{currentTemplate.description}</p>
              </div>

              <div className="space-y-6">
                {/* Text Input */}
                {currentTemplate.contentTypes.includes('text') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaFileAlt className="inline mr-2" />
                      Your Message
                    </label>
                    <textarea
                      value={currentText}
                      onChange={(e) => setCurrentText(e.target.value)}
                      placeholder="Write your heartfelt message here..."
                      className="w-full h-40 p-4 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none text-gray-900 bg-white resize-none"
                      maxLength={1000}
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      {currentText.length}/1000 characters
                    </p>
                  </div>
                )}

                {/* Image Upload */}
                {currentTemplate.contentTypes.includes('image') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaImage className="inline mr-2" />
                      Upload Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, 'image')}
                      className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none text-gray-900 bg-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                    />
                    {currentImage && (
                      <div className="mt-4">
                        <p className="text-sm text-green-600 mb-2 flex items-center gap-2">
                          <FaCheck /> Selected: {currentImage.name}
                        </p>
                        <img
                          src={URL.createObjectURL(currentImage)}
                          alt="Preview"
                          className="w-full max-w-md rounded-lg shadow-lg"
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Video Upload */}
                {currentTemplate.contentTypes.includes('video') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaVideo className="inline mr-2" />
                      Upload Video
                    </label>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => handleFileChange(e, 'video')}
                      className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none text-gray-900 bg-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                    />
                    {currentVideo && (
                      <div className="mt-4">
                        <p className="text-sm text-green-600 mb-2 flex items-center gap-2">
                          <FaCheck /> Selected: {currentVideo.name}
                        </p>
                        <video
                          src={URL.createObjectURL(currentVideo)}
                          controls
                          className="w-full max-w-2xl rounded-lg shadow-lg"
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Gallery Upload */}
                {currentTemplate.contentTypes.includes('gallery') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaImage className="inline mr-2" />
                      Upload Images (up to 5)
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => handleFileChange(e, 'gallery')}
                      className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none text-gray-900 bg-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                    />
                    {currentGalleryImages.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm text-green-600 mb-2 flex items-center gap-2">
                          <FaCheck /> Selected: {currentGalleryImages.length} image(s)
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {currentGalleryImages.map((img, idx) => (
                            <img
                              key={idx}
                              src={URL.createObjectURL(img)}
                              alt={`Gallery ${idx + 1}`}
                              className="w-full h-32 object-cover rounded-lg shadow-md"
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Treasure Hunt - Clues */}
                {currentTemplate.contentTypes.includes('clues') && (
                  <div className="space-y-4">
                    <div className="bg-indigo-50 p-4 rounded-lg border-2 border-indigo-200">
                      <FaLock className="inline mr-2 text-indigo-600" />
                      <span className="font-semibold text-indigo-900">Enter 3 Clues</span>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Clue 1
                      </label>
                      <input
                        type="text"
                        value={currentClue1}
                        onChange={(e) => setCurrentClue1(e.target.value)}
                        placeholder="Enter the first clue..."
                        className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none text-gray-900 bg-white"
                        maxLength={200}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Clue 2
                      </label>
                      <input
                        type="text"
                        value={currentClue2}
                        onChange={(e) => setCurrentClue2(e.target.value)}
                        placeholder="Enter the second clue..."
                        className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none text-gray-900 bg-white"
                        maxLength={200}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Clue 3
                      </label>
                      <input
                        type="text"
                        value={currentClue3}
                        onChange={(e) => setCurrentClue3(e.target.value)}
                        placeholder="Enter the third clue..."
                        className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none text-gray-900 bg-white"
                        maxLength={200}
                      />
                    </div>
                  </div>
                )}

                {/* Password */}
                {currentTemplate.contentTypes.includes('password') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaLock className="inline mr-2" />
                      Set Unlock Password
                    </label>
                    <input
                      type="text"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter the password to unlock the content..."
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none text-gray-900 bg-white"
                      maxLength={50}
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      User must enter this password to reveal the content
                    </p>
                  </div>
                )}

                {/* Hidden Text (revealed after password) */}
                {currentTemplate.contentTypes.includes('text') && currentTemplate.contentTypes.includes('password') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaFileAlt className="inline mr-2" />
                      Hidden Message (shown after unlock)
                    </label>
                    <textarea
                      value={currentText}
                      onChange={(e) => setCurrentText(e.target.value)}
                      placeholder="Write the hidden message that will be revealed after password unlock..."
                      className="w-full h-32 p-4 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none text-gray-900 bg-white resize-none"
                      maxLength={1000}
                    />
                  </div>
                )}

                {/* Audio Upload */}
                {currentTemplate.contentTypes.includes('audio') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaVideo className="inline mr-2" />
                      Upload Hidden Audio File
                    </label>
                    <input
                      type="file"
                      accept="audio/*"
                      onChange={(e) => handleFileChange(e, 'audio')}
                      className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none text-gray-900 bg-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                    />
                    {currentAudio && (
                      <div className="mt-4">
                        <p className="text-sm text-green-600 mb-2 flex items-center gap-2">
                          <FaCheck /> Selected: {currentAudio.name}
                        </p>
                        <audio
                          src={URL.createObjectURL(currentAudio)}
                          controls
                          className="w-full"
                        />
                      </div>
                    )}
                    <p className="text-sm text-gray-500 mt-2">
                      This audio will be hidden and only playable after password unlock
                    </p>
                  </div>
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={goToPrevious}
                  disabled={currentPageIndex === 0}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-full hover:border-gray-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <FaArrowLeft /> Previous
                </button>
                <button
                  onClick={saveAndNext}
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
                >
                  {currentPageIndex === pages.length - 1 ? (
                    <>Complete <FaCheck /></>
                  ) : (
                    <>Next <FaArrowRight /></>
                  )}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}
