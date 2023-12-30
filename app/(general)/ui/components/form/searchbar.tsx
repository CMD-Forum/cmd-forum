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

  }, 300);

  return (

    <div className='flex items-center justify-center w-full'>

        <div className='flex flex-row'>

            <button className='hidden sm:flex w-8 bg-zinc-800 rounded p-1.5 items-center rounded-r-none facebookTheme:bg-white facebookTheme:text-black facebookTheme:rounded-none facebookTheme:border-[1px] facebookTheme:border-[#bdc7d8] !border-r-0' type='submit'><MagnifyingGlassIcon /></button>
            <input 
              className='generic_field !rounded-l-none hidden sm:block sm:w-[200px] lg:w-[400px]' 
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