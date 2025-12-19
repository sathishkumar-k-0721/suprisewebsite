'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import PageBuilder, { PageContent } from './page-builder'

export default function CreatePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  // Removed authentication requirement for now
  // Users can proceed directly to add content without logging in

  const handleComplete = async (pages: PageContent[]) => {
    setLoading(true)

    try {
      // Convert files to base64 for storage
      const convertToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = () => resolve(reader.result as string)
          reader.onerror = error => reject(error)
        })
      }

      // Prepare content for each page with base64 encoded media
      const pagesData = await Promise.all(pages.map(async page => {
        const imageData = page.image ? await convertToBase64(page.image) : null
        const videoData = page.video ? await convertToBase64(page.video) : null
        const audioData = page.audio ? await convertToBase64(page.audio) : null
        const galleryData = page.galleryImages?.length > 0 
          ? await Promise.all(page.galleryImages.map(img => convertToBase64(img)))
          : []

        return {
          templateId: page.templateId,
          content: {
            text: page.text || '',
            image: imageData,
            video: videoData,
            audio: audioData,
            gallery: galleryData,
            // Treasure hunt specific fields
            clue1: page.clue1 || null,
            clue2: page.clue2 || null,
            clue3: page.clue3 || null,
            password: page.password || null
          }
        }
      }))

      // Save to database
      const response = await fetch('/api/website/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'My Surprise Website',
          theme: localStorage.getItem('selectedTheme') || 'normal',
          pages: pagesData
        })
      })

      if (!response.ok) {
        throw new Error('Failed to create website')
      }

      const data = await response.json()
      
      // Clear localStorage
      localStorage.removeItem('selectedTemplates')
      
      // Redirect to success page with website ID
      router.push(`/success?id=${data.websiteId}&url=${data.uniqueUrl}`)
    } catch (error: any) {
      console.error('Upload Error:', error)
      alert(error.message || 'Failed to upload content. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-red-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-600 mb-4"></div>
        <p className="text-lg text-gray-700">Uploading your content...</p>
      </div>
    )
  }

  return <PageBuilder onComplete={handleComplete} onCancel={handleCancel} />
}
