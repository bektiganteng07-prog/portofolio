This is a [Next.js](https://nextjs.org) portfolio project. The project cards on the home page are loaded from the `proyek` table in Supabase.

## Supabase Setup

1. Create a Supabase project and copy `.env.example` to `.env.local`.
2. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` in `.env.local` using the project URL and publishable key from Supabase. The app also accepts the legacy `NEXT_PUBLIC_SUPABASE_ANON_KEY` variable. Never use a secret or service-role key in a browser app.
3. Open Supabase **SQL Editor**, paste in [`supabase/setup.sql`](supabase/setup.sql), and run it. It creates the `proyek` table, enables RLS, grants public read access, and inserts three sample projects. Running it again will not duplicate those sample titles.

The table columns are `id`, `title`, `description`, `stack`, `href`, `image_url`, and `image_alt`. `stack` is a Postgres text array. The sample image URLs are empty; add public image URLs in the Table Editor if you want project thumbnails.

`.env.local` is ignored by Git. `.env.example` contains placeholders only and can be committed. Restart the Next.js development server after changing environment variables.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
