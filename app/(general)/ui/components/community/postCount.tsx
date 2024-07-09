"use client";

import { useEffect, useState } from "react";

import { countCommunityPosts } from "@/app/(general)/lib/data";

export default function PostCount({
    communityID
}: {
    communityID: string
}) {

    const [postCount, setPostCount] = useState<number | string>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setIsLoading(true);
        async function fetchCommunityPostCount() {
            try {
                if ( communityID ) {
                    const postCount = await countCommunityPosts({ communityID: communityID });
                    if ( postCount ) {
                        setPostCount(postCount);
                        setIsLoading(false);
                    } else {
                        setPostCount("0");
                        setIsLoading(false);
                    }
                } else {
                    setPostCount("---");
                    setIsLoading(false);
                }                
            } 
            catch (error) {
                console.error(error);
                setPostCount("---");
                setIsLoading(false);
            }
        }
        fetchCommunityPostCount();
    }, [communityID])

    if ( isLoading ) {
        return (
            <div className="w-8 h-4 bg-border animate-pulse rounded" />
        );
    }

    return (
        <p>{postCount}</p>
    );
}