"use client";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {

    const env = process.env.NODE_ENV

    return (
        <div className="p-6 pt-12 lg:pb-12 lg:p-12 lg:px-48">
            <div className='flex flex-col items-center justify-center w-full relative group transition-all bg-card h-[174px] rounded-md px-5 py-5'>
                <p className='text-center text-gray-300 font-medium antialiased w-full'>Sorry, an error occurred.</p>
                <p className='text-center subtitle'>{ env === "development" || env === "test" ? error.message : error.digest }</p>
                <div className='flex gap-4 w-full items-center justify-center mt-4'>
                    <button className='navlink' onClick={() => reset()} type='button'>Reload</button>
                </div>
            </div>            
        </div>
    );
}