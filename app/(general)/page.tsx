"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HomePage() {

  const router = useRouter();
  router.replace("/posts");

  return (

    <main className="flex min-h-fit flex-col w-full">
      <div className="error flex flex-col w-full">
        <div className="flex flex-col p-12 items-center">
          {/*<h1 className="header-3">You shouldn&apos;t be here.</h1>
          <h1 className="subtitle">You should be redirected soon. If not, click <Link href={"/posts"} className="hover:underline">here</Link>.</h1>*/}
        </div>  
      </div>
    </main>

  );

}
