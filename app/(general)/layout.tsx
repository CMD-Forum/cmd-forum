import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.scss'
import { Navigation, Sidebar, Infobar, Bottombar } from '@/app/(general)/ui/navigation'
import NextAuthProvider from './nextauthprovider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {

  title: 'CMD/>',
  description: 'CMD/> Forum',

}

export default async function RootLayout({

  children,

}: {

  children: React.ReactNode

}) {

  return (

    <NextAuthProvider>

      <html lang="en" className={`defaultTheme facebookTheme:font-facebook_link ${inter.className}`}>

        <head>

          <link rel='shortcut icon' href='/images/favicon/favicon.ico' />

        </head>

        <body className='bg-zinc-950 facebookTheme:bg-white text-white facebookTheme:text-black overflow-scroll overflow-x-hidden h-full relative'>

          <Navigation />

          <div className='flex h-full justify-center m-auto max-w-[100rem] bg-[#0c0c0e] facebookTheme:bg-white'>

            <Sidebar />

            <div className='w-full p-6 lg:p-12'>

              {children}    

            </div>

          </div>

        <Bottombar />

        </body>

      </html>

    </NextAuthProvider>

  )
}
