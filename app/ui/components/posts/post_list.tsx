"use client";

import { CardPost } from '@/app/ui/components/posts/post';
import { useState, useEffect } from 'react';

export default function PostList() {

    const [posts, setPosts] = useState([]);

    useEffect(() => {

        const fetchPosts = async () => {

            const res = await fetch('/api/posts');  // Replace '/api/posts' with your actual API endpoint.
            const data = await res.json();
            setPosts(data);

        };

        fetchPosts();

    }, []);

    return (
        <>
            {posts.map((post) => (

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
                    link={`/${post.community}/c/post/${post.id}`}
                    image_alt={post.image_alt}
                    image_src={post.image_src}

                />

            ))}
        </>
    );
}
