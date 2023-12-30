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

export default function PostList() {
    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true);
            const res = await fetch('/api/posts');
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
        <>
            {Array.isArray(posts) && posts.map((post) => {
                const totalVotes = post.upvotes + post.downvotes;
                const ratio = totalVotes > 0 ? ((post.upvotes / totalVotes) * 100).toFixed(2) : '0';
        
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
                        ratio={`${ratio}%`}
                        subtitle={post.tagline}
                        link={`/posts/${post.id}`}
                        image_alt={post.image_alt}
                        imageurl={post.image_src}
                      />
                    </motion.div>
                  );
            })}
        </>
    );
}
