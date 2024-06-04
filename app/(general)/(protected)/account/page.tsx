"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Account - CMD',
};

const Account = () => {

    const { data: session } = useSession();
    const router = useRouter();

    router.push(`/user/${session?.user.username}`);

};

export default Account