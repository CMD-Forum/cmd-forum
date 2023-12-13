import { Url } from 'next/dist/shared/lib/router/router';
import Link from 'next/link';

interface PostProps {

    title: string;
    author: number;
    community: string;
    upvotes: number;
    downvotes: number;
    ratio: string;
    submitted: string;
    subtitle: string;
    body: string;

}

export default function FullPost(post: PostProps) {

    return (

        <div className="flex w-full bg-zinc-950 h-fit rounded-md px-5 py-5">

            <div className="flex w-full bg-transparent h-fit flex-col">

                <div className="text-sm">

                    <Link className="w-fit hover:underline" href={post.community}>{post.community}</Link>
                    <div className="flex flex-row">

                        <h4 className="w-fit text-gray-300"><Link href={post.community} className='hover:underline'>{post.author}</Link> • {post.submitted} • {post.ratio}</h4>   

                    </div>    

                </div>
                
                <h1 className="w-fit font-sans font-semibold text-lg hover:underline">{post.title}</h1>
                <p className='text-gray-300'>{post.body}</p>

            </div>

        </div>

    )

}