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
      // Prepare content for each page (for now, without Cloudinary uploads)
      const pagesData = pages.map(page => ({
        templateId: page.templateId,
        content: {
          text: page.text || '',
          // TODO: Upload files to Cloudinary and get URLs
          // For now, storing file names as placeholders
          imageName: page.image?.name || null,
          videoName: page.video?.name || null,
          galleryCount: page.galleryImages?.length || 0
        }
      }))

      // Save to database
      const response = await fetch('/api/website/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'My Surprise Website',
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
