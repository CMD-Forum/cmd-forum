import authConfig from "@/auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

import {
    defaultLoginRedirect,
    apiAuthPrefix,
    authRoutes,
    privateRoutes,
    publicOnlyRoutes
} from "@/routes"
import { NextResponse } from "next/server";

// @ts-ignore
export default auth((req) => {

    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPrivateRoute = privateRoutes.includes(nextUrl.pathname);
    const isPublicOnlyRoute = publicOnlyRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if ( isApiAuthRoute ) {
        return NextResponse.next();
    }

    if ( isAuthRoute ) {
        if ( isLoggedIn ) {
            return Response.redirect(new URL(defaultLoginRedirect, nextUrl));
        }

        return NextResponse.next();
    }

    if ( ! isLoggedIn && isPrivateRoute ) {
        return Response.redirect(new URL("/login", nextUrl));
    }

    if ( isLoggedIn && isPublicOnlyRoute ) {
        return Response.redirect(new URL("/posts", nextUrl))
    }

    return NextResponse.next();

})

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}