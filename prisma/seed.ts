import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Seed Templates
  const templates = [
    {
      templateId: 'text-only',
      name: 'Text Only',
      description: 'A simple page with beautiful typography for your heartfelt message',
      price: 50,
      features: [
        'Custom text message',
        'Beautiful fonts',
        'Color themes',
        'Responsive design'
      ],
      isActive: true
    },
    {
      templateId: 'text-with-image',
      name: 'Text with Image',
      description: 'Combine your message with a stunning photo',
      price: 70,
      features: [
        'Single image upload',
        'Custom text overlay',
        'Image filters',
        'Optional background music (+₹20)'
      ],
      isActive: true
    },
    {
      templateId: 'text-with-video',
      name: 'Text with Video',
      description: 'Share a video message that speaks from the heart',
      price: 100,
      features: [
        'Video upload (up to 2 min)',
        'Custom introduction text',
        'Video player controls',
        'Autoplay option'
      ],
      isActive: true
    },
    {
      templateId: 'photo-gallery',
      name: 'Photo Gallery',
      description: 'Create a beautiful slideshow with multiple photos',
      price: 50,
      features: [
        'Up to 5 photos',
        'Slideshow animation',
        'Custom captions',
        'Background music (+₹20)'
      ],
      isActive: true
    }
  ]

  for (const template of templates) {
    await prisma.template.upsert({
      where: { templateId: template.templateId },
      update: template,
      create: template
    })
    console.log(`✓ Seeded template: ${template.name}`)
  }

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
