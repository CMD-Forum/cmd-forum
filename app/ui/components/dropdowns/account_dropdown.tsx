"use client";

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  DocumentTextIcon, 
  Bars4Icon, 
  ViewColumnsIcon, 
  ChevronDoubleUpIcon, 
  FireIcon,
  NewspaperIcon,
  ArchiveBoxIcon,
} from '@heroicons/react/24/solid';
import { ArrowRightOnRectangleIcon, UserIcon, PlusIcon } from '@heroicons/react/20/solid';
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";

export default function Acc_Dropdown() {

  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession()
  const [isLoading, setIsLoading] = useState(true);
  const dropdownRef = useRef(null);

  useEffect(() => {

    if (status === "loading") {
      
      setIsLoading(true);

    } else {

      setIsLoading(false);

    }

  }, [status]);

  const toggleDropdown = () => {

    setIsOpen(!isOpen);
    
  };

  useEffect(() => {

    function handleClickOutside(event) {

      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {

        setIsOpen(false);

      }

    }

    if (isOpen) {

      document.addEventListener('mousedown', handleClickOutside);

    }

    return () => {

      document.removeEventListener('mousedown', handleClickOutside);

    };
    
  }, [isOpen, dropdownRef]);

  if (isLoading) {

    return (

      <button onClick={toggleDropdown} className='navlink !bg-transparent hover:!bg-zinc-800 max-w-none min-w-fit !py-1 !px-2'>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="font-medium h-6 w-6 rounded" src={'/images/favicon/favicon.svg'} alt='Loading profile image...' />
        <p className='whitespace-nowrap'>Loading...</p>

      </button>

    );
    
  }

  return (
  
    <div className='w-fit min-w-fit'>

      <button onClick={toggleDropdown} className='navlink !bg-transparent hover:!bg-zinc-800 max-w-none min-w-fit !py-1 !px-2'>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="font-medium h-6 w-6 rounded" src={session?.user.profile_image || '/images/'} alt='Your Profile Image' />
        <p className='whitespace-nowrap'>{session?.user.name}</p>

      </button>

      <AnimatePresence>

        {isOpen && (
  
          <motion.ul 
                  className='flex flex-col gap-1 absolute bg-zinc-900/75 backdrop-blur-sm min-w-[150px] w-fit p-2 rounded-md transition-all top-14 px-0 facebookTheme:rounded-none facebookTheme:border-[#b3b3b3] facebookTheme:border-[1px] facebookTheme:bg-white'
                  ref={dropdownRef}
                  initial={{ opacity: 0, rotate: 0.1 }}
                  animate={{ opacity: 1, rotate: 0.1 }}
                  exit={{ opacity: 0, rotate: 0.1 }}
                  transition={{ ease: "easeInOut", duration: 0.15 }}
          >
                  
                  <li className='flex gap-1.5 items-center hover:bg-[#3e63dd] facebookTheme:min-h-0 facebookTheme:h-[21px] facebookTheme:hover:bg-[#eff2f7] transition-all facebookTheme:transition-none px-3 leading-[35px] text-[15px] text-left text-white facebookTheme:text-black cursor-pointer'>
                    <UserIcon className='size-5' />
                    <a href='/account' className='facebookTheme:flex facebookTheme:items-center text-[14px]'>Account Info</a>
                  </li>

                  <li className='gap-1.5 items-center hover:bg-[#3e63dd] facebookTheme:min-h-0 facebookTheme:h-[21px] facebookTheme:hover:bg-[#eff2f7] transition-all facebookTheme:transition-none flex px-3 leading-[35px] text-[15px] text-left text-white facebookTheme:text-black cursor-pointer'>
                    <PlusIcon className='size-5' />
                    <a href='/posts/create' className='facebookTheme:flex facebookTheme:items-center text-[14px]'>Create Post</a>
                  </li>

                  <hr className='border-zinc-800 w-[80%] m-auto mt-1 mb-1 facebookTheme:border-[#b3b3b3] facebookTheme:mt-0 facebookTheme:w-full'></hr>

                  <li className='gap-1.5 items-center hover:bg-[#3e63dd] facebookTheme:min-h-0 facebookTheme:h-[21px] facebookTheme:hover:bg-[#eff2f7] transition-all facebookTheme:transition-none flex px-3 leading-[35px] text-[15px] text-left text-white facebookTheme:text-black cursor-pointer'>
                    <ArrowRightOnRectangleIcon className='size-5' />
                    <button className='facebookTheme:flex facebookTheme:items-center text-[14px]' onClick={() => signOut({
                      redirect: false,
                      callbackUrl: `${window.location.origin}/login`,
                    })}>Logout</button>
                  </li>

          </motion.ul>
              
        )}

      </AnimatePresence>

    </div>

  );

}