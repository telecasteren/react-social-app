## Project

Continue to rewrite all components from main branch to React and Typescript in
this branch.

Ongoing:

- Settings (feature for nav): fix positioning and actions
- Links/routes (from feed to single post page)

- Profile:
  - <s> Description </s> --> double check follow state

Next up:

- Overview
  - Single post
  - Create new post form: Feed & Profile
  - Edit post: Profile & SinglePost
  - Edit avatar: Profile
- Search events

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
