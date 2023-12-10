import { inter } from '@/app/ui/fonts';
import Link from 'next/link';
import { 
    ArrowRightOnRectangleIcon,
    Cog6ToothIcon,
    DocumentTextIcon,
    HomeIcon,
    PlusIcon,
    UserIcon
} from '@heroicons/react/24/solid'
import '@/app/ui/components/dropdown'
import DropdownItem from '@/app/ui/components/dropdown';
import React, { useState } from 'react';
import Dropdown from '@/app/ui/components/dropdown';

export default function Navigation() {
  return (
    <div className='w-full h-16 backdrop-blur-3xl px-10 py-5 flex transition-all duration-500 bg-zinc-950'>
        <div className='flex items-center gap-5 justify-end ml-auto' id='navlinks'>
            <Link className='navlink' href='/'><HomeIcon className="font-medium h-5 w-5" />Home</Link>
            <Link className='navlink-full' href='/posts/create'><PlusIcon className="font-medium h-5 w-5" />Create</Link>
            <Dropdown items={[

                { text: 'Your Account', link: '/account', icon: 'UserIcon' },
                { text: 'Posts', link: '/account/posts', icon: 'DocumentTextIcon' },
                { text: 'Settings', link: '/account/settings', icon: 'Cog6ToothIcon' },
                { text: 'Logout', link: '/logout', icon: 'ArrowRightOnRectangleIcon' },

            ]} btn_title="Your Account" />

        </div>
    </div>
  );
}
