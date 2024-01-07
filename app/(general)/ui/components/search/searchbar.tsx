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

        <div className='flex flex-row w-full'>

            <MagnifyingGlassIcon className='flex w-8 bg-zinc-800 rounded p-1.5 items-center rounded-r-none facebookTheme:bg-white facebookTheme:text-black facebookTheme:rounded-none facebookTheme:border-[1px] facebookTheme:border-[#bdc7d8] !border-r-0' />
            <input 
              className='generic_field !rounded-l-none flex w-full' 
              placeholder='Search'
              onChange={(e) => {
                handleSearch(e.target.value);
              }}
              defaultValue={searchParams.get('query')?.toString()}
            ></input>    

        </div>

    </div>

  );

}