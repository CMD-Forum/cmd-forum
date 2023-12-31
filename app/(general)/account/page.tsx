
import { authOptions } from '@/app/(general)/lib/auth';
import { getServerSession, Session, User } from "next-auth";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { AlertWarning } from '../ui/components/alert';

const Account = () => {

    return (

        <div>Hello, user.</div>

    )    

};

export default Account