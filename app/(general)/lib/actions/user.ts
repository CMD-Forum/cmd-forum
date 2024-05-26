"use server";

import { prisma } from "@/app/(general)/lib/db";
import { Prisma } from "@prisma/client";

export async function ChangeAccountUsername( { userID, newUsername } : { userID: string, newUsername: string }) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userID,
            },
        });

        if ( user ) {
            const updatedUser = await prisma.user.update({
                where: {
                    id: userID,
                },
                data: {
                    username: newUsername,
                },
            });
            return { success: "Successfully changed username." }
        }
        return { error: "Couldn't change username, please try again later."}

    } catch ( error ) {
        return { error: "Couldn't change description, please try again later."}
    }
}

export async function ChangeAccountDescription( { userID, description } : { userID: string, description: string }) {
    
    console.log("executing change description");

    try {

        
        const user = await prisma.user.findUnique({
            where: {
                id: userID,
            },
        });

        console.log("finding user");

        if ( user ) {

            console.log("found user");

            const updatedUser = await prisma.user.update({
                where: {
                    id: userID,
                },
                data: {
                    description: description,
                },
            });

            console.log("updated user");

            return { success: "Successfully updated description." }

        }

        console.log("user not found");
        return { error: "Couldn't change description, please try again later."}

    } catch ( error ) {
        return { error: "Couldn't change description, please try again later."}
    }

}

export async function DeleteAccount( { userID } : { userID: string }) {
    
    try {

        const user = await prisma.user.findUnique({
            where: {
                id: userID,
            },
        });

        if ( user ) {

            const deletedPosts = await prisma.post.delete({
                // @ts-ignore
                where: {
                    author: { id: userID },
                },
            });

            const deletedUser = await prisma.user.delete({
                where: {
                    id: userID,
                },
            });

            return { success: "Successfully deleted account." }

        }

        return { error: "Couldn't delete account, please try again later."}

    } catch ( error ) {
        return { error: "Couldn't change description, please try again later."}
    }

}