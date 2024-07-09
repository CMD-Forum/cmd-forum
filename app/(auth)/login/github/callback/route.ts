import { OAuth2RequestError } from "arctic";
import { generateIdFromEntropySize } from "lucia";
import { cookies, headers } from "next/headers";
import { userAgent } from "next/server";

import { github, lucia } from "@/app/(general)/lib/auth";
import { prisma } from "@/app/(general)/lib/db";

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

	const headersList = headers();

    const userAgentStructure = {headers: headersList}
    const agent = userAgent(userAgentStructure)

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

		const existingUser = await prisma.user.findUnique({ where: { github_id: githubUser.id } });

		if (existingUser) {
			const session = await lucia.createSession(existingUser.id, {
				ip_address: headersList.get('x-real-ip') || headersList.get('x-forwarded-for') || "Unknown",
				userAgent: headersList.get('user-agent') || "Unknown",
				isBot: agent.isBot || false,
				browserName: agent.browser.name || "Unknown",
				browserVersion: agent.browser.version || "Unknown",
				deviceModel: agent.device.model || "Unknown",
				deviceType: agent.device.type || "Unknown",
				deviceVendor: agent.device.vendor || "Unknown",
				osName: agent.os.name || "Unknown",
				osVersion: agent.os.version || "Unknown",
				fresh: false
			});
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

		const session = await lucia.createSession(userId, {
			ip_address: headersList.get('x-real-ip') || headersList.get('x-forwarded-for') || "Unknown",
			userAgent: headersList.get('user-agent') || "Unknown",
			isBot: agent.isBot || false,
			browserName: agent.browser.name || "Unknown",
			browserVersion: agent.browser.version || "Unknown",
			deviceModel: agent.device.model || "Unknown",
			deviceType: agent.device.type || "Unknown",
			deviceVendor: agent.device.vendor || "Unknown",
			osName: agent.os.name || "Unknown",
			osVersion: agent.os.version || "Unknown",
			fresh: false
		});
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