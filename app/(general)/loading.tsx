import Link from 'next/link'

export default function Loading() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 w-full mt-[-4rem]">
      <div className="error flex flex-col gap-4 justify-center w-full">
            <div className="flex flex-col text-center justify-center">
                <h1 className="text-3xl font-sans font-bold antialiased w-full">Loading...</h1>
                <p className="text-gray-300 font-bold antialiased w-full">Please wait...</p>    
            </div>
        </div>
    </main>
  )
}
