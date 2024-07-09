import { Metadata } from 'next';

import LoginForm from "@/app/(general)/ui/components/form/login";
 
export const metadata: Metadata = {
  title: 'Login',
};

export default function LoginPage() {
    return ( 
        <div className="flex justify-center items-center px-4 my-8">
            <LoginForm />       
        </div>
    );
}