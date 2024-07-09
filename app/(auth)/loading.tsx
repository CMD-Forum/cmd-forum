export default function Loading() {
    return (
        <div className="p-6 pt-12 lg:pb-12 lg:p-12">
        <div className='flex flex-col items-center justify-center w-full relative group transition-all bg-card h-[174px] rounded-lg px-5 py-5'>
            <p className='md:!header-2 header-3'>Please Wait...</p>
            <p className='text-center !text-white font-medium antialiased w-full'>Loading this page...</p>
        </div>            
      </div>
    );
}