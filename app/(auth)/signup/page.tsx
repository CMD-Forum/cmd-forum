import SignupForm from "@/app/(general)/ui/components/form/signup";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Signup - CMD/>',
    description: 'Signup for CMD/>',
}

const page = () => {

    return ( 

        <div className="flex flex-col justify-center max-w-3xl md:ml-auto h-full">

            <SignupForm />

        </div>

    );
    
}

export default page;