# Run the project
1. Start docker
2. 
```bash
$ corepack enable pnpm # if you don't have pnpm installed
$ pnpm install
$ pnpm run dev
```
3.
```bash
$ pnpm --filter backend init-db
$ pnpm dev
```
## test
```bash
pnpm test
```

# My steps:

## Tools setup
- set up a monorepo, used pnpm as a package manager
- set up all the tooling: typescript, eslint with a flat configuration which suits a monorepo, used recommended type checking rules

## Backend
- set up a fastify server with mocked data with fastify (faster then express, better TS support) and zod schema

## Frontend
- set up a react app with vite
- used TailwindCSS for styling with `tailwind-variants` library to handle complex variants
- used React 19 with new hooks (e.g. use)
- wrote simple `useQuery` and `useMutation` hooks for fetching data
- loading states handled by `Suspense` and `ErrorBoundary`
- wrote simple UI components from scratch
- implemented a modal to create a new user
- not implemented an advanced `Select` component because it would require to handle a lot of cases (e.g. custom rendering, keyboard navigation, accessibility, etc.) and used native `select` instead