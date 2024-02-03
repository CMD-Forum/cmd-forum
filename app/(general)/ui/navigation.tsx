import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/24/solid'
import { FaAndroid, FaApple, FaGithub } from "react-icons/fa6";
import '@/app/(general)/ui/components/dropdown'
import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '../lib/auth';
import { prisma } from '@/app/(general)/lib/db';
import { Acc_Dropdown, NoAccount_Dropdown } from './components/dropdowns/account_dropdown';
import { BottombarItems, CommunityInfobarItems, NavSideItems, TopbarItems } from './components/nav_sideitem';
import { inter } from './fonts';

export async function Navigation() {

  var session = await getServerSession(authOptions)

  if (session && session.user && session.user.username) {

    const p_user = await prisma.user.findUnique({

        where: { username: session.user.username },

    });

  } else {

    session = null

  }

  return (

      <div className='sticky top-0 z-50 m-auto facebookTheme:lg:w-[980px] facebookTheme:w-full h-[100px] items-center bg-[#0F0F0F] px-6 md:px-16 flex transition-all facebookTheme:bg-facebook_blue'>
        
        <div className='md:ml-auto md:mr-auto flex gap-32'>

          <div className='flex items-center mr-auto h-full w-fit gap-12'>
          
            <Link className={`z-50 flex ${inter.className} font-extrabold text-4xl hover:text-accent_blue transition-all`} href="/"><p>CMD /&gt;</p></Link>  
            <TopbarItems />

          </div>

          <div className='flex items-center justify-end ml-auto' id='navlinks'>
          
            {session?.user ? (

              <div className='hidden md:flex gap-2'>

                <Acc_Dropdown />  
                <Link className='navlink-full topnavlink' href='/create'><PlusIcon className="font-medium h-5 w-5" /><p>Create</p></Link>

              </div>
              

            ) : (

              <NoAccount_Dropdown />

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

    <div className='w-full mt-auto p-10 bg-[#0F0F0F] z-50'>

      <div className='m-auto w-fit'>

        <hr className='border-b-[1px] border-zinc-900 facebookTheme:border-[#b3b3b3] mb-4' />

        <div className='flex gap-6 px-4'>

          <Link className={`flex ${inter.className} font-extrabold text-4xl w-fit`} href="/"><p>CMD /&gt;</p></Link>  

          <div className='flex flex-col'>

            <p className='text-[#C5C3C0] text-sm font-light'>&copy; {currentYear} CMD Forum, all rights reserved. Content is the property of their respective owners.</p> 
            <p className='text-[#C5C3C0] text-sm font-light'>All efforts have been made to abide by copyright law, however errors may be made.</p>

          </div>

        </div>

        <hr className='border-b-[1px] border-zinc-900 facebookTheme:border-[#b3b3b3] mt-4 mb-4' />

        <ul className='flex gap-4 m-auto w-fit mb-2'>
          
          <Link className='text-[#C5C3C0] hover:text-white transition-all flex items-center gap-1.5' href="https://github.com/CMD-Forum/cmd-forum"><FaGithub className="size-4" />Github</Link>
          <Link className='text-[#C5C3C0] hover:text-white transition-all flex items-center gap-1.5' href="#"><FaAndroid className="size-4" />Android</Link>
          <Link className='text-[#C5C3C0] hover:text-white transition-all flex items-center gap-1.5' href="#"><FaApple className="size-4" />iOS</Link>          
          
        </ul>  

        <ul className='flex gap-4 m-auto w-fit'>

          <Link className='text-[#C5C3C0] hover:text-white transition-all flex items-center gap-1.5' href="/support/1">About Us</Link>
          <Link className='text-[#C5C3C0] hover:text-white transition-all flex items-center gap-1.5' href="/support/3">Legal</Link>   

        </ul>

      </div>

    </div>

  );

}