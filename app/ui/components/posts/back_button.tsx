"use client";

import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

interface BackButtonProps {
    title: string;
}

export function BackButtonFull(props: BackButtonProps) {

    const router = useRouter();

    return (

        <button onClick={router.back} className="flex flex-row bg-zinc-950 hover:bg-zinc-800 p-5 border-b-0 border-zinc-900 border-[1px] rounded-t-md gap-5 transition-all w-full h-full font-sans font-semibold text-lg items-center">
            <ArrowLeftIcon className="size-10 min-h-10 min-w-10" />
            <div className="flex flex-col leading-6">
                <h2 className="text-xl">{props.title}</h2>
            </div>
        </button> 

    );

}

export default function BackButton(props: BackButtonProps) {

    const router = useRouter();

    return (

        <button onClick={router.back} className="navlink">
            <ArrowLeftIcon className="size-5" />
            {props.title}
        </button> 

    );

}