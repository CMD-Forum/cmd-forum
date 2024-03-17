import { prisma } from '@/app/(general)/lib/db';
import Framermotion_workaround from './framermotion_workaround';
import { Error404 } from '../../ui/error404';

export default async function PostView({ params }: { params: { id: string } }) {

  if ( ! params.id ) {

    return (

      <Error404 />

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
          id: true,
          username: true,
          description: true,
          profile_image: true,
        }
      }
    }
  })

  if ( ! post ) {

    return (

      <Error404 />

    );

  }

  return (

    <div className='mt-6 p-6 lg:pb-12 lg:p-12 lg:px-48 !pt-0'>

      <Framermotion_workaround post={post} />

    </div>
    

  )

}
