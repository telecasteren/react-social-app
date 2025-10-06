# FOODIEGRAM in React

A rewrite of vanilla js project, social-app-noroff, with React, Vite and TypeScript.<br/>
--> The original project in vanilla JS can be found at main branch in this repo for reference.

---

### Tools

- TanStack Router for routing
- Vitest for unit testing
- Playwright for end-to-end testing
- ESLint + Prettier
- Husky + lint-staged

---

## Installation

Clone the repo and install dependencies:

```bash
git clone https://github.com/telecasteren/react-social-app.git
cd react-social-app
git switch v2
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

## Resources

[dangerouslysetinnerhtml - logrocket](https://blog.logrocket.com/using-dangerouslysetinnerhtml-react-application/)<br/>
[dangerouslysetinnerhtml - stackoverflow](https://stackoverflow.com/questions/37337289/react-js-set-innerhtml-vs-dangerouslysetinnerhtml)<br/>
[position with useState](https://stackoverflow.com/questions/61794260/react-native-how-to-use-usestate-in-another-function)<br/>
[toggle components with useState](https://stackoverflow.com/questions/65238595/how-do-i-hide-and-show-components-with-usestate-or-conditional-rendering-in-reac)<br/>
[folder structures in react](https://www.robinwieruch.de/react-folder-structure/)<br/>
[react-hook-form](https://react-hook-form.com/get-started)<br/>
[use of @theme in tailwind v4 - reddit](https://www.reddit.com/r/tailwindcss/comments/1m828qr/how_to_use_tailwind_config_now/)<br/>
[use of @theme in tailwind v4 - tailwind docs](https://tailwindcss.com/docs/adding-custom-styles)<br/>
[tanstack router docs](https://tanstack.com/router/latest/docs/framework/react/quick-start)
[tanstack router vs react router](https://www.reddit.com/r/reactjs/comments/1afzhm9/react_router_or_tanstack_router/)
