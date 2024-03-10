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

    const posts = await prisma.post.findMany({
        where: {
          author: {
            username: params.name
          }
        }
    })

    if ( user ) {

        const user_post_count = await prisma.post.count({
            where: {
                authorId: user.id
            }
        })        

        return (

            <div className="p-6 mt-6">
                <ProfileMain 
                    username={user.username} 
                    image={user.image} 
                    description={user.description} 
                    createdAt={user.createdAt} 
                    postCount={user_post_count} 
                />        


                <p className="text-gray-300 font-bold antialiased w-full text-center md:text-left mt-4">{user.username}&apos;{user.username.endsWith("s") ? "" : "s"} Posts</p>   

                <hr className="mt-2" />

                <div className="flex flex-col">
                    <PostListByUser username={user.username} />                             
                </div>
                
            </div>

        )

    } else if ( ! user || user === null || user === false ) {

        return (
            <Error404 />
        );

    }

}