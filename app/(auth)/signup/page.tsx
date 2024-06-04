import SignupForm from "@/app/(general)/ui/components/form/signup";
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Signup - CMD',
};

export default function SignupPage () {

    return ( 

        <div className="flex justify-center m-auto h-full items-center w-full p-6 py-24">
            <SignupForm />    
        </div>

    );
    
}