/**

* Array of routes forbidden to unauthenticated users.
* Examples include "/account" and "/create".
* @type {string[]}

*/

export const privateRoutes: string[] = [
    "/account",
    "/account/settings",
    "/create",
    "/create/:path"
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

* Route that should always be accessible.
* "/api/auth" is provided.
* @type {string}

*/

export const apiAuthPrefix: string = "/api/auth";

/**

* Route where the user is redirected to after a successful login.
* @type {string}

*/

export const defaultLoginRedirect: string = "https://localhost:3000/account"