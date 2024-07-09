"use client";

import { useEffect, useState } from "react";

import { countCommunityMembers } from "@/app/(general)/lib/data";

export default function MemberCount({
    communityID
}: {
    communityID: string
}) {

    const [memberCount, setMemberCount] = useState<number | string>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setIsLoading(true);
        async function fetchCommunityCount() {
            try {
                if ( communityID ) {
                    const membership_number = await countCommunityMembers({ communityID: communityID });
                    if ( membership_number ) {
                        setMemberCount(membership_number);
                        setIsLoading(false);
                    } else {
                        setMemberCount("0");
                        setIsLoading(false);
                    }
                } else {
                    setMemberCount("---");
                    setIsLoading(false);
                }                
            } 
            catch (error) {
                console.error(error);
                setMemberCount("---");
                setIsLoading(false);
            }
        }
        fetchCommunityCount();
    }, [communityID])

    if ( isLoading ) {
        return (
            <div className="w-8 h-4 bg-border animate-pulse rounded" />
        );
    }

    return (
        <p>{memberCount}</p>
    );
}