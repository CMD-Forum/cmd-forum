"use client";

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { Post } from '@prisma/client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { CardPost } from '@/app/(general)/ui/components/posts/post';

import { CardPostSkeleton } from '../../skeletons/Post';

export default function PostList() {

    const [page, setPage] = useState(0);
    const [totalPosts, setTotalPosts] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageForwardAllowed, setPageForwardAllowed] = useState<boolean>(true);

    const [posts, setPosts] = useState<Post>();
    const [isLoading, setIsLoading] = useState(false);

    function nextPage() {
        setPageForwardAllowed(false);
        if (page < totalPages - 1) {
            setPage(page + 1);
            setPageForwardAllowed(true);
        }
    }
    function lastPage() {
        if ( page > 0 ) {
            setPage(page - 1);
            setPageForwardAllowed(true);
        }
    }    

    try {        
        useEffect(() => {
            setIsLoading(true),
            fetch("/api/posts/getAll/", {
                method: 'POST',
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ "page": `${page}` })
            })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setPosts(data.posts);
                setTotalPosts(data.postCount);
                setTotalPages(Math.ceil(totalPosts / 10))
                setIsLoading(false);
            });
        }, [page, totalPosts]);    
    } catch ( error ) {
        return (
            <div className='flex flex-col items-center justify-center w-full relative group transition-all bg-card h-[174px] rounded-lg px-5 py-5'>
                <p className='text-center text-gray-300 font-medium antialiased w-full'>Sorry, an error occurred.</p>
                {/*<div className='flex gap-4 w-full items-center justify-center mt-4'>
                    <button className='navlink' onClick={() => router.refresh()} type='button'>Reload</button>
                </div>*/}
            </div>            
        );
    }  

    if ( isLoading ) {
        return (
            <div className='flex flex-col gap-4 mt-4'>
                <CardPostSkeleton />
                <CardPostSkeleton />
                <CardPostSkeleton />
                <CardPostSkeleton />
                <CardPostSkeleton />
                <CardPostSkeleton />
                <CardPostSkeleton />
                <CardPostSkeleton />
                <CardPostSkeleton />
                <CardPostSkeleton />    
            </div>
        );
    }

    if ( totalPosts <= 0 ) { // Tried `if ( ! posts )` but that didn't work for some reason.
        return (
            <div className='flex flex-col items-center justify-center w-full relative group transition-all bg-card h-[174px] rounded-lg px-5 py-5'>
                <p className='text-center text-gray-300 font-medium antialiased w-full'>Looks like there&apos;s no posts here.</p>
                <div className='flex gap-4 w-full items-center justify-center mt-4'>
                    <Link className='navlink' href={"/"}>Home</Link>
                </div>
            </div>  
        );
    }

    return (
        <div className='flex flex-col'>
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
                        communityId={post.community.id}
                        author={post.author}
                        community={post.community}
                        href={post.href}
                      />
                      <hr className='mx-4 mt-1/2 mb-1/2' />
                    </div>
                  );
            })}
            <div className='flex gap-4 items-center px-6 mt-5'>
                <button onClick={() => lastPage()} className='navlink !px-2' disabled={ page === 0 ? true : false } aria-label='Last Page'><ChevronLeftIcon className='w-5 h-5' /></button>  
                <p className='subtitle h-fit'>{ page + 1 } of { totalPages || "1" }</p>
                <button onClick={() => nextPage()} className='navlink !px-2' disabled={ !pageForwardAllowed || page === totalPages - 1 } aria-label='Next Page'><ChevronRightIcon className='w-5 h-5' /></button>            
            </div>
        </div>
    );
}
