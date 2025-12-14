'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import PageBuilder, { PageContent } from './page-builder'

export default function CreatePage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login')
    }
  }, [status, router])

  const handleComplete = async (pages: PageContent[]) => {
    setLoading(true)

    try {
      // TODO: Upload to Cloudinary and save to database
      console.log('Pages to upload:', pages)
      
      alert('✅ Content uploaded successfully! (Demo mode - Cloudinary integration pending)')
      
      // Redirect to dashboard
      router.push('/dashboard')
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

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    )
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
