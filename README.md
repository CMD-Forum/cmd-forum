![CMD Forum](/public/main_bgcmd.png)

![Static Badge](https://img.shields.io/badge/status-alpha_development-green)
![Static Badge](https://img.shields.io/badge/latest_release-1.0.0-blue)

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

**Setup the `.env` file:**

To setup your .env file, you'll need to change a few things.

| Variable(s)    | Change To                                       | Notes                                                |
| -------------- | ----------------------------------------------- | ---------------------------------------------------- |
| `DATABASE_URL` | Your database connection string.                | *See below if using a Vercel Database*               |
| `POSTGRES_[X]` | The variables Vercel provides, if using Vercel. | Vercel should provide these in your storage settings |
| `NEXTAUTH_URL` | Your domain that you'll be using.               | Set to `https://localhost:3000` if running locally   |
| `NEXTAUTH_SECRET` | Random, secure string. NextAuth recommends using `openssl rand -base64 32` | Do not share to anybody, as this is meant to be _secret_ |

**Run the `development` server:**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

This will start a `HTTPS` development server. `HTTPS` is required for authentication to work on Chromium browsers, however Firefox will work regardless.
