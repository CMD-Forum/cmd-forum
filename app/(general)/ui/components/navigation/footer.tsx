import Link from "next/link";
import { FaAppStore, FaGithub, FaGooglePlay } from "react-icons/fa6";

import { inter } from "../../fonts";

/**
 * ## Footer
 * ---
 * Footer of the website.
 */

export function Footer() {

    const currentYear = new Date().getFullYear();
  
    return (
      <div>
        <div className='w-full mt-auto p-12 lg:p-16 lg:px-48 px-8 bg-card z-50 border-0 gap-12 lg:gap-32 flex flex-col lg:flex-row'>
  
          <div className='flex flex-col gap-4 max-w-96'>
            <Link className={`font-extrabold text-3xl`} href="/">Command</Link> 
            {/*<div>
              <p className='header-4'>Subscribe to the Newsletter</p>   
              <p className='subtitle text-sm'>Get the most interesting posts delivered to your inbox weekly.</p>
              <button className='navlink-emphasis mt-4'>Subscribe</button>
            </div>*/}  
          </div>
  
          <div>
            <ul className='flex flex-col gap-3'>
              <li className='header-3'>About</li>
                <Link href={"/about"} className='hover:underline w-fit subtitle text-sm'>About</Link>
                <Link href={"/blog"} className='hover:underline w-fit subtitle text-sm'>Blog</Link>
                <Link href={"/about#terms"} className='hover:underline w-fit subtitle text-sm'>Terms</Link>
                <Link href={"/about#privacy"} className='hover:underline w-fit subtitle text-sm'>Privacy</Link>
            </ul>
          </div>
  
          <div>
            <ul className='flex flex-col gap-3'>
              <li className='header-3'>Help</li>
                <Link href={"/about#rules"} className='hover:underline w-fit subtitle text-sm'>Site Rules</Link>
                <Link href={"https://www.github.com/CMD-Forum/cmd-forum/issues"} className='hover:underline w-fit subtitle text-sm'>Issues</Link>
                <Link href={"/about#contact"} className='hover:underline w-fit subtitle text-sm'>Contact</Link>
            </ul>
          </div>

          <div>
            <ul className='flex flex-col gap-3'>
              <li className='header-3'>Your Account</li>
                <Link href={"/account"} className='hover:underline w-fit subtitle text-sm'>Profile</Link>
                <Link href={"/account/settings"} className='hover:underline w-fit subtitle text-sm'>Settings</Link>
            </ul>
          </div>
  
        </div> 
  
        <div className='flex flex-col md:flex-row w-full p-8 px-8 lg:px-48 bg-card-light justify-between'>
            <div className="flex flex-col md:flex-row gap-3 mb-3 md:mb-0">
                <p className='subtitle !text-sm'>© {currentYear} Command, Inc.</p>  
                <Link className="subtitle !text-sm hover:underline" href={"/about#terms"}>Terms</Link> 
                <Link className="subtitle !text-sm hover:underline" href={"/about#privacy"}>Privacy</Link> 
                <Link className="subtitle !text-sm hover:underline" href={"/sitemap"}>Sitemap</Link>
                <Link className="subtitle !text-sm hover:underline" href={"/about#donate"}>Donate</Link>           
            </div>
            <div className='flex flex-row gap-3'>
                <Link href={"https://github.com/CMD-Forum/cmd-forum"}><FaGithub className='w-6 h-6 text-gray-300 hover:text-white transition-all cursor-pointer' /></Link>
                <Link href={"#"}><FaGooglePlay className='w-6 h-6 text-gray-300 hover:text-white transition-all cursor-pointer' /></Link>
                <Link href={"#"}><FaAppStore className='w-6 h-6 text-gray-300 hover:text-white transition-all cursor-pointer' /></Link>
            </div>
        </div>  
      </div>
    );
}