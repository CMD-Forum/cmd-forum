"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { ChangeAccountDescription as FuncChangeAccountDescription,ChangeAccountUsername, DeleteAccount } from "@/app/(general)/lib/actions/user";
import { DeleteAccountSchema, UpdateDescriptionSchema, UpdateUsernameSchema } from "@/app/(general)/lib/schemas";

import { inter } from "../../fonts";
import Dialog from "../dialog/dialog";

/**
 * Dialog prompt with an input to change the specified accounts username.
 * @param userID The ID of the user to change.
 * @param btnType The type of the button, can also take any `className`.
 */

export function ChangeAccountName({ userID } : { userID: string }) {

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const UpdateUsernameForm = useForm<z.infer<typeof UpdateUsernameSchema>>({

        resolver: zodResolver(UpdateUsernameSchema),
        defaultValues: {
            userID: userID,
            username: '',
        },

    });

    const { handleSubmit, register, formState: { errors } } = UpdateUsernameForm;

    const router = useRouter();

    const onSubmit = ( values: z.infer<typeof UpdateUsernameSchema> ) => {

        setError("");
        setSuccess("");

        startTransition(() => {
            setLoading(true)
            ChangeAccountUsername({ userID: values.userID, newUsername: values.username })
                // @ts-ignore
                .then((data) => {
                    // @ts-ignore
                    setError(data?.error);
                    // @ts-ignore
                    setSuccess(data?.success);
                    setLoading(false);
                    router.refresh();
                })
        });

    };

    return (
        <Dialog>
            <Dialog.Trigger><button className={"navlink-full"}>Change Username</button></Dialog.Trigger>
            <Dialog.Content>
                <Dialog.Title>Change Your Username</Dialog.Title>
                <Dialog.Subtitle>If you want to change your username, you can do it below.</Dialog.Subtitle>

                <input className={"generic_field w-full mb-2 hidden"} disabled={true} placeholder={userID}></input>
                <input className={"generic_field w-full mb-2"} {...register('username')} placeholder={"New Username"}></input>

                {errors.username && <p className={`text-center md:!text-left subtitle`}>{errors.username.message}</p>}
                {success && <p className={`text-center md:!text-left subtitle`}>{success}</p>}
                {error && <p className={`text-center md:!text-left subtitle`}>{error}</p>}

                <Dialog.ButtonContainer>
                    <button className={"navlink-full"} onClick={handleSubmit(onSubmit)}>Change your name</button>
                </Dialog.ButtonContainer>
            </Dialog.Content>
        </Dialog>
    );

}

/**
 * Dialog prompt with an input to change the specified accounts description.
 * @param userID The ID of the user to change.
 * @param btnType The type of the button, can also take any `className`.
 */

export function ChangeAccountDescription({ userID } : { userID: string }) {

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const UpdateDescriptionForm = useForm<z.infer<typeof UpdateDescriptionSchema>>({

        resolver: zodResolver(UpdateDescriptionSchema),
        defaultValues: {
            userID: userID,
            description: '',
        },

    });

    // eslint-disable-next-line no-unused-vars
    const { handleSubmit, register, formState: { errors } } = UpdateDescriptionForm;

    const router = useRouter();

    const onSubmit = ( values: z.infer<typeof UpdateDescriptionSchema> ) => {

        setError("");
        setSuccess("");

        startTransition(() => {
            setLoading(true)
            FuncChangeAccountDescription({ userID: values.userID, description: values.description })
                // @ts-ignore
                .then((data) => {
                    // @ts-ignore
                    setError(data?.error);
                    // @ts-ignore
                    setSuccess(data?.success);
                    setLoading(false);
                    router.refresh();
                })
        });

    };

    return (
        <Dialog>
            <Dialog.Trigger><button className={"navlink-full"}>Change Description</button></Dialog.Trigger>
            <Dialog.Content>
                <Dialog.Title>Change Your Description</Dialog.Title>
                <Dialog.Subtitle>If you want to change your description, you can do it below.</Dialog.Subtitle>

                <input className={"generic_field w-full mb-2 hidden"} {...UpdateDescriptionForm.register('userID')} disabled={true} placeholder={userID}></input>
                <input className={"generic_field w-full mb-2"} {...UpdateDescriptionForm.register('description')} placeholder={"New Description"}></input>

                {UpdateDescriptionForm.formState.errors.description && <p className={`text-center md:!text-left subtitle`}>{UpdateDescriptionForm.formState.errors.description.message}</p>}
                {success && <p className={`text-center md:!text-left subtitle`}>{success}</p>}
                {error && <p className={`text-center md:!text-left subtitle`}>{error}</p>}
                <Dialog.ButtonContainer>
                    <button className="navlink-full" onClick={handleSubmit(onSubmit)}>Change Description</button>    
                </Dialog.ButtonContainer>
            </Dialog.Content>
        </Dialog>
    );
}

/**
 * Dialog prompt that asks if the user wants to delete their account.
 * @param userID The ID of the user to change.
 * @param btnType The type of the button, can also take any `className`.
 */

export function DeleteAccountDialog({ userID, username } : { userID: string, username: string }) {

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const DeleteAccountForm = useForm<z.infer<typeof DeleteAccountSchema>>({

        resolver: zodResolver(UpdateUsernameSchema),
        defaultValues: {
            userID: userID,
            username: username,
            confirmUsername: '',
        },

    });

    const { handleSubmit, register, formState: { errors } } = DeleteAccountForm;

    const onSubmit = ( values: z.infer<typeof DeleteAccountSchema> ) => {

        setError("Please Wait...");
        setSuccess("");

        startTransition(() => {
            setLoading(true)
            DeleteAccount({ userID: values.userID })
                .then((data) => {
                    if ( data.error ) {
                        setError(data?.error);
                    }
                    if ( data.success ) {
                        setSuccess(data?.success);    
                    }
                    setLoading(false);
                })
        });

    };

    return (
        <Dialog>
            <Dialog.Trigger><button className={"navlink-destructive"}>Delete Account</button></Dialog.Trigger>
            <Dialog.Content>
                <Dialog.Title>Delete Your Account</Dialog.Title>
                <Dialog.Subtitle>If you want to delete your account, you can do it below. Type <code className={`bg-black px-2 py-1 rounded border-1 border-border text-sm ${inter.className}`}>{username}</code> below to confirm your decision.</Dialog.Subtitle>

                <input className={"generic_field w-full mb-2 hidden"} disabled={true} placeholder={userID}></input>
                <input className={"generic_field w-full mb-2 hidden"} disabled={true} {...register('username')} placeholder={username}></input>
                <input className={"generic_field w-full mb-4"} {...register('confirmUsername')} placeholder={"johndoe"}></input>

                {errors.username && <p className={`text-center w-full md:text-left text-gray-300`}>{errors.username.message}</p>}
                <p className={`${success ? "flex" : "hidden"} text-center w-full md:text-left text-gray-300`}>{success}</p>
                <p className={`${error ? "flex" : "hidden"} text-center w-full md:text-left text-gray-300`}>{error}</p>

                <Dialog.ButtonContainer>
                    <button className={"navlink-destructive"} onClick={handleSubmit(onSubmit)}>Delete your account</button>
                </Dialog.ButtonContainer>                     
            </Dialog.Content>
        </Dialog>
    );

}