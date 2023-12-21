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
    submitted: string;
    ratio: string;
    subtitle: string;
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
            {Array.isArray(posts) && posts.map((post) => (

                <CardPost 

                    key={post.id}
                    title={post.title}
                    community={post.community}
                    author={post.author}
                    upvotes={post.upvotes}
                    downvotes={post.downvotes}
                    submitted={post.submitted}
                    ratio={post.ratio}
                    subtitle={post.subtitle}
                    link={`/c/${post.community.name}/post/${post.id}`}
                    image_alt={post.image_alt}
                    image_src={post.image_src}

                />

            ))}
        </>
    );
}
