## Project

Continue to rewrite all components from main branch to React and Typescript in
this branch.

Ongoing:

- <s>Auth</s>
- <s>Dashboard</s>
- <s>Navbar</s>

- Settings (feature for nav): fix positioning and actions
- Links/routes (from feed to single post page)

- Profile:
  - <s>Heading</s>
  - <s>Details</s>
  - <s> Posts </s>
  - <s> Description </s> --> double check follow state
  - Edit avatar, edit post, create new post, sort-options

Next up:

- Pages
  - Feed with posts
    - Feed with posts from following only
  - Single post
- API calls
- Events

Missing:

- Non auth forms (use react-hook-form)
- Search (consider moving location)

## New stuff

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
