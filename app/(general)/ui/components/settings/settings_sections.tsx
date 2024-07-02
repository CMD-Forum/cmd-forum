"use client";

import Link from "next/link";

import { useSession } from "@/app/(general)/lib/sessioncontext";

import { DialogSubtitle, DialogTitle } from "../dialog/dialog";
import Dialog from "../dialog/dialog";
import { ChangeAccountDescription /*, ChangeAccountName */ } from "./settings_actions";

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
                    <Dialog>
                        <Dialog.Trigger><button className={"navlink-full"}>Change Username</button></Dialog.Trigger>
                        <Dialog.Content>
                            <Dialog.Title>Sorry, this option is unavailable.</Dialog.Title>
                            <Dialog.Subtitle>You cannot change your username at this moment, please try again later.</Dialog.Subtitle>          
                            <Dialog.ButtonContainer>
                                <Dialog.CloseButton><button className="navlink-full">Close</button></Dialog.CloseButton>
                            </Dialog.ButtonContainer>                  
                        </Dialog.Content>
                    </Dialog>
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
                    /*<Dialog closeBtn={true} openBtn={true} openBtnComponent={<button className={"navlink-full"}>Change Description</button>}>
                        <DialogTitle>Sorry, this option is unavailable.</DialogTitle>
                        <DialogSubtitle>You cannot change your description at this moment, please try again later.</DialogSubtitle>
                    </Dialog>*/
                    <ChangeAccountDescription userID={session.user.id} />
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
                    <Dialog>
                    <Dialog.Trigger><button className={"navlink-destructive"}>Delete Account</button></Dialog.Trigger>
                    <Dialog.Content>
                        <Dialog.Title>Sorry, this option is unavailable.</Dialog.Title>
                        <Dialog.Subtitle>You cannot delete your account manually at this moment. If you need your account deleted, please contact us.</Dialog.Subtitle>          
                        <Dialog.ButtonContainer>
                            <Dialog.CloseButton><button className="navlink-full">Close</button></Dialog.CloseButton>
                        </Dialog.ButtonContainer>
                    </Dialog.Content>
                </Dialog>
                    // <DeleteAccountDialog userID={session.user.id} username={session.user.username} /> // Uncomment when restrictions are added and this actually works.  
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
                    <Dialog>
                    <Dialog.Trigger><button className={"navlink-full"}>Setup 2FA</button></Dialog.Trigger>
                    <Dialog.Content>
                        <Dialog.Title>Sorry, this option is unavailable.</Dialog.Title>
                        <Dialog.Subtitle>You cannot setup Two Factor Authentication at this moment, please try again later.</Dialog.Subtitle>          
                        <Dialog.ButtonContainer>
                            <Dialog.CloseButton><button className="navlink-full">Close</button></Dialog.CloseButton>
                        </Dialog.ButtonContainer>                  
                    </Dialog.Content>
                </Dialog>
                }

            </div>

        </div>
    );

}

// ManageSessions

export function Settings_GotoSessions() {
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