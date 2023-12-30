"use client";

import { authOptions } from '@/app/lib/auth';
import { getServerSession, Session, User } from "next-auth";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { AlertWarning } from '../ui/components/alert';

const Account = () => {

    const { data: session, status } = useSession()

    const router = useRouter();


    if (status === "loading") {

        return (

            <div className='flex bg-zinc-900 px-3 py-3 w-fit rounded-md gap-2'>

                <img src="/spinner.svg" alt="Loading..." className="spinner size-5"/>  
                <h1>Loading</h1>

            </div>

        );

    };

    if (session?.user) {

        return (

            <div>Hello, {session?.user.username}.</div>

        )    

    } else if ( ! session?.user ) {

        router.push("/login");

    } else {

        return ( 

            <AlertWarning title='Account Error' text='Sorry, an unknown error occurred.' />

        )

    }

};

export default Account