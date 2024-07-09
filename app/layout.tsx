import './(general)/globals.scss';

import type { Metadata, Viewport } from 'next';
import { IBM_Plex_Mono, Inter } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import React from 'react';

import { SessionProvider } from '@/app/(general)/lib/sessioncontext';

import { getAuth } from './(general)/lib/auth';
import Infobar from './(general)/ui/components/navigation/infobar';
import Sidebar from './(general)/ui/components/navigation/sidebar';
import { Topbar } from './(general)/ui/components/navigation/topbar';

const inter = Inter({ subsets: ['latin'], display: "swap" });
const ibm_plex_mono = IBM_Plex_Mono({ subsets: ["latin"], weight: "400", variable: "--font-ibm_plex_mono" })

const metadataBaseUrl = process.env.NODE_ENV === 'production' 

  ? process.env.NEXT_PUBLIC_METADATA_BASE_URL_PROD 
  : process.env.NEXT_PUBLIC_METADATA_BASE_URL_DEV;

const APP_NAME = "Command";
const APP_DEFAULT_TITLE = "Command";
const APP_TITLE_TEMPLATE = "%s - Command";
const APP_DESCRIPTION = "Command is a forum site for people to share news, interests or anything they can think of.";

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

  const session = await getAuth();

  return (
    <SessionProvider value={session}>
      {/* @ts-ignore */}
          <html lang="en" className={`defaultTheme bg-card ${inter.className} ${ibm_plex_mono.variable}`} style={{ colorScheme: "dark" }}>
            <head>
              <link rel='shortcut icon' href='/images/favicon/favicon.ico' />
            </head>
            <body id='body' className='bg-card text-white overflow-scroll overflow-x-hidden h-vh relative'>
              <NextTopLoader
                color='#FFFFFF'
                showSpinner={false}
                height={1}
                zIndex={999999}
              />
                {/*{ maintenanceBannerEnabled ?
                  <div className='flex items-center justify-center bg-border p-4'>
                    <p>Command is currently undergoing maintenance, service disruptions may occur.</p>
                  </div>
                  :
                  null
                }*/}
                {/*<Navigation />*/}
                <div className='flex flex-col w-full bg-background items-center justify-center'>
                    <Topbar />
                    <div className='flex h-full bg-background min-[1250px]:px-44 max-w-[1920px] w-full'>
                      <Sidebar />     
                      <div className='flex flex-col w-full !pt-0 bg-foreground'>
                        {children}
                      </div>
                      <Infobar />
                    </div>
                  {/*<Footer />*/}                  
                </div>
            </body>
          </html>
      </SessionProvider>
  )
}
