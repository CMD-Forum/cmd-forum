"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Suspense, useEffect, useState } from 'react';
import { ArrowUpIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { AlertWarning } from '../alert';
import { FullPostSkeleton } from '../../fallback/Post';

interface PostProps {

    id: number;
    title: string;
    author: string;
    community: string;
    upvotes: number;
    downvotes: number;
    submitted: string;
    subtitle: string;
    imageurl?: string;
    image_alt?: string;

}

interface ImageProps {

    imageurl?: string | URL;
    image_alt?: string; 

}

export function PostImage(image: ImageProps) {

    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {

        if (image.imageurl) {

            fetch(image.imageurl)

                .then(response => response.blob())

                .then(blob => {

                    const url = URL.createObjectURL(blob);
                    setImageUrl(url);

                });

        }

    }, [image.imageurl]);

    console.log(imageUrl)

    if (imageUrl) {

        return (

            <div className='post-img'>

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imageUrl} alt={image.image_alt} className='rounded-xl mb-2 mt-2 object-contain max-h-96 h-auto static pos-unset'></img>    
                {/* Do not change as NextJS requires a domain **whitelist**, and as far as I'm aware theres no option to change this to a blacklist or even remove it. */}
            
            </div>

        )

    }

}

export function CardPost(post: PostProps) {

    const totalVotes = post.upvotes + post.downvotes;
    const ratio = totalVotes > 0 ? ((post.upvotes / totalVotes) * 100).toFixed(0) : 'Unknown';

    return (

        <div className="flex w-full relative group transition-all bg-card border-[1px] border-border facebookTheme:bg-white h-fit rounded-md facebookTheme:rounded-none px-5 py-5 facebookTheme:border-zinc-900">

            <Link className='w-full flex-1 h-full absolute left-0 top-0 z-10' href={`/posts/${post.id}`}></Link>

            <div className="flex w-full bg-transparent h-fit flex-col">

                <div className="text-sm z-20 w-fit flex flex-col">

                    <div className='flex flex-col'>

                        <div className='flex flex-row gap-2 items-center'>

                            {/* @ts-ignore-error */}
                            <img src={post.community.image} className='w-8 rounded-sm' alt={post.community.name}></img>
                            <div className='flex flex-col'>
                                {/* @ts-ignore-error */}
                                <Link className="w-fit hover:underline z-20 text-white" href={`/c/${post.community.name}`}>{post.community.name}</Link>   
                                { ! post.author ?

                                    <h4 className="w-fit text-gray-300 flex gap-2 z-20"><h2 className='hover:underline flex gap-1'>[deleted] </h2> <p className='facebookTheme:text-[#808080]'>•</p> <p className='facebookTheme:text-[#808080]'>{post.submitted}</p> <p className='hidden sm:flex facebookTheme:text-[#808080]'>•</p> <p className='hidden sm:flex'><p className='facebookTheme:text-[#808080]'>{ratio}%</p></p></h4>   

                                    :

                                    // @ts-ignore-error
                                    <h4 className="w-fit text-gray-300 flex gap-2 z-20"><Link href={`/user/${post.author.username}`} className='hover:underline flex gap-1'>{post.author.name} <p className='text-zinc-500'>{`@${post.author.username}`}</p></Link> <p className='facebookTheme:text-[#808080]'>•</p> <p className='facebookTheme:text-[#808080]'>{post.submitted}</p> <p className='hidden sm:flex facebookTheme:text-[#808080]'>•</p> <p className='hidden sm:flex'><p className='facebookTheme:text-[#808080]'>{ratio}%</p></p></h4>   

                                }                                                              
                            </div>

                        </div>

                    </div>

  

                </div>
                
                <Link href={`/posts/${post.id}`} className="w-fit font-sans font-semibold text-lg z-20 group-hover:text-gray-300 transition-all facebookTheme:text-lg">{post.title}</Link>
                
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={post.imageurl} alt={post.image_alt}/>
                <p className='text-gray-300 facebookTheme:text-[11px] facebookTheme:text-black'>{post.subtitle}</p>

        	    <div className='flex border-[1px] border-zinc-800 transition-all gap-2 mt-2 z-20 bg-[#1F1F1F] rounded w-fit justify-center items-center facebookTheme:bg-white facebookTheme:border-[1px] facebookTheme:rounded-none facebookTheme:h-[26px]'>

                    <button className='navlink z-20 !border-0 !rounded-r-none facebookTheme:min-h-0 facebookTheme:rounded-none facebookTheme:w-[30px] facebookTheme:h-full facebookTheme:bg-facebook-grey-btn facebookTheme:text-black facebookTheme:items-center facebookTheme:flex facebookTheme:justify-center facebookTheme:p-0'><ChevronUpIcon className="font-medium h-4 w-4" /></button>
                    <p className='facebookTheme:font-bold px-1 text-white'>{post.upvotes - post.downvotes}</p>
                    <button className='navlink z-20 !border-0 !rounded-l-none facebookTheme:min-h-0 facebookTheme:rounded-none facebookTheme:w-[30px] facebookTheme:h-full facebookTheme:bg-facebook-grey-btn facebookTheme:text-black facebookTheme:items-center facebookTheme:flex facebookTheme:justify-center facebookTheme:p-0'><ChevronDownIcon className="font-medium h-4 w-4" /></button>

                </div>

            </div>

        </div>

    )

}

interface FullPostProps {

    id: number;
    title: string;
    author: any; // Will figure out proper solution at some point
    community: string;
    body: string;
    upvotes: number;
    downvotes: number;
    ratio: string;
    submitted: string;
    subtitle: string;
    imageurl?: string;
    image_alt?: string;

}

export function FullPost(post: FullPostProps) {

    return (

        <Suspense fallback={<FullPostSkeleton />}>

            <div className="md:rounded-md flex w-full bg-card border-[1px] border-border facebookTheme:bg-white h-fit facebookTheme:rounded-none px-5 py-5 facebookTheme:border-[#b3b3b3]">

                <div className="flex w-full bg-transparent h-fit flex-col px-2">

                    <div className="text-sm">

                        <div>
                            {/*<img src={post.community.image}*/}
                            <Link className="w-fit hover:underline" href={`/c/${post.community}`}>{post.community}</Link>    
                        </div>
                        
                        <div className="flex flex-row">

                            <h4 className="w-fit text-gray-300 flex gap-2">
                                <Link href={`/user/${post.author.username}`} className='hover:underline flex gap-1'>{post.author.name} 
                                    <p className='text-zinc-500'>{`@${post.author.username}`}</p>
                                </Link> 
                                <p className='facebookTheme:text-[#808080]'>•</p> 
                                <p className='facebookTheme:text-[#808080]'>{post.submitted}</p> 
                                <p className='hidden sm:flex facebookTheme:text-[#808080]'>•</p>
                                <p className='hidden sm:flex'><span className='facebookTheme:text-[#808080]'>{post.ratio}</span></p>
                            </h4>   

                        </div>    

                    </div>
                    
                    <h1 className="w-fit font-sans font-semibold text-lg facebookTheme:text-lg">{post.title}</h1>
                    
                    {post.imageurl ?

                    <div className="relative rounded-md mt-2 mb-2 max-h-96 overflow-hidden">
                        <div 
                            style={{ 
                                backgroundImage: `url(${post.imageurl})`,
                                backgroundSize: 'cover',
                            }} 
                            className="absolute inset-0 filter blur-xl"
                        />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={post.imageurl} alt={post.image_alt} className="relative m-auto max-h-96" />
                    </div>

                    :

                    <span id='No Image Attached'></span>

                    }
                    
                    {/*<p className='text-gray-300 facebookTheme:text-[11px] facebookTheme:text-black'>{post.subtitle}</p>*/}

                    <div className='markdown-body'>

                        {/*<ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]} rehypePlugins={[rehypeRaw]}>{post.body}</ReactMarkdown>*/}
                        <MarkdownPreview source={post.body} />

                    </div>

                </div>

            </div>

        </Suspense>

    )

}