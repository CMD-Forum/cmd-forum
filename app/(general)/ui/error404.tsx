import { HomeIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

export function Error404() {
  return (
    <div className="p-6 pt-12 lg:pb-12 lg:p-12 lg:px-48">
      <div className='flex flex-col items-center justify-center w-full relative group transition-all bg-card h-[174px] rounded-lg px-5 py-5'>
          <p className='md:!header-2 header-3'>We couldn&apos;t find that page.</p>
          <p className='text-center !text-white font-medium antialiased w-full'>Don&apos;t worry, you probably mistyped.</p>
          <div className='flex gap-4 w-full items-center justify-center mt-4'>
              <Link href={"/posts"} className={"navlink"}><HomeIcon className={'w-5 h-5'} />Home</Link>
              <Link href={"/search"} className={"navlink"}><MagnifyingGlassIcon className={'w-5 h-5'} />Search</Link>
          </div>
      </div>            
    </div>
  )
}
