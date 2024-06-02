"use client";

import { PostAuthor } from "@/types/types";
import { User } from "@prisma/client";

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
            const initial = user.username[0];
            return (
                <p className={`flex justify-center items-center w-${imgSize} h-${imgSize} rounded bg-border-light !text-white font-medium leading-none overflow-ellipsis whitespace-nowrap overflow-hidden text-${imgSize}`} aria-label={`Profile Image of @${user.username}`}>
                    {initial}
                </p>
            );            
        }    
    } else {
        return (
            <div className={`flex justify-center items-center w-${imgSize} h-${imgSize} rounded bg-border-light !text-white font-medium leading-none`} aria-label="Profile Image not available.">
                ?
            </div>
        );
    }

}