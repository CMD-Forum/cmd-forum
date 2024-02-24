"use client";

import { 
    BookOpenIcon, 
    CalendarDaysIcon, 
    ChatBubbleBottomCenterTextIcon, 
    Cog6ToothIcon, 
    HomeIcon, 
    MagnifyingGlassIcon, 
    PencilSquareIcon, 
    ShieldCheckIcon, 
    UserIcon, 
    ViewColumnsIcon, 
    Bars3Icon,
    XMarkIcon,
    UserCircleIcon
} from "@heroicons/react/20/solid";
import Link from "next/link"
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeRaw from "rehype-raw";
import { Suspense, useState } from "react";
import NavSideItemsFallback from "../fallback/NavSideItems";
import { inter } from "../fonts";
import { useSession } from "next-auth/react"
import Modal from "./modal";

export function NavSideItems() {

    const pathname = usePathname();
    const [expanded, setExpanded] = useState(false);
    const { data: session, update } = useSession();

    return (

        <AnimatePresence mode="wait" initial={false}>

            <>
                <button className={`navlink-sidebar fixed top-0 z-[100] ml-2 lg:hidden !w-fit !border-[1px] !border-border`} onClick={() => setExpanded(!expanded)}><Bars3Icon className="font-medium h-5 w-5 facebookTheme:h-4 facebookTheme:w-4" /></button>
            </>

            <motion.div 
                className={`w-full top-0 left-0 h-dvh overflow-hidden absolute ${expanded === true ? "z-[1000]" : "-z-50"} bg-semitransparent fixed`}
                animate={{
                    opacity: expanded ? "100%" : "0%",
                }}
            >
                <motion.div 
                    className="bg-card fixed top-0 z-40 w-[300px] px-4 py-2 h-full flex flex-col"
                    animate={{
                        x: expanded ? "0px" : "-300px",
                    }}
                    exit={{
                        x: expanded ? "0px" : "-300px",
                    }}
                    transition={{ type: "tween" }}     
                >
                
                    <div className="w-full h-fit flex flex-row-reverse mt-1">
                        <button className={`navlink-sidebar  z-[100] !mb-0 !mt-0 !w-fit !border-[1px] !border-border`} onClick={() => setExpanded(!expanded)}><XMarkIcon className="font-medium h-5 w-5 facebookTheme:h-4 facebookTheme:w-4" /></button>
                        <h1 className={`${inter.className} font-extrabold text-3xl mr-auto flex items-center hover:text-gray-300 transition-all cursor-pointer`}>CMD/&gt;</h1>
                    </div>

                    <Link 
                        className={`navlink-sidebar !mt-4 ${pathname === "/" ? "active" : null}`} 
                        href={"/"} 
                        prefetch={true}>
                        <HomeIcon className="w-5 h-5 mr-1" />
                        Homepage
                    </Link>

                    <Link 
                        className={`navlink-sidebar !mt-0 ${pathname === "/c" ? "active" : null}`} 
                        href={"/c"} 
                        prefetch={true}>
                        <ViewColumnsIcon className="w-5 h-5 mr-1" />
                        Community
                    </Link>

                    <hr />

                    {session 
                    ?

                        <div className="mt-auto">
                            <Link 
                                className={`navlink-sidebar mt-auto`} 
                                href={"/account"} 
                                prefetch={true}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={session.user.profile_image} className="w-5 h-5 rounded-sm mr-1" alt="Your Account Image" />
                                {session.user.name}
                            </Link>   
                        </div>

                    :

                        <Modal>
                            <Modal.Title>Login or Signup for CMD/&gt; aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</Modal.Title>
                            <Modal.Subtitle>Would you like to login or signup?</Modal.Subtitle>
                            <Modal.Button type="navlink-full" onClick={ () => null }>Login</Modal.Button>
                            <Modal.Button type="navlink" onClick={ () => null }>Close</Modal.Button>
                        </Modal>

                    }

                </motion.div>                
            </motion.div>

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

            <Link className={`topbar-link ${pathname == "/" ? "active" : ""}`} href='/'>Home</Link>
            <Link className={`topbar-link ${pathname.startsWith("/c") || pathname == "/c" ? "active" : ""}`} href='/c/'>Community</Link>
            <Link className={`topbar-link ${pathname.startsWith("/posts") ? "active" : ""}`} href='/posts/'>Posts</Link>       
            <Link className={`topbar-link ${pathname.startsWith("/search") ? "active" : ""}`} href='/search/'>Search</Link>

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