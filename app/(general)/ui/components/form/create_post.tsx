'use client';

import React, { useEffect, useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod" // Form Validation
import { Tooltip } from 'react-tooltip'
import { AlertWarning } from "../alert";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import Image from "next/image";

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
        .max(20, "All communitys have a maximum of 20 characters.")

})

function ErrorMessage(props: { message: string }) {

    return <p className="dark:text-red-300 text-sm">{props.message}</p>;
    
}

const CreatePostForm = () => {

    const [error, setError] = useState<string | null>(null);

    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof FormSchema>>({

        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: '',
            content: '',
            tagline: '',
        },

    });

    const OnSubmit = async (values: z.infer<typeof FormSchema>) => {

        setIsLoading(true);

    };

    return ( 

        <form className="flex flex-col gap-2 bg-[#131313] facebookTheme:bg-white px-10 py-10 rounded-lg max-w-3xl" onSubmit={form.handleSubmit(OnSubmit)}>

            <h2 className="text-xl font-semibold facebookTheme:font-bold facebookTheme:text-[15px]">Create Post</h2>

            <hr className='border-zinc-900 mt-1 mb-1 facebookTheme:border-[#b3b3b3] facebookTheme:mt-0'></hr>

            {/* */}


            {/* */}

            <div className="flex gap-1 facebookTheme:text-[11px]">Title<p className="text-[#fca5a5]">*</p></div>
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

            <div className="flex gap-1 facebookTheme:text-[11px]">Content<p className="text-[#fca5a5]">*</p></div>
            <textarea
                {...form.register('content')}
                placeholder="Here's my amazing code, please tell me how to improve!"
                className={`generic_field pt-[6px] pb-[6px] ${form.formState.errors.content ? "errored" : ""}`}
            />

            {form.formState.errors.content && (

                // @ts-expect-error
                <ErrorMessage message={form.formState.errors.content.message} />

            )}

            {/* */}

            <div className="flex gap-1 facebookTheme:text-[11px]">
                Tagline
                <p className="text-[#fca5a5]">*</p>
                <InformationCircleIcon id="tooltip_postcreate_tagline" className="h-[15px] w-[15px] flex justify-center items-center">? </InformationCircleIcon>
                <Tooltip anchorSelect="#tooltip_postcreate_tagline" className="rounded-lg facebookTheme:rounded-none" clickable >

                    <p>This will show as a snippet of your post. <Link href="/support/understand-posting" className="hover:underline text-sky-500">Learn more.</Link></p>
                
                </Tooltip>
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

export default CreatePostForm;