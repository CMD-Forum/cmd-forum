"use client";

import { useState } from "react";
import AccountSettings from "../settings/settings";
import { ChatBubbleBottomCenterTextIcon, KeyIcon, LockClosedIcon, PaintBrushIcon, UserIcon, ViewColumnsIcon } from "@heroicons/react/24/solid";

export default function SettingsTabs() {

    const [activeTab, setActiveTab] = useState<number | null>(1);

    return (
        <div className="flex flex-col md:flex-row gap-8 w-full justify-center">
            <div className="flex flex-col h-full md:!w-[200px] w-full gap-2">
                <button className={`navlink !w-full !px-2.5 !gap-2 ${activeTab === 1 ? "navlink-full" : ""}`} onClick={() => setActiveTab(1)}><UserIcon className={"w-5 h-5"} />My Account</button>
                <button className={`navlink !w-full !px-2.5 !gap-2 ${activeTab === 2 ? "navlink-full" : ""}`} onClick={() => setActiveTab(2)}><ChatBubbleBottomCenterTextIcon className={"w-5 h-5"} />My Posts</button>
                <button className={`navlink !w-full !px-2.5 !gap-2 ${activeTab === 3 ? "navlink-full" : ""}`} onClick={() => setActiveTab(3)}><PaintBrushIcon className={"w-5 h-5"} />Appearance</button>
                <button className={`navlink !w-full !px-2.5 !gap-2 ${activeTab === 4 ? "navlink-full" : ""}`} onClick={() => setActiveTab(4)}><LockClosedIcon className={"w-5 h-5"} />Security</button>
            </div>   

            { activeTab === 1 ? <AccountSettings /> : null }
            { activeTab === 2 ? <p>My Posts</p> : null }
            { activeTab === 3 ? <p>Appearance</p> : null }
            { activeTab === 4 ? <p>Security</p> : null }

        </div>
    );

}