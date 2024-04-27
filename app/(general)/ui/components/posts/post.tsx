"use client";

import Link from 'next/link';
import { ChatBubbleLeftEllipsisIcon, EllipsisVerticalIcon, ShareIcon } from '@heroicons/react/24/solid';
import MarkdownPreview from '@uiw/react-markdown-preview';
import Dropdown, { DropdownLink, DropdownShare } from '../dropdown/dropdown';
import { BackButtonNormal } from './back_button';
import Hovercard from '../dropdown/hovercard';
import { Post } from '@/types/types';

/**
 * Horizontal card display of the given post.
 * 
 * @param {string} id ID of the post.
 * @param {Date} createdAt When the post was created.
 * @param {Date} updatedAt When the post was updated in the database.
 * @param {string} title Title of the post.
 * @param {string} content Main content of the post.
 * @param {string} tagline Tagline of the post.
 * @param {string} imageurl URL of the posts image, may be undefined or null.
 * @param {string} imagealt Alt tag of the posts image, may be undefined or null.
 * @param {boolean} public Whether the post is public or not.
 * @param {string} authorId The ID of the posts author.
 * @param {number} downvotes How many downvotes the post has.
 * @param {number} upvotes How many upvotes the post has.
 * @param {string} communityId The ID of the posts community.
 * @param {PostAuthor} author The author data of the post.
 * @param {PostCommunity} community The community data of the post.
 * 
 * @example
 * <CardPost 
 *  id={post.id}
 *  title={post.title} 
 *  author={post.author} 
 *  community={post.community} 
 *  upvotes={post.upvotes} 
 *  downvotes={post.downvotes} 
 *  createdAt={post.createdAt} 
 *  updatedAt={post.updatedAt}
 *  public={post.public}
 *  tagline={post.tagline} 
 *  content={post.content}
 *  imageurl={post.imageurl}
 *  imagealt={post.imagealt}
 * />
 * 
 */

export function CardPost( post: Post ) {

    const text = post.title;
    const url = `${process.env.NEXT_PUBLIC_CURRENT_URL}posts/${post.id}`;
    const title = "CMD/>";

    return (

        <div className="flex flex-col sm:flex-row w-full items-center gap-4 relative group transition-all bg-card border-1 border-border group-hover/title:!border-white h-fit rounded-md px-6 py-6">

            {post.imageurl 
                
                ?

                    <img src={post.imageurl} alt={post.imagealt!} className="rounded-md sm:!max-w-[146px] sm:!min-w-[146px] m-auto sm:!h-[146px] sm:!w-[146px] overflow-hidden bg-cover" />

                :

                    <img src={"/text_post_icon.png"} alt={"This post has no image."} className="rounded-md hidden sm:flex sm:!max-w-[146px] sm:!min-w-[146px] m-auto sm:!h-[146px] sm:!w-[146px] overflow-hidden bg-cover" />

            }

            <div className="flex w-full bg-transparent h-fit flex-col">

                <div className="text-sm z-20 w-fit flex flex-col">

                    <div className='flex flex-col'>

                        <div className='flex flex-row gap-2 items-center'>

                            <div className='flex flex-col'>
                                <Link className="w-fit hover:underline z-20 text-white hidden md:flex" href={`/c/${post.community.name}`}>{post.community.name}</Link>   
                                { ! post.author ?

                                    <>
                                        <h4 className="w-fit text-gray-300 hidden md:flex gap-2 z-20"><h2 className='hover:underline flex gap-1'>[deleted] </h2> <p className='facebookTheme:text-[#808080]'>•</p> <p className='facebookTheme:text-[#808080]'>{post.createdAt.toLocaleString()}</p></h4>                                       
                                    </>
                                    

                                    :

                                    <div className='hidden md:flex flex-row gap-2'>  
                                        <Hovercard headerText={`@${post.author.username}`} headerIcon={null} headerClassName={"text-sm"}>
                                            <div className='flex flex-row gap-4 p-4 w-full max-w-[300px]'>
                                                <img src={post.author.image} className='w-6 h-6 rounded-sm' alt='Profile Image'></img>
                                                <div className='flex flex-col'>
                                                    <Link href={`/user/${post.author.username}`} className='hover:underline w-fit font-medium'>@{post.author.username}</Link>     
                                                    <p>{post.author.description}</p>             
                                                </div>
                                            </div>
                                        </Hovercard>
                                        <p className='hidden sm:flex'>•</p> 
                                        <p className='hidden sm:flex' suppressHydrationWarning={true}>{post.createdAt.toLocaleString()}</p>                         
                                    </div>
                                

                                }                                                              
                            </div>

                        </div>

                    </div>

  

                </div>
                
                <Link href={`/posts/${post.id}`} className="group/title w-fit font-sans font-semibold text-[18px] md:text-lg group-hover:text-gray-300 transition-all facebookTheme:text-lg peer">{post.title}</Link>

                <p className='text-gray-300'>{post.tagline}</p>

                <div className='flex flex-row mt-4'>
                    <Link className='navlink !px-2 md:!px-3 mr-auto' href={`/posts/${post.id}`}><ChatBubbleLeftEllipsisIcon className='w-5 h-5' /><span className='hidden md:flex'>Comments</span></Link>
                    
                    <Dropdown align={"right"} accountHeading={false} headerIcon={<EllipsisVerticalIcon />} headerText={null} headerClassName={"mt-4"}>
                        <DropdownLink text={post.author.username} icon={<img src={post.author.image} alt={post.author.username}></img>} link={`/user/${post.author.username}`}></DropdownLink>
                        <DropdownLink text={post.community.display_name} icon={<img src={post.community.image} alt={post.community.display_name}></img>} link={`/c/${post.community.name}`}></DropdownLink>
                        <hr className='mt-1 !mb-1'/>
                        <DropdownShare icon={<ShareIcon />} text={text} title={title} url={url} />
                    </Dropdown>                                        
                </div>

            </div>

        </div>

    )

}

/**
 * Full display of the given post.
 * 
 * @param {string} id ID of the post.
 * @param {Date} createdAt When the post was created.
 * @param {Date} updatedAt When the post was updated in the database.
 * @param {string} title Title of the post.
 * @param {string} content Main content of the post.
 * @param {string} tagline Tagline of the post.
 * @param {string} imageurl URL of the posts image, may be undefined or null.
 * @param {string} imagealt Alt tag of the posts image, may be undefined or null.
 * @param {boolean} public Whether the post is public or not.
 * @param {string} authorId The ID of the posts author.
 * @param {number} downvotes How many downvotes the post has.
 * @param {number} upvotes How many upvotes the post has.
 * @param {string} communityId The ID of the posts community.
 * @param {PostAuthor} author The author data of the post.
 * @param {PostCommunity} community The community data of the post.
 * 
 * @example
 * <FullPost 
 *  id={post.id}
 *  title={post.title} 
 *  author={post.author} 
 *  community={post.community} 
 *  upvotes={post.upvotes} 
 *  downvotes={post.downvotes} 
 *  createdAt={post.createdAt} 
 *  updatedAt={post.updatedAt}
 *  public={post.public}
 *  tagline={post.tagline} 
 *  content={post.content}
 *  imageurl={post.imageurl}
 *  imagealt={post.imagealt}
 * />
 * 
 */

export function FullPost( post: Post ) {

    // const rehypePlugins = [rehypeSanitize];

    return (

            <div className="rounded-md flex w-full bg-transparent h-fit facebookTheme:rounded-none px-5 py-5">

                <div className="flex w-full bg-transparent h-fit flex-col">

                    <div className="text-sm relative">

                        <BackButtonNormal className={"absolute right-0 !hidden md:!flex"} />

                        <div className='flex flex-row gap-2 items-center'>
                            <img src={post.community.image} className='w-8 h-8 rounded-sm' alt={post.community.name}></img>
                            <div className='flex flex-col'>
                                <Link className="w-fit hover:underline" href={`/c/${post.community.name}`}>{post.community.name}</Link>    
                                <div className="flex flex-row">
                                    <h4 className="w-fit flex gap-2">
                                        <Hovercard headerText={`@${post.author.username}`} headerIcon={null} headerClassName={"text-sm"}>
                                            <div className='flex flex-row gap-4 p-4 w-full max-w-[250px]'>
                                                <img src={post.author.image} className='w-6 h-6 rounded-sm' alt='Profile Image' />
                                                <div className='flex flex-col'>
                                                    <Link href={`/user/${post.author.username}`} className='hover:underline w-fit font-medium'>@{post.author.username}</Link>     
                                                    <p>{post.author.description}</p>             
                                                </div>
                                            </div>
                                        </Hovercard>
                                        <p>•</p> 
                                        <p suppressHydrationWarning={true}>{post.createdAt.toLocaleString()}</p> 
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
                        <img src={post.imageurl} alt={post.imagealt!} className="relative m-auto max-h-96" />
                    </div>

                    :

                    null

                    }

                    <div className='markdown-body'>

                        <MarkdownPreview source={post.content} /* rehypePlugins={rehypePlugins} */ />

                    </div>

                </div>

            </div>

    )

}