"use client";

import { useState } from "react";
import { button } from "../variants";
import CreatePostForm from "@/app/(general)/ui/components/form/create_post";
import CreateCommunityForm from "@/app/(general)/ui/components/form/create_community";
import React from "react";
import CreateImagePostForm from "./form/create_post_image";
import { ChatBubbleBottomCenterTextIcon, PhotoIcon, ViewColumnsIcon } from "@heroicons/react/24/solid";
import { ErrorBoundary } from "react-error-boundary";

export default function CreateTabs() {

    const [activeTab, setActiveTab] = useState<number | null>(1);

    return (

        <div className="flex flex-col md:flex-row gap-8 w-full justify-center">
            <div className="flex flex-col h-full md:!w-[300px] w-full gap-2">
                <button className={`navlink !w-full !px-2.5 !gap-2 ${activeTab === 1 ? "navlink-full" : ""}`} onClick={() => setActiveTab(1)}><ChatBubbleBottomCenterTextIcon className={"w-5 h-5"} />Post</button>
                <button className={`navlink !w-full !px-2.5 !gap-2 ${activeTab === 2 ? "navlink-full" : ""}`} onClick={() => setActiveTab(2)}><PhotoIcon className={"w-5 h-5"} />Image Post</button>                
                <button className={`navlink !w-full !px-2.5 !gap-2 ${activeTab === 3 ? "navlink-full" : ""}`} onClick={() => setActiveTab(3)}><ViewColumnsIcon className={"w-5 h-5"} />Community</button>
            </div>    

            <div className={`${ activeTab === 1 ? "flex flex-col w-full" : "hidden" }`}>
                <ErrorBoundary fallback={<div>Something went wrong</div>}>
                    <CreatePostForm />    
                </ErrorBoundary> 
            </div>

            <div className={`${ activeTab === 2 ? "flex flex-col w-full" : "hidden" }`}>
                <CreateImagePostForm />
            </div>

            <div className={`${ activeTab === 3 ? "flex flex-col w-full" : "hidden"}`}>
                <CreateCommunityForm />
            </div>

        </div>

    );

}