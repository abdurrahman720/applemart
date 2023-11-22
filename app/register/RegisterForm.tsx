"use client"

import { useState } from "react";
import Heading from "../components/Heading";
import Input from "../components/inputs/Input";
import { error } from "console";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/Button";
import Link from "next/link";

const RegisterForm = () => {

    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({});

    const onSubmit:SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        console.log(data)
    }

    return ( 
        <>
            <Heading title="Sign Up for Applemart" />
            <hr className="bg-slate-300 w-full h-px" />
            <Input id="name" label="Name" disabled={isLoading} register={register} errors={errors} required />
            <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required />
            <Input id="password" label="Password" disabled={isLoading} register={register} errors={errors} required type="password" />
            <Button label={isLoading ? "Loading" : 'Sign Up'} onClick={handleSubmit(onSubmit)} />

            <p className="text-sm">
                Already Have an account? 
                <Link href="/login" className="underline ml-1">
                 Login
                </Link>
            </p>
        </>
     );
}
 
export default RegisterForm;