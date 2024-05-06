"use client";

import { useSession } from "next-auth/react";
import { Settings_ChangeAccountUsername, Settings_ChangeDescription, Settings_DeleteAccount, Settings_Setup2FA } from "./settings_sections";

export default function AccountSettings() {

    const { data: session } = useSession();

    return (
        <div className='mb-4 w-full'>

            <div className='rounded-md flex flex-col gap-4 w-full'>

                <div className="p-6 border-1 border-border rounded-md w-full">
                    <div className='flex-row gap-2 rounded-md w-full bg-transparent'>
                    
                        <div className='flex-col w-full'>

                            <div className='flex flex-row gap-3 items-center w-full relative'>

                                {/* @ts-ignore */}
                                <img src={session?.user.image} className='h-[56px] top-0 left-0 rounded-md absolute' alt={`${session?.user.username}'s Profile Image`} />

                                <div className='flex flex-col w-full pl-20'>

                                    <h1 className='header-2'>{session?.user.username}</h1>   
                                    {/* @ts-ignore */}
                                    <p className='subtitle text-sm'>{session?.user.description}</p>

                                </div>

                            </div>



                        </div>

                    </div>  
                </div>

                {/* */}

                <Settings_ChangeAccountUsername />

                {/* */}

                <Settings_ChangeDescription />

                {/* */}

                <Settings_DeleteAccount />

                {/* */}

            </div>
        </div>
    );

}

export function SecuritySettings() {

    const { data: session } = useSession();

    return (
        <div className='mb-4 w-full'>

            <div className='rounded-md flex flex-col gap-4 w-full'>

                <div className="p-6 border-1 border-border rounded-md w-full">
                    <div className='flex-row gap-2 rounded-md w-full bg-transparent'>
                    
                        <div className='flex-col w-full'>

                            <div className='flex flex-row gap-3 items-center w-full relative'>

                                <div className='flex flex-col w-full'>

                                    <h1 className='header-2'>Security</h1>   
                                    {/* @ts-ignore */}
                                    <p className='subtitle text-sm'>Change your security settings.</p>

                                </div>

                            </div>



                        </div>

                    </div>  
                </div>

                {/* */}

                <Settings_Setup2FA />

            </div>
        </div>
    );

}