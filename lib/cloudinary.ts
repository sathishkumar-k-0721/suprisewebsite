import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export default cloudinary

// Helper function to upload buffer to Cloudinary
export const uploadToCloudinary = async (
  buffer: Buffer,
  options: {
    folder?: string
    public_id?: string
    resource_type?: 'image' | 'video' | 'raw' | 'auto'
  } = {}
) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: options.folder || 'surprise-website-uploads',
        public_id: options.public_id,
        resource_type: options.resource_type || 'auto',
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error)
          reject(new Error(`Cloudinary upload failed: ${error.message || 'Unknown error'}`))
        } else {
          resolve(result)
        }
      }
    )

    uploadStream.end(buffer)
  })
}