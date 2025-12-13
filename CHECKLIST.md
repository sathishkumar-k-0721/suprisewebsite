# ✅ Configuration Checklist

Use this checklist to get your Surprise Website Builder up and running!

## 📋 Pre-Launch Checklist

### 1. Environment Setup
- [ ] Node.js 18+ installed
- [ ] npm or yarn installed
- [ ] Git installed (optional)
- [ ] Code editor (VS Code recommended)

### 2. MongoDB Atlas Setup
- [ ] Create MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
- [ ] Create a new cluster (free M0 tier is fine)
- [ ] Create database user with password
- [ ] Whitelist your IP address (or use 0.0.0.0/0 for development)
- [ ] Get connection string
- [ ] Add connection string to `.env` as `DATABASE_URL`

**Connection String Format:**
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/surprise-website?retryWrites=true&w=majority
```

### 3. Razorpay Setup
- [ ] Create Razorpay account at https://razorpay.com
- [ ] Verify your business (for live mode later)
- [ ] Go to Settings → API Keys
- [ ] Generate Test Keys
- [ ] Copy Key ID (starts with `rzp_test_`)
- [ ] Copy Key Secret
- [ ] Add to `.env`:
  - `NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxx`
  - `RAZORPAY_KEY_SECRET=xxxxx`

### 4. Cloudinary Setup
- [ ] Create Cloudinary account at https://cloudinary.com
- [ ] Verify email
- [ ] Go to Dashboard
- [ ] Copy Cloud Name
- [ ] Copy API Key
- [ ] Copy API Secret
- [ ] Add to `.env`:
  - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name`
  - `CLOUDINARY_API_KEY=xxxxx`
  - `CLOUDINARY_API_SECRET=xxxxx`

### 5. NextAuth Configuration
- [ ] Generate secret key
  ```bash
  # On Mac/Linux:
  openssl rand -base64 32
  
  # On Windows (PowerShell):
  [Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
  ```
- [ ] Add to `.env`:
  - `NEXTAUTH_SECRET=your_generated_secret`
  - `NEXTAUTH_URL=http://localhost:3000`

### 6. Install Dependencies
- [ ] Open terminal in project directory
- [ ] Run `npm install`
- [ ] Wait for installation to complete
- [ ] Check for any errors

### 7. Database Initialization
- [ ] Run `npx prisma generate`
- [ ] Run `npx prisma db push`
- [ ] Verify schema is pushed to MongoDB
- [ ] (Optional) Run `npx prisma studio` to view database

### 8. Start Development Server
- [ ] Run `npm run dev`
- [ ] Wait for server to start
- [ ] Open http://localhost:3000
- [ ] Verify homepage loads

### 9. Test Features
- [ ] ✅ Homepage loads with animations
- [ ] ✅ Click "See Demo" - Preview page works
- [ ] ✅ Click "Create Your Website" - Pricing page works
- [ ] ✅ Select pages - Price calculates correctly
- [ ] ✅ Click "Proceed to Checkout" - Redirects to signup
- [ ] ✅ Create account - Signup works
- [ ] ✅ Login works
- [ ] ✅ Dashboard loads

### 10. Test Payment (Test Mode)
- [ ] Use Razorpay test card:
  - Card: 4111 1111 1111 1111
  - CVV: Any 3 digits
  - Expiry: Any future date
- [ ] Complete test payment
- [ ] Verify payment success

---

## 🔧 Your .env File Should Look Like This:

```env
# Database
DATABASE_URL="mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/surprise-website?retryWrites=true&w=majority"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-32-character-secret-here"

# Razorpay
NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_test_xxxxxxxxxxxxx"
RAZORPAY_KEY_SECRET="your_razorpay_secret_here"

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="123456789012345"
CLOUDINARY_API_SECRET="your_cloudinary_secret"

# App Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

---

## 🚨 Common Issues & Solutions

### Issue: "Cannot find module '@prisma/client'"
**Solution:** 
```bash
npm install
npx prisma generate
```

### Issue: "Database connection failed"
**Solution:**
1. Check if your IP is whitelisted in MongoDB Atlas
2. Verify connection string in .env
3. Check username/password in connection string
4. Try whitelisting 0.0.0.0/0 for testing

### Issue: "Razorpay is not defined"
**Solution:**
1. Check if NEXT_PUBLIC_RAZORPAY_KEY_ID is set
2. Ensure it starts with `NEXT_PUBLIC_`
3. Restart dev server after .env changes

### Issue: "NextAuth configuration error"
**Solution:**
1. Generate a new NEXTAUTH_SECRET
2. Ensure it's at least 32 characters
3. Restart server

### Issue: "TypeScript errors"
**Solution:**
```bash
# Delete .next folder and restart
rm -rf .next
npm run dev
```

### Issue: "Port 3000 already in use"
**Solution:**
```bash
# Kill the process on port 3000
# On Mac/Linux:
lsof -ti:3000 | xargs kill -9

# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

---

## 📱 Testing Checklist

### Frontend Testing
- [ ] Homepage responsive on mobile
- [ ] All animations work
- [ ] Navigation between pages works
- [ ] Forms validate input correctly
- [ ] Error messages display properly
- [ ] Loading states show correctly

### Authentication Testing
- [ ] Can create new account
- [ ] Can login with correct credentials
- [ ] Cannot login with wrong credentials
- [ ] Session persists on page refresh
- [ ] Logout works correctly
- [ ] Protected routes redirect to login

### Payment Testing
- [ ] Pricing selection works
- [ ] Total calculates correctly
- [ ] Razorpay modal opens
- [ ] Test payment succeeds
- [ ] Redirects after payment
- [ ] Order is saved in database

### Database Testing
- [ ] Users are created
- [ ] Passwords are hashed
- [ ] Sessions work correctly
- [ ] Data persists correctly

---

## 🚀 Pre-Production Checklist

Before deploying to production:

### Security
- [ ] Change all API keys to production keys
- [ ] Use strong NEXTAUTH_SECRET
- [ ] Whitelist specific IPs in MongoDB
- [ ] Enable CSRF protection
- [ ] Add rate limiting
- [ ] Enable HTTPS only

### Performance
- [ ] Enable image optimization
- [ ] Add caching headers
- [ ] Minimize bundle size
- [ ] Test on slow connections
- [ ] Test on various devices

### SEO & Meta
- [ ] Add meta descriptions
- [ ] Add Open Graph tags
- [ ] Create sitemap.xml
- [ ] Add robots.txt
- [ ] Set up Google Analytics

### Legal
- [ ] Add Terms of Service
- [ ] Add Privacy Policy
- [ ] Add Refund Policy
- [ ] Add Contact information
- [ ] GDPR compliance (if EU users)

### Monitoring
- [ ] Set up error tracking (Sentry)
- [ ] Set up analytics
- [ ] Set up uptime monitoring
- [ ] Set up payment alerts
- [ ] Set up backup system

---

## 📊 Deployment Checklist (Vercel)

### 1. Prepare for Deployment
- [ ] Push code to GitHub
- [ ] Ensure .env is in .gitignore
- [ ] Test build locally: `npm run build`
- [ ] Fix any build errors

### 2. Deploy to Vercel
- [ ] Go to https://vercel.com
- [ ] Import your GitHub repository
- [ ] Add all environment variables
- [ ] Change NEXTAUTH_URL to production URL
- [ ] Deploy!

### 3. Post-Deployment
- [ ] Test production website
- [ ] Verify all features work
- [ ] Test payment with real card (small amount)
- [ ] Check error logs
- [ ] Set up custom domain (optional)

### 4. MongoDB Production
- [ ] Create production cluster (or use same for now)
- [ ] Update connection string in Vercel
- [ ] Restrict IP access
- [ ] Enable backups

---

## 🎉 Success Criteria

Your setup is complete when:

- ✅ Homepage loads at http://localhost:3000
- ✅ You can navigate to all pages
- ✅ You can create an account
- ✅ You can login successfully
- ✅ Dashboard loads after login
- ✅ Test payment works
- ✅ No console errors
- ✅ Database connection works

---

## 📞 Getting Help

If you're stuck:

1. **Check the error message** - Read it carefully
2. **Check console logs** - Browser console and terminal
3. **Verify .env file** - All variables set correctly
4. **Restart server** - Many issues fixed by restart
5. **Clear cache** - Delete .next folder
6. **Check documentation** - README.md and SETUP_GUIDE.md

---

**Last Updated:** December 10, 2025

**Need help?** Review the PROJECT_STATUS.md for what's implemented and what's next!
