import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.scss'
import { Navigation, Sidebar, Infobar, Bottombar } from '@/app/ui/navigation'
import { authOptions } from './lib/auth'
import { getServerSession } from 'next-auth'
import { useEffect, useState } from 'react'

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

    <html lang="en" className={inter.className}>

      <head>

        <link rel='shortcut icon' href='/images/favicon/favicon.ico' />

      </head>

      <body className='bg-zinc-950 text-white overflow-scroll overflow-x-hidden h-full relative'>

          <Navigation />

          <div className='flex h-full justify-center m-auto max-w-[100rem] bg-[#0c0c0e]'>

            <Sidebar />

            <div className='w-full m-auto p-6 lg:p-12'>

              {children}    

            </div>

            <Infobar community='Meta' administrators={['James Doyle', 'Ciarán Doyle']} main="# Markdown\n\n## hello" /> 

          </div>

          <Bottombar />

      </body>

    </html>

  )
}
