"use client";

import { Post } from "@prisma/client";
import { useEffect,useState } from 'react';

import { getPost } from "../../lib/data";
import { FullPost } from '../../ui/components/posts/post';
import { Error404 } from "../../ui/error404";
import { FullPostSkeleton } from "../../ui/skeletons/Post";

export default function PostView({ params }: { params: { id: string } }) {

  const [post, setPost] = useState<Post>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {

      setLoading(true);

      if ( ! params.id) {
        setLoading(false);
        return <Error404 />;
      }

      const fetchedPost = await getPost({ postID: params.id });

      if ( ! fetchedPost) {
        setLoading(false);
        return <Error404 />;
      }

      setPost(fetchedPost);
      setLoading(false);
    }

    fetchPost();
  }, [params.id]);

  return (
    <>
      <title>Command</title>
      <div className='mt-14 lg:pb-12 lg:px-44 !pt-0 md:mt-6'>
        {loading ? (
          <FullPostSkeleton />
        ) : post ? (
          <>
            <FullPost
              id={post.id}
              title={post.title}
              // @ts-ignore
              author={post.author}
              // @ts-ignore
              community={post.community}
              createdAt={post.createdAt}
              updatedAt={post.updatedAt}
              public={post.public}
              content={post.content}
              imageurl={post.imageurl}
              imagealt={post.imagealt}
            />          
          </>
        ) : (
          <>
            <title>404 - Command</title>
            <Error404 />
          </>
        )}
      </div>    
    </>
  );
}
