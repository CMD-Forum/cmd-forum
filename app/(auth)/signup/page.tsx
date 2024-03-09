import SignupForm from "@/app/(general)/ui/components/form/signup";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Signup',
    description: 'Signup for CMD/>',
}

const page = () => {

    return ( 

        <SignupForm />

    );
    
}

export default page;