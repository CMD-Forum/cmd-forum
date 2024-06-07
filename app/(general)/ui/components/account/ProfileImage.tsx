"use client";

import { User } from "@prisma/client";

import { PostAuthor } from "@/types/types";

/**
 * Returns the profile image of a user, and if it doesn't exist then returns the initials.
 * @param {User} user
 * @param {number} imgSize Size of the image, in TailwindCSS units (1unit = 4px).
 * @example
 * <ProfileImage user={post.author} />
 */

export default function ProfileImage({ user, imgSize = "8" }: { user: User | PostAuthor, imgSize?: string }) {

    const size = `${0.25 * Number(imgSize)}rem`; // One unit in Tailwind is equal to 0.25rem, so we just multiply 0.25 by the imgSize.

    if ( user ) {
        if ( user.image ) {
            return (
                <img style={{width: size, height: size}} className={`rounded`} src={user.image} alt={`Profile Image of @${user.username}`} />
            );
        } else if ( ! user.image ) {
            return (
                <img style={{width: size, height: size}} className={`rounded`} src={"/ProfileImage.svg"} alt={`Profile Image of @${user.username}`} />
            );            
        }    
    } else {
        return (
            <img style={{width: size, height: size}} className={`rounded`} src={"/ProfileImage.svg"} alt={`Profile Image couldn't be loaded`} />
        );
    }

}