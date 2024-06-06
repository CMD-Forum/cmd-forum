"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export function Landing() {

    const { data: session } = useSession();
    const router = useRouter();  
    
    if ( session ) {
        router.push("/posts")
    }

    let wHeight = window.screen.availHeight;

    return (
        <div className='flex flex-col'>
            <div className="flex flex-col w-full from-zinc-700 to-zinc-950 bg-gradient-to-b items-center justify-center" style={{ height: wHeight - 60 - 230 }}>
                <h1 className="text-center font-bold text-4xl md:text-6xl text-white">Welcome to CMD/&gt;</h1>
                <h1 className="text-center font-medium text-xl md:text-3xl text-gray-300">Yet another internet forum</h1>
                <Link href={"/signup"} className="navlink-full mt-8">Get Started</Link>
                <Link href={"/login"} className="navlink-ghost hover:bg-transparent focus:bg-transparent !border-1 border-transparent hover:border-border-light focus:border-border-light mt-4">Already have an account?</Link>
            </div>
            
            {/*<div className="select-none pointer-events-none pl-6 md:pl-16 pr-6 md:pr-16 mb-6 md:mb-16 mt-6 md:mt-28">
                <CardPost 
                    id="test"
                    title="This is an example of a text post."
                    tagline="This is the tagline, where you summarize your post in one line."
                    createdAt={new Date()}
                    updatedAt={new Date()}
                    content="test"
                    imageurl={null}
                    imagealt={null}
                    public={true}
                    downvotes={1}
                    upvotes={4}
                    communityId={"1"}
                    authorId={"1"} 
                    author={{ id: "1", username: "username", createdAt: new Date().toLocaleDateString(), updatedAt: new Date().toLocaleDateString(), description: "Users can have descriptions!", image: "favicon.ico" }} 
                    community={{ id: "1", name: "community", display_name: "General", image: "favicon.ico", public: true }} 
                />                
            </div>*/}
        </div>
    )

}