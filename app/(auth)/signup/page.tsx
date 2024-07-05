import { Metadata } from 'next';

import SignupForm from "@/app/(general)/ui/components/form/signup";
 
export const metadata: Metadata = {
  title: 'Signup - CMD',
};

export default function SignupPage () {

    return ( 

        <div className="flex justify-center m-auto h-full items-center w-full lg:p-6 pt-14">
            <SignupForm />    
        </div>

    );
    
}