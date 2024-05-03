import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.scss'
import { Navigation, Sidebar, Infobar, Bottombar, Footer } from '@/app/(general)/ui/navigation'
import NextAuthProvider from './nextauthprovider'

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

        <body className='bg-[#0c0c0c] facebookTheme:bg-white text-white facebookTheme:text-black overflow-scroll overflow-x-hidden h-vh relative'>

          <Navigation />

          <div className='flex h-full m-auto bg-[#09090b] facebookTheme:bg-white'>

            <Sidebar />        

            <div className='flex flex-col justify-center max-w-[70rem] w-[70rem] p-6 lg:p-12 m-auto'>

              <div className='max-w-[70rem]'>

                {children}    

              </div>

            </div>

          </div>

        <Bottombar />

        <Footer />

        </body>

      </html>

    </NextAuthProvider>

  )
}
