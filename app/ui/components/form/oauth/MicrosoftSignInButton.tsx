import { FC, ReactNode } from "react";
import Image from "next/image";

interface MicrosoftSignInButtonProps {

    children: ReactNode;

}

const MicrosoftSignInButton: FC<MicrosoftSignInButtonProps> = ({ children }) => {

    const loginWithMicrosoft = () => console.log("Login with Microsoft")

    return <button onClick={loginWithMicrosoft} className="!w-full navlink flex justify-center !gap-2" type="button">
        <Image src="/svg/microsoft.svg" alt="Microsoft Logo" width={20} height={20}></Image>
        {children}
    </button>

};

export default MicrosoftSignInButton;