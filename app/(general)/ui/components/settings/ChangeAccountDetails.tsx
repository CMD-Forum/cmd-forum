"use client";

import { startTransition, useState } from "react";
import Modal from "../modal";
import { ChangeAccountUsername } from "@/app/(general)/lib/actions/user";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateUsernameSchema } from "@/app/(general)/lib/schemas";

/**
 * Modal prompt with an input to change the specified accounts username.
 * @param userID The ID of the user to change.
 * @param btnType The type of the button, can also take any `className`.
 */

export default function ChangeAccountName({ userID, btnType = "navlink-full" } : { userID: string, btnType?: string }) {

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
                })
        });

    };

    return (
        <Modal btnText={"Change Username"} btnType={btnType}>
            <Modal.Title>Change Your Username</Modal.Title>
            <Modal.Subtitle>If you want to change your username, you can do it below. Your ID is also shown below.</Modal.Subtitle>

            <Modal.Custom>
                <input className={"generic_field w-full mb-2"} disabled={true} {...UpdateUsernameForm.register('userID')} placeholder={`UserID: ${userID}`}></input>
                <input className={"generic_field w-full mb-4"} {...register('username')} placeholder={"New Username"}></input>
            </Modal.Custom>

            <Modal.Custom>{errors.username && <p className={`text-center w-full md:text-left text-gray-300`}>{errors.username.message}</p>}</Modal.Custom>
            <Modal.Custom><p className={`${success ? "flex" : "hidden"} text-center w-full md:text-left text-gray-300`}>{success}</p></Modal.Custom>
            <Modal.Custom><p className={`${error ? "flex" : "hidden"} text-center w-full md:text-left text-gray-300`}>{error}</p></Modal.Custom>

            <Modal.Button type={"navlink-full"} loadingVariable={loading} className={""} onClick={handleSubmit(onSubmit)}>Change your name</Modal.Button> 
        </Modal>
    );

}