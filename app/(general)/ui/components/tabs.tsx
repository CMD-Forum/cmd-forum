"use client";

import { useState } from "react";
import { button } from "../variants";
import CreatePostForm from "@/app/(general)/ui/components/form/create_post";
import CreateCommunityForm from "@/app/(general)/ui/components/form/create_community";
import React from "react";
import CreateImagePostForm from "./form/create_post_image";

export default function CreateTabs() {

    const [activeTab, setActiveTab] = useState<number | null>(1);

    return (

        <div className="flex flex-col">
            <div className="flex flex-row bg-card w-full bg-transparent gap-2 justify-center md:justify-start mb-4 items-center">
                <button className={`!rounded-full font-medium text-sm py-1 px-4 ${activeTab === 1 ? "!bg-white text-black" : "!bg-border"}`} onClick={() => setActiveTab(1)}>Post</button>
                <button className={`!rounded-full font-medium text-sm py-1 px-4 ${activeTab === 2 ? "!bg-white text-black" : "!bg-border"}`} onClick={() => setActiveTab(2)}>Image Post</button>                
                <button className={`!rounded-full font-medium text-sm py-1 px-4 ${activeTab === 3 ? "!bg-white text-black" : "!bg-border"}`} onClick={() => setActiveTab(3)}>Community</button>
            </div>    

            { activeTab === 1 ? <CreatePostForm /> : null }
            { activeTab === 2 ? <CreateImagePostForm /> : null }
            { activeTab === 3 ? <CreateCommunityForm /> : null }

        </div>

    );

}