import { auth } from "@/auth";
import { prisma } from "@/app/(general)/lib/db";
import ProfileMain from "@/app/(general)/ui/components/account/ProfileMain";
import { redirect } from 'next/navigation';
import PostListByUser from "../../ui/components/posts/post_list_custom";

const Account = async () => {

    const session = await auth();
  
    const p_user = await prisma.user.findUnique({ where: { id: session?.user.id }})

    if (p_user) {

        const p_user_post_count = await prisma.post.count({ where: { authorId: p_user?.id }})  

        return (

            <div>
                {session ?
                <>
                    <ProfileMain 
                        username={p_user.username} 
                        image={p_user.image} 
                        description={p_user.description} 
                        createdAt={p_user?.createdAt} 
                        postCount={p_user_post_count} 
                    />


                    <p className="text-gray-300 font-bold antialiased w-full text-center md:text-left mt-4">{p_user.username}&apos;{p_user.username.endsWith("s") ? "" : "s"} Posts</p>   

                    <hr className="mt-2" />

                    <div className="flex flex-col gap-4 mt-4">
                        <PostListByUser username={p_user.username} />                             
                    </div>
          
                </>
                :
                <h1 className="header">Looks like you&apos;re account has been logged out.</h1>
                }
            </div>

        )

    } else {
        return (
            <h1 className="header">This account doesn&apos;t exist.</h1>
        );
    }
    



};

export default Account