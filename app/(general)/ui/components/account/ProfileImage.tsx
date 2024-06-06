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

    if ( user ) {
        if ( user.image ) {
            return (
                <img className={`w-${imgSize} h-${imgSize} rounded`} src={user.image} alt={`Profile Image of @${user.username}`} />
            );
        } else if ( ! user.image ) {
            return (
                <img className={`w-${imgSize} h-${imgSize} rounded`} src={"/ProfileImage.svg"} alt={`Profile Image of @${user.username}`} />
            );            
        }    
    } else {
        return (
            <img className={`w-${imgSize} h-${imgSize} rounded`} src={"/ProfileImage.svg"} alt={`Profile Image couldn't be loaded`} />
        );
    }

}