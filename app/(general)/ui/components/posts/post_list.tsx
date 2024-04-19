"use client";

import { CardPost } from '@/app/(general)/ui/components/posts/post';
import { motion } from 'framer-motion';
import useSWR from 'swr';
import { XCircleIcon } from '@heroicons/react/16/solid';
import { useRouter } from "next/navigation";

const variants = {

    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    
};

export default function PostList() {

    const { data: posts, error, isLoading } = useSWR('/api/posts/getAll', {
        onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
          if (error.status === 404) return
          if (retryCount >= 1) return
          setTimeout(() => revalidate({ retryCount }), 1000)
        }
    })
    const router = useRouter();

    if ( isLoading ) {
        return (
            <div className='flex flex-col gap-4 mt-4'>
                <div className='flex w-full relative group transition-all bg-border h-[174px] rounded-md px-5 py-5 animate-pulse border-0'></div>
                <div className='flex w-full relative group transition-all bg-border h-[174px] rounded-md px-5 py-5 animate-pulse border-0'></div>    
                <div className='flex w-full relative group transition-all bg-border h-[174px] rounded-md px-5 py-5 animate-pulse border-0'></div>    
                <div className='flex w-full relative group transition-all bg-border h-[174px] rounded-md px-5 py-5 animate-pulse border-0'></div>
                <div className='flex w-full relative group transition-all bg-border h-[174px] rounded-md px-5 py-5 animate-pulse border-0'></div>
                <div className='flex w-full relative group transition-all bg-border h-[174px] rounded-md px-5 py-5 animate-pulse border-0'></div>
                <div className='flex w-full relative group transition-all bg-border h-[174px] rounded-md px-5 py-5 animate-pulse border-0'></div>
                <div className='flex w-full relative group transition-all bg-border h-[174px] rounded-md px-5 py-5 animate-pulse border-0'></div>   
                <div className='flex w-full relative group transition-all bg-border h-[174px] rounded-md px-5 py-5 animate-pulse border-0'></div>
                <div className='flex w-full relative group transition-all bg-border h-[174px] rounded-md px-5 py-5 animate-pulse border-0'></div>         
            </div>
        );
    }

    if ( error ) {
        return (
            <div className='flex flex-col items-center justify-center w-full relative group transition-all bg-card h-[174px] rounded-md px-5 py-5'>
                <p className='text-center text-gray-300 font-medium antialiased w-full'>Sorry, an error occurred.</p>
                <div className='flex gap-4 w-full items-center justify-center mt-4'>
                    <button className='navlink' onClick={() => router.refresh()} type='button'>Reload</button>
                </div>
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
