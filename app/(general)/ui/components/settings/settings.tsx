"use client";

import { useSession } from "@/app/(general)/lib/sessioncontext";

import ProfileImage from "../account/ProfileImage";
import { Settings_ChangeAccountUsername, Settings_ChangeDescription, Settings_DeleteAccount, Settings_GotoSessions, Settings_Setup2FA } from "./settings_sections";

export default function AccountSettings() {

    const session = useSession();

    return (
        <div className='mb-4 w-full'>
            <div className='rounded-lg flex flex-col gap-4 w-full'>
                <div className="p-6 border-1 border-border rounded-lg w-full">
                    <div className='flex-row gap-2 rounded-lg w-full bg-transparent'>
                        <div className='flex-col w-full'>
                            <div className='flex flex-row gap-3 items-center w-full relative'>
                                {/* @ts-ignore */}
                                <ProfileImage user={session.user} imgSize={"14"} />

                                <div className='flex flex-col w-full'>
                                    <h1 className='header-2'>{session.user?.username}</h1>   
                                    {/* @ts-ignore */}
                                    <p className='subtitle text-sm'>{session.user?.description}</p>
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

// Appearance Settings

export function AppearanceSettings() {
    return (
        <div className='mb-4 w-full'>
            <div className='rounded-lg flex flex-col gap-4 w-full'>
                <div className="p-6 border-1 border-border rounded-lg w-full">
                    <div className='flex-row gap-2 rounded-lg w-full bg-transparent'>             
                        <div className='flex-col w-full'>
                            <div className='flex flex-row gap-3 items-center w-full relative'>
                                <div className='flex flex-col w-full'>
                                    <h1 className='header-2'>Appearance</h1>   
                                    {/* @ts-ignore */}
                                    <p className='subtitle text-sm'>Change the theme, colors, etc.</p>
                                </div>
                            </div>
                        </div>
                    </div>  
                </div>

                {/* */}

                

            </div>
        </div>
    );
}

// Post Settings

export function PostSettings() {
    return (
        <div className='mb-4 w-full'>
            <div className='rounded-lg flex flex-col gap-4 w-full'>
                <div className="p-6 border-1 border-border rounded-lg w-full">
                    <div className='flex-row gap-2 rounded-lg w-full bg-transparent'>             
                        <div className='flex-col w-full'>
                            <div className='flex flex-row gap-3 items-center w-full relative'>
                                <div className='flex flex-col w-full'>
                                    <h1 className='header-2'>My Posts</h1>   
                                    {/* @ts-ignore */}
                                    <p className='subtitle text-sm'>Change your post settings.</p>
                                </div>
                            </div>
                        </div>
                    </div>  
                </div>

                {/* */}

                

            </div>
        </div>
    );
}

// Security Settings

export function SecuritySettings() {

    return (
        <div className='mb-4 w-full'>
            <div className='rounded-lg flex flex-col gap-4 w-full'>
                <div className="p-6 border-1 border-border rounded-lg w-full">
                    <div className='flex-row gap-2 rounded-lg w-full bg-transparent'>
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

                <Settings_GotoSessions />

            </div>
        </div>
    );
}