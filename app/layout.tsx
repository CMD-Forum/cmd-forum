import type { Metadata, Viewport } from 'next';
import { Inter, IBM_Plex_Mono } from 'next/font/google';
import './(general)/globals.scss';
import { Footer } from '@/app/(general)/ui/navigation';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';
import NextTopLoader from 'nextjs-toploader';
import { SpeedInsights } from "@vercel/speed-insights/next";
import Sidebar from './(general)/ui/components/navigation/sidebar';
import React from 'react';

const inter = Inter({ subsets: ['latin'] });
const ibm_plex_mono = IBM_Plex_Mono({ subsets: ["latin"], weight: "400", variable: "--font-ibm_plex_mono" })

const metadataBaseUrl = process.env.NODE_ENV === 'production' 

  ? process.env.NEXT_PUBLIC_METADATA_BASE_URL_PROD 
  : process.env.NEXT_PUBLIC_METADATA_BASE_URL_DEV;

const APP_NAME = "CMD/>";
const APP_DEFAULT_TITLE = "CMD/>";
const APP_TITLE_TEMPLATE = "%s";
const APP_DESCRIPTION = "Command Forum Site";

export const metadata: Metadata = {
  metadataBase: metadataBaseUrl ? new URL(metadataBaseUrl) : new URL("https://cmd-forum.vercel.app/"),
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

          <html lang="en" className={`defaultTheme bg-background ${inter.className} ${ibm_plex_mono.variable}`} style={{ colorScheme: "dark" }}>

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

                {/*<div className='hidden md:flex'>
                  <Banner 
                    message={"This is a development version of Command - things may be unfinished or broken."} 
                    fixedAtTop={false} 
                    learnMoreEnabled={true}
                    learnMoreLink={"/ui/dev/development_message"}
                  />                  
                </div>*/}

                {/*<Navigation />*/}

                  <div className='flex h-full bg-background'>

                    <Sidebar />     

                    <div className='flex flex-col w-full !pt-0'>
                      <div>
                        {children}    
                      </div>
                    </div>

                  </div>

                <Footer />

            </body>

          </html>

      </SessionProvider>

  )
}
