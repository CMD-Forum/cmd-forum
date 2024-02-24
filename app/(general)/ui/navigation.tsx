import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/16/solid'
import { FaAndroid, FaApple, FaGithub } from "react-icons/fa6";
import React from 'react';
import { auth } from '@/auth';
import { prisma } from '@/app/(general)/lib/db';
import { BottombarItems, CommunityInfobarItems, NavSideItems, TopbarItems } from './components/nav_sideitem';
import { inter } from './fonts';
import LogoutButton from './components/signoutButton';
import { Dropdown } from './components/dropdown/dropdown';
import TopnavDropdown from './components/dropdown/topnav_dropdown';

export async function Navigation() {

  const session = await auth();

  return (

      <div className='sticky top-0 z-40 h-[60px] items-center bg-card lg:bg-transparent lg:backdrop-blur px-6 md:px-16 flex transition-all'>
        
        <div className='flex gap-32 w-full'>

          <div className='flex items-center mr-auto h-full w-fit gap-12'>
          
            <Link className={`z-50 ml-10 md:ml-0 flex ${inter.className} font-extrabold text-3xl hover:text-gray-300 transition-all`} href="/"><p>CMD /&gt;</p></Link>  
            <TopbarItems />

          </div>

          <div className='flex items-center justify-end ml-auto'>
          
            {session?.user ? (

              <div className='ml-auto flex gap-4'>

                <TopnavDropdown />

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