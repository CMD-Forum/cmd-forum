"use client";

import { CardPost } from '@/app/(general)/ui/components/posts/post';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const variants = {

    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    
};

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

export default function PostListCustom( post: any ) {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        setPosts(post);
    }, [post])
    

    return (
        <>
            {Array.isArray(posts) && posts.map((post) => {
        
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
                        subtitle={post.tagline}
                        image_alt={post.image_alt}
                        imageurl={post.image_src}
                      />
                  );
            })}
        </>
    );
}
