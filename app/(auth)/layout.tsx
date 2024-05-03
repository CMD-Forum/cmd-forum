import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import '@/app/(general)/globals.scss'
import { Navigation, Sidebar, Infobar, Bottombar } from '@/app/(general)/ui/navigation'
import NextAuthProvider from '@/app/(general)/nextauthprovider'

const inter = Inter({ subsets: ['latin'] })

const metadataBaseUrl = process.env.NODE_ENV === 'production' 

  ? process.env.NEXT_PUBLIC_METADATA_BASE_URL_PROD 
  : process.env.NEXT_PUBLIC_METADATA_BASE_URL_DEV;

const APP_NAME = "CMD/>";
const APP_DEFAULT_TITLE = "CMD/>";
const APP_TITLE_TEMPLATE = "%s - CMD/>";
const APP_DESCRIPTION = "CMD/> Forum Site";

export const metadata: Metadata = {
  metadataBase: metadataBaseUrl ? new URL(metadataBaseUrl) : new URL("https://cmd-forum.vercel.app/"),
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
};

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

        <body className=' facebookTheme:bg-white text-white facebookTheme:text-black overflow-scroll overflow-x-hidden h-full relative'>

          <div className='bg-zinc-950 w-full'>
            <Navigation />  
          </div>
          
          <div className='flex justify-center m-auto bg-[url("/images/uploaded/code.png")] scale-[1.1] h-full facebookTheme:bg-white items-center min-h-dvh w-full p-6 lg:p-12'>

              {children}    

          </div>


        </body>

      </html>

    </NextAuthProvider>

  )
}
