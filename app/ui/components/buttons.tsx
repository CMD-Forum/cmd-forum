/*/ Unused /*/
/*/ import Link from 'next/link';

interface ButtonProps {

    text: string;
    icon: string;

}

export function BtnLink(button: ButtonProps) {

    return (
        <Link className='navlink-sidebar' href='/'>{button.text}</Link>    
    );
    
} /*/