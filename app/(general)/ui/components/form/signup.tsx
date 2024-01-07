'use client';

import React, { useState } from "react";
import Link from "next/link";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod" // Form Validation
import { useZorm } from "react-zorm"; // Form Building
import { inter } from "../../fonts";
import GoogleSignInButton from "./oauth/GoogleSignInButton";
import MicrosoftSignInButton from "./oauth/MicrosoftSignInButton";
import { POST } from "@/app/(general)/api/account/createAccount/route";
import { useRouter } from "next/navigation";
import { AlertFailure, AlertSuccess, AlertWarning } from "@/app/(general)/ui/components/alert"

const FormSchema = z.

    object({

        username: z

            .string()
            .min(2, {

                message: "Your username must be at least 2 characters."

            })
            .max(20, {

                message: "Your username must be no longer than 20 characters."

            }),

        name: z
        
            .string()
            .min(2, {

                message: "Your name must be at least 2 characters."

            })
            .max(20, {
                
                message: "Your name must not be longer than 20 characters."
                
            }),

        email: z
        
            .string()
            .min(1, "Email is required.")
            .email("Your email must be in a valid format."),

        password: z
        
            .string()
            .min(1, "Password is required.")
            .min(8, "Password must have 8 characters"),

        confirmpassword: z
        
            .string()
            .min(1, "Please confirm your password.")

    })
    .refine((data) => data.password === data.confirmpassword, {

        path: ['confirmpassword'],
        message: "Passwords do not match."

    })

function ErrorMessage(props: { message: string }) {

    return <p className="dark:text-red-300 text-sm facebookTheme:text-[11px]">{props.message}</p>;
    
}

const SignupForm = () => {

    const [error, setError] = useState(null);

    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const zo = useZorm("signup", FormSchema, {

        onValidSubmit: async (e) => {

            e.preventDefault();

            setIsLoading(true);

            const response = await fetch('/api/account/createAccount', {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(e.data)
                
            })

            if (response.ok) {

                router.push('/login?success=true');
                setIsLoading(false);

            } else if (response.status === 409) {

                setError(null);
                setIsLoading(false);

            }    

        }

        

    });
    
    const disabled = zo.validation?.success === false;

    return ( 

        <form ref={zo.ref} className="flex flex-col gap-2 bg-zinc-950 px-10 py-10 rounded-lg facebookTheme:bg-white max-w-3xl ml-auto">

            <h2 className="text-xl font-semibold facebookTheme:font-bold facebookTheme:text-[15px]">Signup for CMD.</h2>

            <hr className="border-zinc-900 mt-1 mb-1 facebookTheme:border-[#b3b3b3] facebookTheme:mt-0"></hr>

            {/* */}

            {error && <AlertWarning title="Signup Failed" text={error} />}

            <Link href="/login" className="w-fit hover:underline text-gray-300">Have an account?</Link>

            <p className="dark:text-gray-300 text-sm p-0 m-0 facebookTheme:hidden" suppressHydrationWarning>
                
                Your username is unique, your name is not. 

                <div className="flex flex-row" suppressHydrationWarning>
                    It will appear like&nbsp;
                    <code className="flex gap-1 bg-zinc-800 px-2 w-fit rounded" suppressHydrationWarning>
                        <span className={`text-white ${inter.className}`} suppressHydrationWarning>name</span> 
                        <span className={`text-gray-500 ${inter.className}`} suppressHydrationWarning>@username</span>
                    </code>
                </div> 
                
            </p>

            

            <div className="flex gap-1 facebookTheme:text-[11px]">Name<p className="text-[#fca5a5]">*</p></div>
            <input
                type="text"
                name={zo.fields.name()}
                placeholder="John Doe"
                className={`generic_field ${zo.errors.name("errored")}`}
            />

            {zo.errors.name((e) => (

                <ErrorMessage message={e.message} />

            ))}

            {/* */}

            <div className="flex gap-1 facebookTheme:text-[11px]">Username<p className="text-[#fca5a5]">*</p></div>
            <input
                type="text"
                name={zo.fields.username()}
                placeholder="johndoe"
                className={`generic_field ${zo.errors.username("errored")}`}
            />

            {zo.errors.username((e) => (

                <ErrorMessage message={e.message} />

            ))}

            {/* */}

            <div className="flex gap-1 facebookTheme:text-[11px]">Email Address<p className="text-[#fca5a5]">*</p></div>
            <input
                type="email"
                name={zo.fields.email()}
                placeholder="johndoe@example.com"
                className={`generic_field ${zo.errors.email("errored")}`}
            />

            {zo.errors.email((e) => (

                <ErrorMessage message={e.message} />

            ))}

            {/* */}

            <div className="flex gap-1 facebookTheme:text-[11px]">Password<p className="text-[#fca5a5]">*</p></div>
            <input
                type="password"
                name={zo.fields.password()}
                placeholder="Password"
                className={`generic_field ${zo.errors.password("errored")}`}
            />

            {zo.errors.password((e) => (

                <ErrorMessage message={e.message} />

            ))}

            {/* */}

            <div className="flex gap-1 facebookTheme:text-[11px]">Confirm Password<p className="text-[#fca5a5]">*</p></div>
            <input
                type="password"
                name={zo.fields.confirmpassword()}
                placeholder="Confirm Password"
                className={`generic_field ${zo.errors.confirmpassword("errored")}`}
            />

            {zo.errors.confirmpassword((e) => (

                <ErrorMessage message={e.message} />

            ))}

            {/* */}

            <button disabled={disabled || isLoading} type="submit" className="navlink-full !w-full sm:!w-fit justify-center min-w-[62px]">

                {/* eslint-disable-next-line @next/next/no-img-element */}
                {isLoading ? <img src="/spinner.svg" alt="Loading..." className="spinner"/>  : 'Signup' }
            
            </button>

            <hr className="border-b-[1px] border-zinc-900 mb-2"></hr>

            <div className="flex flex-col gap-2 md:flex-row">
                
                <GoogleSignInButton>Login with Google</GoogleSignInButton>    
                <MicrosoftSignInButton>Login with Microsoft</MicrosoftSignInButton>  

            </div>
            

            {/* */}

            {/*<pre>Validation status: {JSON.stringify(zo.validation, null, 2)}</pre>*/}

        </form>
    
    );
    
}

export default SignupForm;