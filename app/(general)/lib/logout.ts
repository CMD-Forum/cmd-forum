"use server";

import { ActionResult } from "next/dist/server/app-render/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { getAuth, lucia } from "./auth";

/**
 * ## logout
 * ---
 * Logout the user.
 * @example
 *	<form action={logout}>
 *		<button>Sign out</button>
 *	</form>
 */


export async function logout(): Promise<ActionResult> {
	const { session } = await getAuth();
	if (!session) {
		redirect("/login");
	}

	await lucia.invalidateSession(session.id);

	const sessionCookie = lucia.createBlankSessionCookie();
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	redirect("/login");
}