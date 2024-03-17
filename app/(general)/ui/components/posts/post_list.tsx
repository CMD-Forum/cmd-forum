"use client";

import { CardPost } from '@/app/(general)/ui/components/posts/post';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Post } from '@/types/types';

const variants = {

    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    
};

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
        return (
            <div className='flex flex-col gap-4 mt-4'>
                <div className='flex w-full relative group transition-all bg-border h-[174px] rounded-md px-5 py-5 animate-pulse'></div>
                <div className='flex w-full relative group transition-all bg-border h-[174px] rounded-md px-5 py-5 animate-pulse'></div>    
                <div className='flex w-full relative group transition-all bg-border h-[174px] rounded-md px-5 py-5 animate-pulse'></div>    
                <div className='flex w-full relative group transition-all bg-border h-[174px] rounded-md px-5 py-5 animate-pulse'></div>
                <div className='flex w-full relative group transition-all bg-border h-[174px] rounded-md px-5 py-5 animate-pulse'></div>
                <div className='flex w-full relative group transition-all bg-border h-[174px] rounded-md px-5 py-5 animate-pulse'></div>
                <div className='flex w-full relative group transition-all bg-border h-[174px] rounded-md px-5 py-5 animate-pulse'></div>
                <div className='flex w-full relative group transition-all bg-border h-[174px] rounded-md px-5 py-5 animate-pulse'></div>            
            </div>
        );
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
                        createdAt={new Date(post.createdAt)}
                        updatedAt={new Date(post.updatedAt)}
                        title={post.title}
                        content={post.content}
                        tagline={post.tagline}
                        imageurl={post.imageurl}
                        imagealt={post.imagealt}
                        public={true}
                        authorId={post.author.id}
                        downvotes={post.downvotes}
                        upvotes={post.upvotes}
                        communityId={post.community.id}
                        author={post.author}
                        community={post.community}
 
                      />
                    </motion.div>

                  );
            })}
        </div>
    );
}
