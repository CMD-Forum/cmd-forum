import ProfileMain from "@/app/(general)/ui/components/account/ProfileMain";
import { prisma } from "@/app/(general)/lib/db";
import { Error404 } from "../../ui/error404";
import PostListCustom from "../../ui/components/posts/post_list_custom";
import PostListByUser from "../../ui/components/posts/post_list_custom";

export default async function UserPage({ params }: { params: { name: string } }) {

    const user = await prisma.user.findUnique({
        where: {
          username: params.name
        }
    })

    if ( user ) {

        const user_post_count = await prisma.post.count({
            where: {
                authorId: user.id
            }
        })        

        return (

            <main className="flex min-h-screen flex-col w-full">

                <div className="error flex flex-col w-full">
      
                  <div className="flex flex-col border-0 border-border p-6 pt-12 lg:pb-12 lg:p-12 lg:px-48 bg-card mt-8 md:mt-0">
      
                    <ProfileMain 
                        username={user.username} 
                        image={user.image} 
                        description={user.description} 
                        createdAt={user.createdAt} 
                        postCount={user_post_count} 
                    />        
      
                  </div>
      
                  <div className='flex flex-col px-6 lg:py-12 lg:px-48 mt-6'>
                    <PostListByUser username={user.username} /> 
                  </div>
      
                </div>
      
            </main>

        )

    } else if ( ! user || user === null || user === false ) {

        return (
            <Error404 />
        );

    }

}