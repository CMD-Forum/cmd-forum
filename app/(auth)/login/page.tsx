import LoginForm from "@/app/(general)/ui/components/form/login";
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Login - CMD',
};

export default function LoginPage() {

    return ( 

        <div className="flex justify-center m-auto h-full items-center w-full p-6 py-24">
            <LoginForm />       
        </div>

    );
    
}