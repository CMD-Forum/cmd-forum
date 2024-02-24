"use client";

import { ArrowLeftEndOnRectangleIcon, Cog6ToothIcon, PlusIcon, ViewColumnsIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { useEffect, useRef, useState } from "react";
import LogoutButton from "../signoutButton";

export default function TopnavDropdown() {

    const [open, setIsOpen] = useState(false);
    const { data: session, update } = useSession()

    return (

        <>
            {session?.user ? (

                <div className="absolute top-3 right-[12px] lg:right-[65px]">
                    <div className='ml-auto flex gap-4'>

                        <button 
                        className={`navlink !border-0 !bg-transparent hover:!bg-border !hidden lg:!flex !font-medium ${open === true ? "!bg-border" : ""}`}
                        onClick={() => setIsOpen(!open)}
                        >
                        {session.user.image ?
                            <img className='w-5 h-5 rounded-sm mr-1' src={session.user.image} alt='Your account image' />
                            :
                            <img className='w-5 h-5 rounded-sm mr-1' src="/images/favicon/favicon.svg" alt='Your account' />
                        }
                        
                        {session.user.username}
                        </button>

                        <Link className='navlink-full icon' href={"/create/post"}><PlusIcon className='w-5 h-5' /></Link>

                    </div>

                    {open === true && (
                    <motion.div 
                        className={`bg-card border-border border-1 rounded-md w-max h-max py-2`}
                        initial={{
                            opacity: '0%'
                        }}
                        animate={{
                            opacity: '100%',
                            y: '5px'
                        }}
                        exit={{
                            opacity: '0%',
                            y: '0px'
                        }}
                        transition={{
                            duration: 0.15,
                        }}
                    >
                        <Link 
                            href={"/account"} 
                            className="hover:bg-border w-full py-2 px-4 flex gap-2 items-center transition-all text-sm"
                        >
                            <img src={session.user.image} className="w-5 h-5 rounded-sm" alt="Your profile image"></img>
                            {session?.user.username}
                        </Link>
                        <hr className="mt-2 mb-2" />
                        <Link 
                            href={"/account/posts"} 
                            className="hover:bg-border w-full py-2 px-4 flex gap-2 items-center transition-all text-sm"
                        >
                            <ViewColumnsIcon className="w-5 h-5" />
                            My Posts
                        </Link>
                        <Link 
                            href={"/account/settings"} 
                            className="hover:bg-border w-full py-2 px-4 flex gap-2 items-center transition-all text-sm"
                        >
                            <Cog6ToothIcon className="w-5 h-5" />
                            Settings
                        </Link>
                        <hr className="mt-2 mb-2" />
                        <Link 
                            href={"/account/settings"} 
                            className="hover:bg-border w-full py-2 px-4 flex gap-2 items-center transition-all text-sm"
                        >
                            <ArrowLeftEndOnRectangleIcon className="w-5 h-5" />
                            <LogoutButton />
                        </Link>
                    </motion.div>  
                    )}  

                 
                </div>
               

            ) : (

              null

            )}
            
     
        </>

    );

}