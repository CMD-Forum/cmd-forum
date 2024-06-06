import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { Metadata } from 'next';

import Menu, { MenuLink } from "../../components/menu/menu";
 
export const metadata: Metadata = {
  title: 'Theme Testing - CMD',
};

export default function ThemeTestingPage() {

    return (
        <main className="flex min-h-screen min-w-screen bg-white flex-col w-full">
            <div className="error flex flex-col w-full">
                <div className="flex flex-col border-b-1 border-border-light/25 p-6 pt-12 lg:pb-12 lg:p-12 lg:px-48 bg-transparent mt-8 md:mt-0">
                    <h1 className="text-3xl font-inter font-bold antialiased !text-black">Theme Testing</h1>
                </div>

                <div className='flex flex-col px-6 lg:py-12 lg:px-48 mt-6 mb-6'>
                    <div className="flex flex-col gap-2">
                        <p className="font-medium text-sm !text-black">Dropdown</p>    
                        <Menu trigger={<button className="navlink">Dropdown<ChevronDownIcon className="w-4 h-4" /></button>}>
                            <MenuLink text='Item a' link={"/"} icon={null} />
                            <MenuLink text='Item b' link={"/"} icon={null} />
                        </Menu>
                    </div>
                </div>
            </div>
        </main>
    );

}