"use client";

import { CardPost } from '@/app/(general)/ui/components/posts/post';
import useSWR from 'swr';
import { ArrowLeftIcon, ArrowRightIcon, XCircleIcon } from '@heroicons/react/16/solid';
import { usePathname, useRouter } from "next/navigation";
import { PostFetcher, fetcher } from '@/swr-provider';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function PostList() {

    //const searchParams = useSearchParams();
    //const pathname = usePathname();
    //const { replace } = useRouter();

    const [page, setPage] = useState( /*Number(searchParams.get("page") || 0 )*/ 0);
    const [totalPages, setTotalPages] = useState(0);

    // @ts-ignore
    /*let { data: post_count, count_error, count_isLoading } = useSWR(`/api/posts/getAll/count`, {
        onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
          if (error.status === 404) return
          if (retryCount >= 1) return
          setTimeout(() => revalidate({ retryCount }), 1000)
        },
        fetcher,
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        errorRetryInterval: 0,
        shouldRetryOnError: true
    });*/    

    function nextPage() {
        //if (page < post_count - 1) {
            setPage(page + 1);
        //}
    };
    function lastPage() {
        if ( page > 0 ) {
            setPage(page - 1);
        }
    };    

    let { data: posts, error, isLoading } = useSWR(`/api/posts/getAll/?page=${page}`, {
        onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
          if (error.status === 404) return
          if (retryCount >= 1) return
          setTimeout(() => revalidate({ retryCount }), 1000)
        },
        PostFetcher,
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        errorRetryInterval: 0,
        shouldRetryOnError: true
    });
    
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
            <div className='flex gap-4'>
                <button onClick={() => lastPage()} className='navlink !px-2' disabled={ page === 0 ? true : false }><ArrowLeftIcon className='w-5 h-5' /></button>  
                <button onClick={() => nextPage()} className='navlink !px-2'><ArrowRightIcon className='w-5 h-5' /></button>            
            </div>
        </div>
    );
}
