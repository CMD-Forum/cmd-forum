'use client';

import React, { useEffect, useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod" // Form Validation
import { Tooltip } from 'react-tooltip'
import { AlertFailure, AlertSuccess, AlertWarning } from "../alert";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/app/(general)/lib/db";
import { useSession } from "next-auth/react";

const FormSchema = z.object({

    title: z
        .string()
        .min(5, "Title must have at least 5 characters.")
        .max(30, "Title must be under 30 characters."),

    content: z
        .string()
        .min(10, "Content must be at least 10 characters.")
        .max(10000, "Content has a maximum limit of 10000 characters."),

    tagline: z
        .string()
        .min(5, "Tagline must be at least 5 characters.")
        .max(20, "Tagline must be at most 20 characters."),
    
    community: z
        .string()
        .min(2, "All communitys are 2 characters or over.")
        .max(20, "All communitys have a maximum of 20 characters."),
    image_url: z
        .string()
        .url( { message: "Image must be a URL and start with `https://`" } )
        .optional()
        .or(z.literal(null)),
    image_alt: z
        .string()
        .min(5, "Image Alt Tag must be at least 5 characters.")
        .max(75, "Image Alt Tag must be no more than 30 characters.")
})

function ErrorMessage(props: { message: string }) {

    return <p className="dark:text-red-300 text-sm">{props.message}</p>;
    
}

function createPost(postData: any) {
    
    return new Promise((resolve, reject) => {

      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/api/posts');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = () => {

        if (xhr.status === 201) {

          resolve(JSON.parse(xhr.responseText));

        } else {

          reject(new Error('Error occurred while creating post, please check your request for errors.'));
        }

      };

      xhr.onerror = () => {

        reject(new Error('Error occurred while creating post, please check your request for errors.'));

      };

      xhr.send(JSON.stringify(postData));
    });

}  

export default function CreatePostForm() {

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<false | true | null>(null);
    const [com_err, setCom_Err] = useState<false | true | null>(null);
    const [create_err, setCreate_Err] = useState<false | true | null>(null);
    const [isLoading, setIsLoading] = useState(false);
  
    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        community: '',
        title: '',
        content: '',
        tagline: '',
        image_url: '',
      },
    });
  
    const OnSubmit = async (values: z.infer<typeof FormSchema>) => {
  
      setIsLoading(true);
      setCom_Err(false);
      setSuccess(false);
  
      const session = useSession();
  
      const post_community = await prisma.community.findUnique({
        where: {
          name: values.community
        }
      })
  
      if (post_community) {
  
        const postData = {
  
          title: values.title,
          communityId: post_community.id,
          content: values.content,
          tagline: values.tagline,
          imageurl: values.image_url,
          imagealt: values.image_alt,
          authorId: session.data?.user.id,
  
        };
        
        createPost(postData)
  
            .then(data => {
  
                setSuccess(true);
                setIsLoading(false);
  
            })
  
            .catch(error => {
  
                setCreate_Err(true);
                setIsLoading(false);
  
            });
  
      } else if ( ! post_community || post_community === null || post_community === "" || post_community >= 0 ) {
  
        setCom_Err(true);           
        setIsLoading(false);
  
      }
  
    };
  
    return (

        <form className="flex flex-col gap-2 bg-[#131313] facebookTheme:bg-white px-10 py-10 rounded-lg max-w-3xl" onSubmit={form.handleSubmit(OnSubmit)}>

            <h2 className="text-xl font-semibold facebookTheme:font-bold facebookTheme:text-[15px]">Create Post</h2>

            <hr className='border-zinc-900 mt-1 mb-1 facebookTheme:border-[#b3b3b3] facebookTheme:mt-0'></hr>

            {/* */}

            {com_err && (

                <AlertFailure title="Post Creation Failed" text="The specified community was not found, please try again." />

            )}

            {success && (

                <AlertSuccess title="Post Created" text="Your post was created successfully." />

            )}

            {create_err && (

                <AlertFailure title="Post Creation Failed" text="Sorry, your post could not be created. Please try again later." />

            )}

            <div className="flex gap-1 facebookTheme:text-[11px] font-medium">Community<p className="text-[#fca5a5]">*</p></div>
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

            <div className="flex gap-1 facebookTheme:text-[11px] font-medium">Title<p className="text-[#fca5a5]">*</p></div>
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

            <div className="flex gap-1 facebookTheme:text-[11px] font-medium">Content<p className="text-[#fca5a5]">*</p></div>
            <textarea
                {...form.register('content')}
                placeholder="Here's my amazing code, please tell me how to improve!"
                className={`generic_field pt-[6px] pb-[6px] !min-h-[200px] ${form.formState.errors.content ? "errored" : ""}`}
            />

            {form.formState.errors.content && (

                // @ts-expect-error
                <ErrorMessage message={form.formState.errors.content.message} />

            )}

            {/* */}

            <div className="flex gap-1 facebookTheme:text-[11px] font-medium">
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

            <div className="flex gap-1 facebookTheme:text-[11px] font-medium">
                Image
                <p className="text-[#fca5a5]">*</p>
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


            <div className="flex gap-1 facebookTheme:text-[11px] font-medium">
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

            {/*<pre>Validation status: {JSON.stringify(zo.validation, null, 2)}</pre>*/}

            {error && <AlertWarning title="Login failed" text="Please check all details are correct." />}

        </form>

    );

}