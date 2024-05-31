"use client";

import { getCommunityAdminIDs, getJamsterJavaCommunityMemberOf } from "../../lib/data";
import { prisma } from "../../lib/db";

export default function ComIDBtn() {
    return (
        <button className={"navlink-full"} onClick={() => getCommunityAdminIDs({ communityId: "clvlfb0xl0001b7brh8948cke" })}>print admin_ids of clvlfb0xl0001b7brh8948cke</button>  
    );
}

export function ComMemBtn() {
    return (
        <button className={"navlink-full"} onClick={ () => getJamsterJavaCommunityMemberOf()}>print joined communities of JamsterJava</button>  
    );
}