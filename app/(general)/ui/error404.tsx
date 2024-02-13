import { HomeIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

export function Error404() {
  return (
        <div className='flex-row gap-2 p-8 rounded-md facebookTheme:rounded-none w-full bg-card facebookTheme:bg-white border-border border-[1px]'>
            <div className='flex-col'>
                <div className='flex flex-row gap-3 items-center'>
                    <div className='flex flex-col w-full'>
                        <h1 className='text-2xl font-sans font-bold antialiased w-full'>Oops, we&apos;ve hit a wall!</h1>   
                        <h2 className="text-gray-300">The requested page couldn&apos;t be found.</h2>
                        <div className="flex flex-row gap-2 mt-2">
                          <Link className='navlink' href='/'><HomeIcon className="font-medium h-5 w-5" />Home</Link>
                          <Link className='navlink' href='/search'><MagnifyingGlassIcon className="font-medium h-5 w-5" />Search</Link>                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}
