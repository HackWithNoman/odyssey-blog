# Odyssey Blog

A modern, full-stack blog application built with Next.js 16, featuring authentication, database integration, and a clean minimal design.

## Project Key Features

- **Authentication**: Email/password login and registration via better-auth
- **Database Integration**: PostgreSQL (Neon) with Prisma ORM
- **Blog Management**: Create, edit, delete posts from dashboard
- **Filtering**: Filter posts by category and sort by date on blog page
- **Responsive Design**: Clean minimal UI with Tailwind CSS
- **Server-Side Rendering**: Optimized with Next.js App Router

## Setup & Installation

### Prerequisites

- Node.js 18+
- PostgreSQL database (Neon)
- npm or pnpm

### Environment Variables

Create a `.env.local` file in the root directory:

```env
DATABASE_URL=postgresql://user:password@host.neon.tech/odyssey_blog?sslmode=require
BETTER_AUTH_SECRET=your-secret-key-here
BETTER_AUTH_URL=http://localhost:3000
```

### Installation

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`.

## Route Summary

| Route | Description |
|------|-------------|
| `/` | Home page with latest posts |
| `/about` | About page with mission and team |
| `/blog` | Blog listing with category/sort filters |
| `/blog/[slug]` | Single blog post page |
| `/login` | User login page |
| `/register` | User registration page |
| `/dashboard` | Dashboard overview |
| `/dashboard/add` | Add new post |
| `/dashboard/manage` | Manage posts (edit/delete) |

### API Routes

| Route | Methods | Description |
|-------|---------|-------------|
| `/api/auth/[...all]` | GET, POST | better-auth endpoints |
| `/api/posts` | GET, POST | List/create posts |
| `/api/posts/[id]` | GET, PUT, DELETE | Single post operations |

## Tech Stack

- **Framework**: Next.js 16
- **Database**: PostgreSQL (Neon)
- **ORM**: Prisma
- **Auth**: better-auth
- **UI**: Tailwind CSS v4, shadcn/ui
- **Fonts**: Geist Sans, Geist Mono