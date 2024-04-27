import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/app/(general)/globals.scss'
import { Footer, Navigation, Sidebar } from '@/app/(general)/ui/navigation'
import NextAuthProvider from '@/app/(general)/nextauthprovider'
import NextTopLoader from 'nextjs-toploader'

const inter = Inter({ subsets: ['latin'] })

const metadataBaseUrl = process.env.NODE_ENV === 'production' 

  ? process.env.NEXT_PUBLIC_METADATA_BASE_URL_PROD 
  : process.env.NEXT_PUBLIC_METADATA_BASE_URL_DEV;

if (!metadataBaseUrl) {

  throw new Error('Metadata base URL is not defined');

}

const APP_NAME = "CMD/>";
const APP_DEFAULT_TITLE = "CMD/>";
const APP_TITLE_TEMPLATE = "%s - CMD/>";
const APP_DESCRIPTION = "CMD/> Forum Site";

export const metadata: Metadata = {
  metadataBase: new URL(metadataBaseUrl),
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
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

export default async function RootLayout({

  children,

}: {

  children: React.ReactNode

}) {

  return (

    <NextAuthProvider>

      <html lang="en" className={`defaultTheme ${inter.className}`}>

        <head>

          <link rel='shortcut icon' href='/images/favicon/favicon.ico' />

        </head>

        <body className='text-white overflow-scroll overflow-x-hidden h-full relative'>

          <NextTopLoader
              color='#FFFFFF'
              showSpinner={false}
              height={1}
              zIndex={999999}
          />

          <Navigation />  
          <Sidebar />
          
          <div className='flex justify-center m-auto bg-background h-full items-center min-h-dvh w-full p-6'>

              {children}    

          </div>

          <Footer />

        </body>

      </html>

    </NextAuthProvider>

  )
}
