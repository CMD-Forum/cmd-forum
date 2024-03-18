"use client";

import { FullPost } from '@/app/(general)/ui/components/posts/post'
import { AnimatePresence, motion } from 'framer-motion';

export default function Framermotion_workaround({ post }: { post: any }) {

    const variants = {

        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0 },
        
    };

  return (

    <AnimatePresence>
      <motion.div 
        className="flex min-h-screen flex-col w-full "
        variants={variants}
        initial="hidden"
        animate="visible"
        transition={{ ease: "easeInOut", duration: 0.8, type: "spring" }}
      >

        <FullPost 
          id={post.id}
          title={post.title} 
          author={post.author} 
          community={post.community} 
          upvotes={post.upvotes} 
          downvotes={post.downvotes} 
          createdAt={post.createdAt} 
          updatedAt={post.updatedAt}
          public={post.public}
          tagline={post.tagline} 
          content={post.content}
          imageurl={post.imageurl}
          imagealt={post.imagealt}
        ></FullPost>

      </motion.div>
    </AnimatePresence>

  )

}
