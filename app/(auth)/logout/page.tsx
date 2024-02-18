import { HomeIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { signOut } from "@/auth";
import SignOutButton from '@/app/(general)/ui/components/signoutButton';

export default async function logout() {

  signOut();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center w-full mt-[-4rem]">
      <div className="error flex flex-col gap-4 justify-center w-full">
            <div className="error flex flex-col gap-4 justify-center w-full">

                <div className="flex flex-col text-center bg-zinc-950 rounded w-fit m-auto p-6 border-border border-[1px]">
                    <p className="text-gray-300 font-bold antialiased w-full">You are now being logged out</p>   
                </div>
                
            </div>
        </div>
    </main>
  )
}