# Vue Users + Posts

Vue 3 + TypeScript + Pinia app that lists users from JSONPlaceholder, filters by name, and shows each user's posts on row click.

## Scripts

```bash
npm install
npm run dev      # start Vite dev server
npm run build    # type-check + production build
npm run test     # run Vitest suite once
npm run test:watch
```

## Stack
- Vue 3 (`<script setup>` + TypeScript)
- Pinia for `users` and `posts` stores
- Vue Router (hash history, single route for now)
- Axios for HTTP
- Vitest + Vue Test Utils + happy-dom for tests

## Structure
```
src/
  api.ts                    # axios calls to JSONPlaceholder
  types.ts                  # User, Post interfaces
  stores/
    users.ts                # users list + name filter
    posts.ts                # selected user's posts
  components/
    SearchFilter.vue        # v-model text input
    UserTable.vue           # table shell
    UserRow.vue             # clickable row
    PostList.vue            # Title / Body table
  views/
    UsersView.vue           # composes the above
  router.ts
  main.ts
tests/
  fixtures.ts
  UserTable.spec.ts         # table renders rows
  usersStore.spec.ts        # filter logic
  UsersView.spec.ts         # row click triggers posts fetch
```

## CodeSandbox
Import the GitHub repo into CodeSandbox; Vite is detected automatically.
# vuejs-test
