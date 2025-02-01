"use client"
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation';


type UserDataTypes = [{
    name: string;
    email: string;
    password: string;
    verified: boolean;
}]
async function LoginUser(data: UserDataTypes[0], setIsActive: any, setVerified: React.Dispatch<React.SetStateAction<string>>, router:any) {
    if (data.email !== "" || data.password !== "") {
        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const resData = await response.json();
            if (resData?.status === 200) {
                setCookie("user", resData.message);
                router.push("/dashboard");
                toast.success("User Login Successfully");
            } else if (resData?.status === 201) {
                setVerified(resData?.message?.[0]?.email);
                toast.error("Please verify you account");
            } else {
                toast.error(resData?.message);
            }
        } catch (errors) {
            console.log("Cannot Proceed To Register User Due To :-", errors);
            toast.error("Cannot Register User");
        }
    } else {
        toast.error("Please Fill All The Fields");
    }
}


function Login({ setVerified }: { setVerified: React.Dispatch<React.SetStateAction<string>> }) {
    const router = useRouter();
    const [isActive, setIsActive] = useState<boolean>(false);
    const form = useForm<UserDataTypes[0]>({
        defaultValues: {
            email: "",
            password: "",
        }
    });
    const { register, handleSubmit, formState: { errors } } = form;

    return (
        <form
            onSubmit={handleSubmit((data) => LoginUser(data, setIsActive, setVerified, router))}
            className='grid gap-y-2 w-fit h-fit border-2 border-gray-300 p-3 rounded-[10px] m-auto'>

            <label htmlFor="email">Enter Email :-</label>
            <input
                type="email"
                {...register('email', { required: true })}
                className='border-2 border-gray-300 p-1 rounded-[5px]' />
            {errors?.email && <p className='text-[12px] text-red-500'>Email is required</p>}

            <label htmlFor="password">Enter Password :-</label>
            <input
                type="password"
                {...register('password', { required: true })}
                className='border-2 border-gray-300 p-1 rounded-[5px]' />
            {errors?.password && <p className='text-[12px] text-red-500'>Password is required</p>}

            <button
                type='submit'
                className='w-fit border-2 border-gray-600 p-1 m-auto rounded-[5px] bg-gray-300 text-gray-600 font-semibold'>Login</button>
        </form>
    )
}

export default Login