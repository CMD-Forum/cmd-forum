"use client";

/**
 * This file contains all the sections of the settings page.
 * This is to make coding the settings easier and to make it cleaner.
 */

import { useSession } from "next-auth/react";
import ChangeAccountName from "./ChangeAccountDetails";

export function Settings_ChangeAccountUsername() {

    const { data: session, update } = useSession();

    return (
        <div className='flex flex-col border-1 border-border rounded-md pt-6'>

            <div className="px-6">
                <h3 className='font-bold text-xl'>Account Username</h3>     
                <p className='text-sm'>Change your account username.</p>
            </div>

            <div className="w-full border-t-1 border-border mt-6 flex" />   
            
            <div className='flex flex-col bg-card md:flex-row py-3 px-6 justify-between gap-3 items-center w-full'>

                <p className="text-gray-300 text-sm">To change your username, click the button.</p>

                { session && 
                    <ChangeAccountName userID={session?.user.id} />                        
                }

            </div>

        </div>
    );

}

export function Settings_DeleteAccount() {

    return (
        <div className='flex flex-col border-1 border-border rounded-md pt-6'>

            <div className="px-6">
                <h3 className='font-bold text-xl'>Delete Account</h3>     
                <p className='text-sm'>Delete your account. Do this only if you&apos;re sure.</p>
            </div>

            <div className="w-full border-t-1 border-border mt-6 flex" />   
            
            <div className='flex flex-col bg-card md:flex-row py-3 px-6 justify-between gap-3 items-center w-full'>

                <p className="text-gray-300 text-sm">If you&apos;re sure you want to, click the button.</p>

            </div>

        </div>
    );

}