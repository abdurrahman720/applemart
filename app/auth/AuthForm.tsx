"use client"

import { useCallback, useState } from "react";
import Heading from "../components/Heading";
import Input from "../components/inputs/Input";
import { error } from "console";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/Button";
import Link from "next/link";
import axios from "axios";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {

    const [variant, setVariant] = useState<Variant>("LOGIN");

    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({});

  const router = useRouter();

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

    const onSubmit:SubmitHandler<FieldValues> = (data) => {
      setIsLoading(true);
      console.log(data)
      
      if (variant === "REGISTER") {
        axios.post('/api/register', data).then(() => signIn('credentials', {
          ...data, redirect: false
        })).then((callback) => {
          if (callback?.ok) {
            router.push("/cart");
            router.refresh();
            toast.success("Logged In!")
          }
          if (callback?.error) {
            toast.error(callback.error)
          }
        })
       
          .catch(() => {
          toast.error("Something went wrong")
        }).finally(() => { 
          setIsLoading(false);
        })
      }

      if (variant === "LOGIN") {
        signIn('credentials', {
            ...data,
            redirect: false
        }).then((callback) => {

            if (callback?.error) {
              toast.error('Invalid Credentials')
            }
          if (callback?.ok && !callback?.error) {
            toast.success("Logged In!")
              router.push("/cart");
              router.refresh();
             
            }
        }).finally(() => {
          setIsLoading(false)
      })
    }

       
    }

    return ( 
        <>
            <Heading title={variant ==="LOGIN" ? "Login to AppleMart" : "Register for AppleMArt"} />
            <hr className="bg-slate-300 w-full h-px" />
        {variant === "REGISTER" &&  <Input id="name" label="Name" disabled={isLoading} register={register} errors={errors} required />}
            <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required />
            <Input id="password" label="Password" disabled={isLoading} register={register} errors={errors} required type="password" />
            <Button label={variant==="REGISTER" ? "Register" : 'Login'} disabled={isLoading} onClick={handleSubmit(onSubmit)} />
            {
                
}
            <p className="text-sm">
              {variant==="REGISTER" ? "Already have an account?" : "New to applemart?"}
                <span onClick={toggleVariant}  className="underline ml-1">
                {variant==="REGISTER" ? "Sign In" : "Sign Up?"}
                </span>
            </p>
        </>
     );
}
 
export default AuthForm;