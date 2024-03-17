import { HomeIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

export function Error404() {
  return (
        <div className='flex flex-col border-b-1 border-border p-6 pt-12 lg:pb-12 lg:p-12 lg:px-48'>
          <h1 className='header'>Oops, we&apos;ve hit a wall!</h1>   
          <h2 className="text-gray-300 font-medium antialiased w-full">The requested page couldn&apos;t be found.</h2>
          <div className="flex md:flex-row flex-col gap-2 mt-4">
            <Link className='navlink !w-full !justify-center md:!w-fit' href='/'><HomeIcon className="font-medium h-5 w-5" />Home</Link>
            <Link className='navlink !w-full !justify-center md:!w-fit' href='/search'><MagnifyingGlassIcon className="font-medium h-5 w-5" />Search</Link>                            
          </div>
        </div>
  )
}
