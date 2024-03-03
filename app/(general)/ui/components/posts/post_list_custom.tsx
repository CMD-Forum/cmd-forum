"use client";

import { CardPost } from '@/app/(general)/ui/components/posts/post';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getAllPostsFromUsername } from '@/app/(general)/lib/data';

const variants = {

    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    
};

export default function PostListByUser( { username }: { username: string } ) {
    const [loading, setIsLoading] = useState<boolean>(true);
    const [posts, setPosts] = useState<any>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true);
            try {
                const data = await getAllPostsFromUsername( username );
                setPosts(data);
                setIsLoading(false);                
            } catch (error) {
                return (
                   <h2 className='header'>This user&apos;s posts could not be returned.</h2> 
                );
            } finally {
                setIsLoading(false);
            }

        };
        fetchPosts();
    }, [username])

    if ( loading ) {
        return (
            <div className='flex flex-col gap-4 mt-4'>
                <div className='flex w-full relative group transition-all bg-card h-[174px] rounded-md px-5 py-5'></div>
                <div className='flex w-full relative group transition-all bg-card h-[174px] rounded-md px-5 py-5'></div>    
                <div className='flex w-full relative group transition-all bg-card h-[174px] rounded-md px-5 py-5'></div>    
                <div className='flex w-full relative group transition-all bg-card h-[174px] rounded-md px-5 py-5'></div>            
            </div>
        );
    }

    return (
        <>
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
                      <hr className='!mt-0 !mb-0'></hr>
                    </motion.div>
                  );
            })}
        </>
    );
}
