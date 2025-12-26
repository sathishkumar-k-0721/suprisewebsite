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
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  }

  try {
    // Check if Cloudinary is configured
    if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
        !process.env.CLOUDINARY_API_KEY ||
        !process.env.CLOUDINARY_API_SECRET) {
      return NextResponse.json({
        error: 'Cloudinary not configured'
      }, {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      })
    }

    const data = await req.formData()
    const file: File | null = data.get('file') as unknown as File
    const type: string = data.get('type') as string

    console.log('Upload request received:', { 
      fileName: file?.name, 
      fileSize: file?.size, 
      fileType: file?.type,
      uploadType: type 
    })

    if (!file) {
      return NextResponse.json({ error: 'No file received' }, {
        status: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      })
    }

    // Validate file size (limit to 50MB for videos, 10MB for others)
    const maxSize = type === 'video' ? 50 * 1024 * 1024 : 10 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File too large' }, {
        status: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      })
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
          resource_type: type === 'video' ? 'video' : type === 'audio' ? 'video' : 'image',
          timeout: 60000, // 60 second timeout for uploads
          chunk_size: 6000000 // 6MB chunks for large files
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error)
            reject(new Error(`Cloudinary upload failed: ${error.message || 'Unknown error'}`))
          } else if (!result || !result.secure_url) {
            console.error('Cloudinary upload result invalid:', result)
            reject(new Error('Cloudinary upload failed: Invalid response'))
          } else {
            resolve(result)
          }
        }
      )

      // Handle stream errors
      uploadStream.on('error', (error) => {
        console.error('Upload stream error:', error)
        reject(new Error(`Upload stream failed: ${error.message || 'Unknown error'}`))
      })

      uploadStream.end(buffer)
    }) as any

    console.log('Upload successful:', { 
      url: result.secure_url, 
      public_id: result.public_id,
      bytes: result.bytes 
    })

    return NextResponse.json({
      url: result.secure_url,
      public_id: result.public_id
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    })
  } catch (error) {
    console.error('Cloudinary upload error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Upload failed'
    return NextResponse.json({ 
      error: errorMessage,
      details: error instanceof Error ? error.stack : 'Unknown error'
    }, {
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    })
  }
}