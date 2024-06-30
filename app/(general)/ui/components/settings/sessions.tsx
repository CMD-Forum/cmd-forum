"use client";

import { Session } from "lucia";
import React from "react";

import { action_invalidateAllSessions, action_invalidateSession } from "@/app/(general)/lib/logout";
import { useSession } from "@/app/(general)/lib/sessioncontext";
import { FaChrome, FaFirefoxBrowser } from "react-icons/fa6";

export default function ActiveSessions( { sessions }: { sessions: Array<Session> } ) {

    const currentSession = useSession();

    return (
        <div className='flex flex-col border-1 border-border rounded-md'>

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
                                { session.browserName 
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
                                    null 
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
                {/* @ts-ignore */}
                <form action={() => action_invalidateAllSessions(currentSession.user.id)}><button className="navlink-destructive">Logout all sessions</button></form>
            </div>

        </div>
    );

}