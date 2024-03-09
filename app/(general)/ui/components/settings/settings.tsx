"use client";

import { PencilSquareIcon, CalendarDaysIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import ChangeAccountName from "./ChangeAccountDetails";

export default function AccountSettings() {

    const { data: session, update } = useSession();

    return (
        <div className='mb-4 w-full'>

            <h2 className='header'>Account Details</h2>
            <p className="text-gray-300 font-bold antialiased w-full mb-3">Change the account details for {session?.user.username}.</p>

            <div className='border-1 border-border rounded-md'>

                <div className="p-6 border-b-1 border-border">
                    <div className='flex-row gap-2 rounded-md w-full bg-transparent'>
                    
                        <div className='flex-col'>

                            <div className='flex flex-row gap-3 items-center'>

                                {/* @ts-ignore */}
                                <img src={session?.user.image} className='h-[56px] rounded-md' alt={`${session?.user.username}'s Profile Image`} />

                                <div className='flex flex-col'>

                                    <h1 className='text-2xl font-sans font-bold antialiased w-full'>{session?.user.username}</h1>   
                                    {/* @ts-ignore */}
                                    <h2 className='text-gray-300'>{session?.user.description}</h2>

                                </div>

                            </div>



                        </div>

                    </div>  
                </div>

                {/* */}

                <div className='flex md:flex-row flex-col gap-2 items-center border-b-1 border-border p-4'>

                    <div className='flex flex-col mr-auto'>
                        
                        <h3 className='font-bold text-sm'>Change your username</h3>    
                        <p className='text-sm'>Don&apos;t like your username? Change it!</p>

                    </div>
                    
                    <div className='flex flex-row mr-auto md:mr-0 md:ml-auto w-fit'>

                        { session && 
                            <ChangeAccountName userID={session?.user.id} />                        
                        }

                    </div>

                </div>

                {/* */}

                <div className='flex md:flex-row flex-col gap-2 items-center p-4'>

                    <div className='flex flex-col mr-auto'>

                        <h3 className='font-bold text-sm'>Delete your account</h3>    
                        <p className='text-sm'>This action cannot be reversed, be sure you want to do it.</p>

                    </div>

                    <div className='flex flex-row mr-auto md:mr-0 md:ml-auto w-fit'>

                        <button className='navlink-destructive'>Delete Account</button>

                    </div>
                </div>

                {/* */}

            </div>
        </div>
    );

}