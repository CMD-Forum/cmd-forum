import Link from 'next/link';
import { FaAndroid, FaAppStore, FaAppStoreIos, FaApple, FaGithub, FaGooglePlay } from "react-icons/fa6";
import React from 'react';
import { auth } from '@/auth';
import { BottombarItems, NavSideItems, TopbarItems } from './components/nav_sideitem';
import { inter } from './fonts';
import Dropdown, { DropdownCustom, DropdownLink, DropdownUser } from './components/dropdown/dropdown';
import { ArrowRightEndOnRectangleIcon, Cog6ToothIcon, MegaphoneIcon, PlusIcon, QuestionMarkCircleIcon, UserCircleIcon, UserPlusIcon } from '@heroicons/react/24/solid';
import LogoutButton from './components/signoutButton';
import { BookmarkIcon } from '@heroicons/react/16/solid';

export async function Navigation() {

  const session = await auth();

  return (

      <div className='sticky top-0 z-40 h-[60px] items-center bg-card-light backdrop-blur px-8 flex transition-all border-0 border-border'>
        
        <div className='flex justify-between w-full'>

          <div className='flex items-center lg:px-40 h-full w-fit gap-10'>
          
            <Link className={`z-50 ml-10 lg:ml-0 flex ${inter.className} font-extrabold text-3xl hover:text-gray-300 transition-all`} href={"/"}><p>CMD /&gt;</p></Link>  
            <TopbarItems />

          </div>

          <div className='flex items-center lg:pr-40'>
          
            {session ? (

              <div className={"flex flex-row gap-2 items-center"}>

                <Link className={"navlink-full !px-2 !mt-0 !h-fit flex"} href={"/create"}><PlusIcon className={"w-5 h-5"}></PlusIcon></Link>              

                <div className='ml-auto flex'>

                  <Dropdown accountHeading={true} headerText={""} headerIcon={null}>
                    <DropdownUser />
                    <hr className='mt-1 mb-1' />
                    <DropdownLink text={"Saved Posts"} icon={<BookmarkIcon />} link={"/posts/saved"} />
                    <hr className='mt-1 mb-1' />
                    <DropdownLink text={"Settings"} icon={<Cog6ToothIcon />} link={"/account/settings"} />
                    <LogoutButton className={"hover:bg-border w-full px-3 py-2 flex gap-2 items-center transition-all text-sm subtitle hover:!text-white"}><ArrowRightEndOnRectangleIcon className='w-5 h-5' />Logout</LogoutButton>
                    <hr className='mt-1 mb-1' />
                    <DropdownCustom className={"hover:bg-card"}>
                      <div className='flex flex-col gap-1 items-center w-full'>
                        <Link className='label cursor-pointer hover:!text-white !text-xs' href={"https://github.com/CMD-Forum/cmd-forum"}><MegaphoneIcon className='w-4 h-4'/>New Update - Alpha 1.2</Link>              
                      </div>
                    </DropdownCustom>
                  </Dropdown>

                </div>
                
              </div>

            ) : (

              <div className={"flex-row gap-2 hidden md:flex"}>
                <div className={"ml-auto flex gap-4"}>

                  <Dropdown headerText={"Login or Signup"} headerIcon={<UserCircleIcon />} headerClassName={"!border-1 !border-border"}> 
                    <DropdownLink text={"Login"} icon={<ArrowRightEndOnRectangleIcon />} link={"/login"} />
                    <DropdownLink text={"Signup"} icon={<UserPlusIcon />} link={"/signup"} />
                    <hr className='mt-2 mb-2' />
                    <DropdownLink text={"About CMD/>"} icon={<QuestionMarkCircleIcon />} link={"/about"} />                    
                    <hr className='mt-2 mb-2' />
                    <DropdownCustom className={"hover:bg-card"}>
                      <div className='flex flex-col gap-1 items-center'>
                        <Link className='label cursor-pointer hover:!text-white !text-xs' href={"https://github.com/CMD-Forum/cmd-forum"}><MegaphoneIcon className='w-4 h-4'/>New Update - Alpha 1.2</Link>              
                      </div>
                    </DropdownCustom>
                  </Dropdown>

                </div>

              </div>

            )}

          </div>

        </div>

      </div>

  );

}


export function Bottombar() {

  return (

    <BottombarItems />

  );

}

export function Sidebar() {

  return (

    <NavSideItems />

  );

}

/*export function Infobar(infobar: InfobarProps) {

  return (

    <CommunityInfobarItems 
      community={infobar.community} 
      community_image={infobar.community_image} 
      community_description={infobar.community_description}
      community_dn={infobar.community_dn}
      administrators={infobar.administrators}
      main={infobar.main}
      createdAt={infobar.createdAt} 
    />

  );

}*/

export function Footer() {

  const currentYear = new Date().getFullYear();

  return (

    <div>

      <div className='w-full mt-auto p-12 lg:p-16 lg:px-48 px-8 bg-card z-50 border-0 gap-12 lg:gap-32 flex flex-col lg:flex-row'>

        <div className='flex flex-col gap-4 max-w-96'>
          <Link className={`flex ${inter.className} font-extrabold text-4xl w-fit`} href="/"><p>CMD/&gt;</p></Link> 
          <div>
            <p className='header-4'>Subscribe to the Newsletter</p>   
            <p className='subtitle text-sm'>Get the most interesting posts delivered to your inbox weekly.</p>
            <button className='navlink-emphasis mt-4'>Subscribe</button>
          </div>  
        </div>

        <div>
          <ul className='flex flex-col gap-3'>
            <li className='header-3'>Command</li>
            <Link href={"/"} className='hover:underline w-fit subtitle text-sm'>Home</Link>
            <Link href={"/posts"} className='hover:underline w-fit subtitle text-sm'>Posts</Link>
            <Link href={"/c"} className='hover:underline w-fit subtitle text-sm'>Community</Link>
            <Link href={"/search"} className='hover:underline w-fit subtitle text-sm'>Search</Link>
          </ul>
        </div>

        <div>
          <ul className='flex flex-col gap-3'>
            <li className='header-3'>Your Account</li>
            <Link href={"/account"} className='hover:underline w-fit subtitle text-sm'>Account</Link>
            <Link href={"/account/settings"} className='hover:underline w-fit subtitle text-sm'>Settings</Link>
          </ul>
        </div>

      </div> 

      <div className='flex flex-row w-full p-8 px-8 lg:px-48 bg-card-light justify-between'>
        <p className='subtitle text-sm'>© {currentYear}, Command.</p>  
        <div className='flex flex-row gap-4'>
          <Link href={"https://github.com/CMD-Forum/cmd-forum"}><FaGithub className='w-6 h-6 text-gray-300 hover:text-white transition-all cursor-pointer' /></Link>
          <Link href={"#"}><FaGooglePlay className='w-6 h-6 text-gray-300 hover:text-white transition-all cursor-pointer' /></Link>
          <Link href={"#"}><FaAppStore className='w-6 h-6 text-gray-300 hover:text-white transition-all cursor-pointer' /></Link>
        </div>
      </div>  

    </div>

  );

}