import { authOptions } from '@/app/lib/auth';
import { getServerSession, Session, User } from "next-auth";

const account = async () => {

    const session = await getServerSession(authOptions)

    if (session?.user) {

        return <div>Hello, {session?.user.username}.</div>;    

    } 

    return <h1 className="text-3xl font-sans font-bold antialiased w-full">Please login to view this page.</h1>;

};

export default account