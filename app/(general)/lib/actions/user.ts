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

        console.log("Found the user to update");

        if ( user ) {

            const updatedUser = await prisma.user.update({
                where: {
                    id: userID,
                },
                data: {
                    username: newUsername,
                },
            });

            console.log("Updated Username");

            return { success: "Successfully changed username." }

        }

        return { error: "Couldn't change username, please try again later."}

    } catch ( error ) {

        console.log("Error when updating username: ", error);

        if ( error instanceof Prisma.PrismaClientKnownRequestError ) {

            switch (error.code) {

                case "P100" || "P1001" || "P1002" || "P1003" || "P1009" || "P1010" || "P1011" || "P1012" || "P1013" || "P1014" || "P1015" || "P1016" || "P1017": 
                    return { error: "The database couldn't be reached, please try again later." }
                case "P1008":
                    return { error: "The change took too long to complete, please try again later." }
                case "P2002":
                    return { error: "Sorry, that username is taken." }
                default:
                    return { error: "Sorry, something went wrong. Please try again later."}

            }


        } else {

            return { error: "Couldn't change username, please try again later."}

        }

    }

}

export async function Func_ChangeAccountDescription( { userID, description } : { userID: string, description: string }) {
    
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

        if ( error instanceof Prisma.PrismaClientKnownRequestError ) {

            switch (error.code) {

                case "P100" || "P1001" || "P1002" || "P1003" || "P1009" || "P1010" || "P1011" || "P1012" || "P1013" || "P1014" || "P1015" || "P1016" || "P1017": 
                    return { error: "The database couldn't be reached, please try again later." }
                case "P1008":
                    return { error: "The change took too long to complete, please try again later." }
                default:
                    return { error: "Sorry, something went wrong. Please try again later."}

            }


        } else {

            return { error: "Couldn't change description, please try again later."}

        }

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

            const deletedUser = await prisma.user.delete({
                where: {
                    id: userID,
                },
            });

            return { success: "Successfully deleted account." }

        }

        return { error: "Couldn't delete account, please try again later."}

    } catch ( error ) {


        if ( error instanceof Prisma.PrismaClientKnownRequestError ) {

            switch (error.code) {

                case "P100" || "P1001" || "P1002" || "P1003" || "P1009" || "P1010" || "P1011" || "P1012" || "P1013" || "P1014" || "P1015" || "P1016" || "P1017": 
                    return { error: "The database couldn't be reached, please try again later." }
                case "P1008":
                    return { error: "The deletion took too long to complete, please try again later." }
                default:
                    return { error: "Sorry, something went wrong. Please try again later."}

            }


        } else {

            return { error: "Couldn't change username, please try again later."}

        }

    }

}