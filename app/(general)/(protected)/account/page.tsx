import { auth } from "@/auth";
import { prisma } from "@/app/(general)/lib/db";
import ProfileMain from "@/app/(general)/ui/components/account/ProfileMain";
import { redirect } from 'next/navigation';

const Account = async () => {

    const session = await auth();
  
    console.log(session);

    return (

        <div>
            {/* @ts-ignore */}
            {/*<ProfileMain username={session?.user.name} profile_image_src={session?.user.profile_image} description={p_user.description} createdAt={createdAt} postCount={p_user_post_count} />*/}
        </div>

    )    

};

export default Account