"use client";

import { 
    AdjustmentsHorizontalIcon, 
    ArrowLeftEndOnRectangleIcon, 
    ArrowRightEndOnRectangleIcon, 
    Bars3Icon,
    BookmarkIcon, 
    HomeIcon, 
    IdentificationIcon, 
    MagnifyingGlassIcon, 
    PlusIcon, 
    ViewColumnsIcon
} from "@heroicons/react/16/solid";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useSession } from "@/app/(general)/lib/sessioncontext";

import Menu from "../menu/menu";
import LogoutButton from "../signoutButton";

export function Topbar() {

    const { user } = useSession();
    const pathname = usePathname();

    return (
        <div className="flex sticky top-0 flex-row w-screen min-w-0 h-fit p-3 bg-background border-b-1 border-border z-[99999] justify-between">
            <Image width={40} height={40} src={"/favicon-512x512-bgtransparent.png"} alt={"Command"} className="rounded-md" priority={true} />
            <div className="flex gap-2 items-center justify-center md:hidden">
                <Link href={"/posts/"} className={`topbar-item items-center ${pathname.startsWith("/posts/") || pathname === "/posts" ? "active" : null}`}><HomeIcon className="w-5 h-5" /></Link>
                <Link href={"/c/"} className={`topbar-item items-center ${pathname.startsWith("/c/") || pathname === "/c" ? "active" : null}`}><ViewColumnsIcon className="w-5 h-5" /></Link>
                <Link href={"/search/"} className={`topbar-item items-center ${pathname.startsWith("/search/") || pathname === "/search" ? "active" : null}`}><MagnifyingGlassIcon className="w-5 h-5" /></Link>
                <Link href={"/create/"} className={`topbar-item items-center ${pathname === "/create/" ? "active" : null}`}><PlusIcon className="w-5 h-5" /></Link>
            </div>
            { user 
                ? 
                <div className="flex justify-end">
                    <Menu defaultPlacement="bottom-end">
                        {/* @ts-ignore */}
                        <Menu.Trigger><button className="navlink !px-2 !rounded-full no-ring"><Bars3Icon className="w-5 h-5" /></button></Menu.Trigger>
                        <Menu.Content>
                            <Menu.User />
                            <hr className='mt-1 mb-1' />
                            <Menu.Link text={"Saved Posts"} icon={<BookmarkIcon />} link={"/posts/saved"} />
                            <hr className='mt-1 mb-1' />
                            <Menu.Link text={"Settings"} icon={<AdjustmentsHorizontalIcon />} link={"/account/settings"} />
                            <LogoutButton className={"hover:bg-border w-full px-3 py-2 flex gap-2 items-center transition-all text-sm subtitle hover:!text-white rounded-lg"}><ArrowRightEndOnRectangleIcon className='w-5 h-5' />Logout</LogoutButton>                                        
                        </Menu.Content>
                    </Menu>                     
                </div>
                :
                <div className="flex justify-end">
                    <Menu defaultPlacement="bottom-end">
                        {/* @ts-ignore */}
                        <Menu.Trigger><button className="navlink !px-2 !rounded-full no-ring" aria-label="Topbar Menu"><Bars3Icon className="w-5 h-5" /></button></Menu.Trigger>
                        <Menu.Content>
                            <Menu.Link link={"/login"} text={"Login"} icon={<ArrowLeftEndOnRectangleIcon />}></Menu.Link>
                            <Menu.Link link={"/signup"} text={"Signup"} icon={<IdentificationIcon />}></Menu.Link>
                        </Menu.Content>
                    </Menu>                     
                </div>
            }  
        </div>
    );
}