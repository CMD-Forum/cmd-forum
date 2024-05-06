"use client";

/**
 * This file contains all the sections of the settings page.
 * This is to make coding the settings easier and to make it cleaner.
 */

import { useSession } from "next-auth/react";
import { ChangeAccountDescription, ChangeAccountName, DeleteAccountModal } from "./settings_actions";
import Switch from "../switch";
import dynamic from "next/dynamic";
import { BottomdrawerBody, BottomdrawerHeader, BottomdrawerTitle } from "../bottom_drawer";
import { ArrowTrendingUpIcon, BellIcon, ChatBubbleLeftEllipsisIcon, UserIcon } from "@heroicons/react/24/solid";
import Modal from "../modal";
const Bottomdrawer = dynamic(() => import("../bottom_drawer"), { ssr: false });

export function Settings_ChangeAccountUsername() {

    const { data: session, update } = useSession();

    return (
        <div className='flex flex-col border-1 border-border rounded-md pt-6'>

            <div className="px-6">
                <h3 className='font-bold text-xl'>Account Username</h3>     
                <p className='subtitle text-sm'>Change your account username.</p>
            </div>

            <div className="w-full border-t-1 border-border mt-6 flex" />   
            
            <div className='flex flex-col bg-card md:flex-row py-3 px-6 justify-between gap-3 items-center w-full'>

                <p className="subtitle hidden md:flex text-sm">To change your username, click the button.</p>

                { session?.user.id && 
                    <Modal btnText={"Update Username"} btnType={"navlink-full"} closeBtn={true} closeBtnType={"navlink-full"}>
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

    const { data: session, update } = useSession();

    return (
        <div className='flex flex-col border-1 border-border rounded-md pt-6'>

            <div className="px-6">
                <h3 className='font-bold text-xl'>Update Description</h3>     
                <p className='subtitle text-sm'>Update your profile description.</p>
            </div>

            <div className="w-full border-t-1 border-border mt-6 flex" />   
            
            <div className='flex flex-col bg-card md:flex-row py-3 px-6 justify-between gap-3 items-center w-full'>

                <p className="subtitle hidden md:flex text-sm">To update your description, click the button.</p>

                { session?.user.id && 
                    <Modal btnText={"Update Description"} btnType={"navlink-full"} closeBtn={true} closeBtnType={"navlink-full"}>
                        <Modal.Title>Sorry, this option is unavailable.</Modal.Title>
                        <Modal.Subtitle>You cannot change your description at this moment, please try again later.</Modal.Subtitle>
                    </Modal>
                    // <ChangeAccountDescription userID={session.user.id} /> // Uncomment when restrictions are added and this actually works.  
                }

                {/* <Switch onEnabled={() => console.log("enabled")} /> */}

            </div>

        </div>
    );

}

export function Settings_DeleteAccount() {

    const { data: session, update } = useSession();

    return (
        <div className='flex flex-col border-1 border-border rounded-md pt-6'>

            <div className="px-6">
                <h3 className='font-bold text-xl'>Delete Account</h3>     
                <p className='subtitle text-sm'>Delete your account. Do this only if you&apos;re sure.</p>
            </div>

            <div className="w-full border-t-1 border-border mt-6 flex" />   
            
            <div className='flex flex-col bg-card md:flex-row py-3 px-6 justify-between gap-3 items-center w-full'>

                <p className="subtitle hidden md:flex text-sm">If you&apos;re sure you want to, click the button.</p>

                { session?.user.id && 
                    <Modal btnText={"Delete Account"} btnType={"navlink-destructive"} closeBtn={true} closeBtnType={"navlink-full"}>
                        <Modal.Title>Sorry, this option is unavailable.</Modal.Title>
                        <Modal.Subtitle>You cannot manually delete your account at this moment. Please contact us if you absolutely need your account deleted.</Modal.Subtitle>
                    </Modal>
                    // <DeleteAccountModal userID={session.user.id} username={session.user.username} /> // Uncomment when restrictions are added and this actually works.  
                }

            </div>

        </div>
    );

}