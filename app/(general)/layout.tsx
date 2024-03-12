import type { Metadata, Viewport } from 'next'
import { Inter, IBM_Plex_Mono } from 'next/font/google'
import './globals.scss'
import { Navigation, Sidebar, Infobar, Bottombar, Footer } from '@/app/(general)/ui/navigation'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'
import NextTopLoader from 'nextjs-toploader';
import CookieBanner from './ui/components/cookies/cookie_banners'
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ['latin'] });
const ibm_plex_mono = IBM_Plex_Mono({ subsets: ["latin"], weight: "400", variable: "--font-ibm_plex_mono" })

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

  const session = await auth();

  return (

    <SessionProvider session={session}>

        <html lang="en" className={`defaultTheme ${inter.className} ${ibm_plex_mono.variable}`}>

          <SpeedInsights />

          <head>

            <link rel='shortcut icon' href='/images/favicon/favicon.ico' />

          </head>

          <body id='body' className='bg-background text-white overflow-scroll overflow-x-hidden h-vh relative'>

            <NextTopLoader
              color='#FFFFFF'
              showSpinner={false}
              height={1}
              zIndex={999999}
            />

            <div id='modal-root'>

              <Navigation />

                <div className='flex h-full m-auto bg-background'>

                  <Sidebar />        

                  <div className='flex flex-col justify-center w-full !pt-0 m-auto'>

                    <div className=''>

                      {children}    

                    </div>

                  </div>

                </div>

              <Footer />

            </div>

          </body>

        </html>

    </SessionProvider>

  )
}
