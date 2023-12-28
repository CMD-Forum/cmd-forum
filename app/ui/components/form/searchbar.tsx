"use client";

import Router from 'next/router';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const FormSchema = z.object({

    search_query: z.string().min(1, "Query is required."),

})

export default function SearchBar() {

const form = useForm<z.infer<typeof FormSchema>>({

        resolver: zodResolver(FormSchema),
        defaultValues: {
            search_query: '',
        },

});

  const OnSubmit = () => {

    window.location.replace("/account")
    
  }

  return (

    <div className='flex items-center justify-center w-full'>

        <form className='flex flex-row' onSubmit={form.handleSubmit(OnSubmit)}>

            <button className='hidden sm:flex w-8 bg-zinc-800 rounded p-1.5 items-center rounded-r-none facebookTheme:bg-white facebookTheme:text-black facebookTheme:rounded-none facebookTheme:border-[1px] facebookTheme:border-[#bdc7d8] !border-r-0' type='submit'><MagnifyingGlassIcon /></button>
            <input className='generic_field !rounded-l-none hidden sm:block sm:w-[200px] lg:w-[400px]' placeholder='Search'></input>    

        </form>

    </div>

  );

}