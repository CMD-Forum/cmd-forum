import { prisma } from "@/app/(general)/lib/db";
import { CardPost } from "../posts/post";

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
                        title: {
                            contains: formattedQuery,
                            mode: "insensitive",
                        },
                    },
                    {
                        content: {
                            contains: formattedQuery,
                            mode: "insensitive",
                        },
                    },
                    {
                        author: {
                            username: {
                                contains: formattedQuery,
                                mode: "insensitive",
                            },
                        },
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
                        updatedAt: true,
                        image: true,
                        description: true,

                    }

                },

                community: {

                    select: {

                        id: true,
                        name: true,
                        display_name: true,
                        image: true,
                        public: true

                    }

                }
            }
        });
        
        return (

            <div>

                {results && results.map((result) => (
                        
                    <div className="w-full px-6 lg:px-48" key={result.id}>
                        <CardPost 
                            id={result.id}
                            title={result.title}
                            createdAt={result.createdAt}
                            updatedAt={result.updatedAt}
                            content={result.content}
                            imageurl={result.imageurl}
                            imagealt={result.imagealt}
                            public={result.public}
                            tagline={result.tagline}
                            community={result.community}
                            author={result.author}
                        />
                        <div className="!mt-4 !mb-4 w-full" />
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