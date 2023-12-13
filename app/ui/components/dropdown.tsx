'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { UserIcon, 
  DocumentTextIcon, 
  Cog6ToothIcon, 
  ArrowRightOnRectangleIcon, 
  PlusIcon, 
  Bars4Icon, 
  ViewColumnsIcon, 
  ChevronDoubleUpIcon, 
  FireIcon,
  NewspaperIcon,
  ArchiveBoxIcon,
} from '@heroicons/react/24/solid';

const iconMap = {
    UserIcon: UserIcon,
    ViewColumnsIcon: ViewColumnsIcon,
    Cog6ToothIcon: Cog6ToothIcon,
    ArrowRightOnRectangleIcon: ArrowRightOnRectangleIcon,
    PlusIcon: PlusIcon,
    Bars4Icon: Bars4Icon,
    ChevronDoubleUpIcon: ChevronDoubleUpIcon,
    FireIcon: FireIcon,
    NewspaperIcon: NewspaperIcon,
    ArchiveBoxIcon: ArchiveBoxIcon,
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
      <button onClick={toggleDropdown} className='navlink align-middle'>
        <Bars4Icon className="font-medium h-5 w-5" />
        <p className='h-full align-middle'>{btn_title}</p>
      </button>
      {isOpen && (
        <ul className='flex flex-col gap-2 absolute bg-zinc-900 w-fit py-2 px-2 rounded-md transition-all border-zinc-800 border-[1px] drop-shadow-xl'>
          {items.map((item, index) => (
            <DropdownItem key={index} text={item.text} link={item.link} icon={item.icon} />
          ))}
        </ul>
      )}
    </div>
  );
}

export function DropdownItem(props: DropdownProps) {

    // @ts-expect-error: Complains about types, don't know why
    const Icon = iconMap[props.icon];
  return (
    <li className='w-full flex px-2 h-5] hover:bg-zinc-700 transition-all rounded-md'>
      <Icon className='w-6' />
      <Link
        className='flex w-full transition-all px-2 py-1 min-h-[30px] max-h-fit text-sm min-w-[125px] gap-2 content-center'
        href={props.link}
      >
        <div className='w-full h-full flex items-center'>
          <p className='h-fit'>{props.text}</p>  
        </div>
        
      </Link>
    </li>
  );

}
