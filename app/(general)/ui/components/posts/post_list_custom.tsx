"use client";

import { CardPost } from '@/app/(general)/ui/components/posts/post';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getAllPostsFromCommunityID, getAllPostsFromUsername } from '@/app/(general)/lib/data';
import { Post } from '@/types/types';
import { useRouter } from 'next/navigation';

export default function PostListByUser( { username }: { username: string } ) {
    const [loading, setIsLoading] = useState<boolean>(true);
    const [posts, setPosts] = useState<Post[]>([]);

    const router = useRouter();

    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true);
            try {
                const data = await getAllPostsFromUsername( username );
                // @ts-ignore
                setPosts(data);
                setIsLoading(false);                
            } catch (error) {
                return (
                    <div className='flex flex-col items-center justify-center w-full relative group transition-all bg-card h-[174px] rounded-md px-5 py-5'>
                        <p className='text-center text-gray-300 font-medium antialiased w-full'>Sorry, this user&apos;s posts couldn&apos;t be displayed.</p>
                        <div className='flex gap-4 w-full items-center justify-center mt-4'>
                            <button className='navlink' onClick={() => router.refresh()} type='button'>Reload</button>
                        </div>
                    </div>
                );
            } finally {
                setIsLoading(false);
            }

        };
        fetchPosts();
    }, [username, router])

    if ( loading ) {
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
                <div className='flex w-full relative group transition-all bg-border h-[174px] rounded-md px-5 py-5 animate-pulse'></div>
                <div className='flex w-full relative group transition-all bg-border h-[174px] rounded-md px-5 py-5 animate-pulse'></div>        
            </div>
        );
    }

    return (
        <div className='flex flex-col gap-4'>
            {Array.isArray(posts) && posts.map((post) => {
        
                return (
                    <div 
                        key={post.id}
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
                    </div>
                  );
            })}
        </div>
    );
}

// By Community

export function PostListByCommunity( { communityID }: { communityID: string } ) {
    const [loading, setIsLoading] = useState<boolean>(true);
    const [posts, setPosts] = useState<Post[]>([]);

    const router = useRouter();

    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true);
            try {
                const data = await getAllPostsFromCommunityID( communityID );
                // @ts-ignore
                setPosts(data);
                setIsLoading(false);                
            } catch (error) {
                return (
                    <div className='flex flex-col items-center justify-center w-full relative group transition-all bg-card h-[174px] rounded-md px-5 py-5'>
                        <p className='text-center text-gray-300 font-medium antialiased w-full'>Sorry, an error occurred.</p>
                        <div className='flex gap-4 w-full items-center justify-center mt-4'>
                        <button className='navlink' onClick={() => router.refresh()} type='button'>Reload</button>
                        </div>
                    </div>
                );
            } finally {
                setIsLoading(false);
            }

        };
        fetchPosts();
    }, [communityID, router])

    if ( loading ) {
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
                <div className='flex w-full relative group transition-all bg-border h-[174px] rounded-md px-5 py-5 animate-pulse'></div>
                <div className='flex w-full relative group transition-all bg-border h-[174px] rounded-md px-5 py-5 animate-pulse'></div>        
            </div>
        );
    }

    return (
        <div className='flex flex-col gap-4'>
            {Array.isArray(posts) && (posts.length > 0 ? posts.map((post) => (
                <div 
                    key={post.id}
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
                </div>
            )) : (
                <div className='flex flex-col items-center justify-center w-full relative group transition-all bg-card h-[174px] rounded-md px-5 py-5'>
                    <p className='text-center text-gray-300 font-medium antialiased w-full'>Looks like there&apos;s no posts yet.</p>
                    <div className='flex gap-4 w-full items-center justify-center mt-4'>
                        <button className='navlink' onClick={() => router.push("/posts")} type='button'>Go Home</button>
                    </div>
                </div>
            ))}
        </div>
    );
}