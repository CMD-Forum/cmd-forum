"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ArrowUpIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';

interface PostProps {

    id: number;
    title: string;
    author: string;
    community: string;
    upvotes: number;
    downvotes: number;
    ratio: string;
    submitted: string;
    subtitle: string;
    link: string;
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

                {/* @ts-ignore: Do not change, NextJS will block all external domains for images unless otherwise configured. Sizing is also an issue. */}
                <img src={imageUrl} alt={image.image_alt} className='rounded-xl mb-2 mt-2 object-contain max-h-96 h-auto static pos-unset'></img>    
            
            </div>

        )

    }

}

export function CardPost(post: PostProps) {

    return (

        <div className="flex w-full bg-zinc-950 facebookTheme:bg-white h-fit rounded-md facebookTheme:rounded-none px-5 py-5 border-zinc-900 facebookTheme:border-[#b3b3b3] border-[1px]">

            <div className="flex w-full bg-transparent h-fit flex-col">

                <div className="text-sm">

                    {/* @ts-expect-error */}
                    <Link className="w-fit hover:underline" href={`/c/${post.community.name}`}>{post.community.name}</Link>
                    <div className="flex flex-row">

                        {/* @ts-expect-error */}
                        <h4 className="w-fit text-gray-300 flex gap-2"><Link href={`/user/${post.author.id}`} className='hover:underline flex gap-1'>{post.author.name} <p className='text-zinc-500'>{`@${post.author.username}`}</p></Link> <p className='facebookTheme:text-[#808080]'>•</p> <p className='facebookTheme:text-[#808080]'>{post.submitted}</p> <p className='hidden sm:flex facebookTheme:text-[#808080]'>•</p> <p className='hidden sm:flex'><p className='facebookTheme:text-[#808080]'>{post.ratio}</p></p></h4>   

                    </div>    

                </div>
                
                <Link href={post.link} className="w-fit font-sans font-semibold text-lg hover:underline facebookTheme:text-lg">{post.title}</Link>

                
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={post.imageurl} alt={post.image_alt}/>
                
                <p className='text-gray-300 facebookTheme:text-[11px] facebookTheme:text-black'>{post.subtitle}</p>

        	    <div className='flex gap-2 mt-2 bg-zinc-900 rounded-md w-fit justify-center items-center facebookTheme:bg-white facebookTheme:border-[1px] facebookTheme:rounded-none facebookTheme:h-[26px]'>

                    <button className='navlink facebookTheme:min-h-0 facebookTheme:rounded-none facebookTheme:w-[30px] facebookTheme:h-full facebookTheme:bg-facebook-grey-btn facebookTheme:text-black facebookTheme:items-center facebookTheme:flex facebookTheme:justify-center facebookTheme:p-0'><ChevronUpIcon className="font-medium h-4 w-4" /></button>
                    <p className='facebookTheme:font-bold'>{post.upvotes - post.downvotes}</p>
                    <button className='navlink facebookTheme:min-h-0 facebookTheme:rounded-none facebookTheme:w-[30px] facebookTheme:h-full facebookTheme:bg-facebook-grey-btn facebookTheme:text-black facebookTheme:items-center facebookTheme:flex facebookTheme:justify-center facebookTheme:p-0'><ChevronDownIcon className="font-medium h-4 w-4" /></button>

                </div>

            </div>

        </div>

    )

}