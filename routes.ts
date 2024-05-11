/**

* Array of routes forbidden to unauthenticated users.
* Examples include "/account" and "/create".
* @type {string[]}

*/

import { env } from "process";

export const privateRoutes: string[] = [
    "/account",
    "/account/settings",
    "/account/:path",
    "/create",
    "/create/:path",
    "/posts/saved",
    "/ui/:path",
    "/ui/dev"
]

/**

* Array of routes crucial to authentication.
* Consists of "/login" and "/signup".
* @type {string[]}

*/

export const authRoutes: string[] = [
    "/login",
    "/signup",
    "/auth"
]

/**

* Array of routes that should not be accessible to logged in users.
* @type {string[]}

*/

export const publicOnlyRoutes: string[] = [
    "/",
]

/**

* Route that should always be accessible.
* "/api/auth" is provided.
* @type {string}

*/

export const apiAuthPrefix: string = "/api/auth";

/**

* Route where the user is redirected to after a successful login.
* @type {string}

*/

// @ts-ignore

const nextEnviroment = process.env.NODE_ENV;
let currentURL;

if ( nextEnviroment == "development" ) {
    currentURL = process.env.NEXT_PUBLIC_METADATA_BASE_URL_DEV
}
else if ( nextEnviroment == "production") {
    currentURL = process.env.NEXT_PUBLIC_METADATA_BASE_URL_PROD
}

// @ts-ignore
export const defaultLoginRedirect: string = "/posts";