import { OAuth2RequestError } from "arctic";
import { generateIdFromEntropySize } from "lucia";
import { cookies } from "next/headers";

import { github, lucia } from "@/app/(general)/lib/auth";
import { prisma } from "@/app/(general)/lib/db";
import { redirect } from "next/navigation";

export async function GET(request: Request): Promise<Response> {
	const url = new URL(request.url);
	const code = url.searchParams.get("code");
	const state = url.searchParams.get("state");
	const storedState = cookies().get("github_oauth_state")?.value ?? null;
	if (!code || !state || !storedState || state !== storedState) {
		return new Response(null, {
			status: 400
		});
	}

	try {
		const tokens = await github.validateAuthorizationCode(code);
		const githubUserResponse = await fetch("https://api.github.com/user", {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`
			}
		});
		const githubUser: GitHubUser = await githubUserResponse.json();

		
		const emailsResponse = await fetch("https://api.github.com/user/emails", {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`
			}
		});
		const emails = await emailsResponse.json();

		// @ts-ignore
		const primaryEmail = emails.find((email) => email.primary) ?? null;
		if (!primaryEmail) {
			return new Response("No primary email address", {
				status: 400
			});
		}
		if (!primaryEmail.verified) {
			return new Response("Unverified email", {
				status: 400
			});
		}


		// Replace this with your own DB client.
		const existingUser = await prisma.user.findUnique({ where: { github_id: githubUser.id } });

		if (existingUser) {
			const session = await lucia.createSession(existingUser.id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
			return new Response(null, {
				status: 302,
				headers: {
					Location: "/"
				}
			});
		}

		const userId = generateIdFromEntropySize(10); // 16 characters long

		// Replace this with your own DB client.
		await prisma.user.create({
            data: {
                id: userId,
                github_id: githubUser.id,
                username: githubUser.login, 
                email: primaryEmail.email,
                image: githubUser.avatar_url,
                description: githubUser.bio, 
            }
		});

		const session = await lucia.createSession(userId, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
		return new Response(null, {
			status: 302,
			headers: {
				Location: "/"
			}
		});
	} catch (e) {
        console.log(e);
		// the specific error message depends on the provider
		if (e instanceof OAuth2RequestError) {
			// invalid code
			return new Response(null, {
				status: 400
			});
		}
		return new Response(null, {
			status: 500,
            headers: {
                Location: "/"
            }
		});
	}
}

interface GitHubUser {
	id: number;
	login: string;
    email: string;
    avatar_url: string;
    bio: string;
}