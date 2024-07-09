import { HomeIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

export function UNIMPLEMENTED() {

  return (

    <div className='flex flex-col border-b-1 border-border p-6 pt-12 lg:pb-12 lg:p-12 lg:px-48'>
      <div className='flex-col'>
        <div className='flex flex-row gap-3 items-center'>
          <div className='flex flex-col w-full'>
            <h1 className='header'>Sorry, this feature is unavailable.</h1>   
            <h2 className="text-gray-300 font-medium antialiased w-full">The feature hasn&apos;t been implemented. Check back later.</h2>
            <div className="mt-4" />
            <div className="flex flex-row gap-2 mt-2">
              <Link className='navlink' href='/'><HomeIcon className="font-medium h-5 w-5" />Home</Link>
              <Link className='navlink' href='/search'><MagnifyingGlassIcon className="font-medium h-5 w-5" />Search</Link>                            
            </div>
          </div>
        </div>
      </div>
    </div>

  );

}
