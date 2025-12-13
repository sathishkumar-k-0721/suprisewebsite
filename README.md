# Surprise Website Builder 🎁

A modern SaaS platform for creating personalized surprise websites for loved ones. Users can select from customizable page templates, make secure payments, and share unique URLs.

## Features ✨

- **4 Page Templates:**
  - Personal message page
  - Video message page
  - Photo with text (+ optional audio)
  - Photo gallery (5 images + optional audio/video)

- **Pay-per-page Model:**
  - Flexible pricing based on selected pages
  - Secure Razorpay payment integration

- **Content Management:**
  - Easy-to-use dashboard for uploading content
  - Edit and update websites anytime
  - Generate unique shareable URLs

- **Modern Design:**
  - Responsive design with Tailwind CSS
  - Smooth animations with Framer Motion
  - Beautiful gradient backgrounds

## Tech Stack 🛠️

- **Frontend:** Next.js 14 (App Router), React, TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Backend:** Next.js API Routes
- **Database:** MongoDB with Prisma ORM
- **Authentication:** NextAuth.js
- **Payment:** Razorpay
- **File Storage:** Cloudinary
- **Deployment:** Vercel

## Prerequisites 📋

- Node.js 18+ installed
- MongoDB database (MongoDB Atlas recommended)
- Razorpay account
- Cloudinary account

## Installation 🚀

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd birthdaywebsite
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory and add the following:

```env
# Database
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/surprise-website?retryWrites=true&w=majority"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-generate-with-openssl-rand-base64-32"

# Razorpay
NEXT_PUBLIC_RAZORPAY_KEY_ID="your_razorpay_key_id"
RAZORPAY_KEY_SECRET="your_razorpay_key_secret"

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

# App Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Set up MongoDB

1. Create a free account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string and add it to `.env`

### 5. Set up Razorpay

1. Create an account on [Razorpay](https://razorpay.com/)
2. Go to Settings > API Keys
3. Generate Test/Live keys
4. Add to `.env`

### 6. Set up Cloudinary

1. Create an account on [Cloudinary](https://cloudinary.com/)
2. Go to Dashboard
3. Copy Cloud Name, API Key, and API Secret
4. Add to `.env`

### 7. Initialize Prisma

```bash
npx prisma generate
npx prisma db push
```

### 8. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure 📁

```
birthdaywebsite/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── [...nextauth]/
│   │   │   └── signup/
│   │   ├── payment/
│   │   └── websites/
│   ├── auth/
│   │   ├── login/
│   │   └── signup/
│   ├── create/
│   ├── dashboard/
│   ├── payment/
│   ├── pricing/
│   ├── preview/
│   ├── surprise/[id]/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
├── lib/
│   └── prisma.ts
├── prisma/
│   └── schema.prisma
├── public/
├── .env
├── .env.example
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── tsconfig.json
```

## Usage 🎯

### For Users:

1. **Visit Homepage** - See demo and features
2. **Select Pages** - Choose which pages to include
3. **Make Payment** - Secure payment via Razorpay
4. **Sign Up** - Create an account
5. **Upload Content** - Add your messages, photos, videos, audio
6. **Generate Website** - Create your surprise website
7. **Share Link** - Get a unique URL to share

### For Recipients:

- Click the shared link
- View the surprise website
- No login required

## Deployment 🌐

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variables
5. Deploy!

### Important Notes:

- Set `NEXTAUTH_URL` to your production URL
- Use production keys for Razorpay
- Set up proper CORS for Cloudinary

## Pricing Structure 💰

| Page | Price |
|------|-------|
| Personal Message | ₹50 |
| Video Message | ₹100 |
| Photo with Text | ₹70 |
| + Background Audio | +₹20 |
| Photo Gallery (5 images) | ₹50 |
| + Background Audio | +₹20 |
| + Background Video | +₹40 |

## Features to Add (Future) 🔮

- [ ] Email notifications
- [ ] Custom domains
- [ ] More page templates
- [ ] Analytics dashboard
- [ ] Social media sharing
- [ ] Template preview before purchase
- [ ] Bulk discount pricing
- [ ] Gift certificates
- [ ] Password-protected websites
- [ ] Custom themes and colors

## Troubleshooting 🔧

### Common Issues:

**Database connection error:**
- Check if MongoDB Atlas IP whitelist includes your IP
- Verify DATABASE_URL is correct

**Razorpay not loading:**
- Check if RAZORPAY keys are correct
- Ensure you're using test keys in development

**Cloudinary upload fails:**
- Verify Cloudinary credentials
- Check file size limits

**TypeScript errors:**
- Run `npm install` again
- Delete `.next` folder and restart dev server

## Support 📧

For issues and questions:
- Create an issue on GitHub
- Email: support@yourwebsite.com

## License 📄

MIT License - See LICENSE file for details

---

Made with ❤️ for creating special moments
