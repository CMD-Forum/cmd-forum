"use client";

import { AdjustmentsHorizontalIcon, ArrowRightEndOnRectangleIcon, ArrowRightStartOnRectangleIcon, Bars2Icon, BookmarkIcon, ChevronDownIcon,ChevronLeftIcon, ChevronRightIcon, HomeIcon, MagnifyingGlassIcon, MapPinIcon, PlusIcon, UserCircleIcon, UserIcon, UserPlusIcon, ViewColumnsIcon } from "@heroicons/react/16/solid";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { getAllUserMembershipRecords } from "@/app/(general)/lib/data";
import { useSession } from "@/app/(general)/lib/sessioncontext";

import ProfileImage from "../account/ProfileImage";
import Menu, { MenuLink, MenuUser } from "../menu/menu";
import LogoutButton from "../signoutButton";

/**
 * ## Sidebar
 * ---
 * Sidebar of the website.
 */

export default function Sidebar() {

    const [expanded, setExpanded] = useState<boolean>(false);
    const [userMemberships, setUserMemberships] = useState<any[]>();
    const [isLoading, setIsLoading] = useState(true);
    const pathname = usePathname();

    const { user } = useSession();

    useEffect(() => {
        async function fetchUserMembership() {
            setIsLoading(true);
            if ( user?.id ) {
                const memberships = await getAllUserMembershipRecords({ userID: user.id });
                if ( memberships ) {
                    memberships.memberships.map((membership) => {
                        // eslint-disable-next-line no-unused-vars
                        const communityDisplayName = membership.community.name;
                    });     
                    setIsLoading(false);               
                }
                // @ts-ignore
                setUserMemberships(memberships);   
                setIsLoading(false);             
            }
        }

        fetchUserMembership();
    }, [user?.id])

    return (
        <>
                <nav className="hidden md:flex" role="navigation">
                    <>
                        <div className="flex flex-row justify-between top-0 w-full h-fit p-3 fixed bg-card-light z-[50] md:hidden overflow-auto">
                            <button className="navlink !px-2 !py-2 z-[100] ml-2 !w-fit " onClick={() => setExpanded(!expanded)}><Bars2Icon className="w-4 h-4" /></button>    
                        </div>
                    </>
                    
                    <motion.div 
                        className={`bg-card ${expanded ? "z-[9999999] lg:z-[9999999]" : "-z-[50] md:z-[9999999]" } p-4 fixed md:sticky top-0 h-screen overflow-y-auto hide-scrollbar overflow-x-hidden`}
                        initial={{ width: expanded ? 300 : 74 | 74}}
                        animate={{ width: expanded ? 300 : 74 | 74}}
                        exit={{ width: expanded ? 300 : 74 | 74 }}
                        transition={{ ease: "easeOut", duration: 0.2 }}
                        role="navigation"
                        aria-label="Sidebar"
                    >
                        <div className="sticky top-4 overflow-y-auto overflow-x-hidden">
                            <div className={`flex flex-row items-center ${expanded ? "justify-between" : "justify-center"} `}>
                                { expanded ? <Link className={`z-50 ml-0 mr-0 flex font-extrabold text-2xl hover:text-gray-300 transition-all whitespace-nowrap overflow-hidden w-fit overflow-ellipsis`} href={"/"}>Command</Link> : null }
                                <button className="navlink !px-2 !py-2 no-ring" onClick={() => setExpanded(!expanded)} aria-label={ expanded ? "Close Sidebar" : "Open Sidebar"}>{ expanded ? <ChevronLeftIcon className="w-5 h-5" /> : <ChevronRightIcon className="w-5 h-5" /> }</button>
                            </div>
                            <hr className="mt-4 mb-4"/>
                            <div className="flex flex-col gap-1">
                                <Link className={`navlink-sidebar ${expanded ? "" : "max-w-fit"} ${pathname.startsWith("/posts/") || pathname === "/posts" ? "after-active" : null}`} href={"/posts"} aria-label="Posts"><HomeIcon className="w-5 h-5" /><span className={`${expanded ? "flex" : "hidden"}`}>Posts</span></Link>
                                <Link className={`navlink-sidebar ${expanded ? "" : "max-w-fit"} ${pathname.startsWith("/c/") || pathname === "/c" ? "after-active" : null}`} href={"/c"} aria-label="Community"><ViewColumnsIcon className="w-5 h-5" /><span className={`${expanded ? "flex" : "hidden"}`}>Community</span></Link>
                                <Link className={`navlink-sidebar ${expanded ? "" : "max-w-fit"} ${pathname.startsWith("/search/") || pathname === "/search" ? "after-active" : null}`} href={"/search"} aria-label="Search"><MagnifyingGlassIcon className="w-5 h-5" /><span className={`${expanded ? "flex" : "hidden"}`}>Search</span></Link>                
                            </div>

                            <hr className="mt-4 mb-4"/>

                            <Link className={`navlink-sidebar ${expanded ? "" : "max-w-fit"} ${pathname === "/create" ? "after-active" : null}`} href={"/create"} aria-label="Create"><PlusIcon className="w-5 h-5" /><span className={`${expanded ? "flex" : "hidden"}`}>Create</span></Link>

                            { user ? 
                                <>

                                    <hr className="mt-4 mb-4"/>

                                    {/* @ts-ignore */}
                                    { userMemberships && userMemberships.memberships.length > 0 ? 
                                        <>
                                            <div className="flex flex-col gap-1">
                                                { isLoading ?
                                                    <div className="flex flex-col gap-1">
                                                        <div className='bg-border rounded animate-pulse !w-[40px] !h-[40px]' />  
                                                        <div className='bg-border rounded animate-pulse !w-[40px] !h-[40px]' />  
                                                        <div className='bg-border rounded animate-pulse !w-[40px] !h-[40px]' />  
                                                    </div>
                                                :
                                                    <div className="flex flex-col gap-1">
                                                        {/* @ts-ignore */}
                                                        { userMemberships && userMemberships.memberships.map((membership) => {
                                                            return <Link key={membership.community.id} className={`navlink-sidebar ${expanded ? "" : "max-w-fit"} ${pathname === `/c/${membership.community.name}` ? "after-active" : null}`} href={`/c/${membership.community.name}`} aria-label={membership.community.name}><img src={membership.community.image} alt={membership.community.name} className="w-5 h-5 rounded" /><span className={`${expanded ? "flex" : "hidden"}`}>{membership.community.name}</span></Link> 
                                                        })}
                                                    </div>                               
                                                }
                                            </div>

                                            <hr className="mt-4 mb-4"/>                                    
                                        </>
                                    :
                                        null
                                    }

                                    <div className="flex flex-col overflow-x-hidden">
                                        <div className="flex flex-col gap-1">
                                            <Link className={`navlink-sidebar ${expanded ? "" : "max-w-fit"} ${pathname === `/user/${user.username}` ? "after-active" : null}`} href={`/user/${user.username}`} aria-label="Profile"><UserCircleIcon className="w-5 h-5" /><span className={`${expanded ? "flex" : "hidden"}`}>Profile</span></Link> 
                                            <Link className={`navlink-sidebar ${expanded ? "" : "max-w-fit"} ${pathname === `/posts/saved` ? "after-active" : null}`} href={`/posts/saved`} aria-label="Saved Posts"><BookmarkIcon className="w-5 h-5" /><span className={`${expanded ? "flex" : "hidden"}`}>Saved Posts</span></Link> 
                                            <Link className={`navlink-sidebar ${expanded ? "" : "max-w-fit"} ${pathname === `/account/settings` ? "after-active" : null}`} href={`/account/settings`} aria-label="Settings"><AdjustmentsHorizontalIcon className="w-5 h-5" /><span className={`${expanded ? "flex" : "hidden"}`}>Settings</span></Link> 
                                            <LogoutButton className={"navlink-sidebar"}><ArrowRightStartOnRectangleIcon className="w-5 h-5" /><span className={`${expanded ? "flex" : "hidden"}`}>Logout</span></LogoutButton>
                                        </div>
                                    </div>                           
                                </>
                                :
                                <>
                                    <hr className="mt-4 mb-4"/>

                                    <div className="flex flex-col gap-1 overflow-x-hidden">
                                        <div className="flex flex-col gap-1 mt-2">
                                            <Link className={`navlink-sidebar ${expanded ? "" : "max-w-fit"} ${pathname === `/login` ? "after-active" : null}`} href={`/login`} aria-label="Login"><ArrowRightEndOnRectangleIcon className="w-5 h-5" /><span className={`${expanded ? "flex" : "hidden"}`}>Login</span></Link> 
                                            <Link className={`navlink-sidebar ${expanded ? "" : "max-w-fit"} ${pathname === `/signup` ? "after-active" : null}`} href={`/signup`} aria-label="Signup"><UserPlusIcon className="w-5 h-5" /><span className={`${expanded ? "flex" : "hidden"}`}>Signup</span></Link> 
                                        </div>
                                    </div>                               
                                </>
                            }

                        </div>  
                    </motion.div>                     
                </nav>

                <nav className="flex md:hidden" role="navigation">
                    <>
                        <div className="flex flex-row top-0 w-screen min-w-0 h-fit p-3 fixed bg-card-light z-[50] md:hidden justify-between">
                            <button className="navlink !px-2 !py-2 z-[100] ml-2 !w-fit" onClick={() => setExpanded(!expanded)} aria-label="Toggle Sidebar"><Bars2Icon className="w-4 h-4" /></button>  
                            { user && 
                                <Menu>
                                    {/* @ts-ignore */}
                                    <Menu.Trigger><button className="navlink" aria-label="Toggle Account Dropdown"><ProfileImage user={user} imgSize={"5"} /><ChevronDownIcon className="w-4 h-4" /></button></Menu.Trigger>
                                    <Menu.Content>
                                        <MenuUser />
                                        <hr className='mt-1 mb-1' />
                                        <MenuLink text={"Saved Posts"} icon={<BookmarkIcon />} link={"/posts/saved"} />
                                        <hr className='mt-1 mb-1' />
                                        <MenuLink text={"Settings"} icon={<AdjustmentsHorizontalIcon />} link={"/account/settings"} />
                                        <LogoutButton className={"hover:bg-border w-full px-3 py-2 flex gap-2 items-center transition-all text-sm subtitle hover:!text-white rounded"}><ArrowRightEndOnRectangleIcon className='w-5 h-5' />Logout</LogoutButton>                                        
                                    </Menu.Content>
                                </Menu>                            
                            }  
                        </div>
                    </>
                    
                    <motion.div 
                        className={`bg-card p-4 fixed z-[500] md:sticky top-0 h-screen overflow-y-auto hide-scrollbar !w-[300px]`}
                        initial={{ x: expanded ? 0 : -300}}
                        animate={{ x: expanded ? 0 : -300}}
                        exit={{ x: expanded ? 0 : -300 }}
                        transition={{ ease: "easeOut", duration: 0.2 }}
                        role="navigation"
                        aria-label="Sidebar"
                    >
                        <div className="sticky top-4 overflow-y-scroll">
                            <div className={`flex flex-row items-center justify-between`}>
                                <Link className={`z-50 ml-0 mr-0 flex font-extrabold text-2xl hover:text-gray-300 transition-all whitespace-nowrap overflow-hidden w-fit overflow-ellipsis`} href={"/"} aria-label="Home">Command</Link>
                                <button className="navlink !px-2 !py-2 no-ring" onClick={() => setExpanded(!expanded)} aria-label={ expanded ? "Close Sidebar" : "Open Sidebar"}>{ expanded ? <ChevronLeftIcon className="w-5 h-5" /> : <ChevronRightIcon className="w-5 h-5" /> }</button>
                            </div>
                            <hr className="mt-4 mb-4"/>
                            <div className="flex flex-col gap-1">
                                <Link className={`navlink-sidebar ${pathname.startsWith("/posts/") || pathname === "/posts" ? "after-active" : null}`} href={"/posts"} aria-label="Posts"><HomeIcon className="w-5 h-5" /><span>Posts</span></Link>
                                <Link className={`navlink-sidebar ${pathname.startsWith("/c/") || pathname === "/c" ? "after-active" : null}`} href={"/c"} aria-label="Community"><ViewColumnsIcon className="w-5 h-5" /><span>Community</span></Link>
                                <Link className={`navlink-sidebar ${pathname.startsWith("/search/") || pathname === "/search" ? "after-active" : null}`} href={"/search"} aria-label="Search"><MagnifyingGlassIcon className="w-5 h-5" /><span>Search</span></Link>                
                            </div>

                            <hr className="mt-4 mb-4"/>

                            <Link className={`navlink-sidebar ${pathname === "/create" ? "after-active" : null}`} href={"/create"} aria-label="Create"><PlusIcon className="w-5 h-5" /><span>Create</span></Link>

                            { user ? 

                                <>
                                    <hr className="mt-4 mb-4"/>

                                    {/* @ts-ignore */}
                                    { userMemberships && userMemberships.memberships.length > 0 ? 
                                        <>
                                            <div className="flex flex-col gap-1">
                                                { isLoading ?
                                                    <div className="flex flex-col gap-1">
                                                        <div className='bg-border rounded animate-pulse !w-[40px] !h-[40px]' />  
                                                        <div className='bg-border rounded animate-pulse !w-[40px] !h-[40px]' />  
                                                        <div className='bg-border rounded animate-pulse !w-[40px] !h-[40px]' />  
                                                    </div>
                                                :
                                                    <div className="flex flex-col gap-1">
                                                        {/* @ts-ignore */}
                                                        { userMemberships && userMemberships.memberships.map((membership) => {
                                                            return <Link key={membership.community.id} className={`navlink-sidebar ${expanded ? "" : "max-w-fit"} ${pathname === `/c/${membership.community.name}` ? "after-active" : null}`} href={`/c/${membership.community.name}`} aria-label={membership.community.name}><img src={membership.community.image} alt={membership.community.name} className="w-5 h-5 rounded" /><span className={`${expanded ? "flex" : "hidden"}`}>{membership.community.name}</span></Link> 
                                                        })}
                                                    </div>                               
                                                }
                                            </div>                              
                                        </>
                                    :
                                        null
                                    }                 
                                </>
                                :
                                <>
                                    <hr className="mt-4 mb-4"/>

                                    <div className="flex flex-col gap-1 overflow-x-hidden">
                                        <div className="flex flex-col gap-1 mt-2">
                                            <Link className={`navlink-sidebar ${pathname === `/login` ? "after-active" : null}`} href={`/login`} aria-label="Login"><ArrowRightEndOnRectangleIcon className="w-5 h-5" /><span>Login</span></Link> 
                                            <Link className={`navlink-sidebar ${pathname === `/signup` ? "after-active" : null}`} href={`/signup`} aria-label="Signup"><UserPlusIcon className="w-5 h-5" /><span>Signup</span></Link> 
                                        </div>
                                    </div>                               
                                </>
                            }

                        </div>  
                    </motion.div>                     
                </nav>        
        </>
    );
}