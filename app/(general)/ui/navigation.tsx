import Link from 'next/link';
import { FaAndroid, FaApple, FaGithub } from "react-icons/fa6";
import React from 'react';
import { auth } from '@/auth';
import { BottombarItems, CommunityInfobarItems, NavSideItems, TopbarItems } from './components/nav_sideitem';
import { inter } from './fonts';
import Dropdown, { DropdownCustom, DropdownLink, DropdownUser } from './components/dropdown/dropdown';
import { ArrowRightEndOnRectangleIcon, Cog6ToothIcon, MegaphoneIcon, PlusIcon } from '@heroicons/react/24/solid';
import LogoutButton from './components/signoutButton';

export async function Navigation() {

  const session = await auth();

  return (

      <div className='sticky top-0 z-40 h-[60px] items-center bg-transparent backdrop-blur px-8 flex transition-all'>
        
        <div className='flex justify-between w-full'>

          <div className='flex items-center mr-auto h-full w-fit gap-10'>
          
            <Link className={`z-50 ml-10 lg:ml-0 flex ${inter.className} font-extrabold text-3xl hover:text-gray-300 transition-all`} href="/"><p>CMD /&gt;</p></Link>  
            <TopbarItems />

          </div>

          <div className='flex items-center justify-end ml-auto'>
          
            {session?.user ? (

              <div className={"flex flex-row gap-2"}>
                <div className='ml-auto flex gap-4'>

                  <Dropdown alignRight={true} accountHeading={true} headerText={""} headerIcon={null}>
                    <DropdownUser />
                    <hr className='mt-1 mb-1' />
                    <DropdownLink text={"Settings"} icon={<Cog6ToothIcon />} link={"/account/settings"} />
                    <LogoutButton className={"hover:bg-border w-full p-2 rounded-md flex gap-2 items-center transition-all text-sm"}><ArrowRightEndOnRectangleIcon className='w-5 h-5' />Logout</LogoutButton>
                    <hr className='mt-1 mb-1' />
                    <DropdownCustom className={"hover:bg-card"}>
                      <div className='flex flex-col gap-1 items-center'>
                        <div className='label'><MegaphoneIcon className='w-4 h-4'/>Version 1.1 is here at last!</div>              
                      </div>
                    </DropdownCustom>
                  </Dropdown>

                </div>

                <Link className={"navlink-full !px-2 !hidden md:!flex"} href={"/create"}><PlusIcon className={"w-5 h-5"}></PlusIcon></Link>              
              </div>

            ) : (

              null

            )}

          </div>

        </div>

      </div>

  );

}


export function Bottombar() {

  return (

    <BottombarItems />

  );

}

export function Sidebar() {

  return (

    <NavSideItems />

  );

}

interface InfobarProps {

  community: string;
  community_image: string;
  community_description: string;
  community_dn: string; // Community Display Name
  // @ts-ignore: Still works, notify if breaks || EDIT: 29/12/2023 -- Administrators is being reworked so this will most likely change in the near future, however it isn't a priority.
  administrators: Array;
  main: string;
  createdAt: string;
  
}



export function Infobar(infobar: InfobarProps) {

  return (

    <CommunityInfobarItems 
      community={infobar.community} 
      community_image={infobar.community_image} 
      community_description={infobar.community_description}
      community_dn={infobar.community_dn}
      administrators={infobar.administrators}
      main={infobar.main}
      createdAt={infobar.createdAt} 
    />

  );

}

export function Footer() {

  const currentYear = new Date().getFullYear();

  return (

    <div className='w-full mt-auto p-10 bg-card z-50'>

      <div className='m-auto w-fit'>

        <hr className='mb-4' />

        <div className='flex gap-2 lg:gap-6 px-4 flex-col lg:flex-row'>

          <Link className={`flex ${inter.className} font-extrabold text-4xl w-fit`} href="/"><p>CMD /&gt;</p></Link>  

          <div className='flex flex-col'>

            <p className='text-gray-300 text-sm font-light'>&copy; {currentYear} CMD Forum, all rights reserved. Content is the property of their respective owners.</p> 
            <p className='text-gray-300 text-sm font-light'>All efforts have been made to abide by copyright law, however errors may be made.</p>

          </div>

        </div>

        <hr className='mt-4 mb-4' />

        <ul className='flex flex-col sm:flex-row gap-4 m-auto w-fit mb-2 items-center'>
          
          <Link className='text-gray-300 hover:text-white transition-all flex items-center gap-1.5' href="https://github.com/CMD-Forum/cmd-forum"><FaGithub className="size-4" />Github</Link>
          <Link className='text-gray-300 hover:text-white transition-all flex items-center gap-1.5' href="#"><FaAndroid className="size-4" />Android</Link>
          <Link className='text-gray-300 hover:text-white transition-all flex items-center gap-1.5' href="#"><FaApple className="size-4" />iOS</Link>          
          
        </ul>  

        <hr className='mt-4 mb-4 sm:hidden' />

        <ul className='flex gap-4 m-auto w-fit'>

          <Link className='text-gray-300 hover:text-white transition-all flex items-center gap-1.5' href="/support/1">About Us</Link>
          <Link className='text-gray-300 hover:text-white transition-all flex items-center gap-1.5' href="/support/3">Legal</Link>   

        </ul>

      </div>

    </div>

  );

}