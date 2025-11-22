## Project

Ongoing conversion:

- Profile:
  - edit avatar: use hook useEditUserAvatar
  - create new post form

- Post:
  - Edit post: use hook useHandleEditPost

- Feed:
  - create new post form

- General:
  - sort events
  - Spinner in loading state (searching, sorting)
  - Fix scroll restore hook bug

## New stuff

- Feed with posts from following only
- branding config, centralise branding and custom tailwind styles:
  [branding config](src/utils/branding/config.ts)

## Other

- Check out these:<br/>
  [zod](https://zod.dev)<br/>
  [zustand](https://zustand.docs.pmnd.rs/getting-started/introduction)<br/>
  [react cache](https://tanstack.com/query/v4/docs/framework/react/guides/caching#basic-example)<br/>
  [react query cache](https://stackoverflow.com/questions/70238846/react-query-query-is-not-using-cache)<br/>
  [useLocalStorage](https://usehooks-ts.com/react-hook/use-local-storage)<br/>

- simplifying fetch profile etc
  - use react router where i can, useLocalStorage
- zod
