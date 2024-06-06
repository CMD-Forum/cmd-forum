"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Account = () => {

    const { data: session } = useSession();
    const router = useRouter();

    router.push(`/user/${session?.user.username}`);

};

export default Account