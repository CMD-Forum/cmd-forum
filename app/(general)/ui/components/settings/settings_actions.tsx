"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { ChangeAccountDescription as FuncChangeAccountDescription,ChangeAccountUsername, DeleteAccount } from "@/app/(general)/lib/actions/user";
import { DeleteAccountSchema, UpdateDescriptionSchema, UpdateUsernameSchema } from "@/app/(general)/lib/schemas";

import { inter } from "../../fonts";
import Modal from "../modal";

/**
 * Modal prompt with an input to change the specified accounts username.
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
        <Modal closeBtn={true} openBtn={true} openBtnComponent={<button className={"navlink-full"}>Change Username</button>}>
            <Modal.Title>Change Your Username</Modal.Title>
            <Modal.Subtitle>If you want to change your username, you can do it below.</Modal.Subtitle>

            <Modal.Custom>
                <input className={"generic_field w-full mb-2 hidden"} disabled={true} placeholder={userID}></input>
                <input className={"generic_field w-full mb-2"} {...register('username')} placeholder={"New Username"}></input>
            </Modal.Custom>

            <Modal.Custom>{errors.username && <p className={`text-center md:!text-left subtitle`}>{errors.username.message}</p>}</Modal.Custom>
            <Modal.Custom>{success && <p className={`text-center md:!text-left subtitle`}>{success}</p>}</Modal.Custom>
            <Modal.Custom>{error && <p className={`text-center md:!text-left subtitle`}>{error}</p>}</Modal.Custom>

            <Modal.Button type={"navlink-full"} loadingVariable={loading} className={""} onClick={handleSubmit(onSubmit)} spinnerColor={"black"}>Change your name</Modal.Button> 
        </Modal>
    );

}

/**
 * Modal prompt with an input to change the specified accounts description.
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
        <Modal 
            closeBtn={true} 
            openBtn={true} 
            openBtnComponent={<button className={"navlink-full"}>Change Description</button>}
        >
            <Modal.Title>Change Your Description</Modal.Title>
            <Modal.Subtitle>If you want to change your description, you can do it below.</Modal.Subtitle>

            <Modal.Custom>
                <input className={"generic_field w-full mb-2 hidden"} {...UpdateDescriptionForm.register('userID')} disabled={true} placeholder={userID}></input>
                <input className={"generic_field w-full mb-2"} {...UpdateDescriptionForm.register('description')} placeholder={"New Description"}></input>
            </Modal.Custom>

            <Modal.Custom>{UpdateDescriptionForm.formState.errors.description && <p className={`text-center md:!text-left subtitle`}>{UpdateDescriptionForm.formState.errors.description.message}</p>}</Modal.Custom>
            <Modal.Custom>{success && <p className={`text-center md:!text-left subtitle`}>{success}</p>}</Modal.Custom>
            <Modal.Custom>{error && <p className={`text-center md:!text-left subtitle`}>{error}</p>}</Modal.Custom>

            <Modal.Button type="navlink-full" loadingVariable={loading} spinnerColor="black" onClick={handleSubmit(onSubmit)}>Change Description</Modal.Button> 
        </Modal>            

    );

}

/**
 * Modal prompt that asks if the user wants to delete their account.
 * @param userID The ID of the user to change.
 * @param btnType The type of the button, can also take any `className`.
 */

export function DeleteAccountModal({ userID, username } : { userID: string, username: string }) {

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
        <Modal closeBtn={true} openBtn={true} openBtnComponent={<button className={"navlink-destructive"}>Delete Account</button>}>
            <Modal.Title>Delete Your Account</Modal.Title>
            <Modal.Subtitle>If you want to delete your account, you can do it below. Type <code className={`bg-black px-2 py-1 rounded border-1 border-border text-sm ${inter.className}`}>{username}</code> below to confirm your decision.</Modal.Subtitle>

            <Modal.Custom>
                <input className={"generic_field w-full mb-2 hidden"} disabled={true} placeholder={userID}></input>
                <input className={"generic_field w-full mb-2 hidden"} disabled={true} {...register('username')} placeholder={username}></input>
                <input className={"generic_field w-full mb-4"} {...register('confirmUsername')} placeholder={"johndoe"}></input>
            </Modal.Custom>

            <Modal.Custom>{errors.username && <p className={`text-center w-full md:text-left text-gray-300`}>{errors.username.message}</p>}</Modal.Custom>
            <Modal.Custom><p className={`${success ? "flex" : "hidden"} text-center w-full md:text-left text-gray-300`}>{success}</p></Modal.Custom>
            <Modal.Custom><p className={`${error ? "flex" : "hidden"} text-center w-full md:text-left text-gray-300`}>{error}</p></Modal.Custom>

            <Modal.Button type={"navlink-destructive"} loadingVariable={loading} className={""} onClick={handleSubmit(onSubmit)} spinnerColor="white">Delete your account</Modal.Button> 
        </Modal>
    );

}