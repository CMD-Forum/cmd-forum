import { redirect } from "next/navigation";
import React from "react";

import { getAuth } from '@/app/(general)/lib/auth';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const { user } = await getAuth();

  if (!user) {
    redirect('/login');
  }

  return (
    <div id="protected-route-container">
      {children}    
    </div>
  )
}
