
"use client"
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import {setCookie} from 'cookies-next'

type OtpDataType = {

    otp: string
}

async function SendOTP(verified: string, setOtpBox: React.Dispatch<React.SetStateAction<boolean>>) {
    try {
        const response = await fetch("api/send-otp", {
            method: "POST",
            headers: {
                "Content-Type": "application-json"
            },
            body: JSON.stringify({ to: verified })
        })

        const data = await response.json();

        if (data?.status === 200) {
            toast.success("OTP Send to " + verified);
            setOtpBox(true);
        } else {
            toast.error("Cannot Send OTP");
        }
    } catch (error) {
        console.log("Cannot proceed to send OTP due to:-", error)
        toast.error("Cannot Send OTP");
    }
}
async function ControlOTP(data:OtpDataType, router:any, verified:string){
    if(data.otp==="123"){
        const datas = {
            email:verified,
            verified:true
        }
        const response = await fetch("api/verify-user",{
            method:"PUT",
            headers:{
                "Content-Type":"application-json"
            },
            body: JSON.stringify(datas)

        })

        const resData = await response.json();

        if(resData.status===200){
            setCookie("user", resData.message);
            toast.success("Account Verified");
            router.push("/add-company");
        }else{
            toast.error("Cannot Verify Account");
        }
    }else{
        toast.error("Wrong OTP");
    }
}

function Verify({ verified, setVerified }: { verified: string, setVerified: React.Dispatch<React.SetStateAction<string>> }) {
    const router = useRouter();
    const [otpBox, setOtpBox] = useState<boolean>(false);
    const form = useForm<OtpDataType>({
        defaultValues: {
            otp: ""
        }
    });
    const { register, handleSubmit, formState: { errors } } = form;
    return (
        <div className='w-fit h-fit m-auto bg-white'>
            {otpBox === false ?
                <div className='grid gap-y-2 justify-center items-center w-fit h-fit m-auto'>
                    <p>Please verify your account, send OTP to this Email ID:- <strong>{verified}</strong></p>
                    <button 
                    onClick={() => SendOTP(verified, setOtpBox)}
                    className='w-fit border-2 border-gray-600 p-1 m-auto rounded-[5px] text-gray-600 font-semibold'>Send OTP</button>
                </div>
                :
                <div className='grid gap-y-2 justify-center items-center w-fit h-fit m-auto'>
                    <form 
                    onSubmit={handleSubmit((data) => ControlOTP(data, router, verified))}
                    className='grid w-fit h-fit gap-y-2 m-auto'>
                        <label htmlFor='otp'>Enter OTP</label>
                        <input
                            type="text"
                            {...register("otp", { required: true })}
                            className='border-2 border-gray-500 rounded-[5px] p-1' />
                        {errors?.otp && <p>OTP is required</p>}
                        <button 
                        type='submit'
                        className='w-fit border-2 border-gray-600 p-1 m-auto rounded-[5px] bg-gray-300 text-gray-600 font-semibold'>Submit</button>
                    </form>
                </div>
            }
        </div>
    )
}

export default Verify