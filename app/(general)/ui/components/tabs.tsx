"use client";

import { 
    ChatBubbleBottomCenterTextIcon, 
    LinkIcon,
    PhotoIcon,
    /* ViewColumnsIcon */ 
} from "@heroicons/react/16/solid";
import dynamic from "next/dynamic";
import { useState } from "react";
import React from "react";

import CreateLinkPostForm from "./form/create_post_link";

const CreatePostForm = dynamic(() => import("@/app/(general)/ui/components/form/create_post"), { loading: () => <div className="h-80 bg-border animate-pulse rounded" />});
const CreateImagePostForm = dynamic(() => import("./form/create_post_image"), { loading: () => <div className="h-64 bg-border animate-pulse rounded" />});
// const CreateCommunityForm = dynamic(() => import("@/app/(general)/ui/components/form/create_community"), { loading: () => <div className="h-64 bg-border animate-pulse rounded" />});

export default function CreateTabs() {

    const [activeTab, setActiveTab] = useState<number>(1);

    return (

        <div className="flex flex-col gap-8 w-full justify-center">
            <div className="flex flex-col md:flex-row h-full w-full gap-2">
                <button className={`navlink !w-full !px-2.5 !gap-2 ${activeTab === 1 ? "!bg-white !text-black" : ""}`} onClick={() => setActiveTab(1)}><ChatBubbleBottomCenterTextIcon className={"w-5 h-5"} />Post</button>
                <button className={`navlink !w-full !px-2.5 !gap-2 ${activeTab === 2 ? "!bg-white !text-black" : ""}`} onClick={() => setActiveTab(2)}><PhotoIcon className={"w-5 h-5"} />Image</button>
                <button className={`navlink !w-full !px-2.5 !gap-2 ${activeTab === 3 ? "!bg-white !text-black" : ""}`} onClick={() => setActiveTab(3)}><LinkIcon className={"w-5 h-5"} />Link</button>
            </div>
            <div className="flex flex-col w-full">
                { activeTab === 1 &&
                    <CreatePostForm />
                }
                { activeTab === 2 && 
                    <CreateImagePostForm />
                }
                { activeTab === 3 &&
                    <CreateLinkPostForm />
                }
            </div>
        </div>

    );

}