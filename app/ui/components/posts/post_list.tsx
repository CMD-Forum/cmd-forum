"use client";

import { CardPost } from '@/app/ui/components/posts/post';
import { useState, useEffect } from 'react';

interface Post {

    id: number;
    title: string;
    community: string;
    author: string;
    upvotes: number;
    downvotes: number;
    createdAt: string;
    tagline: string;
    link: string;
    image_alt?: string;
    image_src?: string;

}

export default function PostList() {

    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {

        const fetchPosts = async () => {

            const res = await fetch('/api/posts');
            const data = await res.json();
            setPosts(data);

        };

        fetchPosts();

    }, []);

    return (
        <>
            {Array.isArray(posts) && posts.map((post) => {

                const totalVotes = post.upvotes + post.downvotes;
                const ratio = totalVotes > 0 ? ((post.upvotes / totalVotes) * 100).toFixed(2) : '0';
        
                return (

                    <CardPost 

                        key={post.id}
                        id={post.id}
                        title={post.title}
                        community={post.community}
                        author={post.author}
                        upvotes={post.upvotes}
                        downvotes={post.downvotes}
                        submitted={new Date(post.createdAt).toLocaleDateString()}
                        ratio={`${ratio}%`}
                        subtitle={post.tagline}
                        link={`/c/${post.community.name}/post/${post.id}`}
                        image_alt={post.image_alt}
                        imageurl={post.image_src}
                        
                    />
                );

            })}

        </>

    );

}

