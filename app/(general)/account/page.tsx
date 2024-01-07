import { getServerSession } from "next-auth";
import { authOptions } from "@/app/(general)/lib/auth";
import { prisma } from "@/app/(general)/lib/db";
import ProfileMain from "../ui/components/account/ProfileMain";
import { useRouter } from "next/navigation";

const Account = async () => {

    var session = await getServerSession(authOptions)

    const router = useRouter();

    if ( ! session ) {

        router.push("/login");

    };
  
    const p_user = await prisma.user.findUnique({
  
        where: { 
            //@ts-ignore
            username: session.user.username 
        },
  
    });

    const p_user_post_count = await prisma.post.count({
        where: {
            authorId: p_user?.id
        }
    })

    const createdAt = p_user?.createdAt.toLocaleDateString()

    return (

        <div>
            {/* @ts-ignore */}
            <ProfileMain username={session?.user.name} profile_image_src={session?.user.profile_image} description={p_user.description} createdAt={createdAt} postCount={p_user_post_count} />
        </div>

    )    

};

export default Account