"use client";

import React, { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod" // Form Validation
import Alert from "../new_alert";
import { useSession } from "next-auth/react";
import { createCommunity, getCommunityByName } from "@/app/(general)/lib/data";

const FormSchema = z.object({
    
    community_name: z
        .string()
        .min(2, "All communitys have to be 2 characters or over.")
        .max(20, "All communitys have a maximum of 20 characters."),
    description: z
        .string()
        .min(5, "Description must be at least 5 characters.")
        .max(50, "Description must be no more than 50 characters."),
    image_url: z
        .string()
        .url( { message: "Image must be a URL and start with `https://`" } )
        .min(1, "Your URL must not be empty.")

})

function ErrorMessage(props: { message: string }) {

    return <p className="dark:text-red-300 text-sm">{props.message}</p>;
    
}

export default function CreateCommunityForm() {

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean | null>(null);
    const [com_err, setCom_Err] = useState<boolean | null>(null);
    const [create_err, setCreate_Err] = useState<boolean | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        community_name: '',
        description: '',
        image_url: '',
      },
    });

    const { data: session } = useSession();

    if ( ! session ) {

        return (
            <Alert type={"error"} title={"Hmm..."} description={"Oops, something went wrong. Try logging in again."} />
        );

    } 

    const OnSubmit = async (values: z.infer<typeof FormSchema>) => {

      setIsLoading(true);
      setCom_Err(false);
      setSuccess(false);
  
      const existingCommunity = await getCommunityByName(values.community_name)
  
      if ( ! existingCommunity ) {
  
        const communityData = {

            community_name: values.community_name,
            description: values.description,
            image: values.image_url,
            admin_ids: [session.user.id]
  
        };
        
        try {

            const community = await createCommunity(communityData); 
            setIsLoading(false); 
            setSuccess(true);
             
        } catch ( error ) {

            setCom_Err(true);
            setIsLoading(false);

        }
        

      } else {
  
        setCom_Err(true);           
        setIsLoading(false);
  
      }
  
    };
  
    return (

        <form className="flex flex-col gap-2 bg-transparent rounded-lg !w-full" onSubmit={form.handleSubmit(OnSubmit)}>

            {success && (

                <Alert type="success" title="Community Created" description="Your community was created successfully." />

            )}

            {create_err && (

                <Alert type="error" title="Community Creation Failed" description="Sorry, your community could not be created. Please try again later." />

            )}

            {com_err && (
                <Alert type="error" title="Community Creation Failed" description="Sorry, a community with that name already exists." />
            )}

            <div className="flex gap-1 font-medium">Community Name<p className="text-[#fca5a5]">*</p></div>
            <input
                {...form.register('community_name')}
                placeholder="general"
                className={`generic_field ${form.formState.errors.community_name ? "errored" : ""}`}
            />

            {form.formState.errors.community_name && (

                // @ts-expect-error
                <ErrorMessage message={form.formState.errors.community_name.message} />

            )}

            {/* */}

            <div className="flex gap-1 font-medium">Description<p className="text-[#fca5a5]">*</p></div>
            <input
                {...form.register('description')}
                placeholder="Welcome to my community!"
                className={`generic_field ${form.formState.errors.description ? "errored" : ""}`}
            />

            {form.formState.errors.description && (

                // @ts-expect-error
                <ErrorMessage message={form.formState.errors.description.message} />

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

            <button type="submit" className="navlink-full !w-full sm:!w-fit justify-center min-w-[62px]">
                
                {/* eslint-disable-next-line @next/next/no-img-element*/}
                {isLoading ? <img src="/spinner.svg" alt="Submitting..." className="spinner"/>  : 'Create Community' }
                
            </button>

            {/* */}

            {error && <Alert type="alert" title="Creation Failed" description="Please check all details are correct." />}

        </form>

    );

}