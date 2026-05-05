---
title: "Getting Started with Next.js 14 App Router"
date: "2024-01-15"
excerpt: "A comprehensive guide to building modern web applications with Next.js 14's App Router, server components, and the new data fetching patterns."
tags: ["Next.js", "React", "Web Development"]
author: "Alex Morgan"
authorBio: "Full-stack developer passionate about React, TypeScript, and building great developer experiences."
authorAvatar: "/images/author-alex-morgan.jpg"
coverImage: "/images/nextjs-app-router-guide.jpg"
featured: true
---

# Getting Started with Next.js 14 App Router

Next.js 14 introduces a powerful new paradigm for building React applications. The App Router, built on React Server Components, fundamentally changes how we think about data fetching, layouts, and rendering.

## What is the App Router?

The App Router is Next.js's new routing system that lives in the `app/` directory. Unlike the Pages Router, it embraces React Server Components by default, giving you:

- **Zero client-side JavaScript** for server components
- **Nested layouts** that persist across route changes
- **Streaming** with Suspense boundaries
- **Parallel routes** and intercepting routes

## Setting Up Your First App Router Project

Getting started is straightforward with the Next.js CLI:

```bash
npx create-next-app@latest my-app --typescript --tailwind --app
cd my-app
npm run dev
```

Your project structure will look like this:

```
my-app/
├── app/
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── public/
├── next.config.mjs
└── package.json
```

## Server Components vs Client Components

By default, all components in the `app/` directory are **Server Components**. They run on the server and can directly access databases, file systems, and APIs.

```tsx
// app/posts/page.tsx — Server Component (default)
async function PostsPage() {
  const posts = await db.query('SELECT * FROM posts');
  
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

When you need interactivity, add `"use client"` at the top:

```tsx
"use client";

import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(c => c + 1)}>
      Count: {count}
    </button>
  );
}
```

## Data Fetching Patterns

### Fetching in Server Components

```tsx
async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await fetch(`https://api.example.com/posts/${params.slug}`, {
    next: { revalidate: 3600 } // Revalidate every hour
  }).then(r => r.json());

  return <article>{post.content}</article>;
}
```

### Parallel Data Fetching

Avoid waterfalls by fetching in parallel:

```tsx
async function Dashboard() {
  const [user, posts, analytics] = await Promise.all([
    getUser(),
    getPosts(),
    getAnalytics(),
  ]);

  return (
    <div>
      <UserProfile user={user} />
      <PostList posts={posts} />
      <AnalyticsChart data={analytics} />
    </div>
  );
}
```

## Layouts and Templates

Layouts in the App Router are persistent — they don't re-render when navigating between routes that share the same layout:

```tsx
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav>My App</nav>
        <main>{children}</main>
        <footer>© 2024</footer>
      </body>
    </html>
  );
}
```

## Conclusion

The Next.js 14 App Router represents a significant leap forward in React application development. By embracing Server Components and the new data fetching patterns, you can build faster, more scalable applications with less client-side JavaScript.

Start experimenting with the App Router today — the mental model shift is worth it!
