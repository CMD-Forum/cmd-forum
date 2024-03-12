"use client";

import { startTransition, useState } from "react";
import Modal from "../modal";
import { ChangeAccountUsername, DeleteAccount, Func_ChangeAccountDescription } from "@/app/(general)/lib/actions/user";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DeleteAccountSchema, UpdateDescriptionSchema, UpdateUsernameSchema } from "@/app/(general)/lib/schemas";
import { inter } from "../../fonts";
import { useRouter } from "next/navigation";

/**
 * Modal prompt with an input to change the specified accounts username.
 * @param userID The ID of the user to change.
 * @param btnType The type of the button, can also take any `className`.
 */

export function ChangeAccountName({ userID, btnType = "navlink-full" } : { userID: string, btnType?: string }) {

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
        <Modal btnText={"Change Username"} btnType={btnType}>
            <Modal.Title>Change Your Username</Modal.Title>
            <Modal.Subtitle>If you want to change your username, you can do it below.</Modal.Subtitle>

            <Modal.Custom>
                <input className={"generic_field w-full mb-2 hidden"} disabled={true} placeholder={userID}></input>
                <input className={"generic_field w-full mb-4"} {...register('username')} placeholder={"New Username"}></input>
            </Modal.Custom>

            <Modal.Custom>{errors.username && <p className={`text-center w-full md:text-left text-gray-300`}>{errors.username.message}</p>}</Modal.Custom>
            <Modal.Custom><p className={`${success ? "flex" : "hidden"} text-center w-full md:text-left text-gray-300`}>{success}</p></Modal.Custom>
            <Modal.Custom><p className={`${error ? "flex" : "hidden"} text-center w-full md:text-left text-gray-300`}>{error}</p></Modal.Custom>

            <Modal.Button type={"navlink-full"} loadingVariable={loading} className={""} onClick={handleSubmit(onSubmit)}>Change your name</Modal.Button> 
        </Modal>
    );

}

/**
 * Modal prompt with an input to change the specified accounts description.
 * @param userID The ID of the user to change.
 * @param btnType The type of the button, can also take any `className`.
 */

export function ChangeAccountDescription({ userID, btnType = "navlink-full" } : { userID: string, btnType?: string }) {

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const UpdateDescriptionForm = useForm<z.infer<typeof UpdateDescriptionSchema>>({

        resolver: zodResolver(UpdateUsernameSchema),
        defaultValues: {
            userID: userID,
            description: '',
        },

    });

    const { handleSubmit, register, formState: { errors } } = UpdateDescriptionForm;

    const onSubmit = ( values: z.infer<typeof UpdateDescriptionSchema> ) => {

        console.log("submitted");

        setError("");
        setSuccess("");

        startTransition(() => {
            setLoading(true)
            Func_ChangeAccountDescription({ userID: values.userID, description: values.description })
                .then((data) => {
                    // @ts-ignore
                    setError(data?.error);
                    // @ts-ignore
                    setSuccess(data?.success);
                    setLoading(false);
                })
        });

    };

    return (
        <Modal btnText={"Change Description"} btnType={btnType}>
            <Modal.Title>Change Your Description</Modal.Title>
            <Modal.Subtitle>If you want to change your description, you can do it below.</Modal.Subtitle>

            <Modal.Custom>
                <input className={"generic_field w-full mb-2 hidden"} {...register('userID')} disabled={true} placeholder={userID}></input>
                <input className={"generic_field w-full mb-4"} {...register('description')} placeholder={"New Description"}></input>
            </Modal.Custom>

            <Modal.Custom>{errors.description && <p className={`text-center w-full md:text-left text-gray-300`}>{errors.description.message}</p>}</Modal.Custom>
            <Modal.Custom><p className={`${success ? "flex" : "hidden"} text-center w-full md:text-left text-gray-300`}>{success}</p></Modal.Custom>
            <Modal.Custom><p className={`${error ? "flex" : "hidden"} text-center w-full md:text-left text-gray-300`}>{error}</p></Modal.Custom>

            <Modal.Button type={"navlink-full"} loadingVariable={loading} className={""} onClick={handleSubmit(onSubmit)}>Change Description</Modal.Button> 
        </Modal>
    );

}

/**
 * Modal prompt that asks if the user wants to delete their account.
 * @param userID The ID of the user to change.
 * @param btnType The type of the button, can also take any `className`.
 */

export function DeleteAccountModal({ userID, username, btnType = "navlink-destructive" } : { userID: string, username: string, btnType?: string }) {

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const DeleteAccountForm = useForm<z.infer<typeof DeleteAccountSchema>>({

        resolver: zodResolver(UpdateUsernameSchema),
        defaultValues: {
            userID: userID,
            username: '',
            confirmUsername: '',
        },

    });

    const { handleSubmit, register, formState: { errors } } = DeleteAccountForm;

    const onSubmit = ( values: z.infer<typeof DeleteAccountSchema> ) => {

        setError("");
        setSuccess("");

        startTransition(() => {
            setLoading(true)
            DeleteAccount({ userID: values.userID })
                .then((data) => {
                    // @ts-ignore
                    setError(data?.error);
                    // @ts-ignore
                    setSuccess(data?.success);
                    setLoading(false);
                })
        });

    };

    return (
        <Modal btnText={"Delete Account"} btnType={btnType}>
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

            <Modal.Button type={"navlink-destructive"} loadingVariable={loading} className={""} onClick={handleSubmit(onSubmit)}>Delete your account</Modal.Button> 
        </Modal>
    );

}