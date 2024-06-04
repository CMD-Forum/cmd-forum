"use client";

import { ArchiveBoxXMarkIcon, ChatBubbleBottomCenterIcon, ChatBubbleLeftEllipsisIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/16/solid';
import { EllipsisVerticalIcon, ShareIcon } from '@heroicons/react/24/solid';
import MarkdownPreview from '@uiw/react-markdown-preview';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import rehypeSanitize from 'rehype-sanitize';

import { Post } from '@/types/types';

import ProfileImage from '../account/ProfileImage';
import { SavePostButton } from '../button';
import Dropdown, { DropdownButton, DropdownLink, DropdownShare } from '../dropdown/dropdown';
import Hovercard from '../dropdown/hovercard';
import Menu, { MenuButton, MenuLink, MenuShare } from '../menu/menu';

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

    const { data: session } = useSession();

    return (

        <div className="flex flex-col sm:flex-row w-full items-center gap-4 relative group transition-all bg-card border-0 border-border group-hover/title:!border-white h-fit rounded-md px-6 py-6">

            {post.imageurl 
                ?
                <img rel='preload' src={post.imageurl} alt={post.imagealt!} className={`rounded-md ${session ? "sm:!max-w-[146px] sm:!min-w-[146px] sm:!h-[146px] sm:!w-[146px]" : "sm:!max-w-[104px] sm:!min-w-[104px] sm:!h-[104px] sm:!w-[104px]" } m-auto overflow-hidden bg-cover`} />
                :
                <img rel='preload' src={"/text_post_icon.webp"} alt={"This post has no image."} className={`rounded-md hidden sm:flex ${session ? "sm:!max-w-[146px] sm:!min-w-[146px] sm:!h-[146px] sm:!w-[146px]" : "sm:!max-w-[104px] sm:!min-w-[104px] sm:!h-[104px] sm:!w-[104px]" } m-auto overflow-hidden bg-cover`} />
            }

            <div className="flex w-full bg-transparent h-fit flex-col">
                <div className="text-sm z-20 w-fit flex flex-col">
                    <div className='flex flex-col'>
                        <div className='flex flex-row gap-2 items-center justify-center'>
                            <div className='flex flex-col'>
                                <Link className="subtitle hover:underline" href={`/c/${post.community.name}`}>{post.community.name}</Link>   
                                { ! post.author ?

                                    <>
                                        <div>
                                            <h2 className='hover:underline flex gap-1 subtitle'>[deleted]</h2> 
                                            <p className='subtitle'>•</p> 
                                            <p className='subtitle'>{post.createdAt.toLocaleString()}</p>
                                        </div>                                       
                                    </>

                                    :

                                    <div className='hidden md:flex flex-row gap-2'>  
                                        <Hovercard headerText={`@${post.author.username}`} headerIcon={null} headerClassName={"text-sm"}>
                                            <div className='flex flex-row gap-4 p-4 w-full max-w-[300px]'>
                                                {/* @ts-ignore */}
                                                <ProfileImage user={post.author} />
                                                <div className='flex flex-col'>
                                                    <Link href={`/user/${post.author.username}`} className='hover:underline w-fit subtitle'>@{post.author.username}</Link>     
                                                    <p className='subtitle'>{post.author.description}</p>             
                                                </div>
                                            </div>
                                        </Hovercard>
                                        <p className='hidden sm:flex subtitle'>•</p> 
                                        <p className='hidden sm:flex subtitle'>{post.createdAt.toLocaleString()}</p>                         
                                    </div>
                                }                                                              
                            </div>
                        </div>
                    </div>
                </div>
                
                <Link href={`/posts/${post.id}`} className="group/title w-fit font-sans font-semibold text-[18px] md:text-lg group-hover:text-gray-300 transition-all facebookTheme:text-lg peer">{post.title}</Link>

                {/*<p className='subtitle'>{post.tagline}</p>*/}

                { session &&
                    <div className='flex flex-row mt-4 justify-between'>
                        <div className='flex flex-row gap-2'>
                            <button className='navlink !px-2 mr-auto' aria-label='Upvote'><ChevronUpIcon className='w-5 h-5' /></button>
                            <button className='navlink !px-2 mr-auto' aria-label='Downvote'><ChevronDownIcon className='w-5 h-5' /></button>
                            {/*<Link className='navlink-emphasis !px-2 md:!px-3 mr-auto' href={`/posts/${post.id}`}><ChatBubbleLeftEllipsisIcon className='w-5 h-5' /><span className='hidden md:flex'>Comments</span></Link>*/}                        
                            {/* @ts-ignore */}
                            <SavePostButton btnText={"Save"} userID={session.user.id} postID={post.id} />
                        </div>

                        <Menu
                            trigger={<button className='navlink !px-2' aria-label='More Options'><EllipsisVerticalIcon className='w-5 h-5' /></button>}
                        >
                            {/* @ts-ignore */}
                            <MenuLink text={post.author.username} icon={<ProfileImage user={post.author} imgSize={"5"} />} link={`/user/${post.author.username}`}></MenuLink>
                            <MenuLink text={post.community.display_name} icon={<img src={post.community.image} alt={post.community.display_name}></img>} link={`/c/${post.community.name}`}></MenuLink>
                            <hr className='mt-1 !mb-1'/>
                            <MenuShare icon={<ShareIcon />} text={text} title={title} url={url} />
                            { session 
                            ?
                                <>
                                    { session.user.id === post.authorId 
                                    ?
                                    <>
                                        <hr className='mt-1 !mb-1'/>
                                        <MenuButton icon={<ArchiveBoxXMarkIcon />} text={"Delete"} onClick={() => console.log("delete post")} destructive={true} />                                 
                                    </>
                                    :
                                    null
                                    }                           
                                </>
                            :
                                null
                            }
                        </Menu>                         
                    </div>
                }                  

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
 *  content={post.content}
 *  imageurl={post.imageurl}
 *  imagealt={post.imagealt}
 * />
 * 
 */

export function FullPost( post: Post ) {

    // const rehypePlugins = [rehypeSanitize];

    const { data: session } = useSession();

    return (

            <div className="rounded-md flex w-full bg-transparent h-fit facebookTheme:rounded-none px-5 py-5">

                <div className="flex w-full bg-transparent h-fit flex-col">

                    <div className="text-sm relative md:bg-card md:p-6 rounded-md">

                        {/*<BackButtonNormal className={"absolute right-0 !hidden md:!flex"} />*/}

                        <div className='flex flex-row gap-2 items-center'>
                            <img src={post.community.image} className='w-8 h-8 rounded' alt={post.community.name}></img>
                            <div className='flex flex-col justify-center'>
                                <Link className="w-fit hover:underline subtitle" href={`/c/${post.community.name}`}>{post.community.name}</Link>    
                                <div className="flex flex-row">
                                    <h4 className="w-fit flex gap-2">
                                        <Hovercard headerText={`@${post.author.username}`} headerIcon={null} headerClassName={"text-sm"}>
                                            <div className='flex flex-row gap-4 p-4 w-full max-w-[250px]'>
                                                <ProfileImage user={post.author} imgSize={"6"} />
                                                <div className='flex flex-col'>
                                                    <Link href={`/user/${post.author.username}`} className='hover:underline w-fit subtitle'>@{post.author.username}</Link>     
                                                    <p className='subtitle'>{post.author.description}</p>             
                                                </div>
                                            </div>
                                        </Hovercard>
                                        <p className='subtitle'>•</p> 
                                        <p className='subtitle'>{post.createdAt.toLocaleString()}</p> 
                                    </h4>   
                                </div>                                   
                            </div>                            
                        </div>

                        <h1 className="header-3">{post.title}</h1>
                        
                    </div>
                    
                    <div className='md:bg-card w-full h-fit md:p-6 rounded-md mt-2 md:mt-6'>
                        {post.imageurl ?

                            <div className="relative rounded-md mt-2 mb-4 max-h-96 overflow-hidden">
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
                            <MarkdownPreview source={post.content} rehypePlugins={[rehypeSanitize]} />
                        </div>                        
                    </div>

                    { session?.user && 
                        <div className='flex flex-row gap-2 md:bg-card w-full h-fit md:p-6 rounded-md mt-2 md:mt-6'>
                            <button className='navlink' disabled onClick={() => { throw new Error("Feature Unimplemented") }}><ChatBubbleLeftEllipsisIcon className="w-5 h-5" aria-label='Submit Comment' />Submit Comment</button>
                            {/* @ts-ignore */}
                            <SavePostButton userID={session.user.id} postID={post.id} />
                        </div>                    
                    }

                </div>

            </div>

    )

}