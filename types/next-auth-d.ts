import NextAuth from "next-auth"

declare module "next-auth" {

    interface User {

        username: string,
        name: string

    }

    interface Session {

        user: User & {

            username: string,
            name: string

        }

        token: {

            username: string,
            name: string

        }

    }

}