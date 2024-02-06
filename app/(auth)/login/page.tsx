import LoginForm from "@/app/(general)/ui/components/form/login";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: 'Login',
    description: 'Login to CMD/>',
}

const page = () => {

    return ( 

        <div className="flex flex-col justify-center max-w-3xl md:ml-auto h-full">

            <Suspense fallback={<div>Please wait...</div>}>
                <LoginForm />    
            </Suspense>

        </div>

    );
    
}

export default page;