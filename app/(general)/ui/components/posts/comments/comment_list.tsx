"use client";

import { useEffect, useState } from 'react';

import { PostCommentType } from '@/types/types';

import { PostComment } from './comment';
import { createPortal } from 'react-dom';
import { ArrowPathIcon } from '@heroicons/react/16/solid';

export default function CommentList({ postID }: { postID: string }) {

    const [comments, setComments] = useState<PostCommentType>();
    const [refresh, setRefresh] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(false);

    try {        
        useEffect(() => {
            setIsLoading(true),
            fetch("/api/comments/getAll/", {
                method: 'POST',
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ "postID": `${postID}` })
            })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setComments(data);
                setIsLoading(false);
            });
        }, [postID, refresh]);
    } catch ( error ) {
        return (
            <div className='flex flex-col items-center justify-center w-full relative group transition-all bg-card h-[174px] rounded-lg px-5 py-5 mt-4'>
                <p className='text-center text-gray-300 font-medium antialiased w-full'>Sorry, an error occurred.</p>
                {/*<div className='flex gap-4 w-full items-center justify-center mt-4'>
                    <button className='navlink' onClick={() => router.refresh()} type='button'>Reload</button>
                </div>*/}
            </div>            
        );
    }  

    if ( isLoading ) {
        return (
            <div className='flex flex-col mt-4 gap-2'>
                <div className='h-20 w-full bg-border animate-pulse rounded' />
                <div className='h-20 w-full bg-border animate-pulse rounded' />
                <div className='h-20 w-full bg-border animate-pulse rounded' />
                <div className='h-20 w-full bg-border animate-pulse rounded' />
                <div className='h-20 w-full bg-border animate-pulse rounded' />
                <div className='h-20 w-full bg-border animate-pulse rounded' />
                <div className='h-20 w-full bg-border animate-pulse rounded' />
                <div className='h-20 w-full bg-border animate-pulse rounded' />
                <div className='h-20 w-full bg-border animate-pulse rounded' />
                <div className='h-20 w-full bg-border animate-pulse rounded' />
            </div>
        );
    }

    // @ts-ignore
    if ( ! comments ) {
        return (
            <div className='flex flex-col items-center justify-center w-full relative group transition-all bg-transparent h-[174px] rounded-lg px-5 py-5 mt-4'>
                <p className='text-center text-gray-300 font-medium antialiased w-full'>Looks like there&apos;s no comments here.</p>
                <div className='flex gap-4 w-full items-center justify-center mt-4'>
                    <button className='navlink'>Comment on this post</button>
                </div>
            </div>
        );
    }

    return (
        <div className='flex flex-col mt-4 gap-2'>
            {createPortal(
                <button onClick={() => setRefresh(refresh + 1)} className='navlink !px-2' aria-label='Refresh Comments'><ArrowPathIcon className='w-5 h-5' /></button>,
                document.getElementById("comment-refresh-container") || document.body
            )}
            {Array.isArray(comments) && comments.map((comment) => {
                return (
                    <div 
                      key={comment.id}
                    >
                      <PostComment  
                        comment={comment}
                      />
                    </div>
                  );
            })}
        </div>
    );
}
