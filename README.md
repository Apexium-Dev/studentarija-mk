# Studentarija MK

A modern full-stack web application for managing student content, posts, and user administration. Built with Next.js, React, and Supabase.

## Features

- 🔐 **Authentication**: Secure email-based authentication with Supabase
- 👥 **User Management**: Admin panel to manage users and assign admin roles
- 📝 **Post Management**: Create, view, and manage posts with categories
- 📊 **Dashboard**: Analytics and performance metrics for admins
- 🎨 **Beautiful UI**: Modern, animated interface with Framer Motion
- 📱 **Responsive Design**: Mobile-friendly design
- 🚀 **High Performance**: Built on Next.js with Turbopack for fast builds

## Tech Stack

- **Frontend**: Next.js 16.2.3, React 19.2.4, TypeScript
- **Styling**: Tailwind CSS, PostCSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Turbopack

## Prerequisites

- Node.js 18+ and npm
- Supabase account and project
- Environment variables configured

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd studentarija-mk
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

You can find these in your Supabase dashboard under **Settings → API**.

### 4. Set Up the Database

Run the following SQL in your Supabase SQL Editor to create required tables and functions:

```sql
-- Create users table in public schema
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admin_users table
CREATE TABLE IF NOT EXISTS public.admin_users (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for users table
CREATE POLICY "Admins can view all users" ON public.users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()
      AND admin_users.is_admin = true
    )
  );

CREATE POLICY "Users can view their own data" ON public.users
  FOR SELECT USING (auth.uid() = id);

-- Create trigger to auto-sync auth.users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email)
  VALUES (new.id, new.email)
  ON CONFLICT (id) DO UPDATE
  SET email = EXCLUDED.email;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
studentarija-mk/
├── app/
│   ├── admin/              # Admin dashboard pages
│   ├── login/              # Login page
│   ├── signup/             # Sign up page
│   ├── dashboard/          # User dashboard
│   ├── posts/              # Posts page
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   ├── providers.tsx       # Context providers
│   ├── globals.css         # Global styles
│   └── api/                # API routes
│       └── admin/
│           └── users/      # User management API
├── components/             # Reusable components
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── AnnouncementCard.tsx
│   └── QuickNavigation.tsx
├── lib/                    # Utility functions and hooks
│   ├── supabaseClient.js
│   ├── useHasMounted.ts
│   └── auth/
│       ├── AuthContext.tsx
│       └── useAuth.ts
├── types/                  # TypeScript type definitions
│   └── auth.ts
└── public/                 # Static assets
```

## Usage

### Authentication

Users can sign up and log in using their email. The app uses Supabase Auth for secure authentication.

- **Sign Up**: `/signup` - Create a new account
- **Login**: `/login` - Sign in to existing account
- **Dashboard**: `/dashboard` - User dashboard (requires authentication)

### Admin Panel

Admins can access the admin panel at `/admin` with three main sections:

1. **Dashboard**: View statistics, recent posts, and performance metrics
2. **Posts**: Create and manage posts with different categories
3. **Users**: Manage all users, view their details, and toggle admin status

## API Routes

### GET `/api/admin/users`

Fetches all users with their admin status. Requires admin authentication.

**Headers:**

```
Authorization: Bearer <session-token>
```

**Response:**

```json
[
  {
    "id": "user-uuid",
    "email": "user@example.com",
    "created_at": "2026-04-14T15:16:32Z",
    "is_admin": true
  }
]
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Environment Variables

| Variable                        | Description                                | Required |
| ------------------------------- | ------------------------------------------ | -------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | Your Supabase project URL                  | Yes      |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous/public key              | Yes      |
| `SUPABASE_SERVICE_ROLE_KEY`     | Supabase service role key (for admin APIs) | Yes      |

## Security Notes

- ⚠️ Never commit `.env.local` to version control
- Rotate your `SUPABASE_SERVICE_ROLE_KEY` regularly
- Use Row Level Security (RLS) policies to protect data
- Admin operations are verified server-side
- Service role key should only be used in backend/API routes, never exposed to client

## Deployment

### Deploy on Vercel

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and create a new project
3. Connect your GitHub repository
4. Add environment variables in Vercel project settings
5. Deploy

### Deploy on Other Platforms

This Next.js app can be deployed on any platform that supports Node.js:

- Heroku
- Railway
- DigitalOcean
- AWS
- Google Cloud
- etc.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Support

For issues and questions, please open an issue in the repository.
