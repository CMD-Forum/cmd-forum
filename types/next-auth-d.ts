/**
 * This file may not do anything, but it makes errors sometimes so I keep it updated with the `auth.ts` file.
 */

import { UserRole } from "@prisma/client"

declare module "next-auth" {

    interface User {

        // @ts-ignore
        id: string;
        username: string;
        profile_image: string;

    }

    interface Session {


        user: User & { role: UserRole },

        token: {

            id: string;
            sub: string;
            role: UserRole;
            picture: string;
            username: string;
            description: string;
            usernameLastUpdated: Date | null;

        }

    }

}