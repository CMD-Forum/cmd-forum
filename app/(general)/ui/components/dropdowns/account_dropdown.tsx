"use client";

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  UserIcon,
  PlusIcon,
  ArrowRightEndOnRectangleIcon,
  ArrowLeftEndOnRectangleIcon,
  Bars3Icon,
  ChevronDownIcon,
  Cog6ToothIcon
} from '@heroicons/react/16/solid';
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";


export function Acc_Dropdown() {

  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession()
  const [isLoading, setIsLoading] = useState(true);
  const dropdownRef = useRef<HTMLUListElement | null>(null);

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

    function handleClickOutside(event: { target: any; }) {

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

      <button className='navlink bg-[#1F1F1F] hover:!bg-zinc-800 max-w-none min-w-fit !py-0 !pr-0 !pl-0 z-20'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src='/images/favicon/favicon.svg' className='h-[36px] mr-1.5 rounded-l' alt='Loading' />
        <p className='font-medium mr-1.5'>Loading</p>
        <div className='bg-[#1A1A1A] w-fit h-[36px] px-1.5 py-1.5 flex items-center rounded-r'>
          <ChevronDownIcon className='size-5' />
        </div>
      </button>

    );
    
  }

  return (
  
    <div className='w-fit min-w-fit'>

      <button onClick={toggleDropdown} className='navlink bg-[#1F1F1F] hover:!bg-zinc-800 max-w-none min-w-fit !py-0 !pr-0 !pl-0 z-20'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={session?.user.profile_image} className='h-[36px] mr-1.5 rounded-l' alt='Your profile image' />
        <p className='font-medium mr-1.5'>{session?.user.name}</p>
        <div className='w-fit h-[36px] px-1.5 py-1.5 flex items-center rounded-r bg-[#1A1A1A]'>
          <ChevronDownIcon className='size-5' />
        </div>
      </button>

      <AnimatePresence>

        {isOpen && (
  
          <motion.ul 
                  className='flex flex-col absolute bg-zinc-900/75 backdrop-blur-sm min-w-[150px] w-fit p-2 rounded-md transition-all top-[75px] px-0 facebookTheme:rounded-none facebookTheme:border-[#b3b3b3] facebookTheme:border-[1px] facebookTheme:bg-white'
                  ref={dropdownRef}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ ease: "easeInOut", duration: 0.15 }}
          >
                  
                  <li className='flex gap-1.5 items-center hover:bg-[#3e63dd] facebookTheme:min-h-0 facebookTheme:h-[21px] facebookTheme:hover:bg-[#eff2f7] transition-all facebookTheme:transition-none px-3 leading-[35px] text-[15px] text-left text-white facebookTheme:text-black cursor-pointer'>
                    <UserIcon className='size-5' />
                    <a href='/account' className='facebookTheme:flex facebookTheme:items-center text-[14px]'>Account</a>
                  </li>

                  <li className='gap-1.5 items-center hover:bg-[#3e63dd] facebookTheme:min-h-0 facebookTheme:h-[21px] facebookTheme:hover:bg-[#eff2f7] transition-all facebookTheme:transition-none flex px-3 leading-[35px] text-[15px] text-left text-white facebookTheme:text-black cursor-pointer'>
                    <PlusIcon className='size-5' />
                    <a href='/posts/create' className='facebookTheme:flex facebookTheme:items-center text-[14px]'>Create Post</a>
                  </li>

                  <li className='gap-1.5 items-center hover:bg-[#3e63dd] facebookTheme:min-h-0 facebookTheme:h-[21px] facebookTheme:hover:bg-[#eff2f7] transition-all facebookTheme:transition-none flex px-3 leading-[35px] text-[15px] text-left text-white facebookTheme:text-black cursor-pointer'>
                    <Cog6ToothIcon className='size-5' />
                    <a href='/account/settings' className='facebookTheme:flex facebookTheme:items-center text-[14px]'>Settings</a>
                  </li>

                  <hr className='border-zinc-800 w-[80%] m-auto mt-1 mb-1 facebookTheme:border-[#b3b3b3] facebookTheme:mt-0 facebookTheme:w-full'></hr>

                  <li className='gap-1.5 items-center hover:bg-[#3e63dd] facebookTheme:min-h-0 facebookTheme:h-[21px] facebookTheme:hover:bg-[#eff2f7] transition-all facebookTheme:transition-none flex px-3 leading-[35px] text-[15px] text-left text-white facebookTheme:text-black cursor-pointer'>
                    <ArrowLeftEndOnRectangleIcon className='size-5' />
                    <button className='facebookTheme:flex facebookTheme:items-center text-[14px]' onClick={() => signOut({
                      redirect: true,
                      callbackUrl: `${window.location.origin}/login`,
                    })}>Logout</button>
                  </li>

          </motion.ul>
              
        )}

      </AnimatePresence>

    </div>

  );

}

export function NoAccount_Dropdown() {

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dropdownRef = useRef<HTMLUListElement | null>(null);
  const [status] = useState("idle");

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

    function handleClickOutside(event: { target: any; }) {

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

      <button onClick={toggleDropdown} className='navlink bg-[#1F1F1F] hover:!bg-zinc-800 max-w-none min-w-fit !py-0 !pr-0 !pl-0 z-20'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src='/images/favicon/favicon.svg' className='h-[36px] mr-1.5 rounded-l' alt='Your profile image' />
        <p className='font-medium mr-1.5'>Loading</p>
        <div className='bg-[#1A1A1A] w-fit h-[36px] px-1.5 py-1.5 flex items-center rounded-r'>
          <ChevronDownIcon className='size-5' />
        </div>
      </button>

    );
    
  }

  return (
  
    <div className='w-fit min-w-fit'>

      
      <button onClick={toggleDropdown} className='navlink bg-[#1F1F1F] hover:!bg-zinc-800 max-w-none min-w-fit !py-0 !pr-0 !pl-0 z-20'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src='/images/favicon/favicon.svg' className='h-[36px] mr-1.5 rounded-l' alt='Loading' />
        <p className='font-medium mr-1.5'>Login or Signup</p>
        <div className='bg-[#1A1A1A] w-fit h-[36px] px-1.5 py-1.5 flex items-center rounded-r'>
          <ChevronDownIcon className='size-5' />
        </div>
      </button>

      <AnimatePresence>

        {isOpen && (
  
          <motion.ul 
                  className='flex flex-col absolute bg-zinc-900/75 backdrop-blur-sm min-w-[150px] w-fit p-2 rounded-md transition-all top-[75px] px-0 facebookTheme:rounded-none facebookTheme:border-[#b3b3b3] facebookTheme:border-[1px] facebookTheme:bg-white'
                  ref={dropdownRef}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ ease: "easeInOut", duration: 0.15 }}
          >
                  
                  <li className='flex gap-1.5 items-center hover:bg-[#3e63dd] facebookTheme:min-h-0 facebookTheme:h-[21px] facebookTheme:hover:bg-[#eff2f7] transition-all facebookTheme:transition-none px-3 leading-[35px] text-[15px] text-left text-white facebookTheme:text-black cursor-pointer'>
                    <ArrowRightEndOnRectangleIcon className='size-5' />
                    <Link href='/login' className='facebookTheme:flex facebookTheme:items-center text-[14px]'>Login</Link>
                  </li>

                  <li className='gap-1.5 items-center hover:bg-[#3e63dd] facebookTheme:min-h-0 facebookTheme:h-[21px] facebookTheme:hover:bg-[#eff2f7] transition-all facebookTheme:transition-none flex px-3 leading-[35px] text-[15px] text-left text-white facebookTheme:text-black cursor-pointer'>
                    <PlusIcon className='size-5' />
                    <Link href='/signup' className='facebookTheme:flex facebookTheme:items-center text-[14px]'>Signup</Link>
                  </li>

          </motion.ul>
              
        )}

      </AnimatePresence>

    </div>

  );

}