import './(general)/globals.scss';

import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from 'next';
import { IBM_Plex_Mono,Inter } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import React from 'react';

import { SessionProvider } from '@/app/(general)/lib/sessioncontext';
import { Footer } from '@/app/(general)/ui/components/navigation/footer';

import { getAuth } from './(general)/lib/auth';
import Sidebar from './(general)/ui/components/navigation/sidebar';
import { enableMaintenanceBanner } from '@/flags';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });
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
  const maintenanceBannerEnabled = await enableMaintenanceBanner();

  return (
    <SessionProvider value={session}>
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
                { maintenanceBannerEnabled ?
                  <div className='flex items-center justify-center bg-border p-4'>
                    <p>Command is currently undergoing maintenance, service disruptions may occur.</p>
                  </div>
                  :
                  null
                }               
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
