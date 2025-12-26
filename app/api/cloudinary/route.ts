import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'
import { nanoid } from 'nanoid'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(req: NextRequest) {
  try {
    // Check if Cloudinary is configured
    if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
        !process.env.CLOUDINARY_API_KEY ||
        !process.env.CLOUDINARY_API_SECRET) {
      return NextResponse.json({
        error: 'Cloudinary not configured'
      }, { status: 500 })
    }

    const data = await req.formData()
    const file: File | null = data.get('file') as unknown as File
    const type: string = data.get('type') as string

    if (!file) {
      return NextResponse.json({ error: 'No file received' }, { status: 400 })
    }

    // Validate file size (limit to 50MB for videos, 10MB for others)
    const maxSize = type === 'video' ? 50 * 1024 * 1024 : 10 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File too large' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const folder = `surprise-website-uploads/${type}s`
    const publicId = `${nanoid(10)}`

    // Upload to Cloudinary using SDK with stream
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          public_id: publicId,
          resource_type: type === 'video' ? 'video' : type === 'audio' ? 'video' : 'image'
        },
        (error, result) => {
          if (error) {
            reject(error)
          } else {
            resolve(result)
          }
        }
      )
      uploadStream.end(buffer)
    }) as any

    return NextResponse.json({
      url: result.secure_url,
      public_id: result.public_id
    })
  } catch (error) {
    console.error('Cloudinary upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}