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

## Project

Continue to rewrite all components from main branch to React and Typescript in
this branch.

Ongoing:

- Profile:
  - <s>Heading</s>
  - <s>Details</s>
  - Description --> finish up toggling follow state sync!
  - Posts
  - Edit avatar, edit post, create new post, sort-options

Missing:

- Non auth forms (use react-hook-form)
- Settings (fix feature for nav)
- Search (consider moving location)

Next up:

- Pages
  - Feed
  - Single post
- API calls
- Events and linking/routes

## New stuff

- branding config, centralise branding and custom tailwind styles:
  [branding config](src/utils/branding/config.ts)

## Other

- zod for validation - same schema for frontend / backend (relevance?)
