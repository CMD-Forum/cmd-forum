"use client";

import { PencilSquareIcon, CalendarDaysIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import ChangeAccountName from "./ChangeAccountDetails";
import { Settings_ChangeAccountUsername, Settings_DeleteAccount } from "./settings_sections";

export default function AccountSettings() {

    const { data: session, update } = useSession();

    return (
        <div className='mb-4 w-full'>

            <h2 className='header'>Account Details</h2>
            <p className="text-gray-300 font-medium antialiased w-full mb-4">Change the account details for {session?.user.username}.</p>

            <div className='rounded-md flex flex-col gap-4'>

                <div className="p-6 border-1 border-border rounded-md">
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

                <Settings_ChangeAccountUsername />

                {/* */}

                <Settings_DeleteAccount />

                {/* */}

            </div>
        </div>
    );

}