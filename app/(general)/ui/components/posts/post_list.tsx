"use client";

import { CardPost } from '@/app/(general)/ui/components/posts/post';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const variants = {

    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    
};

interface Post {
    id: string;
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
    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true);
            const res = await fetch('/api/posts/getAll');
            const data = await res.json();
            setPosts(data);
            setIsLoading(false);
        };

        fetchPosts();
    }, []);

    if (isLoading) {
        return <div className='post-loading-text'></div>;
    }

    return (
        <div className='flex flex-col gap-4'>
            {Array.isArray(posts) && posts.map((post) => {
        
                return (
                    <motion.div 
                      key={post.id}
                      variants={variants}
                      initial="hidden"
                      animate="visible"
                      transition={{ ease: "easeInOut", duration: 0.8, type: "spring" }}
                    >
                      <CardPost 
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
                    </motion.div>
                  );
            })}
        </div>
    );
}
