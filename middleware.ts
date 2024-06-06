import NextAuth from "next-auth";

import authConfig from "@/auth.config";

const { auth } = NextAuth(authConfig);

import { NextResponse } from "next/server";

import {
    apiAuthPrefix,
    authRoutes,
    defaultLoginRedirect,
    privateRoutes,
    publicOnlyRoutes
} from "@/routes"

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
        return Response.redirect(new URL("/posts", nextUrl));
    }

    /*if ( nextUrl.pathname === "/ui/dev" ) { // Broken, will fix later - 11/05/24.
        if ( req.auth ) 
        if ( req.auth?.user.role !== "ADMIN" ) {
            return Response.redirect(new URL("/404", nextUrl));
        };
    }; */

    if ( nextUrl.pathname === "/" ) {
        return Response.redirect(new URL("/posts", nextUrl));
    }

    return NextResponse.next();

})

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}