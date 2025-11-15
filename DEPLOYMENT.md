# Deployment Guide

Quick deployment guide for Feedback Management Dashboard.

## Backend Deployment (Render)

### Step 1: Prepare Repository
1. Push your code to GitHub
2. Ensure `backend/package.json` has a `start` script

### Step 2: Deploy on Render
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: feedback-dashboard-backend (or any name)
   - **Root Directory**: `backend`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add Environment Variables:
   - `MONGODB_URI`: `mongodb+srv://harshcr05_db_user:Chanpura1704@cluster0.hlgtsye.mongodb.net/feedback-dashboard?retryWrites=true&w=majority&appName=Cluster0`
   - `PORT`: Leave empty (Render assigns automatically)
6. Click "Create Web Service"
7. Wait for deployment to complete
8. Copy your backend URL (e.g., `https://feedback-dashboard-backend.onrender.com`)

### Step 3: Update MongoDB Atlas
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Navigate to Network Access
3. Add IP Address: `0.0.0.0/0` (allows all IPs) OR add Render's specific IPs
4. Save changes

## Frontend Deployment (Vercel)

### Step 1: Prepare Repository
1. Ensure your code is on GitHub
2. Create `.env.production` or use Vercel's environment variables

### Step 2: Deploy on Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add Environment Variable:
   - `VITE_API_URL`: Your Render backend URL (e.g., `https://feedback-dashboard-backend.onrender.com`)
6. Click "Deploy"
7. Wait for deployment
8. Your frontend will be live at `https://your-project.vercel.app`

## Alternative: Railway Deployment

### Backend on Railway
1. Go to [Railway](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Add service → Select backend folder
5. Add environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
6. Deploy!

### Frontend on Railway
1. Add another service in the same project
2. Select frontend folder
3. Add environment variable:
   - `VITE_API_URL`: Your backend Railway URL
4. Deploy!

## Testing Deployment

1. **Test Backend**:
   - Visit: `https://your-backend-url.onrender.com/api/health`
   - Should return: `{"status":"OK","message":"Server is running"}`

2. **Test Frontend**:
   - Visit your Vercel URL
   - Try submitting a feedback
   - Check if it appears in the table
   - Verify analytics update

## Common Issues

### CORS Errors
- Backend already has CORS enabled
- If issues persist, check that frontend URL is in allowed origins

### MongoDB Connection Issues
- Verify MongoDB Atlas IP whitelist includes deployment platform IPs
- Check connection string format
- Ensure database name is correct

### Environment Variables Not Working
- Restart the service after adding environment variables
- For Vercel, rebuild after adding variables
- Check variable names (case-sensitive)

## Quick Checklist

- [ ] Backend deployed on Render/Railway
- [ ] Backend URL accessible and `/api/health` works
- [ ] MongoDB Atlas IP whitelist updated
- [ ] Frontend deployed on Vercel
- [ ] Frontend environment variable `VITE_API_URL` set
- [ ] Test feedback submission
- [ ] Test feedback display
- [ ] Test analytics cards

## URLs to Submit

After deployment, you'll have:
- **Frontend URL**: `https://your-project.vercel.app`
- **Backend URL**: `https://your-backend.onrender.com`

Submit both URLs in your assignment!

