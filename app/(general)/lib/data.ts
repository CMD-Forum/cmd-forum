import { prisma } from "./db";

// getUserBy

export function getUserById( id: string ) {

    const user = prisma.user.findUnique({
        where: {
            id: id,
        },
    });

    return user;

}

export function getUserByEmail( email: string ) {

    const user = prisma.user.findUnique({
        where: {
            email: email,
        },
    });

    return user;

}

export function getUserByUsername( username: string ) {

    const user = prisma.user.findUnique({
        where: {
            username: username,
        },
    });

    return user;

}
