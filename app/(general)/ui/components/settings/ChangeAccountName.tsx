"use client";

import { startTransition, useEffect, useState } from "react";
import Modal from "../modal";
import { ChangeAccountUsername } from "@/app/(general)/lib/actions/user";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateUsernameSchema } from "@/app/(general)/lib/schemas";

export default function ChangeAccountName({ userID } : { userID: string }) {

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

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
            ChangeAccountUsername({ userID: values.userID, newUsername: values.username })
                .then((data) => {
                    // @ts-ignore
                    setError(data?.error);
                    // @ts-ignore
                    setSuccess(data?.success);
                })
        });

    };

    return (
        <Modal btnText={"Change Username"}>
            <Modal.Title>Change Your Username</Modal.Title>
            <Modal.Subtitle>If you want to change your username, you can do it below. Your ID is also shown below.</Modal.Subtitle>

            <Modal.Custom><input className={"generic_field w-full mb-2"} disabled={true} {...UpdateUsernameForm.register('userID')} placeholder={`UserID: ${userID}`}></input></Modal.Custom>
            <Modal.Custom>
                <input className={"generic_field w-full"} {...register('username')} placeholder={"New Username"}></input>
                
            </Modal.Custom>

            <Modal.Custom>{errors.username && <p className={`text-center w-full md:text-left text-gray-300 mt-2`}>{errors.username.message}</p>}</Modal.Custom>
            <Modal.Custom><p className={`${success ? "flex" : "hidden"} text-center w-full md:text-left text-gray-300 mt-2`}>{success}</p></Modal.Custom>

            <Modal.Button type={"navlink-full mt-2"} className={""} onClick={handleSubmit(onSubmit)}>Change your name</Modal.Button> 
        </Modal>
    );

}