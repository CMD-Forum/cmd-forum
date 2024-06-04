"use client";

import { ArchiveBoxXMarkIcon, ArrowRightEndOnRectangleIcon, BookmarkIcon, Cog6ToothIcon, EllipsisVerticalIcon, MegaphoneIcon, ShareIcon } from "@heroicons/react/16/solid";
import Dropdown, { DropdownButton, DropdownCustom, DropdownLink, DropdownShare, DropdownUser } from "../components/dropdown/dropdown";
import LargeDropdown from "../components/large_dropdown";
import Alert, { AlertSubtitle, AlertTitle } from "../components/new_alert";
import ComIDBtn, { ComMemBtn } from "./test";
import LogoutButton from "../components/signoutButton";
import Link from "next/link";
import Modal from "../components/modal";
import Bottomdrawer, { BottomdrawerBody, BottomdrawerHeader } from "../components/bottom_drawer";
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Design - CMD',
};

export default function DeveloperPage() {

    return (

        <div className="">
                <div className="flex flex-col border-0 border-border p-6 pt-12 lg:pb-12 lg:p-12 lg:px-48 bg-card mt-8 md:mt-0">
                    <h1 className="header">Design Page</h1>
                    <p className={`subtitle sm:hidden`}>List of all UI items in Command.</p>
                </div>

            <div className="flex flex-col px-6 lg:py-12 lg:px-48 mt-6 mb-6">
                    

                <div className="flex flex-col gap-2 mt-4">
                    <LargeDropdown title={"Buttons"} description={""}>

                        <h2 className="header-5 w-full mb-4">Normal</h2>
                        <button className={"navlink mb-4"}>normal</button>
                        <button className={"navlink-full mb-4"}>full</button>
                        <button className={"navlink-destructive mb-4"}>destructive</button>
                        <button className={"navlink-emphasis mb-4"}>emphasis</button>
                        <button className={"navlink-ghost mb-4"}>ghost</button>

                        <h2 className="header-5 w-full mb-4">Disabled</h2>
                        <button className={"navlink mb-4"} disabled>normal disabled</button>
                        <button className={"navlink-full mb-4"} disabled>full disabled</button>
                        <button className={"navlink-destructive mb-4"} disabled>destructive disabled</button>
                        <button className={"navlink-emphasis mb-4"} disabled>emphasis disabled</button>
                        <button className={"navlink-ghost mb-4"} disabled>ghost disabled</button>

                    </LargeDropdown>
                </div>   

                <div className="flex flex-col gap-2 mt-4 w-full">
                    <LargeDropdown title={"Inputs"}>

                        <h2 className="header-5 w-full mb-4">Normal</h2>
                        <input className={"generic_field"} placeholder="This is an input."></input> 

                        <h2 className="header-5 w-full mb-4 mt-4">Error</h2>
                        <input className={"generic_field errored"} placeholder="This is an errored input."></input> 

                    </LargeDropdown>                    
                </div>

                <div className="flex flex-col gap-2 mt-4 w-full">
                    <LargeDropdown title={"Alerts"}>

                        <h2 className="header-5 w-full mb-4">Notice</h2>
                        <Alert type={"notice"}>
                            <AlertTitle>Notice to all users.</AlertTitle>
                            <AlertSubtitle>The website will be down for maintenance from 9:00am to 14:30pm GMT.</AlertSubtitle>
                        </Alert>

                        <h2 className="header-5 w-full mb-4 mt-4">Alert</h2>
                        <Alert type={"alert"}>
                            <AlertTitle>Moderator Warning</AlertTitle>
                            <AlertSubtitle>You have been warned for violating community rules.</AlertSubtitle>
                        </Alert>

                        <h2 className="header-5 w-full mb-4 mt-4">Error</h2>
                        <Alert type={"error"}>
                            <AlertTitle>You have been banned from this community.</AlertTitle>
                            <AlertSubtitle>Reason: Violation of Rule 1 (Don&apos;t spam). Please contact the moderators if you wish to appeal.</AlertSubtitle>
                        </Alert>

                        <h2 className="header-5 w-full mb-4 mt-4">Title Only</h2>
                        <Alert type={"error"}>
                            <AlertTitle>Sorry, the settings failed to apply.</AlertTitle>
                        </Alert>

                    </LargeDropdown>                    
                </div>

                <div className="flex flex-col gap-2 mt-4 w-full">
                    <LargeDropdown title={"Dropdowns"}>

                        <h2 className="header-5 w-full mb-4">Example: User Dropdown</h2>
                        <Dropdown 
                            trigger={<button className="navlink">Click Me</button>}
                        >
                            <DropdownUser />
                            <hr className='mt-1 mb-1' />
                            <DropdownLink text={"Saved Posts"} icon={<BookmarkIcon />} link={"/posts/saved"} />
                            <hr className='mt-1 mb-1' />
                            <DropdownLink text={"Settings"} icon={<Cog6ToothIcon />} link={"/account/settings"} />
                            <LogoutButton className={"hover:bg-border w-full px-3 py-2 flex gap-2 items-center transition-all text-sm subtitle hover:!text-white rounded"}><ArrowRightEndOnRectangleIcon className='w-5 h-5' />Logout</LogoutButton>
                            <hr className='mt-1 mb-1' />
                            <DropdownCustom className={"hover:bg-card"}>
                                <div className='flex flex-col gap-1 items-center w-full'>
                                    <Link className='label cursor-pointer hover:!text-white !text-xs' href={"https://github.com/CMD-Forum/cmd-forum"}><MegaphoneIcon className='w-4 h-4'/>New Update - Alpha 1.2</Link>              
                                </div>
                            </DropdownCustom>
                        </Dropdown>

                        <h2 className="header-5 w-full mb-4 mt-4">Example: Post Dropdown</h2>
                        <Dropdown 
                            trigger={<button className="navlink !px-2"><EllipsisVerticalIcon className="w-5 h-5" /></button>}
                        >
                            <DropdownLink text={"User"} icon={<img src={"/images/favicon/favicon.svg"} alt={""}></img>} link={`/user`}></DropdownLink>
                            <DropdownLink text={"General"} icon={<img src={"/images/favicon/favicon.svg"} alt={""}></img>} link={`/c`}></DropdownLink>
                            <hr className='mt-1 !mb-1'/>
                            <DropdownShare icon={<ShareIcon />} text={"Share"} title={"Share the Command UI Page!"} url={"/dev"} />
                            {/* @ts-ignore */}
                            <DropdownButton icon={<ArchiveBoxXMarkIcon />} text={"Delete"} destructive={true} />                                 
                        </Dropdown>  
                        <div className="mb-40" />

                    </LargeDropdown>                    
                </div>

                <div className="flex flex-col gap-2 mt-4 w-full">
                    <LargeDropdown title={"Modals"}>

                        <h2 className="header-5 w-full mb-4">Confirmation Dialog</h2>
                        <Modal 
                            closeBtn={false} 
                            closeBtnComponent={<button className="navlink">Close</button>} 
                            openBtn={true} 
                            openBtnComponent={<button className={"navlink-full"}>Confirmation Dialog</button>}
                        >
                            <Modal.Title>Are you sure?</Modal.Title>
                            <Modal.Subtitle>If you&apos;re sure you want to do this, click yes.</Modal.Subtitle>
                            <Modal.Button type={"navlink-full"} className={""} spinnerColor={"black"}>Yes</Modal.Button> 
                        </Modal>

                        <h2 className="header-5 w-full mb-4 mt-4">Confirmation Dialog w/ Close</h2>
                        <Modal 
                            closeBtn={true} 
                            closeBtnComponent={<button className={"navlink"}>Close</button>} 
                            openBtn={true} 
                            openBtnComponent={<button className={"navlink-full"}>Confirmation Dialog</button>}
                        >
                            <Modal.Title>Are you sure?</Modal.Title>
                            <Modal.Subtitle>If you&apos;re sure you want to do this, click yes.</Modal.Subtitle>
                            <Modal.Button type={"navlink-full"} className={""} spinnerColor={"black"}>Yes</Modal.Button> 
                        </Modal>

                        <h2 className="header-5 w-full mb-4 mt-4">Notice Dialog</h2>
                        <Modal 
                            closeBtn={true} 
                            closeBtnComponent={<button className={"navlink-full"}>Close</button>} 
                            openBtn={true} 
                            openBtnComponent={<button className={"navlink-full"}>Notice Dialog</button>}
                        >
                            <Modal.Title>This feature is unavailable.</Modal.Title>
                            <Modal.Subtitle>Sorry, this feature is currently unavailable.</Modal.Subtitle>
                        </Modal>

                    </LargeDropdown>                    
                </div>

                <div className="flex flex-col gap-2 mt-4 w-full">
                    <LargeDropdown title={"Bottomsheets"}>

                        <h2 className="header-5 w-full mb-4">Example TBD</h2>
                        <Bottomdrawer>
                            <BottomdrawerHeader>Header</BottomdrawerHeader>
                            <BottomdrawerBody>hi</BottomdrawerBody>
                        </Bottomdrawer>

                    </LargeDropdown>                    
                </div>

                <div className="flex flex-col gap-2 mt-4 w-full">
                    <LargeDropdown title={"Posts"}>

                        <h2 className="header-5 w-full mb-4">Card Post (TBD)</h2>

                    </LargeDropdown>                    
                </div>

                <h2 className="header-5 mt-4 w-full">Debug</h2> 

                <div className="flex flex-col gap-2 mt-4">       
                    <ComIDBtn /> 
                    <ComMemBtn /> 
                </div>  

            </div>     

        </div>

    );

}