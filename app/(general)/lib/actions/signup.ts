"use server";

import { hash } from "@node-rs/argon2";
import { Prisma } from "@prisma/client";
import { generateIdFromEntropySize } from "lucia";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { userAgent } from "next/server";

import { lucia } from "../auth";
import { prisma } from "../db";
import { logError } from "../utils";

/**
 * ## signup
 * ---
 * @param {any} state
 * @param {FormData} formData
 */

export async function signup(state: any, formData: FormData) {

    // await new Promise(resolve => setTimeout(resolve, 1000))
    // console.log({ formData });

    const headersList = headers();

    const userAgentStructure = {headers: headersList}
    const agent = userAgent(userAgentStructure)

    if (formData === undefined) {
        return { error: "Sorry, the form failed to submit." }
    }

    const username = formData.get("username");
    if (
		typeof username !== "string" ||
		username.length < 2 ||
		username.length > 30 ||
		!/^[a-z0-9_-]+$/.test(username)
	) {
		return {
			error: "Username does not meet requirements."
		};
	}
	const password = formData.get("password");
	if (typeof password !== "string" || password.length < 6 || password.length > 255) {
		return {
			error: "Password does not meet requirements."
		};
	}

    const email = formData.get("email");
    if (typeof email !== "string" || email.length < 3 || email.length > 255) {
		return {
			error: "Email does not meet requirements."
		};
	}

    const passwordHash = await hash(password, {
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1
	});
	const userId = generateIdFromEntropySize(15);

    try {
        await prisma.user.create({
            data: {
                id: userId,
                username: username,
                email: email,
                password_hash: passwordHash
            }
        })        
    } catch (error) {
        // Normal Errors
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            switch(error.code) {
                case "P2002":
                    return { error: "User with this email or username already exists." }
                case "2007":
                    return { error: "The data could not be validated. Please refresh the page and try again." }
                case "P2024":
                    return { error: "The form timed out, please try submitting again. If this keeps happening, our database may be experiencing issues." }
                default:
                    return { error: "Something went wrong when creating your account, please try again." }
            }
        }
        // Unknown Errors (no code)
        if (error instanceof Prisma.PrismaClientUnknownRequestError) {
            return { error: "Something went wrong when creating your account, please try again." }
        }
        // Prisma Engine Crashes (unrelated to user)
        if (error instanceof Prisma.PrismaClientRustPanicError) {
            logError("Prisma Engine is reporting that it has crashed, please try restarting it immediately.")
            return { error: "The database is experiencing issues, please try again later." }
        }
        // Initalization Errors
        if (error instanceof Prisma.PrismaClientInitializationError) {
            logError("Prisma Engine is reporting that it has failed to initalize, please try restarting it immediately.")
            return { error: "The database is experiencing issues, please try again later." }
        }
        // Validation Errors
        if (error instanceof Prisma.PrismaClientValidationError) {
            return { error: "The database is experiencing issues, please try again later." }
        }
    }

    const session = await lucia.createSession(userId, {
        ip_address: headersList.get('x-real-ip') || headersList.get('x-forwarded-for') || "Unknown",
        userAgent: headersList.get('user-agent') || "Unknown",
        isBot: agent.isBot || false,
        browser: agent.browser,
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
	return redirect("/posts"); // Make onboarding flow on signup?

}