import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.scss'
import Navigation from '@/app/ui/navigation'

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
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        {children}
      </body>
    </html>
  )
}
