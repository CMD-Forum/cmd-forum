"use client";

import { Cog6ToothIcon, HomeIcon, MagnifyingGlassIcon, UserIcon, ViewColumnsIcon } from "@heroicons/react/20/solid";
import Link from "next/link"
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const NavSideItems = () => {

    const pathname = usePathname();
    const router = useRouter();

    return (

        <AnimatePresence>
            
            <div className='flex-col gap-2 facebookTheme:gap-0 facebookTheme:sm:pl-6 md:px-3 py-3 facebookTheme:px-0 max-w-[400px] bg-zinc-950 facebookTheme:bg-white border-zinc-950 border-l-[1px] facebookTheme:border-[#b3b3b3] facebookTheme:border-l-0 facebookTheme:border-r-[1px] hidden sm:flex lg:!w-[400px]'>
                
                <Link className={`navlink-sidebar ${pathname == "/" ? "active" : ""}`} href='/' prefetch={true}><HomeIcon className="font-medium h-5 w-5 facebookTheme:h-4 facebookTheme:w-4" /><p className='hidden lg:flex'>Homepage</p></Link>
                <Link className={`navlink-sidebar ${pathname == "/posts" ? "active" : ""}`} href='/posts' prefetch={true}><ViewColumnsIcon className="font-medium h-5 w-5 facebookTheme:h-4 facebookTheme:w-4" /><p className='hidden lg:flex'>Posts</p></Link>
                <Link className={`navlink-sidebar ${pathname == "/account" ? "active" : ""}`} href='/account' prefetch={true}><UserIcon className="font-medium h-5 w-5 facebookTheme:h-4 facebookTheme:w-4" /><p className='hidden lg:flex'>Account</p></Link>
                <hr className='border-zinc-900 mt-1 mb-1 facebookTheme:border-[#b3b3b3] facebookTheme:hidden'></hr>
                <Link className={`navlink-sidebar ${pathname == "/search" ? "active" : ""}`} href='/search' prefetch={true}><MagnifyingGlassIcon className="font-medium h-5 w-5 facebookTheme:h-4 facebookTheme:w-4" /><p className='hidden lg:flex'>Search</p></Link>
                <Link className={`navlink-sidebar ${pathname == "/account/settings" ? "active" : ""}`} href='/account/settings' prefetch={true}><Cog6ToothIcon className="font-medium h-5 w-5 facebookTheme:h-4 facebookTheme:w-4" /><p className='hidden lg:flex'>Settings</p></Link>

            </div> 

        </AnimatePresence> 

    )

}

export default NavSideItems