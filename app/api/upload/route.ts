import { NextRequest, NextResponse } from 'next/server'
import { uploadToCloudinary } from '@/lib/cloudinary'
import { nanoid } from 'nanoid'

export async function POST(req: NextRequest) {
  try {
    // Check if Cloudinary is configured
    if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
        !process.env.CLOUDINARY_API_KEY ||
        !process.env.CLOUDINARY_API_SECRET ||
        process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME === 'your_cloud_name' ||
        process.env.CLOUDINARY_API_KEY === 'your_api_key' ||
        process.env.CLOUDINARY_API_SECRET === 'your_api_secret') {
      return NextResponse.json({
        error: 'File upload service not configured. Please set up Cloudinary credentials in environment variables.'
      }, { status: 500 })
    }

    const data = await req.formData()
    const file: File | null = data.get('file') as unknown as File
    const type: string = data.get('type') as string

    if (!file) {
      return NextResponse.json({ error: 'No file received' }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = {
      image: [
        'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp',
        'image/bmp', 'image/tiff', 'image/svg+xml', 'image/heic', 'image/heif'
      ],
      video: [
        'video/mp4', 'video/webm', 'video/ogg', 'video/avi', 'video/mov',
        'video/quicktime', 'video/x-msvideo', 'video/mpeg', 'video/x-matroska',
        'video/x-ms-wmv', 'video/3gpp', 'video/mp2t'
      ],
      audio: [
        'audio/mp3', 'audio/wav', 'audio/ogg', 'audio/m4a', 'audio/aac',
        'audio/mpeg', 'audio/webm', 'audio/flac', 'audio/x-wav', 'audio/x-m4a',
        'audio/mp4', 'audio/amr', 'audio/3gpp'
      ]
    }

    // Check MIME type first
    const isValidMimeType = allowedTypes[type as keyof typeof allowedTypes]?.includes(file.type)

    // Fallback: check file extension if MIME type check fails
    let isValidExtension = false
    if (!isValidMimeType) {
      const extension = file.name.split('.').pop()?.toLowerCase()
      const allowedExtensions = {
        image: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'tiff', 'svg', 'heic', 'heif'],
        video: ['mp4', 'webm', 'ogg', 'avi', 'mov', 'mkv', 'm4v', 'wmv', '3gp', 'ts'],
        audio: ['mp3', 'wav', 'ogg', 'm4a', 'aac', 'flac', 'wma', 'amr', '3gp']
      }
      isValidExtension = allowedExtensions[type as keyof typeof allowedExtensions]?.includes(extension || '')
    }

    if (!isValidMimeType && !isValidExtension) {
      console.error(`Invalid file type for ${type}:`, {
        filename: file.name,
        mimeType: file.type,
        extension: file.name.split('.').pop()?.toLowerCase(),
        allowedMimeTypes: allowedTypes[type as keyof typeof allowedTypes],
        allowedExtensions: {
          image: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'tiff', 'svg', 'heic', 'heif'],
          video: ['mp4', 'webm', 'ogg', 'avi', 'mov', 'mkv', 'm4v', 'wmv', '3gp', 'ts'],
          audio: ['mp3', 'wav', 'ogg', 'm4a', 'aac', 'flac', 'wma', 'amr', '3gp']
        }[type]
      })
      return NextResponse.json({
        error: `Invalid file type. File: ${file.name}, Type: ${file.type}. Check console for allowed types.`
      }, { status: 400 })
    }

    // Check file size (limit to 50MB for videos, 10MB for others)
    const maxSize = type === 'video' ? 50 * 1024 * 1024 : 10 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File too large' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Determine resource type for Cloudinary
    const resourceType = type === 'video' ? 'video' : type === 'audio' ? 'video' : 'image'

    // Generate unique filename
    const extension = file.name.split('.').pop()
    const filename = `${nanoid(10)}.${extension}`

    // Upload to Cloudinary
    const result = await uploadToCloudinary(buffer, {
      folder: `surprise-website-uploads/${type}s`,
      public_id: filename,
      resource_type: resourceType as 'image' | 'video' | 'auto'
    }) as any

    // Return the Cloudinary URL
    return NextResponse.json({
      url: result.secure_url,
      public_id: result.public_id,
      width: result.width,
      height: result.height
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}