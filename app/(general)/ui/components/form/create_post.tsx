"use client";

import { zodResolver } from "@hookform/resolvers/zod" // Form Validation
import MarkdownEditor from '@uiw/react-markdown-editor';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaGithub, FaMarkdown } from "react-icons/fa6";
import rehypeSanitize from "rehype-sanitize";
import * as z from "zod";

import { createPost, getCommunityByName } from "@/app/(general)/lib/data";

import Alert, { AlertSubtitle, AlertTitle } from "../new_alert";

const FormSchema = z.object({
    title: z
        .string()
        .min(5, "Title must have at least 5 characters.")
        .max(75, "Title must be under 75 characters."),
    community: z
        .string()
        .min(2, "All communitys are 2 characters or over.")
        .max(20, "All communitys have a maximum of 20 characters."),
    /*content: z
        .string()
        .min(50, "Content must be at least 50 characters")
        .max(99999, "Posts cannot exceed 99,999 characters long. Split the post if required.")*/
});

function ErrorMessage(props: { message: string }) {
    return <p className="text-red-300 text-sm">{props.message}</p>;
}

export default function CreatePostForm() {

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<false | true | null>(null);
    const [com_err, setCom_Err] = useState<string>();
    const [create_err, setCreate_Err] = useState<false | true | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [content, setContent]= useState("");

    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        community: '',
        title: '',
      },
    });

    const { data: session } = useSession();
    const router = useRouter();

    if ( ! session ) {
        return (
            <Alert type={"error"}>
                <AlertTitle>It looks like you&apos; not logged in, please log in.</AlertTitle>
            </Alert>
        );
    }

    const OnSubmit = async (values: z.infer<typeof FormSchema>) => {

      setIsLoading(true);
      setCom_Err("");
      setSuccess(false);
  
      const post_community = await getCommunityByName(values.community);
  
      if (post_community) {
  
        const postData = {
          title: values.title,
          communityId: post_community.id,
          content: content,
          imageurl: null,
          imagealt: null,
          authorId: session.user.id,
        };
        
        try {
            // @ts-ignore
            const post = await createPost(postData); 
            setIsLoading(false); 
            setSuccess(true);
            router.push(`/posts/${post.id}`);
        } catch ( error ) {
            // @ts-ignore
            setCom_Err("Sorry, something went wrong.");
            setIsLoading(false);
        }

      } else {
        setCom_Err("That community doesn't exist. Make sure you spelled it correctly.");           
        setIsLoading(false);
      }
    };
  
    return (

        <form className="flex flex-col gap-2 bg-transparent rounded-lg !w-full" onSubmit={form.handleSubmit(OnSubmit)}>

            {com_err && (
                <Alert type="error">
                    <AlertTitle>{com_err}</AlertTitle>
                </Alert>
            )}

            {success && (
                <Alert type="success">
                    <AlertTitle>Your post was successfully created.</AlertTitle>
                </Alert>
            )}

            {create_err && (
                <Alert type="error">
                    <AlertTitle>Your post could not be created, please try again later.</AlertTitle>
                </Alert>
            )}

            {error && (
                <Alert type="error">
                    <AlertTitle>Sorry, something went wrong.</AlertTitle>
                    <AlertSubtitle>Please try again later.</AlertSubtitle>
                </Alert>
            )}

            <div className="flex gap-1 subtitle">Community<p className="text-[#fca5a5]">*</p></div>
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

            <div className="flex gap-1 subtitle">Title<p className="text-[#fca5a5]">*</p></div>
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

            <div className="flex gap-1 subtitle">Content<p className="text-[#fca5a5]">*</p></div>

            <MarkdownEditor
                value={content}
                enablePreview={true}
                enableScroll={true}
                previewProps={{ rehypePlugins: [rehypeSanitize] }} 
                onChange={setContent}
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

            <button type="submit" className="navlink-full !w-full sm:!w-fit justify-center min-w-[62px]">
                {isLoading ? <img src="/spinner.svg" alt="Submitting..." className="spinner"/>  : null }    
                Submit
            </button>

        </form>

    );

}