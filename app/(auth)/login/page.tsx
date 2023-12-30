import LoginForm from "@/app/(general)/ui/components/form/login";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Login - CMD/>',
    description: 'Login to CMD/>',
}

const page = () => {

    return ( 

        <div className="flex flex-col justify-center max-w-3xl md:ml-auto h-full">

            <LoginForm />

        </div>

    );
    
}

export default page;