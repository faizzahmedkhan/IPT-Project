# Deployment Guide - MERN Stack on Vercel

This guide covers deploying the full MERN stack application to production.

## Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Frontend      │────▶│    Backend      │────▶│   MongoDB       │
│   (Vercel)      │     │   (Vercel)      │     │   (Atlas)       │
│   React + Vite  │     │   Express.js    │     │   Cloud DB      │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

---

## Step 1: Set Up MongoDB Atlas (Free)

1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Sign up for a free account
3. Create a new project
4. Click **"Build a Database"** → Select **M0 FREE**
5. Choose a cloud provider and region (closest to your users)
6. Create a database user with username and password
7. Add `0.0.0.0/0` to IP Access List (allows all IPs for serverless)
8. Click **"Connect"** → **"Connect your application"**
9. Copy the connection string:
   ```
   mongodb+srv://username:<password>@cluster.mongodb.net/responsible-ai-db?retryWrites=true&w=majority
   ```
   Replace `<password>` with your actual password.

---

## Step 2: Deploy Backend to Vercel

### Option A: Via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to backend folder
cd backend

# Deploy
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: responsible-ai-backend
# - Directory: ./
# - Override settings? No
```

### Option B: Via GitHub (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click **"Add New Project"**
4. Import your GitHub repository
5. Set **Root Directory** to `backend`
6. Add Environment Variables:
   - `MONGODB_URI` = your MongoDB Atlas connection string
   - `FRONTEND_URL` = (leave empty for now, add after frontend deploy)
   - `NODE_ENV` = production
7. Click **Deploy**

### After Backend Deployment:
- Note your backend URL: `https://your-backend-name.vercel.app`
- Test it: `https://your-backend-name.vercel.app/api/health`

---

## Step 3: Deploy Frontend to Vercel

### Option A: Via Vercel CLI

```bash
# Navigate to project root (not backend)
cd ..

# Deploy
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: responsible-ai-frontend
# - Directory: ./
# - Override settings? No
```

### Option B: Via GitHub (Recommended)

1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New Project"**
3. Import the same GitHub repository
4. Set **Root Directory** to `.` (root)
5. Vercel auto-detects Vite
6. Add Environment Variables:
   - `VITE_API_URL` = `https://your-backend-name.vercel.app/api`
7. Click **Deploy**

---

## Step 4: Update CORS (Important!)

After both are deployed, update the backend's environment variables:

1. Go to Vercel Dashboard → Backend Project → Settings → Environment Variables
2. Add/Update:
   - `FRONTEND_URL` = `https://your-frontend-name.vercel.app`
3. **Redeploy** the backend for changes to take effect

---

## Step 5: Seed Initial Data

After deployment, seed your courses:

```bash
curl -X POST https://your-backend-name.vercel.app/api/courses/seed
```

Or visit the Admin page on your deployed frontend and click "Add Sample Courses".

---

## Environment Variables Summary

### Backend (.env / Vercel)
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
FRONTEND_URL=https://your-frontend.vercel.app
NODE_ENV=production
PORT=5001
```

### Frontend (.env / Vercel)
```env
VITE_API_URL=https://your-backend.vercel.app/api
```

---

## Troubleshooting

### "CORS Error"
- Make sure `FRONTEND_URL` is set correctly in backend
- Redeploy backend after changing environment variables

### "MongoDB Connection Failed"
- Check MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- Verify connection string password is correct
- Check if cluster is active (free tier pauses after inactivity)

### "API Not Responding"
- Check Vercel function logs in dashboard
- Verify the backend URL is correct in frontend's `VITE_API_URL`

### "Build Failed"
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`

---

## Quick Deployment Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Database user created
- [ ] IP whitelist set to `0.0.0.0/0`
- [ ] Connection string copied
- [ ] Backend deployed to Vercel
- [ ] Backend `MONGODB_URI` environment variable set
- [ ] Frontend deployed to Vercel  
- [ ] Frontend `VITE_API_URL` environment variable set
- [ ] Backend `FRONTEND_URL` updated with frontend URL
- [ ] Backend redeployed after adding `FRONTEND_URL`
- [ ] Courses seeded via Admin page or API call
- [ ] Contact form tested

---

## Estimated Costs

| Service | Free Tier |
|---------|-----------|
| Vercel (Frontend) | 100GB bandwidth/month |
| Vercel (Backend) | 100GB-hours serverless/month |
| MongoDB Atlas | 512MB storage, shared cluster |

**Total: $0/month** for small projects!
