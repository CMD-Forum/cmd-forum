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
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from "remark-breaks";
import rehypeRaw from 'rehype-raw';
import { prisma } from '@/app/lib/db';
import Acc_Dropdown from './components/dropdowns/account_dropdown';
import NavSideItems from './components/nav_sideitem';
import SearchBar from './components/form/searchbar';

export async function Navigation() {

  const session = await getServerSession(authOptions)

  if (session) {

    const p_user = await prisma.user.findUnique({

        where: { username: session.user.username },

    })

  }

  return (
    <div className='navigation sticky top-0 facebookTheme:bg-facebook_blue m-auto'>
      <Link className='absolute top-0 h-16 w-44 z-50 hidden md:flex' href="/"></Link>
      <div className='m-auto facebookTheme:lg:w-[980px] facebookTheme:w-full h-16 backdrop-blur-sm bg-transparent px-5 flex transition-all sm:border-b-[1px] border-zinc-900 facebookTheme:bg-facebook_blue'>
        <Image src='/images/logo/cmd.png' alt='CMD Logo' width='125' height='100' className='hidden md:flex'></Image>
        <SearchBar />
        <div className='flex items-center gap-2 justify-end ml-auto' id='navlinks'>
          {session?.user ? (
              <Acc_Dropdown />
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

    <div className='max-w-full flex flex-row bg-zinc-950 facebookTheme:bg-facebook_blue border-b-[1px] px-2 gap-2 w-full backdrop-blur-md transition-all border-zinc-900 sm:hidden fixed left-0 bottom-0 z-30'>

        <Link className='bottombar-link' href='/'><HomeIcon className="font-medium h-5 w-5" /><p>Home</p></Link>
        <Link className='bottombar-link' href='/posts'><ViewColumnsIcon className="font-medium h-5 w-5" /><p>Posts</p></Link>
        <Link className='bottombar-link' href='/account'><UserIcon className="font-medium h-5 w-5" /><p>Account</p></Link>
        <Link className='bottombar-link' href='/account/settings'><Cog6ToothIcon className="font-medium h-5 w-5" /><p>Settings</p></Link>

    </div>

  );

}

export function Sidebar() {


  return (

    <NavSideItems />

  )

}

interface InfobarProps {

  community: string;
  community_image: string;
  community_description: string;
  community_dn: string; // Community Display Name
  // @ts-ignore: Still works, notify if breaks
  administrators: Array;
  main: string;
  createdAt: string;
  
}

export function Infobar(infobar: InfobarProps ) {

  return (

    <div className='flex-row gap-2 px-5 py-5 rounded-md w-full bg-zinc-950 facebookTheme:bg-white border-zinc-950 border-l-[1px]'>
        
        <div className='flex-col'>

          <div className='flex flex-row gap-3 items-center mt-4'>

            <img src={infobar.community_image} className='h-[56px] rounded' />

            <div className='flex flex-col'>

              <h1 className='text-2xl font-sans font-bold antialiased w-full'>{infobar.community}</h1>   
              <h2 className='text-gray-300'>{infobar.community_description}</h2>

            </div>

          </div>

          

          <div className='flex flex-row gap-3 items-center mt-2'>

            <div className='flex flex-row gap-3'>

              <div className='flex flex-row gap-1'>
                <CalendarDaysIcon className='w-[20px]' />
                <p className='text-sm'>19/12/2023</p>  
              </div>
              
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

            

          </div>

          <div className='flex flex-row gap-2 mt-3 mb-3'>

            <Link className='navlink justify-center items-center' href={`/c/${infobar.community}/rules`}><BookOpenIcon className="font-medium h-5 w-5" /><p className='flex items-center h-full'>Rules</p></Link>
            <Link className='navlink justify-center items-center' href={`/c/${infobar.community}/moderation`}><ShieldCheckIcon className="font-medium h-5 w-5" /><p className='flex items-center h-full'>Moderation</p></Link>    

          </div>
          

        </div>

        <ol>

          {infobar.administrators.map((admin: string | number | boolean, index: React.Key | null | undefined) => (
            
            <li key={index} className='text-gray-300'>{admin}</li>

          ))}

        </ol>

        <hr className='border-b-[1px] border-zinc-900 facebookTheme:border-[#b3b3b3] mb-2'></hr>

        <div className='infobar-markdown'>

          <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]} rehypePlugins={[rehypeRaw]}>
            
            {infobar.main}

          </ReactMarkdown>

        </div>

    </div>  

  )

}