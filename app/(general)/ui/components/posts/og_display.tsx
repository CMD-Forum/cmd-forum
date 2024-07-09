"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { og } from "@/types/types";

export default function OpengraphDisplay({ url }: { url: string }) {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>();
    const [ogData, setOgData] = useState<og>();

    useEffect(() => {
        setIsLoading(true);
        setError("");
        fetch("/api/ogs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ "url": `${url}` })
        })
        .then((res) => {
            res.json().then((body) => {
                if (res.status === 200) {
                    setOgData(body);
                    setIsLoading(false);
                } else {
                    setError("Sorry, this link couldn't be fetched.")
                    setIsLoading(false);
                }
            })
        })
    }, [url])

    if ( isLoading ) {
        return (
            <div className="w-full bg-card border-1 border-border rounded p-4">
                <div className="flex flex-col">
                    <p className="!mb-0 !text-sm w-fit !text-border !bg-border animate-pulse rounded">url.com</p>
                    <p className="!mb-1 header-5 w-[300px] !text-border !bg-border animate-pulse rounded mt-1">URL title text here</p>
                </div>
                <div>
                    <div className="!mb-0 !text-border !bg-border animate-pulse w-[500px]" />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full bg-card border-1 border-border rounded p-4">
                <div className="flex flex-col">
                    <Link href={url || "#"} className="!mb-0 hover:underline !text-sm !text-gray-300 hover:!text-white w-fit transition-all">{url.replace(/^https?:\/\//i, "").replace("/", "") || "URL could not be retrieved."}</Link>
                    <Link href={url || "#"} className="!mb-0 header-5 hover:!text-white transition-all w-[300px] overflow-ellipsis whitespace-nowrap overflow-hidden">{url || "URL could not be retrieved."}</Link>
                </div>
                <div>
                    <p className="!mb-0">The link information couldn&apos;t be retrieved.</p>
                </div>
            </div>
        );
    }

    if (ogData) {
        return (
            <div className="w-full bg-card border-1 border-border rounded p-4">
                <div className="flex flex-col">
                    <Link href={url || "#"} className="!mb-0 hover:underline !text-sm !text-gray-300 hover:!text-white w-fit transition-all">{url.replace(/^https?:\/\//i, "").replace("/", "") || "URL could not be retrieved."}</Link>
                    <Link href={url || "#"} className="!mb-0 header-5 hover:!text-white transition-all">{ogData.result.ogTitle}</Link>
                </div>
                <div>
                    <p className="!mb-0">{ogData.result.ogDescription || "The link information couldn&apos;t be retrieved."}</p>
                </div>
            </div>
        );        
    } else {
        return (
            <div className="w-full bg-card border-1 border-border rounded p-4">
                <div className="flex flex-col">
                    <Link href={url || "#"} className="!mb-0 hover:underline !text-sm !text-gray-300 hover:!text-white w-fit transition-all">{url.replace(/^https?:\/\//i, "").replace("/", "") || "URL could not be retrieved."}</Link>
                    <Link href={url || "#"} className="!mb-0 header-5 hover:!text-white transition-all w-[300px] overflow-ellipsis whitespace-nowrap overflow-hidden">{url || "URL could not be retrieved."}</Link>
                </div>
                <div>
                    <p className="!mb-0">The link information couldn&apos;t be retrieved.</p>
                </div>
            </div>
        );
    }
} 