import { Metadata } from 'next';
import Link from 'next/link';
 
export const metadata: Metadata = {
  title: 'Logout - CMD',
};

export default function SignOutPage() {
  return (
    <div className="p-6 pt-12 lg:pb-12 lg:p-12 lg:px-48">
      <div className='flex flex-col items-center justify-center w-full relative group transition-all bg-card h-[174px] rounded-md px-5 py-5'>
          <p className='text-center text-gray-300 font-medium antialiased w-full'>Sorry, this feature is under development.</p>
          <div className='flex gap-4 w-full items-center justify-center mt-4'>
              <Link className='navlink' href={"/"}>Home</Link>
          </div>
      </div>            
    </div>
  )
}