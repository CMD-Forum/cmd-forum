"use client";

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useDebouncedCallback } from 'use-debounce';

export default function SearchBar() {

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {

    const params = new URLSearchParams(searchParams);

    if (term) {

      params.set('query', term);

    } else {

      params.delete('query');

    }

    replace(`${pathname}?${params.toString()}`);

  }, 700);

  return (

    <div className='flex items-center justify-center w-full'>

        <div className='flex flex-row w-full relative'>

            <MagnifyingGlassIcon className='flex absolute size-6 left-2 top-1.5 facebookTheme:bg-white facebookTheme:text-black facebookTheme:rounded-none facebookTheme:border-[1px] facebookTheme:border-[#bdc7d8] !border-r-0' />
            <input 
              className='generic_field flex w-full !pl-10' 
              placeholder='Search'
              onChange={(e) => {
                handleSearch(e.target.value);
              }}
              defaultValue={searchParams.get('query')?.toString()}
            >
              
            </input>    

        </div>

    </div>

  );

}