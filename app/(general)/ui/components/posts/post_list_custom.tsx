"use client";

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/16/solid';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect,useState } from 'react';

import { CardPost } from '@/app/(general)/ui/components/posts/post';
import { Post } from '@/types/types';

/**
 * PostListByUser
 * Lists all posts by a specific user.
 * @param username
 */

export default function PostListByUser( { username }: { username: string } ) {

    const [page, setPage] = useState(0);
    const [totalPosts, setTotalPosts] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageForwardAllowed, setPageForwardAllowed] = useState<boolean>(true);

    const [posts, setPosts] = useState<Post>();
    const [isLoading, setIsLoading] = useState<Boolean>(false);

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

    const router = useRouter();

    try {        

        useEffect(() => {

            setIsLoading(true),
            fetch("/api/posts/getAll/byUsername", {
                method: 'POST',
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ 
                    "username": `${username}`,
                    "page": `${page}`, 
                })
            })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setPosts(data);
            });

            // Post Count

            fetch("/api/posts/getAll/count/whereUsername", {
                method: 'POST',
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "username": `${username}`,
                })
            })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setTotalPosts(data);
                setTotalPages(Math.ceil(data / 10));
                setIsLoading(false);
            });  

        }, [page, username, totalPosts]);    

    } catch ( error ) {
        return (
            <div className='flex flex-col items-center justify-center w-full relative group transition-all bg-card h-[174px] rounded-md px-5 py-5'>
                <p className='text-center text-gray-300 font-medium antialiased w-full'>Sorry, an error occurred.</p>
                <div className='flex gap-4 w-full items-center justify-center mt-4'>
                    <button className='navlink' onClick={() => router.refresh()} type='button'>Reload</button>
                </div>
            </div>            
        );
    }  

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

    if ( totalPages <= 0 ) { // Tried `if ( ! posts )` but that didn't work for some reason.
        return (
            <div className='flex flex-col items-center justify-center w-full relative group transition-all bg-card h-[174px] rounded-md px-5 py-5'>
                <p className='text-center text-gray-300 font-medium antialiased w-full'>Looks like there&apos;s no posts here.</p>
                <div className='flex gap-4 w-full items-center justify-center mt-4'>
                    <Link className='navlink' href={"/"}>Home</Link>
                </div>
            </div>
        );
    }

    return (
        <div className='flex flex-col gap-4'>

            {Array.isArray(posts) && posts.map((post: Post) => {
        
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
 
                      />
                    </div>

                  );
            })}
            <div className='flex gap-4'>
                <button onClick={() => lastPage()} className='navlink !px-2' disabled={ page === 0 ? true : false } aria-label='Last Page'><ArrowLeftIcon className='w-5 h-5' /></button>  
                <button onClick={() => nextPage()} className='navlink !px-2' disabled={ pageForwardAllowed === false ? true : false } aria-label='Next Page'><ArrowRightIcon className='w-5 h-5' /></button>            
            </div>
        </div>
    );

}

// By Community

export function PostListByCommunity( { communityID }: { communityID: string } ) {

    const [page, setPage] = useState(0);
    const [totalPosts, setTotalPosts] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [pageForwardAllowed, setPageForwardAllowed] = useState<boolean>(true);

    const [posts, setPosts] = useState<Post>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

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

    const router = useRouter();

    try {        

        useEffect(() => {

            setIsLoading(true),
            fetch("/api/posts/getAll/byCommunityID", {
                method: 'POST',
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ 
                    "communityID": `${communityID}`,
                    "page": `${page}`, 
                })
            })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setPosts(data);
            });

            // Post Count

            fetch("/api/posts/getAll/count/whereCommunityID", {
                method: 'POST',
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "communityID": `${communityID}`,
                }),
            })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setTotalPosts(data);
                setTotalPages(Math.ceil(data / 10));
                setIsLoading(false);
            });  

        }, [page, communityID, totalPosts]);    

    } catch ( error ) {
        return (
            <div className='flex flex-col items-center justify-center w-full relative group transition-all bg-card h-[174px] rounded-md px-5 py-5'>
                <p className='text-center text-gray-300 font-medium antialiased w-full'>Sorry, an error occurred.</p>
                <div className='flex gap-4 w-full items-center justify-center mt-4'>
                    <button className='navlink' onClick={() => router.refresh()} type='button'>Reload</button>
                </div>
            </div>            
        );
    }  

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

    if ( totalPages <= 0 ) { // Tried `if ( ! posts )` but that didn't work for some reason.
        return (
            <div className='flex flex-col items-center justify-center w-full relative group transition-all bg-card h-[174px] rounded-md px-5 py-5'>
                <p className='text-center text-gray-300 font-medium antialiased w-full'>Looks like there&apos;s no posts here.</p>
                <div className='flex gap-4 w-full items-center justify-center mt-4'>
                    <Link className='navlink' href={"/"}>Home</Link>
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
                        communityId={post.community.id}
                        author={post.author}
                        community={post.community}
                      />
                    </div>

                  );
            })}

            <div className='flex gap-4'>
                <button onClick={() => lastPage()} className='navlink !px-2' disabled={ page === 0 ? true : false } aria-label='Last Page'><ArrowLeftIcon className='w-5 h-5' /></button>  
                <button onClick={() => nextPage()} className='navlink !px-2' disabled={ pageForwardAllowed === false ? true : false } aria-label='Next Page'><ArrowRightIcon className='w-5 h-5' /></button>            
            </div>

        </div>
    );

}

// SavedBy UserID

export function SavedPostListByUserID( { userID }: { userID: string } ) {

    const [page, setPage] = useState(0);
    // eslint-disable-next-line no-unused-vars
    const [totalPosts, setTotalPosts] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageForwardAllowed, setPageForwardAllowed] = useState<boolean>(true);
    const [error, setError] = useState(null);

    const [posts, setPosts] = useState<Post>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

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

    const router = useRouter();
 
    useEffect(() => {

        //console.log("started loading");

        setIsLoading(true),
        fetch("/api/posts/getAllSaved/byUserID", {
            method: 'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                "userID": `${userID}`,
                "page": `${page}`, 
            })
        })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            setPosts(data);
        })
        .catch((error) => {
            setError(error);
        });
        //console.log("finished res.json, set posts");

    }, [page, userID]);   
        
    useEffect(() => {
        fetch("/api/posts/getAllSaved/count/byUserID", {
            method: 'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "userID": `${userID}`,
            }),
        })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            setTotalPosts(data);
            setTotalPages(Math.ceil(data / 10));
            setIsLoading(false);
        })
        .catch((error) => {
            setError(error);
        });  
    }, [userID]); 

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

    if ( totalPages <= 0 ) { // Tried `if ( ! posts )` but that didn't work for some reason.
        return (
            <div className='flex flex-col items-center justify-center w-full relative group transition-all bg-card h-[174px] rounded-md px-5 py-5'>
                <p className='text-center text-gray-300 font-medium antialiased w-full'>Looks like there&apos;s no posts here.</p>
                <div className='flex gap-4 w-full items-center justify-center mt-4'>
                    <Link className='navlink' href={"/"}>Home</Link>
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
                        communityId={post.community.id}
                        author={post.author}
                        community={post.community}
                      />
                    </div>

                  );
            })}

            <div className='flex gap-4'>
                <button onClick={() => lastPage()} className='navlink !px-2' disabled={ page === 0 ? true : false } aria-label='Last Page'><ArrowLeftIcon className='w-5 h-5' /></button>  
                <button onClick={() => nextPage()} className='navlink !px-2' disabled={ pageForwardAllowed === false ? true : false } aria-label='Next Page'><ArrowRightIcon className='w-5 h-5' /></button>            
            </div>

        </div>
    );

}