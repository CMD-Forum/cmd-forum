import { FC, ReactNode } from "react";
import Image from "next/image";

interface GoogleSignInButtonProps {

    children: ReactNode;

}

const GoogleSignInButton: FC<GoogleSignInButtonProps> = ({ children }) => {

    const loginWithGoogle = () => console.log("Login with Google")

    return <button onClick={loginWithGoogle} className="!w-full navlink flex justify-center !gap-2" type="button">
        <Image src="/svg/Google.svg" alt="Google Logo" width={20} height={20}></Image>
        {children}
    </button>

};

export default GoogleSignInButton;