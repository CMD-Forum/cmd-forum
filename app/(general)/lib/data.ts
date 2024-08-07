"use server";

import { prisma } from "./db";
import { logError, logMessage } from "./utils";

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

// getPost

export async function getPost({ postID }: { postID: string }) {

    const fetchedPost = await prisma.post.findUnique({
        where: {
          id: postID,
        },
        include: {
          community: {
            select: {
              id: true,
              display_name: true,
              name: true,
              image: true,
              public: true,
              description: true,
            },
          },
          author: {
            select: {
              id: true,
              username: true,
              description: true,
              image: true,
              createdAt: true,
              updatedAt: true,
            },
          },
        },
      });

    return fetchedPost;

}

// createPost

interface createPostProps {

    title: string
    content: string
    imageurl?: string | null | undefined
    imagealt?: string | null | undefined
    authorId: string
    communityId: string
    href?: string;

}

export async function createPost( props: createPostProps ) {

    const post = await prisma.post.create({
        data: {
            title: props.title,
            content: props.content,
            imageurl: props.imageurl,
            imagealt: props.imagealt,
            authorId: props.authorId,
            communityId: props.communityId,
            href: props.href
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

/**
 * Creates a community with the given params.
 * @param name The name of the community (Display name, not DB name).
 * @param description The description of the community.
 * @param creatorUserID The UserID of the community creator.
 * @returns {Community}
 */

export async function createCommunity( { name, description, creatorUserID }: { name: string, description: string, creatorUserID: string } ) {

    const community = await prisma.community.create({
        data: {
            name: name.toLowerCase(),
            display_name: name,
            description: description,
        },
    });

    await prisma.communityAdminship.create({
        data: {
            userId: creatorUserID,
            communityId: community.id,
        },
    });

    return community;

}

// getCommunityAdminIDs

/**
 * Returns the IDs of all admins of the specified community.
 * @param communityId The ID of the community.
 * @returns {Community}
 * @deprecated 'getCommunityAdminIDs' is deprecated.
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
        return admins.admin_ids
    } else {
        logMessage("Community has no administrators.");
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
        return communitys;
    } else {
        logMessage("No communities returned from database.");
    }

}

// updateUserMembership

export async function getAllUserMembershipRecords({ userID }: { userID: string }) {
    try {
        const userMemberships = await prisma.user.findUnique({
            where: {
                id: userID,
            },
            select: {
                memberships: {
                    select: {
                        community: true,
                    }
                },
            }
        });     
        return userMemberships;          
    } catch ( error ) {
        logError(error);
        return false;
    }
}

export async function createUserMembershipRecord({ userID, communityID }: { userID: string, communityID: string }) {

    try {
        const updatedAuthor = await prisma.user.update({
            where: {
                id: userID,
            },
            data: {
                memberships: {
                    create: {
                        communityId: communityID,
                    },
                },                    
            },
        });     
        return updatedAuthor;          
    } catch ( error ) {
        logError(error);
        return false;
    }

}

export async function deleteUserMembershipRecord({ userID, communityID }: { userID: string, communityID: string }) {

    try {
        const updatedRecord = await prisma.communityMembership.deleteMany({
            where: {
                userId: userID,
                communityId: communityID
            },
        });     
        return updatedRecord;          
    } catch ( error ) {
        logError(error);
        return false;
    }

}

export async function countCommunityMembers({ communityID }: { communityID: string }) {
    try {
        const communityMemberships = await prisma.communityMembership.count({
            where: {
                communityId: communityID,
            },
        });     
        return communityMemberships;          
    } catch ( error ) {
        logError(error);
        return undefined;
    }
}

export async function countCommunityPosts({ communityID }: { communityID: string }) {
    try {
        const communityPosts = await prisma.post.count({
            where: {
                communityId: communityID,
            },
        });     
        return communityPosts;          
    } catch ( error ) {
        logError(error);
        return undefined;
    }
}

// Upvotes

export async function checkIfVoted({ postID, userID }: { postID: string, userID: string }) {
    try {
        const upvote = await prisma.upvotes.findUnique({
            where: {
                upvoteID: { userID, postID }
            }
        })

        const downvote = await prisma.downvotes.findUnique({
            where: {
                downvoteID: { userID, postID }
            }
        })
        
        return { upvote: upvote ? true : false, downvote: downvote ? true : false }
    } catch ( error ) {
        logError(error);
        return { error: error }
    }
}

export async function upvote({ postID, userID }: { postID: string, userID: string }) {
    try {
        const upvote = await prisma.upvotes.create({
            data: {
                userID: userID,
                postID: postID,
            }
        })
        
        return { upvote }
    } catch ( error ) {
        logError(error);
        return { error: error }
    }
}

export async function downvote({ postID, userID }: { postID: string, userID: string }) {
    try {
        const downvote = await prisma.downvotes.create({
            data: {
                userID: userID,
                postID: postID
            }
        })
        
        return { downvote }
    } catch ( error ) {
        logError(error);
        return { error: error }
    }
}

export async function removeUpvote({ postID, userID }: { postID: string, userID: string }) {
    try {
        await prisma.upvotes.delete({
            where: {
                upvoteID: { userID, postID }
            }
        })
        
        return { message: "Removed Successfully" }
    } catch ( error ) {
        logError(error);
        return { error: error }
    }
}

export async function removeDownvote({ postID, userID }: { postID: string, userID: string }) {
    try {
        await prisma.downvotes.delete({
            where: {
                downvoteID: { userID, postID }
            }
        })
        
        return { message: "Removed Successfully" }
    } catch ( error ) {
        logError(error);
        return { error: error }
    }
}

export async function getTotalUpvotes({ postID }: { postID: string }) {
    try {
        const upvotes = await prisma.upvotes.count({
            where: {
                postID: postID
            }
        })
        
        return upvotes
    } catch ( error ) {
        logError(error);
        return { error: error }
    }
}

export async function getTotalDownvotes({ postID }: { postID: string }) {
    try {
        const downvotes = await prisma.downvotes.count({
            where: {
                postID: postID
            }
        })
        
        return downvotes
    } catch ( error ) {
        logError(error);
        return { error: error }
    }
}

// Testing Purposes

export async function getJamsterJavaCommunityMemberOf() {
    
    const user = await prisma.user.findUnique({ where: { username: "JamsterJava" }, include: { memberships: true } })

    if ( user ) {
        console.log(user);
        return user;
    } else {
        console.log("JamsterJava hasn't joined any communities.")
    }

}