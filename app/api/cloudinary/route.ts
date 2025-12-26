import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'
import { nanoid } from 'nanoid'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Test Cloudinary connection
export async function GET() {
  try {
    console.log('Testing Cloudinary connection...')
    console.log('Environment check:', {
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ? 'set' : 'missing',
      apiKey: process.env.CLOUDINARY_API_KEY ? 'set' : 'missing',
      apiSecret: process.env.CLOUDINARY_API_SECRET ? 'set' : 'missing',
      nodeEnv: process.env.NODE_ENV
    })

    // Check if Cloudinary is configured
    if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
        !process.env.CLOUDINARY_API_KEY ||
        !process.env.CLOUDINARY_API_SECRET) {
      return NextResponse.json({
        status: 'error',
        message: 'Cloudinary environment variables not configured',
        environment: {
          cloudName: !!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
          apiKey: !!process.env.CLOUDINARY_API_KEY,
          apiSecret: !!process.env.CLOUDINARY_API_SECRET
        }
      }, {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      })
    }

    // Test Cloudinary connection by getting account info
    try {
      const accountInfo = await cloudinary.api.ping()
      console.log('Cloudinary ping successful:', accountInfo)

      // Try to get usage stats
      let usageInfo = null
      try {
        usageInfo = await cloudinary.api.usage()
        console.log('Cloudinary usage info:', usageInfo)
      } catch (usageError) {
        console.log('Could not get usage info:', usageError instanceof Error ? usageError.message : 'Unknown error')
      }

      return NextResponse.json({
        status: 'success',
        message: 'Cloudinary connection successful',
        account: accountInfo,
        usage: usageInfo,
        supports: {
          video: usageInfo ? !usageInfo.plan?.restrictions?.video : true,
          plan: usageInfo?.plan || 'unknown'
        }
      }, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      })
    } catch (connectionError) {
      console.error('Cloudinary connection test failed:', connectionError)
      return NextResponse.json({
        status: 'error',
        message: 'Cloudinary connection failed',
        error: connectionError instanceof Error ? connectionError.message : 'Unknown error',
        errorType: connectionError instanceof Error ? connectionError.constructor.name : typeof connectionError
      }, {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      })
    }
  } catch (error) {
    console.error('Cloudinary test failed:', error)
    return NextResponse.json({
      status: 'error',
      message: 'Cloudinary connection failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      errorType: error instanceof Error ? error.constructor.name : typeof error
    }, {
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    })
  }
}

export async function POST(req: NextRequest) {
  console.log('Cloudinary POST request received:', {
    method: req.method,
    url: req.url,
    headers: Object.fromEntries(req.headers.entries())
  })

  let responseSent = false

  try {
    console.log('Checking Cloudinary configuration...')
    // Check if Cloudinary is configured
    if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
        !process.env.CLOUDINARY_API_KEY ||
        !process.env.CLOUDINARY_API_SECRET) {
      console.error('Cloudinary environment variables missing:', {
        cloudName: !!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        apiKey: !!process.env.CLOUDINARY_API_KEY,
        apiSecret: !!process.env.CLOUDINARY_API_SECRET,
        env: process.env.NODE_ENV
      })
      return NextResponse.json({
        error: 'Cloudinary not configured',
        details: 'Environment variables missing'
      }, {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      })
    }

    console.log('Cloudinary config found, processing form data...')

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
    console.log(`Starting ${type} upload to Cloudinary...`, {
      folder,
      publicId,
      resourceType: type === 'video' ? 'video' : type === 'audio' ? 'video' : 'image',
      fileSize: file.size,
      maxSize
    })

    // Create a timeout promise
    const timeoutPromise = new Promise((_, reject) => {
      const timeoutMs = type === 'video' ? 280000 : 100000 // Slightly less than Vercel limit
      setTimeout(() => {
        reject(new Error(`Upload timeout: ${type} upload took longer than ${timeoutMs/1000} seconds`))
      }, timeoutMs)
    })

    // Race between upload and timeout
    const result = await Promise.race([
      new Promise((resolve, reject) => {
        const uploadOptions: any = {
          folder,
          public_id: publicId,
          resource_type: type === 'video' ? 'video' : type === 'audio' ? 'video' : 'image',
          timeout: type === 'video' ? 240000 : 90000, // 4 minutes for videos, 1.5 for others
          chunk_size: 6000000, // 6MB chunks for large files
          allowed_formats: type === 'video' ? ['mp4', 'mov', 'avi', 'webm', 'm4v'] : 
                          type === 'audio' ? ['mp3', 'wav', 'ogg', 'm4a'] : 
                          ['jpg', 'jpeg', 'png', 'gif', 'webp']
        }

        console.log('Upload options:', uploadOptions)

        const uploadStream = cloudinary.uploader.upload_stream(
          uploadOptions,
          (error, result) => {
            if (error) {
              console.error('Cloudinary upload error:', {
                message: error.message,
                http_code: error.http_code,
                name: error.name,
                type: type,
                fileSize: file.size
              })

              // Special handling for video uploads that might be blocked by free tier
              if (type === 'video' && error.http_code === 403) {
                reject(new Error(`Video upload blocked: Your Cloudinary account may not support video uploads. Please upgrade to a paid plan or contact Cloudinary support. (HTTP 403)`))
              } else {
                reject(new Error(`Cloudinary upload failed: ${error.message} (HTTP ${error.http_code || 'unknown'})`))
              }
            } else if (!result || !result.secure_url) {
              console.error('Cloudinary upload result invalid:', result)
              reject(new Error('Cloudinary upload failed: Invalid response'))
            } else {
              console.log('Cloudinary upload successful:', {
                type: type,
                url: result.secure_url,
                public_id: result.public_id,
                bytes: result.bytes,
                format: result.format
              })
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
      }),
      timeoutPromise
    ]) as any

    console.log('Upload successful:', { 
      url: result.secure_url, 
      public_id: result.public_id,
      bytes: result.bytes 
    })

    if (responseSent) {
      console.error('Response already sent, cannot send success response')
      return
    }

    responseSent = true
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
    console.error('Cloudinary upload error caught:', {
      error: error,
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      type: typeof error
    })

    if (responseSent) {
      console.error('Response already sent, cannot send error response')
      return
    }

    responseSent = true
    const errorMessage = error instanceof Error ? error.message : 'Upload failed'
    return NextResponse.json({ 
      error: errorMessage,
      details: error instanceof Error ? error.stack : 'Unknown error',
      timestamp: new Date().toISOString()
    }, {
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    })
  }
}