
<h1 align="center">CMD Forum</h1>
<h3 align="center">Forum site built in React</h3>

<hr />

![CMD Forum](/public/main_bgcmd.png)

<div align="center"><img src="https://img.shields.io/badge/status-alpha_development-green"></img> <img src="https://img.shields.io/badge/latest_release-1.1.0-blue"></img></div>

<hr />

## Getting Started

### Create a GitHub OAuth App

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
| AUTH_SECRET          | Random, secure string. AuthJS recommends using `openssl rand -base64 32` to generate it | Don't share with to anybody, as this is meant to be _secret_  |
| GITHUB_CLIENT_ID     | Your GitHub Client ID (see your developer settings)                      | See your developer settings for this.                         |
| GITHUB_CLIENT_SECRET | Your GitHub Client Secret                                                | You should have this stored, as GitHub only shows it once.    |
| NEXT_PUBLIC_METADATA_BASE_URL_DEV | Your local development URL (most likely https://localhost:3000) | Used for the metadata |
| NEXT_PUBLIC_METADATA_BASE_URL_PROD | Your production URL (where you'll deploy CMD/> to) | N/A |

### Run the development server

```bash
npm run dev
```

This will start a HTTPS development server. HTTPS is required for authentication to work on Chromium browsers, however Firefox will work regardless.

> [!NOTE]
> `npm run dev` runs `next dev --experimental-https`

### Credits

CMD/> uses the following packages, so check them out:

```json

    Dependencies:

    "@auth/prisma-adapter": "^1.3.3",
    "@ducanh2912/next-pwa": "^10.0.2",
    "@heroicons/react": "^2.1.1",
    "@hookform/resolvers": "^3.3.2",
    "@prisma/client": "^5.9.1",
    "@uiw/react-markdown-preview": "^5.0.7",
    "bcrypt": "^5.1.1",
    "bcryptjs": "^2.4.3",
    "framer-motion": "^10.16.16",
    "github-markdown-css": "^5.5.0",
    "next": "^14.1.0",
    "next-auth": "^5.0.0-beta.4",
    "next-dev-https": "^0.13.3",
    "prisma-docs-generator": "^0.8.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-hook-form": "^7.49.2",
    "react-icons": "^4.12.0",
    "react-markdown": "^9.0.1",
    "react-popper": "^2.3.0",
    "react-tooltip": "^5.25.0",
    "react-zorm": "^0.9.0",
    "rehype-raw": "^7.0.0",
    "rehype-sanitize": "^6.0.0",
    "remark-breaks": "^4.0.0",
    "remark-gfm": "^4.0.0",
    "sass": "^1.69.5",
    "tailwind-variants": "^0.2.0",
    "use-debounce": "^10.0.0",
    "xss": "^1.0.14",
    "zod": "^3.22.4"

    Development Dependencies:

    "@types/bcrypt": "^5.0.2",
    "@types/bcryptjs": "^2.4.6",
    "@types/node": "^20.10.6",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "autoprefixer": "^10.0.1",
    "eslint": "^8",
    "eslint-config-next": "^14.1.0",
    "postcss": "^8",
    "prisma": "^5.9.1",
    "stylelint-config-recommended": "^14.0.0",
    "tailwindcss": "^3.4.0",
    "tailwindcss-themer": "^4.0.0",
    "ts-node": "^10.9.2",
    "typescript": "^5.3.3",
    "webpack": "^5.89.0"

```
