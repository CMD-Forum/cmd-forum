import LoginForm from "@/app/(general)/ui/components/form/login";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Login',
    description: 'Login for CMD/>',
}

const page = () => {

    return ( 


        <LoginForm />    

    );
    
}

export default page;