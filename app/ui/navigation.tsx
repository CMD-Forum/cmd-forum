import Link from 'next/link';
import Image from 'next/image';
import { 
    ArrowRightOnRectangleIcon,
    Cog6ToothIcon,
    HomeIcon,
    PlusIcon,
    UserIcon,
    MagnifyingGlassIcon,
    ViewColumnsIcon,
    BookOpenIcon,
    ShieldCheckIcon,
    PencilSquareIcon,
    ChatBubbleBottomCenterTextIcon,
    CalendarDaysIcon
} from '@heroicons/react/24/solid'
import '@/app/ui/components/dropdown'
import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '../lib/auth';
import { LogoutButton } from './components/navigation/navigation';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from "remark-breaks";
import rehypeRaw from 'rehype-raw';

export async function Navigation() {

  const session = await getServerSession(authOptions)

  return (

    <div className='navigation sticky top-0'>
      
      <Link className='absolute top-0 h-16 w-44 z-50' href="/"></Link>

      <div className='w-full h-16 backdrop-blur-md px-5 flex transition-all bg-zinc-950 sm:border-b-[1px] border-zinc-900'>
          
          <Image src='/images/logo/cmd.png' alt='CMD Logo' width='125' height='100'></Image>
          <div className='flex items-center gap-2 justify-end ml-auto' id='navlinks'>

              {session?.user ? (

                <LogoutButton />

              ) : (

                <Link className='navlink topnavlink' href='/login'><ArrowRightOnRectangleIcon className="font-medium h-5 w-5" /><p>Login</p></Link> 

              )}
              

              <Link className='navlink-full topnavlink' href='/posts/create'><PlusIcon className="font-medium h-5 w-5" /><p>Create</p></Link>
          
          </div>

      </div>

      
       
    </div>
    
  );

}

export function Bottombar() {

  return (

    <div className='flex flex-row bg-zinc-950 border-b-[1px] px-2 gap-2 w-full backdrop-blur-md transition-all border-zinc-900 sm:hidden fixed left-0 bottom-0 z-30'>

        <Link className='bottombar-link' href='/'><HomeIcon className="font-medium h-5 w-5" /><p>Home</p></Link>
        <Link className='bottombar-link' href='/posts'><ViewColumnsIcon className="font-medium h-5 w-5" /><p>Posts</p></Link>
        <Link className='bottombar-link' href='/account'><UserIcon className="font-medium h-5 w-5" /><p>Account</p></Link>
        <Link className='bottombar-link' href='/account/settings'><Cog6ToothIcon className="font-medium h-5 w-5" /><p>Settings</p></Link>

    </div>

  );

}

export function Sidebar() {

  return (

    <div className='flex-col gap-2 px-3 py-3 max-w-[400px] bg-zinc-950 border-zinc-950 border-l-[1px] hidden sm:flex lg:!w-[400px]'>
      
      <Link className='navlink-sidebar !w-fit lg:!w-full' href='/'><HomeIcon className="font-medium h-5 w-5" /><p className='hidden lg:flex'>Homepage</p></Link>
      <Link className='navlink-sidebar !w-fit lg:!w-full' href='/posts'><ViewColumnsIcon className="font-medium h-5 w-5" /><p className='hidden lg:flex'>Posts</p></Link>
      <Link className='navlink-sidebar !w-fit lg:!w-full' href='/account'><UserIcon className="font-medium h-5 w-5" /><p className='hidden lg:flex'>Account</p></Link>
      <hr className='border-zinc-900 mt-1 mb-1'></hr>
      <Link className='navlink-sidebar !w-fit lg:!w-full' href='/search'><MagnifyingGlassIcon className="font-medium h-5 w-5" /><p className='hidden lg:flex'>Search</p></Link>
      <Link className='navlink-sidebar !w-fit lg:!w-full' href='/account/settings'><Cog6ToothIcon className="font-medium h-5 w-5" /><p className='hidden lg:flex'>Settings</p></Link>

    </div>  

  )

}

interface InfobarProps {

  community: string;
  // @ts-ignore: Still works, notify if breaks
  administrators: Array;
  main: string;

}

export function Infobar(infobar: InfobarProps ) {

  return (

    <div className='flex-col gap-2 px-3 py-3 lg:!w-[400px] bg-zinc-950 border-zinc-950 border-l-[1px] ml-auto hidden 2xl:flex'>
        
        <div className='flex flex-row gap-2 items-center mt-4'>

          <img src='https://placehold.co/400' className='h-[32px] rounded-[100%]' />
          <h1 className='text-2xl font-sans font-bold antialiased w-full'>{infobar.community}</h1> 

        </div>

        <div className='flex flex-row gap-3 items-center mt-2'>

          <div className='flex flex-row gap-1'>

            <CalendarDaysIcon className='w-[20px]' />
            <p className='text-sm'>19/12/2023</p>

          </div>         

        </div>

        <div className='flex flex-row gap-3 items-center mb-4 mt-4'>

          <div className='flex flex-row gap-1'>

            <UserIcon className='w-[20px]' />
            <p className='text-sm'>24k</p>

          </div>

          <div className='flex flex-row gap-1'>

            <PencilSquareIcon className='w-[20px]' />
            <p className='text-sm'>152k</p>

          </div>

          <div className='flex flex-row gap-1'>

            <ChatBubbleBottomCenterTextIcon className='w-[20px]' />
            <p className='text-sm'>58k</p>

          </div>
          

        </div>
        
        <Link className='link_bg-t-full w-full justify-center items-center' href={`/c/${infobar.community}/rules`}><BookOpenIcon className="font-medium h-5 w-5" /><p className='flex items-center h-full'>Rules</p></Link>
        <Link className='link_bg-t-full w-full justify-center items-center' href={`/c/${infobar.community}/moderation`}><ShieldCheckIcon className="font-medium h-5 w-5" /><p className='flex items-center h-full'>Moderation</p></Link>
        <h3 className='text-bold'>Administrators</h3>
        <ol>
          {infobar.administrators.map((admin: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined, index: React.Key | null | undefined) => (
            <li key={index} className='text-gray-300'>{admin}</li>
          ))}
        </ol>
        <hr className='border-b-[1px] border-zinc-900 mb-2'></hr>

        <div className='infobar-markdown prose'>

          <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]} rehypePlugins={[rehypeRaw]}>
            
            {infobar.main.toString()}

          </ReactMarkdown>

        </div>

    </div>  

  )

}