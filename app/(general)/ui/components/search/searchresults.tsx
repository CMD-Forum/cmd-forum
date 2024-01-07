import { prisma } from "@/app/(general)/lib/db";
import { CardPost } from "../posts/post";
import { useState } from "react";

interface SearchResultProps {

    query: string;
    currentPage: number;
    type: string;

}

export default async function SearchResults(search: SearchResultProps) {

    let results
    let result_community

    const formattedQuery = search.query
        .split(' ')
        .map(word => {

            if (word.startsWith('-')) {

                return '!' + word.slice(1);

            } else if (word.startsWith('+')) {

                return word.slice(1);

            } else {

                return word;

            }
        })
        .join(' & ');

    if ( search.type === "post" ) {

        results = await prisma.post.findMany({

            orderBy: {

                _relevance: {
                    fields: ['title', 'content'],
                    search: formattedQuery,
                    sort: 'desc'
                }

            },

            where: {

                OR: [
                    {
                        content: {
                            contains: formattedQuery,
                            mode: "insensitive",
                        },
                    },
                    {
                        author: {
                            
                            name: {

                                contains: formattedQuery,
                                mode: "insensitive",

                            },

                        },
                    },
                    {
                        title: {

                            contains: formattedQuery,
                            mode: "insensitive"

                        }
                    },
                    {

                        tagline: {

                            contains: formattedQuery,
                            mode: "insensitive"

                        }

                    }
                ]

            },

            include: {

                author: {

                    select: {

                        id: true,
                        name: true,
                        username: true,
                        createdAt: true,
                        updatedAt: true

                    }

                },

                community: {

                    select: {

                        id: true,
                        name: true,
                        image: true,
                        public: true

                    }

                }
            }
        });
        
        return (

            <div>

                {results && results.map((result) => (
                        
                    <div className="mb-4" key={result.id}>
                        <CardPost 
                            id={result.id}
                            title={result.title}
                            upvotes={result.upvotes}
                            downvotes={result.downvotes}
                            submitted={result.createdAt.toLocaleDateString()}
                            subtitle={result.tagline}
                            community={result.community}
                            author={result.author}
                        
                        >
                        </CardPost>
                    </div>

                ))}


            </div>

        )        

    } else if ( search.type === "community" ) {

        results = await prisma.community.findMany({

            orderBy: {

                _relevance: {
                    fields: ['name', 'display_name', 'description'],
                    search: formattedQuery,
                    sort: 'desc'
                }

            },

            where: {

                name: {
                    search: formattedQuery
                }

            },

        });    

    }


}