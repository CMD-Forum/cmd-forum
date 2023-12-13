import { Url } from 'next/dist/shared/lib/router/router';
import Link from 'next/link';
import Image from 'next/image';

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
    image_src: string;

}

export function CardPost(post: PostProps) {

    return (

        <div className="flex w-full bg-zinc-950 h-fit rounded-md px-5 py-5">

            <div className="flex w-full bg-transparent h-fit flex-col">

                <div className="text-sm">

                    <Link className="w-fit hover:underline" href={`/c/${post.community}`}>{post.community}</Link>
                    <div className="flex flex-row">

                        <h4 className="w-fit text-gray-300"><Link href={`/user/${post.author}`} className='hover:underline'>{post.author}</Link> • {post.submitted} • {post.ratio}</h4>   

                    </div>    

                </div>
                
                <Link href={post.link} className="w-fit font-sans font-semibold text-lg hover:underline">{post.title}</Link>
                <div className='post-img'>
                    {/* @ts-ignore: Do not change, NextJS will block all external domains for images unless otherwise configured. Sizing is also an issue. */}
                    <Image src={post.image_src} alt="Post Image" className='rounded-xl mb-2 mt-2 object-contain max-h-96 h-auto static pos-unset' fill={true}></Image>    
                </div>
                
                <p className='text-gray-300'>{post.subtitle}</p>

            </div>

        </div>

    )

}