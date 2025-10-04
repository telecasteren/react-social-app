# FOODIEGRAM in React

A rewrite of vanilla js project, social-app-noroff, with React, Vite and TypeScript.<br/>
--> The original project in vanilla JS can be found at main branch in this repo for reference.

---

### Tools

- Vitest for unit testing
- Playwright for end-to-end testing
- ESLint + Prettier
- Husky + lint-staged

---

## Installation

Clone the repo and install dependencies:

```bash
git clone <your-repo-url>
cd <your-project-name>
npm install
```

## Running the Project

Start the development server

```bash
npm run dev
```

Build the project

```bash
npm run build
```

Preview production build

```bash
npm run preview
```

Serve with Live-Server on port 5500

```bash
npm run start
```

## Formatting and linting

Lint the codebase

```bash
npm run lint
```

Format with Prettier

```bash
npm run format
```

**NOTE! Husky and lint-staged automatically check and format staged files before commits.**

---

## Testing

Run unit tests with Vitest

```bash
npm run test
```

Run end-to-end tests with Playwright

```bash
npm run test:e2e
```

## Folder structure

```bash
.
├── public/          # Static assets
├── src/             # Application source code
 └── assets
 └── components      # Global reusable bits
 └── features        # UI and feature specific components
 └── services/       # API and helpers
 └── styles/         # Tailwind and custom CSS
 └── utils/          # Utilities
   └── tests/        # Unit & e2e tests
   └── types/        # Typescript types
├──
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── playwright.config.ts
├── vitest.config.ts
└── vite.config.ts
```
