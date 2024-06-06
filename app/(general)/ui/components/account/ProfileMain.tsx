"use client";

import { CalendarDaysIcon, PencilSquareIcon } from "@heroicons/react/20/solid";
import { motion } from "framer-motion";

import ProfileImage from "./ProfileImage";
  
const variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
};

interface ProfileProps {
    username: string;
    image: string | null;
    description: string;
    createdAt: Date;
    postCount: string | number;
}

export default function ProfileMain(user: ProfileProps) {

    return (
        <div className='flex-row gap-2 rounded-md w-full bg-transparent'>
            <div className='flex-col'>
                <div className='flex flex-row gap-3 items-center'>
                    {/* @ts-ignore */}
                    <ProfileImage user={user} imgSize={"14"} />
                    <div className='flex flex-col'>
                        <h1 className='header'>{user.username}</h1>   
                        { user.description 
                            ?
                            <h2 className='subtitle'>{user.description}</h2>
                            :
                            <div className='animate-pulse h-2 w-full bg-border' />
                        }
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
    );
}