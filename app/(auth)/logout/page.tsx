import { HomeIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

export default function logout() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center w-full mt-[-4rem]">
      <div className="error flex flex-col gap-4 justify-center w-full">
            <div className="error flex flex-col gap-4 justify-center w-full">

                <div className="flex flex-col text-center">
                    <h1 className="text-3xl font-sans font-bold antialiased w-full">Please Wait</h1>
                    <p className="text-gray-300 font-bold antialiased w-full">Logging you out now...</p>   
                </div>
                
            </div>
        </div>
    </main>
  )
}