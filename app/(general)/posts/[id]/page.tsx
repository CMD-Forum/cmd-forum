import { Metadata } from "next";

import { prisma } from '@/app/(general)/lib/db';

import { FullPost } from '../../ui/components/posts/post';
import { Error404 } from '../../ui/error404';
 
export async function generateMetadata(
  { params }: { params: { id: string } },
): Promise<Metadata> {
  const id = params.id.toLowerCase()
  const post = await prisma.post.findUnique({ where: { id: id }, select: { title: true, community: { select: { name: true }} }});
  return {
    title: post?.title ? `${post.title} - c/${post.community.name}` : "CMD/>",
  }
}

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

    <div className='mt-14 lg:pb-12 lg:px-44 !pt-0 md:mt-6'>

      <FullPost
        id={post.id}
        title={post.title} 
        // @ts-ignore
        author={post.author} 
        community={post.community} 
        createdAt={post.createdAt} 
        updatedAt={post.updatedAt}
        public={post.public}
        content={post.content}
        imageurl={post.imageurl}
        imagealt={post.imagealt}
      />

    </div>
    

  )

}
