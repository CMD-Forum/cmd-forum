import { Metadata } from 'next';

import SignupForm from "@/app/(general)/ui/components/form/signup";
 
export const metadata: Metadata = {
  title: 'Signup',
};

export default function SignupPage () {

    return ( 

        <div className="flex justify-center items-center px-4 my-8">
            <SignupForm />    
        </div>

    );
    
}