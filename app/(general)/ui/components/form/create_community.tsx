"use client";

import React, { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod" // Form Validation
import Alert, { AlertTitle } from "../new_alert";
import { useSession } from "next-auth/react";
import { createCommunity, createUserMembershipRecord, getCommunityByName } from "@/app/(general)/lib/data";
import { CreateCommunitySchema } from "@/app/(general)/lib/schemas";

function ErrorMessage(props: { message: string }) {
    return <p className="dark:text-red-300 text-sm">{props.message}</p>;
}

export default function CreateCommunityForm() {

    const [error, setError] = useState<string | null>(null);
    const [errorTitle, setErrorTitle] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof CreateCommunitySchema>>({
      resolver: zodResolver(CreateCommunitySchema),
      defaultValues: {
        name: '',
        description: '',
        image_url: '',
      },
    });

    const { data: session } = useSession();

    if ( ! session ) {
        return (
            <Alert type={"error"}>
                <AlertTitle>Sorry, this page couldn&apos;t be displayed.</AlertTitle>
            </Alert>
        );
    } 

    const OnSubmit = async (values: z.infer<typeof CreateCommunitySchema>) => {

      setIsLoading(true);
      setError(null);
      setSuccess(false);
  
      const existingCommunity = await getCommunityByName(values.name);
  
      if ( ! existingCommunity ) {
  
        const communityData = {
            name: values.name,
            description: values.description,
            image: values.image_url,
            admin_ids: session.user.id ? [session.user.id] : [""]
        };
        
        try {
            const community = await createCommunity(communityData); 
            console.log(community.id);
            try {
                if ( session.user.id ) {
                    const newMembershipRecord = await createUserMembershipRecord({ userID: session.user.id, communityID: community.id });    
                } else {
                    setError("Sorry, we're having issues getting your account information. Try logging out and in again.")
                }
            } catch ( error ) {
                console.error(error);
            }
            setIsLoading(false); 
            setSuccess(true);
        } catch ( error ) {
            setIsLoading(false);
            setError("Something went wrong, please try again later.");
        }
      } else {
        setIsLoading(false);
        setError("Looks like that name has been taken.");
      }
    };
  
    return (

        <form className="flex flex-col gap-2 bg-transparent rounded-lg !w-full" onSubmit={form.handleSubmit(OnSubmit)}>

            {success && (
                <Alert type="success">
                    <AlertTitle>Community was successfully created.</AlertTitle>
                </Alert>
            )}

            {error && (
                // @ts-ignore
                <Alert type="error">
                    <AlertTitle>{error}</AlertTitle>
                </Alert>
            )}

            <div className="flex gap-1 font-medium">Community Name<p className="text-[#fca5a5]">*</p></div>
            <input
                {...form.register('name')}
                placeholder="general"
                className={`generic_field ${form.formState.errors.name ? "errored" : ""}`}
            />

            {form.formState.errors.name && (

                // @ts-expect-error
                <ErrorMessage message={form.formState.errors.name.message} />

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

            <div className="flex gap-1 font-medium">Image<p className="text-[#fca5a5]">*</p></div>
            <input
                {...form.register('image_url')}
                placeholder="https://domainimagesaretemporary.org/images/070524"
                className={`generic_field ${form.formState.errors.image_url ? "errored" : ""}`}
            />

            {form.formState.errors.image_url && (
                // @ts-ignore
                <ErrorMessage message={form.formState.errors.image_url.message} />
            )}

            {/* */}

            <button type="submit" className="navlink-full !w-full sm:!w-fit justify-center min-w-[62px]">
                {isLoading && <img src="/spinner_black.svg" alt="Submitting..." className="spinner"/> } 
                Create Community 
            </button>

        </form>

    );

}