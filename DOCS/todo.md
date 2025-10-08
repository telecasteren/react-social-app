### Feedback from Connor

- a library like react-helmet-async can be used to update <head>:

```js
if (headerRef.current) {
  headerRef.current.innerHTML = "";
  const title = TypeTitle({ text: SITE_NAME });
  title.classList.add("text-bigger", "md:text-[4.5rem]", "typewriter");
  headerRef.current.appendChild(title);
}
```

- that nav-underline file has non-Tailwind CSS stuff. Gotta follow one pattern.
- I wouldn't put all that code in utils, I wouldn't have any components in there, just functions

## Project

Continue to rewrite all components from main branch to React and Typescript in this branch.

Missing:

- Navbar (ONGOING) --> fix dropdown settings feature + mobile nav content
- Non auth forms (use react-hook-form)
- Settings (consider moving location)
- Search (consider moving location)

Next up:

- Pages
  - Profile
  - Feed
  - Single post
- API calls
- Events and linking/routes

## Overview

- Tanstack Query Api stuff
- zod for validation - same schema for frontend / backend (relevance?)
