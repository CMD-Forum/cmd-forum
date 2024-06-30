import { NextRequest, NextResponse } from "next/server";

import {
    apiAuthPrefix,
    authRoutes,
    defaultLoginRedirect,
    privateRoutes,
    publicOnlyRoutes
} from "@/routes"

import { getAuth } from "../app/(general)/lib/auth";

export async function middleware(request: NextRequest) {

    const { nextUrl } = request
    const isLoggedIn = !!getAuth();

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

    if ( nextUrl.pathname === "/" ) {
        return Response.redirect(new URL("/posts", nextUrl));
    }
}

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}