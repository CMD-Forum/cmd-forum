"use client";

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  UserIcon,
  PlusIcon,
  ArrowRightEndOnRectangleIcon,
  ArrowLeftEndOnRectangleIcon
} from '@heroicons/react/24/solid';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/20/solid';
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

      <button onClick={toggleDropdown} className='navlink bg-zinc-950 hover:!bg-zinc-800 max-w-none min-w-fit !py-2 !px-3'>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="font-medium h-6 w-6 rounded" src={'/images/favicon/favicon.svg'} alt='Loading profile image...' />
        <p className='whitespace-nowrap'>Loading...</p>

      </button>

    );
    
  }

  return (
  
    <div className='w-fit min-w-fit'>

      <button onClick={toggleDropdown} className='navlink bg-zinc-950 hover:!bg-zinc-800 max-w-none min-w-fit !py-2 !px-3'>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="font-medium h-6 w-6 rounded" src={session?.user.profile_image || '/images/favicon/favicon.svg'} alt='Your Profile Image' />
        <p className='whitespace-nowrap'>{session?.user.name}</p>

      </button>

      <AnimatePresence>

        {isOpen && (
  
          <motion.ul 
                  className='flex flex-col absolute bg-zinc-900/75 backdrop-blur-sm min-w-[150px] w-fit p-2 rounded-md transition-all top-14 px-0 facebookTheme:rounded-none facebookTheme:border-[#b3b3b3] facebookTheme:border-[1px] facebookTheme:bg-white'
                  ref={dropdownRef}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
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

      <button onClick={toggleDropdown} className='navlink bg-zinc-950 hover:!bg-zinc-800 max-w-none min-w-fit !py-2 !px-3'>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="font-medium h-6 w-6 rounded" src={'/images/favicon/favicon.svg'} alt='Loading profile image...' />
        <p className='whitespace-nowrap'>Loading...</p>

      </button>

    );
    
  }

  return (
  
    <div className='w-fit min-w-fit'>

      <button onClick={toggleDropdown} className='navlink bg-zinc-950 hover:!bg-zinc-800 max-w-none min-w-fit !py-2 !px-3'>
        
        <p className='whitespace-nowrap'>Login or Signup</p>

      </button>

      <AnimatePresence>

        {isOpen && (
  
          <motion.ul 
                  className='flex flex-col absolute bg-zinc-900/75 backdrop-blur-sm min-w-[150px] w-fit p-2 rounded-md transition-all top-14 px-0 facebookTheme:rounded-none facebookTheme:border-[#b3b3b3] facebookTheme:border-[1px] facebookTheme:bg-white'
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