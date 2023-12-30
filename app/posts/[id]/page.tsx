import '@/app/ui/components/posts/post_full';
import { FullPost } from '@/app/ui/components/posts/post';
import { prisma } from '@/app/lib/db';
import Framermotion_workaround from './framermotion_workaround';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import BackButton from '@/app/ui/components/posts/back_button';

export default async function PostView({ params }: { params: { id: number } }) {

  if ( ! params.id || isNaN(params.id)) {

    return (

      <h1>Please enter a valid number.</h1>

    );

  }

  const post = await prisma.post.findUnique({
    where: {
      id: Number(params.id)
    },
    include: {
      community: {
        select: {
          name: true,
          image: true,
        }
      },
      author: {
        select: {
          username: true,
          name: true,
          id: true,
        }
      }
    }
  })

  if ( ! post ) {

    return (

      <div className='flex flex-col gap-2'>
        <h1 className='header'>Post was not found.</h1>
        <BackButton title='Back'/>  
      </div>

    );

  }

  const submitted = post?.createdAt.toLocaleDateString();
  const totalVotes = post?.upvotes + post?.downvotes
  const ratio = totalVotes > 0 ? ((post.upvotes / totalVotes) * 100).toFixed(2) : '0';

  

  return (

    <div>

      <Framermotion_workaround post={post} submitted={submitted} ratio={ratio} />

    </div>
    

  )

}
