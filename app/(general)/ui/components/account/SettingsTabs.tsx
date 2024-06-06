"use client";

import { ChatBubbleBottomCenterTextIcon, LockClosedIcon, PaintBrushIcon, UserIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

import Alert, { AlertTitle } from "../new_alert";
import AccountSettings, { AppearanceSettings, PostSettings, SecuritySettings } from "../settings/settings";

export default function SettingsTabs() {

    const [activeTab, setActiveTab] = useState<number | null>(1);

    return (
        <div className="flex flex-col md:flex-row gap-8 w-full justify-center">
            <div className="flex flex-col h-full md:!w-[300px] w-full gap-2">
                <button className={`navlink !w-full !px-2.5 !gap-2 ${activeTab === 1 ? "!bg-white !text-black" : ""}`} onClick={() => setActiveTab(1)}><UserIcon className={"w-5 h-5"} />My Account</button>
                <button className={`navlink !w-full !px-2.5 !gap-2 ${activeTab === 2 ? "!bg-white !text-black" : ""}`} onClick={() => setActiveTab(2)}><ChatBubbleBottomCenterTextIcon className={"w-5 h-5"} />My Posts</button>
                <button className={`navlink !w-full !px-2.5 !gap-2 ${activeTab === 3 ? "!bg-white !text-black" : ""}`} onClick={() => setActiveTab(3)}><PaintBrushIcon className={"w-5 h-5"} />Appearance</button>
                <button className={`navlink !w-full !px-2.5 !gap-2 ${activeTab === 4 ? "!bg-white !text-black" : ""}`} onClick={() => setActiveTab(4)}><LockClosedIcon className={"w-5 h-5"} />Security</button>
            </div>   

            <div className={`${ activeTab === 1 ? "flex flex-col w-full" : "hidden" }`}>
                <Alert type={"notice"} className="mb-4">
                    <AlertTitle>Settings are currently unavailable.</AlertTitle>
                </Alert>
                <AccountSettings />
            </div>

            <div className={`${ activeTab === 2 ? "flex flex-col w-full" : "hidden" }`}>
                <PostSettings />
            </div>

            <div className={`${ activeTab === 3 ? "flex flex-col w-full" : "hidden"}`}>
                <AppearanceSettings />
            </div>

            <div className={`${ activeTab === 4 ? "flex flex-col w-full" : "hidden"}`}>
                <SecuritySettings />
            </div>

        </div>
    );

}