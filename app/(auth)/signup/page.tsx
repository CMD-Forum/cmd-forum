import SignupForm from "@/app/(general)/ui/components/form/signup";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Signup - CMD/>',
    description: 'Signup for CMD/>',
}

const page = () => {

    return ( 

        <div>

            <SignupForm />

        </div>

    );
    
}

export default page;