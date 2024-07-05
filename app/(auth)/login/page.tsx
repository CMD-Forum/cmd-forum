import { Metadata } from 'next';

import LoginForm from "@/app/(general)/ui/components/form/login";
 
export const metadata: Metadata = {
  title: 'Login - CMD',
};

export default function LoginPage() {

    return ( 

        <div className="flex justify-center m-auto h-full items-center w-full lg:p-6 pt-14">
            <LoginForm />       
        </div>

    );
    
}