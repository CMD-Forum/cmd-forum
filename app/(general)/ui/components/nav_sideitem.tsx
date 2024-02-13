"use client";

import { BookOpenIcon, CalendarDaysIcon, ChatBubbleBottomCenterTextIcon, Cog6ToothIcon, HomeIcon, MagnifyingGlassIcon, PencilSquareIcon, ShieldCheckIcon, UserIcon, ViewColumnsIcon } from "@heroicons/react/20/solid";
import Link from "next/link"
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeRaw from "rehype-raw";
import { Suspense } from "react";
import NavSideItemsFallback from "../fallback/NavSideItems";

export function NavSideItems() {

    const pathname = usePathname();

    return (

        <AnimatePresence>
            
            <div className='flex-col gap-2 facebookTheme:gap-0 facebookTheme:sm:pl-6 px-3 py-3 facebookTheme:px-0 max-w-[300px] bg-card sticky facebookTheme:bg-white border-zinc-950 border-l-[1px] facebookTheme:border-[#b3b3b3] facebookTheme:border-l-0 facebookTheme:border-r-[1px] hidden sm:flex md:hidden lg:!w-[400px]'>
                
                <Suspense fallback={<NavSideItemsFallback />}>

                    <div className="flex-col sticky top-[115px] gap-2 px-2 !first:pt-0 !last:pb-0">

                        <Link className={`navlink-sidebar ${pathname == "/" ? "active" : ""}`} href='/' prefetch={true}><HomeIcon className="font-medium h-5 w-5 facebookTheme:h-4 facebookTheme:w-4" /><p className='hidden lg:flex'>Homepage</p></Link>
                        <Link className={`navlink-sidebar ${pathname == "/c" ? "active" : ""}`} href='/c' prefetch={true}><ViewColumnsIcon className="font-medium h-5 w-5 facebookTheme:h-4 facebookTheme:w-4" /><p className='hidden lg:flex'>Community</p></Link>
                        <Link className={`navlink-sidebar ${pathname == "/account" ? "active" : ""}`} href='/account' prefetch={true}><UserIcon className="font-medium h-5 w-5 facebookTheme:h-4 facebookTheme:w-4" /><p className='hidden lg:flex'>Account</p></Link>
                        <hr className='border-zinc-900 mt-1 mb-1 facebookTheme:border-[#b3b3b3] facebookTheme:hidden'></hr>
                        <Link className={`navlink-sidebar ${pathname == "/search" ? "active" : ""}`} href='/search' prefetch={true}><MagnifyingGlassIcon className="font-medium h-5 w-5 facebookTheme:h-4 facebookTheme:w-4" /><p className='hidden lg:flex'>Search</p></Link>
                        <Link className={`navlink-sidebar ${pathname == "/account/settings" ? "active" : ""}`} href='/account/settings' prefetch={true}><Cog6ToothIcon className="font-medium h-5 w-5 facebookTheme:h-4 facebookTheme:w-4" /><p className='hidden lg:flex'>Settings</p></Link>                    
                
                    </div>

                </Suspense>

            </div> 

        </AnimatePresence> 

    )

}

export function BottombarItems() {

    const pathname = usePathname();

    return (

        <div className='max-w-full flex flex-row bg-[#0F0F0F] facebookTheme:bg-facebook_blue px-2 gap-2 w-full backdrop-blur-md transition-all sm:hidden fixed left-0 bottom-0 z-30'>
    
            <Link className={`bottombar-link ${pathname == "/" ? "active" : ""}`} href='/'><HomeIcon className="font-medium h-5 w-5" /><p>Home</p></Link>
            <Link className={`bottombar-link ${pathname == "/posts" ? "active" : ""}`} href='/posts'><ViewColumnsIcon className="font-medium h-5 w-5" /><p>Posts</p></Link>
            <Link className={`bottombar-link ${pathname == "/account" ? "active" : ""}`} href='/account'><UserIcon className="font-medium h-5 w-5" /><p>Account</p></Link>
            <Link className={`bottombar-link ${pathname == "/account/settings" ? "active" : ""}`} href='/account/settings'><Cog6ToothIcon className="font-medium h-5 w-5" /><p>Settings</p></Link>
    
        </div>
    
    );

}

export function TopbarItems() {

    const pathname = usePathname();

    return (

        <div className='gap-6 hidden md:flex'>

            <Link className={`topbar-link ${pathname == "/" ? "active" : ""}`} href='/'>HOME</Link>
            <Link className={`topbar-link ${pathname.startsWith("/c/") || pathname == "/c" ? "active" : ""}`} href='/c/'>COMMUNITY</Link>
            <Link className={`topbar-link ${pathname.startsWith("/posts") ? "active" : ""}`} href='/posts/'>POSTS</Link>
            <Link className={`topbar-link ${pathname.startsWith("/support") ? "active" : ""}`} href='/support/'>SUPPORT</Link>            
            <Link className={`topbar-link ${pathname.startsWith("/search") ? "active" : ""}`} href='/search/'>SEARCH</Link>

        </div>

    )

}

interface InfobarProps {

    community: string;
    community_image: string;
    community_description: string;
    community_dn: string; // Community Display Name
    // @ts-ignore: Still works, notify if breaks || EDIT: 29/12/2023 -- Administrators is being reworked so this will most likely change in the near future, however it isn't a priority.
    administrators: Array;
    main: string;
    createdAt: string;
    
}
  
const variants = {

    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    
};

export function CommunityInfobarItems(infobar: InfobarProps) {

    return (

        <motion.div 
            key={infobar.community}
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ ease: "easeInOut", duration: 0.8, type: "spring" }}
        >

            <div className='flex-row gap-2 p-8 rounded-md facebookTheme:rounded-none w-full bg-card border-[1px] border-border facebookTheme:bg-white'>
                
                <div className='flex-col'>

                <div className='flex flex-row gap-3 items-center'>

                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={infobar.community_image} className='h-[56px] rounded' alt={`${infobar.community}'s Community Image`} />

                    <div className='flex flex-col'>

                    <h1 className='text-2xl font-sans font-bold antialiased w-full'>{infobar.community}</h1>   
                    <h2 className='text-gray-300'>{infobar.community_description}</h2>

                    </div>

                </div>

                

                <div className='flex flex-row gap-3 items-center mt-2'>

                    <div className='flex flex-row gap-3'>

                    <div className='flex flex-row gap-1'>
                        <CalendarDaysIcon className='w-[20px]' />
                        <p className='text-sm'>19/12/2023</p>  
                    </div>
                    
                    <div className='flex flex-row gap-1'>
                        <UserIcon className='w-[20px]' />
                        <p className='text-sm'>24k</p>
                    </div>

                    <div className='flex flex-row gap-1'>
                        <PencilSquareIcon className='w-[20px]' />
                        <p className='text-sm'>152k</p>
                    </div>

                    <div className='flex flex-row gap-1'>
                        <ChatBubbleBottomCenterTextIcon className='w-[20px]' />
                        <p className='text-sm'>58k</p>
                    </div>

                    </div>     

                    

                </div>

                <div className='flex flex-row gap-2 mt-3 mb-3'>

                    <Link className='navlink justify-center items-center' href={`/c/${infobar.community}/rules`}><BookOpenIcon className="font-medium h-5 w-5" /><p className='flex items-center h-full'>Rules</p></Link>
                    <Link className='navlink justify-center items-center' href={`/c/${infobar.community}/moderation`}><ShieldCheckIcon className="font-medium h-5 w-5" /><p className='flex items-center h-full'>Moderation</p></Link>    

                </div>
                

                </div>

                <ol>

                {infobar.administrators.map((admin: string | number | boolean, index: React.Key | null | undefined) => (
                    
                    <li key={index} className='text-gray-300'>{admin}</li>

                ))}

                </ol>

                <hr className=' border-zinc-900 facebookTheme:border-[#b3b3b3] mb-2'></hr>

                <div className='markdown-body'>

                <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]} rehypePlugins={[rehypeRaw]}>{infobar.main}</ReactMarkdown>

                </div>

            </div>  

        </motion.div>

    );

}