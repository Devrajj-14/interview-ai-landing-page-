# Mail Service Integration Setup

The "Let's Talk" button has been integrated into your landing page. This connects to an employer verification system that allows companies to submit their details and get verified.

## Features Added

1. **"Let's Talk" Button in Header** - Visible on desktop and mobile navigation
2. **"Let's Talk" Button in Footer** - Prominently displayed above social links
3. **Employer Verification Form** - Located at `/hire` route
4. **Email Verification System** - Two-step verification with file upload
5. **Admin Dashboard** - View all submissions at `/admin`

## Setup Instructions

### 1. Environment Variables

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

Required variables:
- `RESEND_API_KEY` - Get from https://resend.com (free tier available)
- `SUPABASE_URL` - Get from https://supabase.com (free tier available)
- `SUPABASE_ANON_KEY` - From your Supabase project settings
- `SUPABASE_SERVICE_ROLE_KEY` - From your Supabase project settings
- `ADMIN_PASSWORD` - Set your own admin password
- `NEXT_PUBLIC_BASE_URL` - Your deployment URL (http://localhost:3000 for local)

### 2. Supabase Database Setup

Run this SQL in your Supabase SQL Editor:

```sql
CREATE TABLE "EmployerVerification" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "fullName" TEXT NOT NULL,
  "companyName" TEXT NOT NULL,
  "companyEmail" TEXT NOT NULL,
  "companyAddress" TEXT NOT NULL,
  "roleHiringFor" TEXT NOT NULL,
  "salaryRange" TEXT NOT NULL,
  "jobLocation" TEXT NOT NULL,
  "token" TEXT NOT NULL UNIQUE,
  "isVerified" BOOLEAN DEFAULT false,
  "idProofUrl" TEXT,
  "createdAt" TIMESTAMP DEFAULT NOW()
);
```

### 3. Supabase Storage Setup

1. Go to Storage in your Supabase dashboard
2. Create a new bucket called `id-proofs`
3. Make it public
4. Set the following policies:
   - Allow public read access
   - Allow authenticated uploads

### 4. Resend Email Setup

1. Sign up at https://resend.com
2. Get your API key
3. Verify your domain (or use the test domain for development)
4. Update the `from` email in `app/hire/actions.ts` if needed

## How It Works

### User Flow

1. **User clicks "Let's Talk"** → Redirected to `/hire`
2. **Fills employer form** → Submits company details
3. **Receives verification email** → Contains unique verification link
4. **Clicks verification link** → Redirected to `/verify?token=xxx`
5. **Uploads company ID proof** → PNG, JPG, or PDF file
6. **Verification complete** → Admin can review in dashboard

### Admin Flow

1. Visit `/admin`
2. Enter admin password
3. View all submissions with:
   - Company details
   - Verification status
   - Download ID proof
   - Submission timestamp

## Routes Added

- `/hire` - Employer verification form
- `/verify` - ID proof upload page (requires token)
- `/admin` - Admin dashboard (password protected)

## API Endpoints

- `POST /api/upload` - Handles file uploads
- `GET /api/verify?token=xxx` - Retrieves employer data
- `GET /api/admin` - Retrieves all submissions

## Customization

### Change Button Text

Edit in:
- `components/sections/navigation.tsx` (line with "Let's Talk")
- `components/sections/footer.tsx` (line with "Let's Talk")

### Change Button Style

The buttons use your existing theme colors:
- `bg-primary` - Your primary color
- `text-white` - White text
- Hover effects included

### Modify Email Template

Edit `app/hire/actions.ts` in the `resend.emails.send()` call to customize the verification email.

## Testing Locally

1. Make sure all environment variables are set
2. Run `npm run dev`
3. Click "Let's Talk" button
4. Fill out the form with a real email address
5. Check your email for the verification link
6. Complete the verification process

## Deployment Notes

- Update `NEXT_PUBLIC_BASE_URL` to your production URL
- Verify your domain in Resend for production emails
- Set strong admin password
- Configure proper CORS if needed
- Enable rate limiting for production

## Troubleshooting

**Email not sending:**
- Check Resend API key
- Verify email address is valid
- Check Resend dashboard for delivery status

**File upload failing:**
- Verify Supabase bucket exists
- Check storage policies
- Ensure file is under 10MB

**Database errors:**
- Verify Supabase credentials
- Check if table was created
- Review connection settings

## Security Notes

- Admin password is environment-based (not in database)
- File uploads are validated (type and size)
- Unique tokens prevent unauthorized access
- Consider adding rate limiting for production
- Review and configure RLS policies in Supabase

## Support

For detailed setup instructions, see:
- `zenda-clone/mail-service/README.md` - Full mail service documentation
- `zenda-clone/mail-service/SUPABASE_SETUP.md` - Detailed Supabase setup
- `zenda-clone/mail-service/QUICKSTART.md` - Quick start guide
