'use client';

import React, { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod" // Form Validation
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AlertSuccess, AlertWarning } from "../alert";
import { useSearchParams } from 'next/navigation'
import GoogleSignInButton from "./oauth/GoogleSignInButton";
import MicrosoftSignInButton from "./oauth/MicrosoftSignInButton";
import Alert from "../new_alert";

const FormSchema = z.object({

    email: z.string().min(1, "Email is required.").email("Your email must be in a valid format."),

    password: z.string().min(1, "Password is required.")

})

function ErrorMessage(props: { message: string }) {

    return <p className="dark:text-red-300 text-sm">{props.message}</p>;
    
}

const LoginForm = () => {

    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    const [isLoading, setIsLoading] = useState(false);

    const searchParams = useSearchParams();
    const success = searchParams.get('success')
    var ref = searchParams.get('ref')

    var showSuccess = false;

    if (success === "true") {

        showSuccess = true;

    }

    if ( ! ref || ref === "") {

        ref = "/"

    }

    const form = useForm<z.infer<typeof FormSchema>>({

        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: '',
            password: '',
        },

    });

    const OnSubmit = async (values: z.infer<typeof FormSchema>) => {

        setIsLoading(true);

        const signInData = await signIn('credentials', {

            email: values.email,
            password: values.password,
            redirect: false,

        });

        if (signInData?.error) {
            
            setError(signInData.error);
            setIsLoading(false);
            
        } else {

            setError(null);
            setIsLoading(false);
            //@ts-ignore
            window.location.replace(ref);

        }

    };

    return ( 

        <form className="flex flex-col gap-2 bg-zinc-950 px-10 py-10 rounded-lg facebookTheme:bg-white max-w-3xl sm:w-[505px] ml-auto" onSubmit={form.handleSubmit(OnSubmit)}>

            <h2 className="header">Login to CMD.</h2>

            <hr className="border-border facebookTheme:border-[#b3b3b3] mb-2 mt-2" /> 

            {/* */}

            {showSuccess ? (

                <Alert type='notice' title='Signup Success' description='Your account has been created, have fun!' />

            ): (

                <pre></pre>

            )}

            <Link href="/signup" className="w-fit hover:underline text-gray-300">Don&apos;t have an account?</Link>            

            {/* */}

            <div className="flex gap-1 facebookTheme:text-[11px] font-medium">Email<p className="text-[#fca5a5]">*</p></div>
            <input
                {...form.register('email')}
                placeholder="Email"
                className={`generic_field ${form.formState.errors.email ? "errored" : ""}`}
            />

            {form.formState.errors.email && (

                // @ts-expect-error
                <ErrorMessage message={form.formState.errors.email.message} />

            )}

            {/* */}

            <div className="flex gap-1 facebookTheme:text-[11px] font-medium">Password<p className="text-[#fca5a5]">*</p></div>
            <input
                type="password"
                {...form.register('password')}
                placeholder="Password"
                className={`generic_field ${form.formState.errors.email ? "errored" : ""}`}
            />

            {form.formState.errors.password && (

                // @ts-expect-error
                <ErrorMessage message={form.formState.errors.password.message} />

            )}

            {/* */}

            <button disabled={!form.formState.isValid || isLoading} type="submit" className="navlink-full !w-full sm:!w-[60px] h-[36px] justify-center min-w-[62px]">
                
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {isLoading ? <img src="/spinner.svg" alt="Loading..." className="spinner"/>  : 'Login' }
                
            </button>
            {/* */}

            {/*<pre>Validation status: {JSON.stringify(zo.validation, null, 2)}</pre>*/}

            {error && <AlertWarning title="Login Failure" text={error} />}

            <hr className="border-border mb-2"></hr>

            <div className="flex flex-col gap-2">
    
                <GoogleSignInButton>Login with Google</GoogleSignInButton>    
                <MicrosoftSignInButton>Login with Microsoft</MicrosoftSignInButton>  

            </div>

        </form>
    
    );
    
}

function SuspenseForm (props:any) {

    return (
        <Suspense>
            <LoginForm />
        </Suspense>
    );

}

export default SuspenseForm;