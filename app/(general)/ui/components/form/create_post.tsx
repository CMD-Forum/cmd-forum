"use client";

import React, { startTransition, useEffect, useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod" // Form Validation
import { Tooltip } from 'react-tooltip'
import Alert from "../new_alert";
import { useSession } from "next-auth/react";
import { createPost, getCommunityByName } from "@/app/(general)/lib/data";
import MarkdownPreview from '@uiw/react-markdown-preview';
import { FaGithub, FaMarkdown } from "react-icons/fa6";
import Link from "next/link";
import MarkdownEditor from '@uiw/react-markdown-editor';
import rehypeSanitize from "rehype-sanitize";

const FormSchema = z.object({

    title: z
        .string()
        .min(5, "Title must have at least 5 characters.")
        .max(75, "Title must be under 75 characters."),

    tagline: z
        .string()
        .min(5, "Tagline must be at least 5 characters.")
        .max(40, "Tagline must be at most 40 characters."),
    
    community: z
        .string()
        .min(2, "All communitys are 2 characters or over.")
        .max(20, "All communitys have a maximum of 20 characters."),
    image_url: z
        .string()
        .url( { message: "Image must be a URL and start with `https://`" } )
        .optional()
        .or(z.literal(null))
        .or(z.literal("")),
    image_alt: z
        .string()
        .min(5, "Image Alt Tag must be at least 5 characters.")
        .max(75, "Image Alt Tag must be no more than 30 characters.")
        .optional()
        .or(z.literal(null))
        .or(z.literal("")),
})

function ErrorMessage(props: { message: string }) {

    return <p className="dark:text-red-300 text-sm">{props.message}</p>;
    
}

export default function CreatePostForm() {

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<false | true | null>(null);
    const [com_err, setCom_Err] = useState<false | true | null>(null);
    const [create_err, setCreate_Err] = useState<false | true | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [content, setContent]= useState("");

    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        community: '',
        title: '',
        tagline: '',
        image_url: '',
      },
    });

    const { data: session, update } = useSession()

    if ( ! session ) {

        return (
            <ErrorMessage message="Oops, something went wrong. Try logging in again." />
        );

    } 

    const OnSubmit = async (values: z.infer<typeof FormSchema>) => {
  
      console.log("[INFO] Form submitted");

      setIsLoading(true);
      setCom_Err(false);
      setSuccess(false);
  
      const post_community = await getCommunityByName(values.community)
  
      if (post_community) {
  
        const postData = {
  
          title: values.title,
          communityId: post_community.id,
          content: content,
          tagline: values.tagline,
          imageurl: values.image_url,
          imagealt: values.image_alt,
          authorId: session.user.id,
  
        };
        
        try {

            console.log("[INFO] Community found");
            const post = await createPost(postData); 
            console.log("[INFO] ", post)
            setIsLoading(false); 
            setSuccess(true);
             
        } catch ( error ) {
            console.log("[ERROR]: Post creation failed at onSubmit");
            setCom_Err(true);
            setIsLoading(false);
        }
        

      } else {
  
        setCom_Err(true);           
        setIsLoading(false);
  
      }
  
    };
  
    return (

        <form className="flex flex-col gap-2 bg-card border-border border-[1px] px-10 py-10 rounded-lg" onSubmit={form.handleSubmit(OnSubmit)}>

            <h2 className="header text-center sm:text-left">Create Post</h2>

            <hr className='border-border mt-1 mb-1'></hr>

            {/* */}

            {com_err && (

                <Alert type="error" title="Post Creation Failed" description="The specified community was not found, please try again." />

            )}

            {success && (

                <Alert type="success" title="Post Created" description="Your post was created successfully." />

            )}

            {create_err && (

                <Alert type="error" title="Post Creation Failed" description="Sorry, your post could not be created. Please try again later." />

            )}

            <div className="flex gap-1 font-medium">Community<p className="text-[#fca5a5]">*</p></div>
            <input
                {...form.register('community')}
                placeholder="general"
                className={`generic_field ${form.formState.errors.community ? "errored" : ""}`}
            />

            {form.formState.errors.community && (

                // @ts-expect-error
                <ErrorMessage message={form.formState.errors.community.message} />

            )}

            {/* */}

            <div className="flex gap-1 font-medium">Title<p className="text-[#fca5a5]">*</p></div>
            <input
                {...form.register('title')}
                placeholder="Look at my amazing code!"
                className={`generic_field ${form.formState.errors.title ? "errored" : ""}`}
            />

            {form.formState.errors.title && (

                // @ts-expect-error
                <ErrorMessage message={form.formState.errors.title.message} />

            )}

            {/* */}

            <div className="flex gap-1 font-medium">Content<p className="text-[#fca5a5]">*</p></div>
            <MarkdownEditor
                value={content}
                onChange={setContent}
                enablePreview={true}
                enableScroll={true}
            />

            <div className="flex gap-2 flex-col md:flex-row w-full">
                <Link href={"https://github.github.com/gfm/"} className="flex gap-2 hover:bg-border rounded p-2 transition-all items-center justify-center w-full md:w-fit">
                    <FaMarkdown className="h-5 w-7 text-gray-300 hover:text-white transition-all" />
                    <p className="text-sm text-gray-300 group-hover:text-white transition-all">Supports Markdown</p>    
                </Link>
                <Link href={"https://uiwjs.github.io/react-markdown-editor/"} className="flex gap-1 hover:bg-border rounded p-2 items-center justify-center transition-all w-full md:w-fit">
                    <FaGithub className="h-5 w-7 text-gray-300 hover:text-white transition-all group-hover:text-white" />
                    <p className="text-sm text-gray-300 group-hover:text-white transition-all">React Markdown Editor</p>    
                </Link>
            </div>

            {/* */}

            <div className="flex gap-1 font-medium">
                Tagline
                <p className="text-[#fca5a5]">*</p>
            </div>
            <input
                {...form.register('tagline')}
                placeholder="My amazing code"
                className={`generic_field ${form.formState.errors.tagline ? "errored" : ""}`}
            />

            {form.formState.errors.tagline && (

                // @ts-expect-error
                <ErrorMessage message={form.formState.errors.tagline.message} />

            )}

            {/* */}

            <div className="flex gap-1 font-medium">
                Image
            </div>
            <input
                {...form.register('image_url')}
                placeholder="https://www.imgur.com/testurl"
                className={`generic_field ${form.formState.errors.image_url ? "errored" : ""}`}
            />

            {form.formState.errors.image_url && (

                // @ts-expect-error
                <ErrorMessage message={form.formState.errors.image_url.message} />

            )}

            {/* */}


            <div className="flex gap-1 font-medium">
                Image Accessibility Tag
            </div>
            <input
                {...form.register('image_alt')}
                placeholder="Code that appears to be React in an IDE."
                className={`generic_field ${form.formState.errors.image_url ? "errored" : ""}`}
            />

            {form.formState.errors.image_alt && (

                // @ts-expect-error
                <ErrorMessage message={form.formState.errors.image_alt.message} />

            )}

            {/* */}

            <button type="submit" className="navlink-full !w-full sm:!w-fit justify-center min-w-[62px]">
                
                {/* eslint-disable-next-line @next/next/no-img-element*/}
                {isLoading ? <img src="/spinner.svg" alt="Submitting..." className="spinner"/>  : 'Submit Post' }
                
            </button>

            {/* */}

            {error && <Alert type="warning" title="Post Creation Failed" description="Please check all details are correct." />}

        </form>

    );

}