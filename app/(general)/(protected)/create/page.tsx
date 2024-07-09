import { ChatBubbleBottomCenterTextIcon, ViewColumnsIcon } from '@heroicons/react/16/solid';
import { Metadata } from 'next';
import Link from 'next/link';
 
export const metadata: Metadata = {
  title: 'Create',
};

export default function CreatePage() {
    return (
        <>
            <div className="flex flex-col border-0 border-border p-6 md:pt-12 bg-background/35 md:mt-0 lg:px-4">
                <h1 className="header">Create</h1>
            </div>
            <div className="flex flex-col gap-2 lg:pb-12 px-4 mb-6">
                <Link href={"/create/post"} className='flex flex-row sm:flex-row w-full items-center gap-2 relative group transition-all bg-transparent hover:bg-card active:bg-card hover:cursor-pointer border-0 border-border group-hover/title:!border-white h-fit rounded-lg p-6'>
                    <ChatBubbleBottomCenterTextIcon className='w-5 h-5' />
                    <p className='header-4'>Post</p>
                </Link>
                <hr className='mx-4 mt-1/2 mb-1/2' />
                <Link href={"/create/community"} className='flex flex-row sm:flex-row w-full items-center gap-2 relative group transition-all bg-transparent hover:bg-card active:bg-card hover:cursor-pointer border-0 border-border group-hover/title:!border-white h-fit rounded-lg p-6'>
                    <ViewColumnsIcon className='w-5 h-5' />
                    <p className='header-4'>Community</p>
                </Link>
            </div>        
        </>
    );
}