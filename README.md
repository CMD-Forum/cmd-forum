
<h1 align="center">CMD Forum</h1>


![CMD Forum](/public/main_bgcmd.png)

<div align="center"><img src="https://img.shields.io/badge/status-alpha_development-green" alt="Development Status: Alpha"></img> <img src="https://img.shields.io/badge/latest_release-1.1.0-blue" alt="Latest Release: 1.1.0"></img></div>

<h3 align="center">Forum site built in React</h3>

---

## Getting Started

### Create a GitHub OAuth App

> [!WARNING]
> This step is required for authentication with GitHub to work.

1. Go to your GitHub settings.
2. Scroll down and go to `Developer Settings > OAuth Apps`.
3. Click the button to create a new OAuth app.
4. Fill in most fields to your liking, but make sure to put `https://{your_url}/api/auth/callback/github` for `Authorization Callback URL`, wth `{your_url}` being the domain you're hosting CMD/> on.
5. Proceed to setting up your `.env` file, where we'll use the `Client ID` & `Client Secret`.

### Setup the `.env` file

To setup your .env file, you'll need to change a few things.

| Variable             | Change To                                                                | Notes                                                         |
| -------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------- |
| DATABASE_URL         | Your database connection string                                          | N/A                                                           |
| AUTH_SECRET          | Random, secure string. AuthJS recommends using `openssl rand -base64 32` to generate it | Don't share with anybody, as this is meant to be secret.  |
| GITHUB_CLIENT_ID     | Your GitHub Client ID (see your developer settings)                      | See your developer settings for this.                         |
| GITHUB_CLIENT_SECRET | Your GitHub Client Secret                                                | You should have this stored, as GitHub only shows it once.    |
| NEXT_PUBLIC_METADATA_BASE_URL_DEV | Your local development URL (most likely <https://localhost:3000>) | Used for the metadata. |
| NEXT_PUBLIC_METADATA_BASE_URL_PROD | Your production URL (where you'll deploy CMD/> to) | N/A |

### Run the development server

```bash
npm run dev
```

This will start a HTTPS development server. HTTPS is required for authentication to work on Chromium browsers, however Firefox will work regardless.

> [!NOTE]
> `npm run dev` runs `next dev --experimental-https --turbo`.  
> If you don't want Turbopack and prefer Webpack, remove `--turbo` from the command.  
> If you don't want HTTPS, remove `--experimental-https` from the command.

> [!NOTE]
> CMD/> uses Vercel Speed Insights, if you don't want this you'll have to remove ``<SpeedInsights />`` from under the HTML tag in `layout.tsx`.

## Credits

### Inspiration

- [Reddit](https://old.reddit.com)
- Lemmy
  - [Photon](https://github.com/Xyphyn/photon) especially for a lot of inspiration with the UI.
  - Base Lemmy UI as well.
- [Discuit](https://www.discuit.net)

### Packages

Here is a list of all packages used:

  -  @auth/prisma-adapter
  -  @heroicons/react
  -  @hookform/resolvers
  -  @prisma/client
  -  @uiw/react-markdown-editor
  -  @uiw/react-markdown-preview
  -  @vercel/speed-insights
  -  bcrypt
  -  bcryptjs
  -  framer-motion
  -  katex
  -  next
  -  next-auth
  -  next-dev-https
  -  nextjs-toploader
  -  prisma-docs-generator
  -  react
  -  react-dom
  -  react-error-boundary
  -  react-helmet
  -  react-hook-form
  -  react-icons
  -  react-zorm
  -  sass
  -  swr
  -  use-debounce
  -  xss
  -  zod
  -  @types/bcrypt
  -  @types/bcryptjs
  -  @types/mdx
  -  @types/node
  -  @types/react
  -  @types/react-dom
  -  autoprefixer
  -  eslint
  -  eslint-config-next
  -  eslint-config-prettier
  -  postcss
  -  prettier
  -  prisma
  -  stylelint-config-recommended
  -  tailwindcss
  -  tailwindcss-themer
  -  ts-node
  -  typescript
  -  webpack
