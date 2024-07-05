"use client";

import { useRouter } from "next/navigation";

import { useSession } from "../../lib/sessioncontext";

const Account = () => {
    const router = useRouter();
    const session = useSession();
    router.push(`/user/${session.user?.username}`);
};

export default Account