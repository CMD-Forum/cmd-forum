import NextAuth from "next-auth"

declare module "next-auth" {

    interface User {

        username: string,
        name: string,
        profile_image: string,

    }

    interface Session {

        user: User & {

            username: string,
            name: string,
            profile_image: string,

        }

        token: {

            username: string,
            name: string,
            profile_image: string

        }

    }

}