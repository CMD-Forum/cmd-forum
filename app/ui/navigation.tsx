import Link from 'next/link';
import Image from 'next/image';
import { 
    ArrowRightOnRectangleIcon,
    Cog6ToothIcon,
    DocumentTextIcon,
    HomeIcon,
    PlusIcon,
    UserIcon,
    MagnifyingGlassIcon,
    ViewColumnsIcon
} from '@heroicons/react/24/solid'
import '@/app/ui/components/dropdown'
import React, { useState } from 'react';
import Dropdown from '@/app/ui/components/dropdown';

export function Navigation() {
  return (
    <div className='navigation sticky top-0'>
      
      <div className='w-full h-16 backdrop-blur-3xl px-5 flex transition-all duration-500 bg-zinc-950 border-b-[1px] border-zinc-900'>
          <Image src='/images/logo/cmd.png' alt='CMD Logo' width='125' height='100'></Image>
          <div className='flex items-center gap-2 justify-end ml-auto' id='navlinks'>
              <Link className='navlink' href='/search'><MagnifyingGlassIcon className="font-medium h-5 w-5" />Search</Link>
              <Link className='navlink-full' href='/posts/create'><PlusIcon className="font-medium h-5 w-5" />Create</Link>
              <Dropdown items={[

                  { text: 'Your Account', link: '/account', icon: 'UserIcon' },
                  { text: 'Posts', link: '/account/posts', icon: 'ViewColumnsIcon' },
                  { text: 'Settings', link: '/account/settings', icon: 'Cog6ToothIcon' },
                  { text: 'Logout', link: '/logout', icon: 'ArrowRightOnRectangleIcon' },

              ]} btn_title="Your Account" />

          </div>
      </div>

       
    </div>
    
  );
}

export function Sidebar() {

  return (

    <div className='flex flex-col gap-2 px-3 py-3 pl-[100px] w-[400px] max-w-[400px] min-w-[400px] bg-zinc-950 border-zinc-950 border-l-[1px]'>
      <Link className='navlink-sidebar' href='/'><HomeIcon className="font-medium h-5 w-5" />Homepage</Link>
      <Link className='navlink-sidebar' href='/posts'><ViewColumnsIcon className="font-medium h-5 w-5" />Posts</Link>
      <hr className='border-zinc-900'></hr>
      <Link className='navlink-sidebar' href='/search'><MagnifyingGlassIcon className="font-medium h-5 w-5" />Search</Link>
    </div>  

  )

}

interface InfobarProps {

  community: string;
  // @ts-ignore: Still works, notify if breaks
  administrators: Array;
  main: string;

}

export function Infobar(infobar: InfobarProps ) {

  return (

    <div className='flex flex-col gap-2 px-3 py-3 pr-[100px] w-[400px] max-w-[400px] min-w-[400px] bg-zinc-950 border-zinc-950 border-l-[1px] ml-auto'>
        <h1 className='text-2xl font-sans font-bold antialiased w-full'>{infobar.community}</h1>
        <Link className='link_bg-t-full w-full justify-center' href={`/c/${infobar.community}/rules`}><MagnifyingGlassIcon className="font-medium h-5 w-5" />Rules</Link>
        <h3 className='text-bold'>Administrators</h3>
        <ol>
          {infobar.administrators.map((admin: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined, index: React.Key | null | undefined) => (
            <li key={index} className='text-gray-300'>{admin}</li>
          ))}
        </ol>
        <hr className='border-gray-300'></hr>

    </div>  

  )

}