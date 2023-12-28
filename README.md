![CMD Forum](/public/main_bgcmd.png)

# CMD Forum

Forum site with authentication (via NextAuth), posting, etc.

## Browser Support

Below is a table of different browsers and the features they support.
Safari has not been tested.

| Feature        | Firefox            | Edge                | Chrome              |
| -------------- | ------------------ | ------------------- | ------------------- |
| Authentication | :white_check_mark: | :white_check_mark:* | :white_check_mark:* |

\* `HTTPS` is required for this to function.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

This will start an encrypted `HTTPS` development server. `HTTPS` is required for authentication to work on Chromium browsers, however Firefox doesn't care about this either way.
