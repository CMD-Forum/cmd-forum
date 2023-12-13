import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.scss'
import { Navigation, Sidebar, Infobar } from '@/app/ui/navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CMD/>',
  description: 'CMD/> Forum',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <link rel='shortcut icon' href='/public/images/favicon/favicon.ico' />
      </head>
      <body className='bg-zinc-950 text-white overflow-scroll overflow-x-hidden h-full'>
          <Navigation />
          <div className='flex h-full justify-center m-auto max-w-[1000rem] bg-[#0c0c0e]'>
            <Sidebar />
            <div className='w-full  m-auto'>
              {children}    
            </div>
            <Infobar community='Meta' administrators={['James Doyle', 'Ciaran Doyle']} main='test' /> 
          </div>
      </body>
    </html>
  )
}
