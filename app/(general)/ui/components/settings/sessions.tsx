"use client";

import { Session } from "lucia";
import React from "react";
import { FaChrome, FaFirefoxBrowser } from "react-icons/fa6";

import { action_invalidateAllSessions, action_invalidateSession } from "@/app/(general)/lib/logout";
import { useSession } from "@/app/(general)/lib/sessioncontext";
import Dialog from "../dialog/dialog";

export default function ActiveSessions( { sessions }: { sessions: Array<Session> } ) {

    const currentSession = useSession();

    return (
        <div className='flex flex-col border-1 border-border rounded'>

            <div className="p-6 bg-card">
                <h3 className='font-bold text-xl'>Active Sessions</h3>     
                <p className='text-sm subtitle'>These sessions are currently logged in.</p>
            </div>

            <div className="border-t-1 border-border">
                { Array.isArray(sessions) && sessions.map((session, i) => {
                    const isLastItem = i === sessions.length - 1;
                    const isActiveSession = currentSession.session?.id === session.id;
                    return (
                        <div key={session.id} className={`flex p-6 bg-background hover:bg-card transition-all ${isLastItem ? 'border-b-1' : 'border-b-1'} border-border justify-between`}>
                            <div>
                                { isActiveSession ? <div className="flex gap-2 items-center"><span className="w-2 h-2 bg-green-300 rounded-full inline-block"></span><p className="!font-bold session-active-text !text-green-300">Current Session</p></div> : null }
                                {/*<p><b>ID: </b>{session.id}</p>*/}
                                <p suppressHydrationWarning><b>Expires: </b>{session.expiresAt.toLocaleDateString()}</p>
                                { session.browserName !== "Unknown"
                                ? 
                                    <p className="flex gap-1 items-center">
                                        <b>Device Info: </b>
                                        { session.browserName === "Firefox" ? <FaFirefoxBrowser className="w-3 h-3" /> : null } 
                                        { session.browserName === "Chrome" ? <FaChrome className="w-3 h-3" /> : null } 
                                        <p>{ session.browserName }</p>
                                        <p>{ session.browserVersion }</p>
                                        on 
                                        <p>{ session.osName ? session.osName + ' ' + session.osVersion : null }</p>
                                    </p> 
                                : 
                                    <p><b>Device Info: </b>Unknown</p>
                                }
                                
                                {/*{ session.userAgent ? <p><b>User Agent: </b>{session.userAgent}</p> : null }*/}
                            </div>
                            <div className="flex items-center">
                                {/* @ts-ignore */}
                                <form action={() => action_invalidateSession(session.id, "/account/settings/sessions")}><button className="navlink">Logout</button></form>
                            </div>
                        </div>
                    );
                })}
            </div>
            
            {/*<div className='flex flex-col bg-card md:flex-row py-3 px-6 justify-between gap-3 items-center w-full'>
                <p></p>
            </div>*/}

            <div className="p-6 bg-card">
                <Dialog>
                    <Dialog.Trigger><button className="navlink-destructive">Logout all sessions</button></Dialog.Trigger>
                    <Dialog.Content>
                        <Dialog.Title>Logout all sessions?</Dialog.Title>
                        <Dialog.Subtitle>This will sign you out of all devices and require to log back in again.</Dialog.Subtitle>
                        <Dialog.ButtonContainer>
                            <Dialog.CloseButton><button className="navlink">Cancel</button></Dialog.CloseButton>
                            {/* @ts-ignore */}
                            <form action={() => action_invalidateAllSessions(currentSession.user.id)}><button className="navlink-destructive">Logout</button></form> 
                        </Dialog.ButtonContainer>
                    </Dialog.Content>
                </Dialog>
            </div>

        </div>
    );

}