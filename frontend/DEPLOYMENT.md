# Deployment Guide for Cops Interview

## Prerequisites

Before deploying, ensure you have:
- ✅ Resend API key
- ✅ Supabase project with database set up
- ✅ A verified domain for sending emails (or use Resend's test domain)

## Step 1: Configure Resend Email

### Option A: Use Your Own Domain (Recommended for Production)

1. Go to [Resend Dashboard](https://resend.com/domains)
2. Click "Add Domain"
3. Enter your domain (e.g., `copsinterview.com`)
4. Add the DNS records provided by Resend to your domain registrar
5. Wait for verification (usually takes a few minutes)
6. Once verified, you can use emails like `noreply@copsinterview.com`

### Option B: Use Resend Test Domain (Development Only)

- You can only send to your own verified email address
- Use `onboarding@resend.dev` as the from address
- Good for testing, but not for production

## Step 2: Deploy to Vercel

### Quick Deploy

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repository
5. Configure environment variables (see below)
6. Click "Deploy"

### Environment Variables for Vercel

Add these in Vercel Dashboard → Settings → Environment Variables:

```env
RESEND_API_KEY=re_your_actual_key_here
RESEND_FROM_EMAIL=noreply@yourdomain.com
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
ADMIN_PASSWORD=your_secure_admin_password
NEXT_PUBLIC_BASE_URL=https://your-vercel-app.vercel.app
```

**Important Notes:**
- `RESEND_FROM_EMAIL`: Use your verified domain email (e.g., `noreply@copsinterview.com`)
- `NEXT_PUBLIC_BASE_URL`: Use your actual Vercel URL or custom domain
- Keep `SUPABASE_SERVICE_ROLE_KEY` and `ADMIN_PASSWORD` secret!

## Step 3: Update Production URL

After deployment, update the `NEXT_PUBLIC_BASE_URL` in Vercel:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Edit `NEXT_PUBLIC_BASE_URL`
3. Set it to your production URL (e.g., `https://copsinterview.vercel.app`)
4. Redeploy the application

## Step 4: Test Email Functionality

1. Go to your deployed site
2. Fill out the "Let's Talk" form
3. Check if the email is received
4. Click the verification link in the email
5. Upload a test document

## Troubleshooting

### Emails Not Sending

**Issue**: Emails are not being delivered

**Solutions**:
1. Check if your domain is verified in Resend
2. Verify `RESEND_API_KEY` is correct
3. Check Resend Dashboard → Logs for error messages
4. If using test domain, ensure you're sending to your verified email

### Verification Link Not Working

**Issue**: Clicking the email link shows 404

**Solutions**:
1. Ensure `NEXT_PUBLIC_BASE_URL` is set correctly in Vercel
2. Check if the URL in the email matches your deployment URL
3. Redeploy after updating environment variables

### Database Errors

**Issue**: Form submission fails with database error

**Solutions**:
1. Ensure the SQL schema was run in Supabase
2. Check if `SUPABASE_SERVICE_ROLE_KEY` is set correctly
3. Verify RLS policies are configured in Supabase

## Custom Domain Setup (Optional)

1. Buy a domain (e.g., from Namecheap, GoDaddy)
2. In Vercel Dashboard → Your Project → Settings → Domains
3. Add your custom domain
4. Update DNS records at your domain registrar
5. Update `NEXT_PUBLIC_BASE_URL` to your custom domain
6. Update `RESEND_FROM_EMAIL` to use your custom domain

## Security Checklist

- [ ] Changed `ADMIN_PASSWORD` from default
- [ ] Using `SUPABASE_SERVICE_ROLE_KEY` (not anon key) for server operations
- [ ] Verified domain in Resend for production emails
- [ ] Environment variables are set in Vercel (not in code)
- [ ] `.env.local` is in `.gitignore` (never commit secrets!)

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Check Resend email logs
3. Check Supabase logs
4. Review browser console for errors

---

**Ready to deploy?** Follow the steps above and your application will be live! 🚀
