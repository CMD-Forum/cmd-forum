import { FullPost } from '@/app/(general)/ui/components/posts/post';
import { prisma } from '@/app/(general)/lib/db';
import Framermotion_workaround from './framermotion_workaround';
import { ArrowLeftIcon, HomeIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import BackButton from '@/app/(general)/ui/components/posts/back_button';

export default async function PostView({ params }: { params: { id: string } }) {

  if ( ! params.id ) {

    return (

      <h1>Please enter a valid ID.</h1>

    );

  }

  const post = await prisma.post.findUnique({
    where: {
      id: params.id
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
        <div className='gap-2 p-8 rounded-md w-full bg-card border-border border-[1px]'>
          <h1 className='text-2xl font-sans font-bold antialiased w-full'>Oops, we&apos;ve hit a wall!</h1>   
          <h2 className="text-gray-300">The requested post couldn&apos;t be found.</h2>
          <div className="flex md:flex-row flex-col gap-2 mt-2">
            <BackButton title='Back'/> 
            <Link className='navlink !w-full !justify-center md:!w-fit' href='/'><HomeIcon className="font-medium h-5 w-5" />Home</Link>
            <Link className='navlink !w-full !justify-center md:!w-fit' href='/search'><MagnifyingGlassIcon className="font-medium h-5 w-5" />Search</Link>                            
          </div>
        </div>
        
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
