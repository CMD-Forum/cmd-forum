'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IconType } from 'react-icons';
import { UserIcon, DocumentTextIcon, Cog6ToothIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid';

const iconMap = {
    UserIcon: UserIcon,
    DocumentTextIcon: DocumentTextIcon,
    Cog6ToothIcon: Cog6ToothIcon,
    ArrowRightOnRectangleIcon: ArrowRightOnRectangleIcon,
};

interface DropdownProps {

  text: string;
  link: string;
  icon: string;

}

interface DropdownItemProps {

  items: DropdownProps[];
  btn_title: string;

}

export default function Dropdown({ items, btn_title }: DropdownItemProps) {

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button onClick={toggleDropdown} className='navlink-full'>
        {btn_title}
      </button>
      {isOpen && (
        <ul className='flex flex-col gap-2 absolute top-14 bg-zinc-800 w-fit py-2 rounded-md transition-all border-zinc-700 border-[1px]'>
          {items.map((item, index) => (
            <DropdownItem key={index} text={item.text} link={item.link} icon={item.icon} />
          ))}
        </ul>
      )}
    </div>
  );
}

export function DropdownItem(props: DropdownProps) {

    const Icon = iconMap[props.icon];
  return (
    <li className='w-full'>
      <Link
        className='flex w-full hover:bg-zinc-700 transition-all px-2 py-1 min-h-[30px] max-h-fit text-sm min-w-[125px] gap-2'
        href={props.link}
      >
        <Icon className='w-6' />
        {props.text}
      </Link>
    </li>
  );

}
