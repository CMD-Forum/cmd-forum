"use client";

import { useSession } from "@/app/(general)/lib/sessioncontext";

import Modal from "../modal";
import { ChangeAccountDescription, ChangeAccountName } from "./settings_actions";
import Link from "next/link";

// Account ////////////////////

export function Settings_ChangeAccountUsername() {

    const session = useSession();

    return (
        <div className='flex flex-col border-1 border-border rounded-md pt-6'>

            <div className="px-6">
                <h3 className='font-bold text-xl'>Account Username</h3>     
                <p className='subtitle text-sm'>Change your account username.</p>
            </div>

            <div className="w-full border-t-1 border-border mt-6 flex" />   
            
            <div className='flex flex-col bg-card md:flex-row py-3 px-6 justify-between gap-3 items-center w-full'>

                <p className="subtitle hidden md:flex text-sm"></p>

                { session.user?.id && 
                    <Modal closeBtn={true} openBtn={true} openBtnComponent={<button className={"navlink-full"}>Change Username</button>}>
                        <Modal.Title>Sorry, this option is unavailable.</Modal.Title>
                        <Modal.Subtitle>You cannot change your username at this moment, please try again later.</Modal.Subtitle>
                    </Modal>
                    // <ChangeAccountName userID={session?.user.id} /> // Uncomment when restrictions are added.                       
                }

            </div>

        </div>
    );

}

export function Settings_ChangeDescription() {

    const session = useSession();

    return (
        <div className='flex flex-col border-1 border-border rounded-md pt-6'>

            <div className="px-6">
                <h3 className='font-bold text-xl'>Update Description</h3>     
                <p className='subtitle text-sm'>Update your profile description.</p>
            </div>

            <div className="w-full border-t-1 border-border mt-6 flex" />   
            
            <div className='flex flex-col bg-card md:flex-row py-3 px-6 justify-between gap-3 items-center w-full'>

                <p className="subtitle hidden md:flex text-sm"></p>

                { session.user?.id && 
                    /*<Modal closeBtn={true} openBtn={true} openBtnComponent={<button className={"navlink-full"}>Change Description</button>}>
                        <Modal.Title>Sorry, this option is unavailable.</Modal.Title>
                        <Modal.Subtitle>You cannot change your description at this moment, please try again later.</Modal.Subtitle>
                    </Modal>*/
                    <ChangeAccountDescription userID={session.user.id} /> // Uncomment when restrictions are added and this actually works.  
                }

                {/* <Switch onEnabled={() => console.log("enabled")} /> */}

            </div>

        </div>
    );

}

export function Settings_DeleteAccount() {

    const session = useSession();

    return (
        <div className='flex flex-col border-1 border-border rounded-md pt-6'>

            <div className="px-6">
                <h3 className='font-bold text-xl'>Delete Account</h3>     
                <p className='subtitle text-sm'>Delete your account. Do this only if you&apos;re sure.</p>
            </div>

            <div className="w-full border-t-1 border-border mt-6 flex" />   
            
            <div className='flex flex-col bg-card md:flex-row py-3 px-6 justify-between gap-3 items-center w-full'>

                <p className="subtitle hidden md:flex text-sm">If you&apos;re sure you want to, click the button.</p>

                { session.user?.id && 
                    <Modal closeBtn={true} openBtn={true} openBtnComponent={<button className={"navlink-destructive"}>Delete Account</button>}>
                        <Modal.Title>Sorry, this option is unavailable.</Modal.Title>
                        <Modal.Subtitle>You cannot manually delete your account at this moment. Please contact us if you absolutely need your account deleted.</Modal.Subtitle>
                    </Modal>
                    // <DeleteAccountModal userID={session.user.id} username={session.user.username} /> // Uncomment when restrictions are added and this actually works.  
                }

            </div>

        </div>
    );

}

// Security ////////////////////

export function Settings_Setup2FA() {

    const session = useSession();

    return (
        <div className='flex flex-col border-1 border-border rounded-md pt-6'>

            <div className="px-6">
                <h3 className='font-bold text-xl'>Two-Factor Authentication</h3>     
                <p className='subtitle text-sm'>Setup Two-Factor Authentication for extra security.</p>
            </div>

            <div className="w-full border-t-1 border-border mt-6 flex" />   
            
            <div className='flex flex-col bg-card md:flex-row py-3 px-6 justify-between gap-3 items-center w-full'>

                <p className="subtitle hidden md:flex text-sm"></p>

                { session.user?.id && 
                    <Modal closeBtn={true} openBtn={true} openBtnComponent={<button className={"navlink-full"}>Setup 2FA</button>}>
                        <Modal.Title>Sorry, this option is unavailable.</Modal.Title>
                        <Modal.Subtitle>You cannot setup Two-Factor Authentication at this moment.</Modal.Subtitle>
                    </Modal>
                    // <DeleteAccountModal userID={session.user.id} username={session.user.username} /> // Uncomment when restrictions are added and this actually works.  
                }

            </div>

        </div>
    );

}

// ManageSessions

export function Settings_GotoSessions() {

    const session = useSession();

    return (
        <div className='flex flex-col border-1 border-border rounded-md pt-6'>

            <div className="px-6">
                <h3 className='font-bold text-xl'>Sessions</h3>     
                <p className='subtitle text-sm'>View and delete all active sessions.</p>
            </div>

            <div className="w-full border-t-1 border-border mt-6 flex" />   
            
            <div className='flex flex-col bg-card md:flex-row py-3 px-6 justify-between gap-3 items-center w-full'>

                <p className="subtitle hidden md:flex text-sm"></p>

                <Link href={"/account/settings/sessions"} aria-label="Go to Sessions" className="navlink-full">Go to Sessions</Link>

            </div>

        </div>
    );

}