# Next.js Todo Application

This is a modern web application built with Next.js that demonstrates different data fetching strategies and state management approaches. The application provides a user interface to view users and their associated todos.

## Features

- User listing with Server-Side Rendering (SSR)
- Todo management with client-side data fetching
- Interactive pagination for todos
- Theme switching (light/dark mode)
- Responsive design

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **UI Components**: Custom components with [Shadcn UI](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) with [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
- **API**: [JSONPlaceholder](https://jsonplaceholder.typicode.com/) for mock data
- **Typography**: [Geist Font](https://vercel.com/font)

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

```
├── src/
│   ├── app/               # Next.js App Router pages
│   ├── components/        # React components
│   │   ├── custom/        # Custom components
│   │   ├── mvpblocks/     # Reusable UI blocks
│   │   ├── pages/         # Page-specific components
│   │   ├── ui/            # UI components
│   │   └── providers.tsx  # Application providers
│   ├── constants/         # Application constants
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   ├── store/             # Redux store configuration
│   │   └── todo/          # Todo-related Redux logic
│   └── types/             # TypeScript type definitions
└── public/                # Static assets
```

## Data Fetching Approach

This project demonstrates two different approaches to data fetching:

### 1. Server-Side Rendering (SSR) for User Data

The `/users` API endpoint is fetched using Next.js Server Components. This approach is used because:

- User data is relatively static and doesn't require frequent updates
- It improves initial page load performance by rendering content on the server
- It enhances SEO by providing fully rendered HTML to search engines
- No complex client-side interactions are needed for this data

Implementation can be found in `src/app/page.tsx`.

### 2. RTK Query for Todo Data

The `/todos` API endpoint is fetched using RTK Query. This approach is used because:

- Todo data requires interactive features like pagination
- It provides efficient client-side caching and request deduplication
- It handles loading and error states automatically
- It enables optimistic updates for better user experience

Implementation can be found in `src/store/todo/api.ts` and `src/components/pages/todo/index.tsx`.

## State Management

The application uses Redux Toolkit for state management, with RTK Query for API calls. This provides:

- Centralized state management
- Automatic caching and invalidation
- Simplified API request handling
- Type-safe state access with TypeScript

## Deployment

The application can be deployed on [Vercel](https://vercel.com/) or any other hosting platform that supports Next.js applications.

```bash
npm run build
# or
yarn build
# or
pnpm build
```