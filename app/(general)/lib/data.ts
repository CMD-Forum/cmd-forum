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
                username: username
            }
        }
    })

}