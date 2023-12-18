import { FC, ReactNode } from 'react';

interface AuthLayoutProps {

    children: ReactNode;

}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {

    return (

        <div className='rounded-md max-w-3xl justify-center flex flex-col m-auto text-sm md:text-md'>{children}</div>

    );

}

export default AuthLayout