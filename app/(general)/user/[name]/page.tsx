import ProfileMain from "@/app/(general)/ui/components/account/ProfileMain";
import { prisma } from "@/app/(general)/lib/db";
import { Error404 } from "../../ui/error404";
import PostListCustom from "../../ui/components/posts/post_list_custom";

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

            <>
                <ProfileMain 
                    username={user.username} 
                    image={user.image} 
                    description={user.description} 
                    createdAt={user.createdAt} 
                    postCount={user_post_count} 
                />        

                <PostListCustom post={posts} />
            </>

        )

    } else if ( ! user || user === null || user === false ) {

        return (
            <Error404 />
        );

    }

}