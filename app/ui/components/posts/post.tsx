"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface PostProps {

    title: string;
    author: string;
    community: string;
    upvotes: number;
    downvotes: number;
    ratio: string;
    submitted: string;
    subtitle: string;
    link: string;
    image_src?: string | URL;
    image_alt?: string;

}

interface ImageProps {

    image_src?: string | URL;
    image_alt?: string; 

}

export function PostImage(image: ImageProps) {

    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {

        if (image.image_src) {

            fetch(image.image_src)

                .then(response => response.blob())

                .then(blob => {

                    const url = URL.createObjectURL(blob);
                    setImageUrl(url);

                });

        }

    }, [image.image_src]);

    if (imageUrl) {

        return (

            <div className='post-img'>
                {/* @ts-ignore: Do not change, NextJS will block all external domains for images unless otherwise configured. Sizing is also an issue. */}
                <Image src={imageUrl} alt={image.image_alt} className='rounded-xl mb-2 mt-2 object-contain max-h-96 h-auto static pos-unset' fill={true}></Image>    
            </div>

        )

    }

}

export function CardPost(post: PostProps) {

    return (

        <div className="flex w-full bg-zinc-950 h-fit rounded-md px-5 py-5 border-zinc-900 border-[1px]">

            <div className="flex w-full bg-transparent h-fit flex-col">

                <div className="text-sm">

                    {/* @ts-expect-error */}
                    <Link className="w-fit hover:underline" href={`/c/${post.community.name}`}>{post.community.name}</Link>
                    <div className="flex flex-row">

                        {/* @ts-expect-error */}
                        <h4 className="w-fit text-gray-300"><Link href={`/user/${post.author.id}`} className='hover:underline'>{post.author.username}</Link> • {post.submitted} • {post.ratio}</h4>   

                    </div>    

                </div>
                
                <Link href={post.link} className="w-fit font-sans font-semibold text-lg hover:underline">{post.title}</Link>

                
                <PostImage image_src='https://placehold.co/200x400' image_alt='test'/>
                
                
                <p className='text-gray-300'>{post.subtitle}</p>

            </div>

        </div>

    )

}