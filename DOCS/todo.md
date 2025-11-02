## Project

Ongoing:

- Links/routes (from feed to single post page)
- Nav items positioning (settings)

- Profile:
  - edit avatar logic
  - create new post form
  - sort events

  - Feed:
    - create new post form
    - sort events

Next up:

- Overview
  - Single post
  - Create new post form: Feed & Profile
  - Edit post: Profile & SinglePost
  - Edit avatar: Profile
- Sort events
- Spinner in loading state (searching, sorting)

## New stuff

- Feed with posts from following only
- branding config, centralise branding and custom tailwind styles:
  [branding config](src/utils/branding/config.ts)

## Other

- zod for validation - same schema for frontend / backend (relevance?)

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
