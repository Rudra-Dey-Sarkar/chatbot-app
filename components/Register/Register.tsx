"use client"
import { setCookie } from 'cookies-next';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';


type UserDataTypes = [{
    name: string;
    email: string;
    password: string;
    verified: boolean;
}]
async function RegisterUser(data: UserDataTypes[0], setIsActive: any, setVerified:React.Dispatch<React.SetStateAction<string>>) {
    if (data.name !== "" || data.email !== "" || data.password !== "") {
        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const resData = await response.json();
            if (resData?.status === 200) {
                setCookie("user", resData.message);
                setIsActive(true);
                toast.success("User Registered Successfully, Please Verify Your Account");
                setVerified(resData?.message?.[0]?.email);
            }else if(resData?.status === 201){
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

function Register({ setVerified, setLogReg }: { setVerified: React.Dispatch<React.SetStateAction<string>>, setLogReg: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [isActive, setIsActive] = useState<boolean>(false);
    const loader = require("@/app/loader.gif");
    const form = useForm<UserDataTypes[0]>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        }
    });

    const { register, handleSubmit, formState: { errors } } = form;
    return (
        <form
            onSubmit={handleSubmit((data) => RegisterUser(data, setIsActive, setVerified))}
            className='relative grid gap-y-2 w-fit h-fit border-2 border-gray-300 p-3 rounded-[10px] m-auto '>
            <div className='flex fixed inset-0 w-full h-full justify-center items-center bg-black bg-opacity-50 z-50'>
                <p className='text-[25px] text-white font-semibold'>Loading.....</p>
            </div>
            <label htmlFor="name">Enter Name :-</label>
            <input
                type="text"
                {...register('name', { required: true })}
                className='border-2 border-gray-300 p-1 rounded-[5px]' />
            {errors?.name && <p className='text-[12px] text-red-500'>Name is required</p>}

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
                className='w-fit border-2 border-gray-600 p-1 m-auto rounded-[5px] bg-gray-300 text-gray-600 font-semibold'>Register</button>
        </form>
    )
}

export default Register