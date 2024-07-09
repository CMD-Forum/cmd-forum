"use client";

import { zodResolver } from "@hookform/resolvers/zod" // Form Validation
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { createPost, getCommunityByName } from "@/app/(general)/lib/data";
import { useSession } from "@/app/(general)/lib/sessioncontext";

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
    href: z
        .string()
        .url("Image must be a URL and start with `https://`"),
})

function ErrorMessage(props: { message: string }) {
    return <p className="text-red-300 text-sm">{props.message}</p>;
}

export default function CreateLinkPostForm() {

    // eslint-disable-next-line no-unused-vars
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<false | true | null>(null);
    const [com_err, setCom_Err] = useState<string>();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        community: '',
        title: '',
        href: '',
      },
    });

    const session = useSession();
    const router = useRouter();

    if ( ! session ) {
        return (
            <Alert type={"error"} closeBtn={false}>
                <AlertTitle>It looks like you&apos;re not logged in, please login.</AlertTitle>
            </Alert>
        );
    }

    const OnSubmit = async (values: z.infer<typeof FormSchema>) => {

      setIsLoading(true);
      setCom_Err("");
      setSuccess(false);
  
      const post_community = await getCommunityByName(values.community)
  
      if (post_community) {

        const postData = {
            title: values.title,
            communityId: post_community.id,
            content: "",
            href: values.href,    
            authorId: session.user?.id,
        };
        try {
            // @ts-ignore
            const post = await createPost(postData); 
            setIsLoading(false); 
            setSuccess(true);
            router.push(`/posts/${post.id}`);
        } catch ( error ) {
            setCom_Err("Sorry, something went wrong.");
            setIsLoading(false);
        }
      } else {
        setCom_Err("That community doesn't exist. Make sure you spelled it correctly.");           
        setIsLoading(false);
      }
    };

    return (
        <form className="flex flex-col gap-2 bg-transparent rounded-lg-lg !w-full" onSubmit={form.handleSubmit(OnSubmit)}>

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

            {error && (
                <Alert type="error">
                    <AlertTitle>Sorry, something went wrong.</AlertTitle>
                    <AlertSubtitle>Please try again later.</AlertSubtitle>
                </Alert>
            )}

            <p className="flex gap-0.5 subtitle required">Community</p>
            <input
                {...form.register('community')}
                placeholder="general"
                className={`generic_field ${form.formState.errors.community ? "error" : ""}`}
            />

            {form.formState.errors.community && (
                // @ts-expect-error
                <ErrorMessage message={form.formState.errors.community.message} />
            )}

            {/* */}

            <p className="flex gap-0.5 subtitle required">Title</p>
            <input
                {...form.register('title')}
                placeholder="Look at my amazing code!"
                className={`generic_field ${form.formState.errors.title ? "error" : ""}`}
            />

            {form.formState.errors.title && (
                // @ts-expect-error
                <ErrorMessage message={form.formState.errors.title.message} />
            )}

            {/* */}

            <p className="flex gap-0.5 subtitle required">Link</p>
            <input
                {...form.register('href')}
                placeholder="https://thebestnewswebsite.com/article/12345"
                className={`generic_field ${form.formState.errors.href ? "error" : ""}`}
            />

            {/* This will come later */}
            {/*<div className="flex rounded-lg border-1 border-dashed border-border w-full h-fit p-12 hover:border-border-light focus:border-border-light transition-all items-center justify-center">
                <div className="flex flex-col w-fit h-fit items-center justify-center">
                    <CloudArrowUpIcon className="w-10 h-10" />
                    <p className="subtitle">Drop your image here or click to upload</p>
                </div>
            </div>*/}

            {form.formState.errors.href && (
                // @ts-expect-error
                <ErrorMessage message={form.formState.errors.image_url.message} />
            )}

            <button type="submit" className="navlink-full !w-full sm:!w-fit justify-center min-w-[62px]">
                {/* eslint-disable-next-line @next/next/no-img-element*/}
                {isLoading ? <img src="/spinner.svg" alt="Submitting..." className="spinner"/>  : null }
                Submit
            </button>
        </form>
    );
}