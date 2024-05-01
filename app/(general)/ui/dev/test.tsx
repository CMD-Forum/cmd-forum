"use client";

import { getCommunityAdminIDs } from "../../lib/data";

export default function ComIDBtn() {
    return (
        <button className={"navlink-full"} onClick={() => getCommunityAdminIDs({ communityId: "clvlfb0xl0001b7brh8948cke" })}>print admin_ids of clvlfb0xl0001b7brh8948cke</button>  
    );
}