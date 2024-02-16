import { prisma } from "./db";

export function getUserByEmail( email: string ) {

    const user = prisma.user.findUnique({
        where: {
            email: email,
        },
    });

    return user;

}