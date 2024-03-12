"use client";

import Link from 'next/link';
import { Suspense, useEffect, useState } from 'react';
import { ChatBubbleLeftEllipsisIcon, ChevronDownIcon, ChevronUpIcon, EllipsisVerticalIcon, ShareIcon, UserIcon } from '@heroicons/react/24/solid';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { FullPostSkeleton } from '../../fallback/Post';
import rehypeSanitize from "rehype-sanitize";
import Dropdown, { DropdownCustom, DropdownLink, DropdownShare } from '../dropdown/dropdown';
import BackButton, { BackButtonNormal } from './back_button';
import Hovercard from '../dropdown/hovercard';
import { useSession } from 'next-auth/react';

interface PostProps {

    id: string;
    title: string;
    author: any;
    community: any;
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
                {/* Do not change as NextJS requires a domain **whitelist**, and as far as I'm aware there's no option to change this to a blacklist or even remove it. */}
            
            </div>

        )

    }

}

export function CardPost(post: PostProps) {

    const text = post.title;
    const url = `https://localhost:3000/posts/${post.id}`;
    const title = "CMD/>";

    return (

        <div className="flex w-full relative group transition-all  bg-transparent border-1 border-border group-hover/title:!border-white h-fit rounded-md px-6 py-6">

            {/*<Link className='w-full flex-1 h-full absolute left-0 top-0 z-10' href={`/posts/${post.id}`}></Link>*/}

            <div className="flex w-full bg-transparent h-fit flex-col">

                <div className="text-sm z-20 w-fit flex flex-col">

                    <div className='flex flex-col'>

                        <div className='flex flex-row gap-2 items-center'>

                            {/* @ts-ignore-error */}
                            <img src={post.community.image} className='w-8 rounded-sm hidden md:flex' alt={post.community.name}></img>
                            <div className='flex flex-col'>
                                {/* @ts-ignore-error */}
                                <Link className="w-fit hover:underline z-20 text-white hidden md:flex" href={`/c/${post.community.name}`}>{post.community.name}</Link>   
                                { ! post.author ?

                                    <h4 className="w-fit text-gray-300 hidden md:flex gap-2 z-20"><h2 className='hover:underline flex gap-1'>[deleted] </h2> <p className='facebookTheme:text-[#808080]'>•</p> <p className='facebookTheme:text-[#808080]'>{post.submitted}</p></h4>   

                                    :

                                    <div className='hidden md:flex flex-row gap-2'>  
                                        <Hovercard headerText={`@${post.author.username}`} headerIcon={null} headerClassName={"text-sm"}>
                                            <div className='flex flex-row gap-4 p-4 w-full max-w-[300px]'>
                                                {/* @ts-ignore */}
                                                <img src={post.author.image} className='w-6 h-6 rounded-sm' alt='Profile Image'></img>
                                                <div className='flex flex-col'>
                                                    <Link href={`/user/${post.author.username}`} className='hover:underline w-fit font-medium'>@{post.author.username}</Link>     
                                                    {/* @ts-ignore */}
                                                    <p>{post.author.description}</p>             
                                                </div>
                                            </div>
                                        </Hovercard>
                                        <p className='hidden sm:flex'>•</p> 
                                        <p className='hidden sm:flex'>{post.submitted}</p>                         
                                    </div>
                                

                                }                                                              
                            </div>

                        </div>

                    </div>

  

                </div>
                
                <Link href={`/posts/${post.id}`} className="group/title w-fit font-sans font-semibold text-[18px] md:text-lg group-hover:text-gray-300 transition-all facebookTheme:text-lg peer">{post.title}</Link>
                
                {post.imageurl 
                
                    ?

                        <div className="relative rounded-md mt-2 mb-2 max-h-96 overflow-hidden">
                            <div 
                                style={{ 
                                    backgroundImage: `url(${post.imageurl})`,
                                    backgroundSize: 'cover',
                                }} 
                                className="absolute inset-0 filter blur-xl"
                            />
                            <img src={post.imageurl} alt={post.image_alt} className="relative m-auto max-h-96" />
                        </div>

                    :

                        <span id='No Image Attached'></span>

                }

                <p className='text-gray-300'>{post.subtitle}</p>

                <div className='flex flex-row mt-4'>
                    <Link className='navlink !px-2 md:!px-3 mr-auto' href={`/posts/${post.id}`}><ChatBubbleLeftEllipsisIcon className='w-5 h-5' /><span className='hidden md:flex'>Comments</span></Link>
                    <div>
                        <Dropdown headerIcon={<EllipsisVerticalIcon />} alignRight={true} accountHeading={false} headerClassName={"mt-4"}>
                            <DropdownLink text={post.author.username} icon={<img src={post.author.image} alt={post.author.username}></img>} link={`/user/${post.author.username}`}></DropdownLink>
                            <DropdownLink text={post.community.display_name} icon={<img src={post.community.image} alt={post.community.display_name}></img>} link={`/c/${post.community.name}`}></DropdownLink>
                            <hr className='mt-1 !mb-1'/>
                            <DropdownShare icon={<ShareIcon />} text={text} title={title} url={url} />
                        </Dropdown>                                
                    </div>
                </div>
                   

        	    {/*<div className='flex transition-all gap-2 mt-2 z-20 bg-card border-border border-1 rounded w-fit justify-center items-center facebookTheme:bg-white facebookTheme:border-[1px] facebookTheme:rounded-none facebookTheme:h-[26px]'>

                    <button className='navlink !border-0 z-20 !rounded-none'><ChevronUpIcon className="font-medium h-4 w-4" /></button>
                    <p className='facebookTheme:font-bold px-1 text-white'>{post.upvotes - post.downvotes}</p>
                    <button className='navlink !border-0 z-20 !rounded-none'><ChevronDownIcon className="font-medium h-4 w-4" /></button>

                </div>*/}

            </div>

        </div>

    )

}

interface FullPostProps {

    id: number;
    title: string;
    author: any;
    community: any;
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

    const rehypePlugins = [rehypeSanitize];

    return (

        <Suspense fallback={<FullPostSkeleton />} key={post.id}>

            <div className="rounded-md flex w-full bg-transparent h-fit facebookTheme:rounded-none px-5 py-5">

                <div className="flex w-full bg-transparent h-fit flex-col">

                    <div className="text-sm relative">

                        <BackButtonNormal className={"absolute right-0"} />

                        <div className='flex flex-row gap-2 items-center'>
                            <img src={post.community.image} className='w-8 h-8 rounded-sm' alt={post.community.name}></img>
                            <div className='flex flex-col'>
                                <Link className="w-fit hover:underline" href={`/c/${post.community.name}`}>{post.community.name}</Link>    
                                <div className="flex flex-row">
                                    <h4 className="w-fit flex gap-2">
                                        <Hovercard headerText={`@${post.author.username}`} headerIcon={null} headerClassName={"text-sm"}>
                                            <div className='flex flex-row gap-4 p-4 w-full max-w-[250px]'>
                                                {/* @ts-ignore */}
                                                <img src={post.author.image} className='w-6 h-6 rounded-sm' alt='Profile Image' />
                                                <div className='flex flex-col'>
                                                    <Link href={`/user/${post.author.username}`} className='hover:underline w-fit font-medium'>@{post.author.username}</Link>     
                                                    {/* @ts-ignore */}
                                                    <p>{post.author.description}</p>             
                                                </div>
                                            </div>
                                        </Hovercard>
                                        <p>•</p> 
                                        <p>{post.submitted}</p> 
                                    </h4>   

                                </div>                                   
                            </div>
                            
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
                        <MarkdownPreview source={post.body} rehypePlugins={rehypePlugins} />

                    </div>

                </div>

            </div>

        </Suspense>

    )

}