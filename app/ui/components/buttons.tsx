/*/ Unused /*/
"use client";

import Link from 'next/link';

interface ButtonLinkProps {

    text: string;
    icon: string;
    link: string;
    style: string;

}

interface ButtonProps {

    text: string;
    icon: string;
    onClick: undefined;
    style: string;

}

export function ButtonLink(button: ButtonLinkProps) {

    return (

        <Link className={button.style} href={button.link}>{button.text}</Link>    

    );
    
}

export function Button(button: ButtonProps) {

    return (

        <button className={button.style}>{button.text}</button>    

    );
    
}