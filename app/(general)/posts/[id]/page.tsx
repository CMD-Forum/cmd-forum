import { prisma } from '@/app/(general)/lib/db';
import { Error404 } from '../../ui/error404';
import { FullPost } from '../../ui/components/posts/post';

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
          id: true,
          display_name: true,
          name: true,
          image: true,
          public: true,
        }
      },
      author: {
        select: {
          id: true,
          username: true,
          description: true,
          image: true,
          createdAt: true,
          updatedAt: true,
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

    <div className='mt-6 lg:pb-12 lg:px-44 !pt-0'>

      <FullPost
        id={post.id}
        title={post.title} 
        author={post.author} 
        community={post.community} 
        createdAt={post.createdAt} 
        updatedAt={post.updatedAt}
        public={post.public}
        tagline={post.tagline} 
        content={post.content}
        imageurl={post.imageurl}
        imagealt={post.imagealt}
      />

    </div>
    

  )

}
