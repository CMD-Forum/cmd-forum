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
    image: string;
    description: string;
    createdAt: Date;
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

            <div className='flex-row gap-2 rounded-md w-full bg-transparent'>
                
                <div className='flex-col'>

                    <div className='flex flex-row gap-3 items-center'>

                        <img src={user.image} className='h-[56px] rounded-md' alt={`${user.username}'s Profile Image`} />

                        <div className='flex flex-col'>

                            <h1 className='text-2xl font-sans font-bold antialiased w-full'>{user.username}</h1>   
                            <h2 className='text-gray-300'>{user.description}</h2>

                        </div>

                    </div>

                    <div className='flex flex-row gap-3 items-center mt-2'>

                        <div className='flex flex-row gap-3'>

                            <div className='flex flex-row gap-1'>
                                <CalendarDaysIcon className='w-[20px]' />
                                <p className='text-sm'>{user.createdAt.toLocaleDateString()}</p>  
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