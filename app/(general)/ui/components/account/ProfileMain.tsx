"use client";

import { BookOpenIcon, CalendarDaysIcon, ChatBubbleBottomCenterTextIcon, Cog6ToothIcon, HomeIcon, MagnifyingGlassIcon, PencilSquareIcon, ShieldCheckIcon, UserIcon, ViewColumnsIcon } from "@heroicons/react/20/solid";
import Link from "next/link"
import { motion } from "framer-motion";
  
const variants = {

    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    
};

interface ProfileProps {

    username: string;
    profile_image_src: string;
    description: string;
    createdAt: string;
    postCount: string | number;

}

export default function ProfileMain(user: ProfileProps) {

    return (

        <motion.div 
            key={1}
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ ease: "easeInOut", duration: 0.8, type: "spring" }}
        >

            <div className='flex-row gap-2 px-5 py-5 rounded-md facebookTheme:rounded-none w-full bg-[#131313] facebookTheme:bg-white'>
                
                <div className='flex-col'>

                    <div className='flex flex-row gap-3 items-center'>

                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={user.profile_image_src} className='h-[56px] rounded' alt={`${user.username}'s Profile Image`} />

                        <div className='flex flex-col'>

                            <h1 className='text-2xl font-sans font-bold antialiased w-full'>{user.username}</h1>   
                            <h2 className='text-gray-300'>{user.description}</h2>

                        </div>

                    </div>

                

                    <div className='flex flex-row gap-3 items-center mt-2'>

                        <div className='flex flex-row gap-3'>

                            <div className='flex flex-row gap-1'>
                                <CalendarDaysIcon className='w-[20px]' />
                                <p className='text-sm'>{user.createdAt}</p>  
                            </div>

                            <div className='flex flex-row gap-1'>
                                <PencilSquareIcon className='w-[20px]' />
                                <p className='text-sm'>{user.postCount}</p>
                            </div>

                        </div>     

                    </div>

                </div>

            </div>  

        </motion.div>

    );

}