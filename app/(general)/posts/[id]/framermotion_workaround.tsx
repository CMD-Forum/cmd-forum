"use client";

import { FullPost } from '@/app/(general)/ui/components/posts/post'
import { AnimatePresence, motion } from 'framer-motion';

interface WhyIsThisAThingProps {

    post: any;
    submitted: any;
    ratio: any;

}

export default function Framermotion_workaround(props: WhyIsThisAThingProps) {

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
          id={props.post.id}
          title={props.post.title} 
          author={props.post.author} 
          community={props.post.community.name} 
          upvotes={props.post.upvotes} 
          downvotes={props.post.downvotes} 
          ratio={`${props.ratio}%`} 
          submitted={props.submitted} 
          subtitle={props.post.tagline} 
          body={props.post.content}
          imageurl={props.post.imageurl}
          image_alt={props.post.imagealt}
        ></FullPost>

      </motion.div>
    </AnimatePresence>

  )

}
