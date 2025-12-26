'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import PageBuilder, { PageContent } from './page-builder'

export default function CreatePage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(false)

  // Check authentication
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login?callbackUrl=/create')
    }
  }, [status, router])

  // Show loading while checking authentication
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-red-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Don't render if not authenticated
  if (status === 'unauthenticated') {
    return null
  }

  const handleComplete = async (pages: PageContent[]) => {
    setLoading(true)

    try {
      // Upload files and get URLs
      const uploadFile = async (file: File, type: string): Promise<string> => {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('type', type)

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        })

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ error: 'Upload failed' }))
          throw new Error(`File upload failed: ${errorData.error || response.statusText}`)
        }

        const data = await response.json()
        return data.url
      }

      // Prepare content for each page with uploaded file URLs
      const pagesData = await Promise.all(pages.map(async (page, index) => {
        try {
          console.log(`Processing page ${index + 1}/${pages.length}: ${page.templateId}`)
          const imageUrl = page.image ? await uploadFile(page.image, 'image') : null
          const videoUrl = page.video ? await uploadFile(page.video, 'video') : null
          const audioUrl = page.audio ? await uploadFile(page.audio, 'audio') : null
          const galleryUrls = page.galleryImages?.length > 0
            ? await Promise.all(page.galleryImages.map(img => uploadFile(img, 'image')))
            : []

          return {
            templateId: page.templateId,
            content: {
              text: page.text || '',
              image: imageUrl,
              video: videoUrl,
              audio: audioUrl,
              gallery: galleryUrls,
              // Treasure hunt specific fields
              clue1: page.clue1 || null,
              clue2: page.clue2 || null,
              clue3: page.clue3 || null,
              password: page.password || null
            }
          }
        } catch (error) {
          console.error(`Error processing page ${index + 1} (${page.templateId}):`, error)
          throw new Error(`Failed to process page ${index + 1}: ${error instanceof Error ? error.message : 'Unknown error'}`)
        }
      }))

      // Save to database
      const response = await fetch('/api/website/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'My Surprise Website',
          theme: localStorage.getItem('selectedTheme') || 'normal',
          duration: localStorage.getItem('selectedDuration') || 'trial',
          fromDate: localStorage.getItem('customFromDate') || new Date().toISOString().split('T')[0],
          toDate: localStorage.getItem('customToDate') || null,
          pages: pagesData
        })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
        throw new Error(`Failed to create website: ${errorData.error || response.statusText}`)
      }

      const data = await response.json()
      
      // Clear localStorage
      localStorage.removeItem('selectedTemplates')
      
      // Redirect to success page with website ID
      router.push(`/success?id=${data.websiteId}&url=${data.uniqueUrl}`)
    } catch (error: unknown) {
      console.error('Upload Error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to upload content. Please try again.'
      alert(errorMessage)
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
