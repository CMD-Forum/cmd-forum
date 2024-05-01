"use server";

import { prisma } from "./db";

// getUserBy

export async function getUserById( id: string ) {

    const user = await prisma.user.findUnique({
        where: {
            id: id,
        },
    });

    return user;

}

export async function getUserByEmail( email: string ) {

    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });

    return user;

}

export async function getUserByUsername( username: string ) {

    const user = await prisma.user.findUnique({
        where: {
            username: username,
        },
    });

    return user;

}

// getCommunityBy

export async function getCommunityById( id: string ) {

    const community = await prisma.community.findUnique({
        where: {
            id: id,
        },
    });

    return community;

}

export async function getCommunityByName( name: string ) {

    const community = await prisma.community.findUnique({
        where: {
            name: name,
        },
    });

    return community;

}

export async function getCommunityByDisplayName( display_name: string ) {

    const community = await prisma.community.findUnique({
        where: {
            display_name: display_name,
        },
    });

    return community;

}

// createPost

interface createPostProps {

    title: string
    content: string
    tagline: string
    imageurl: string | null | undefined
    imagealt: string | null | undefined
    authorId: string
    communityId: string

}

export async function createPost( props: createPostProps ) {

    const post = await prisma.post.create({
        data: {
            title: props.title,
            content: props.content,
            tagline: props.tagline,
            imageurl: props.imageurl,
            imagealt: props.imagealt,
            authorId: props.authorId,
            communityId: props.communityId
        }
    });

    return post;

}

// getAllPosts

export async function getAllPostsFromUsername( username: string ) {
    
    const posts = await prisma.post.findMany({
        where: {
            author: {
                username: {
                    equals: username
                }
            }
        },
        include: {
            community: true,
            author: {
                select: {
                    username: true,
                    description: true,
                    name: true,
                    createdAt: true,
                    updatedAt: true,
                    image: true,
                }
            }
        }
    })

    return posts;

}

export async function getAllPostsFromCommunityID( id: string ) {
    
    const posts = await prisma.post.findMany({
        where: {
            community: {
                id: {
                    equals: id
                }
            }
        },
        include: {
            community: true,
            author: {
                select: {
                    username: true,
                    description: true,
                    name: true,
                    createdAt: true,
                    updatedAt: true,
                    image: true,
                }
            }
        }
    })

    return posts;

}

// createCommunity

export async function createCommunity( { community_name, description, admin_ids }: { community_name: string, description: string, admin_ids: string[] } ) {

    const post = await prisma.community.create({
        data: {
            name: community_name.toLowerCase(),
            display_name: community_name,
            description: description,
            admin_ids: admin_ids
        }
    });

    return post;

}

// getCommunityAdminIDs

/**
 * Returns the IDs of all admins of the specified community.
 * @param string communityId
 * @returns 
 */

export async function getCommunityAdminIDs( { communityId }: { communityId: string }) {

    const admins = await prisma.community.findUnique({
        where: {
            id: communityId,
        },
        select: {
            admin_ids: true,
        }
    });

    if (admins) {
        console.log("Admins:", admins.admin_ids);    
        return admins.admin_ids
    } else {
        console.log("No Admins");
    }

}

// getAllCommunitys

/**
 * Returns all communitys.
 * @returns 
 */

export async function getAllCommunitys() {

    const communitys = await prisma.community.findMany();

    if (communitys) {   
        return communitys
    } else {
        console.log("No Communitys");
    }

}