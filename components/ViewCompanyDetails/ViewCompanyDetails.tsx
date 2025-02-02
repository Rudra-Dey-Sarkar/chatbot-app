"use client"
import { getCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

type CompanyDataType = [{
    userId: string,
    name: string,
    title: string,
    description: string,
    url: string,
    logo: string,
    image: string,
}]
type EmailDataType = {
    email: string
}

async function SendInstruction(to: EmailDataType) {
    const code = "Test Implementation Code"


    try {
        const response = await fetch("api/send-mail", {
            method: "POST",
            headers: {
                "Content-Type": "application-json"
            },
            body: JSON.stringify({
                to: to?.email,
                mail: code,
                subject: "Chatbot Integration Instructons"
            })
        })

        const data = await response.json();

        if (data?.status === 200) {
            toast.success("Instruction Send to " + to?.email);
        } else {
            toast.error("Cannot Send Instruction");
        }
    } catch (error) {
        console.log("Cannot proceed to send Instruction due to:-", error)
        toast.error("Cannot Send Instruction");
    }
}
function ControlTestIntegration(router: AppRouterInstance) {

    const cookies = getCookie("case");
    if (cookies !== undefined && typeof cookies === "string") {
        if (cookies === "1") {
            setCookie("case", "2");
            router.push("/test-integration/1")
        } else {
            setCookie("case", "1");
            router.push("/test-integration/2")
        }
    } else {
        setCookie("case", "1");
        router.push("/test-integration/1")
    }

}
function ControlMail(mail: boolean, setMail: React.Dispatch<React.SetStateAction<boolean>>) {
    if (mail === false) {
        setMail(true);
    } else {
        setMail(false);
    }
}
function ControlIntegrate(integrate: boolean, setIntegrate: React.Dispatch<React.SetStateAction<boolean>>) {
    if (integrate === false) {
        setIntegrate(true);
    } else {
        setIntegrate(false);
    }
}
function ViewCompanyDetails({ isRegistered, setView }: { isRegistered: CompanyDataType[0] | undefined, setView: React.Dispatch<React.SetStateAction<boolean>> }) {

    const router = useRouter();
    const [integrate, setIntegrate] = useState<boolean>(false);
    const [mail, setMail] = useState<boolean>(false);
    const form = useForm<EmailDataType>({
        defaultValues: {
            email: ""
        }
    })

    const { register, handleSubmit, formState: { errors } } = form;
    return (
        <div className='bg-white p-5 pb-2  rounded-[10px]'>
            <div className='pt-5'>
                <div className='flex gap-x-4 justify-between sm:items-center items-center border-b-2 border-gray-300 pb-2'>
                    <p className='text-[25px] font-bold underline'>Company Details :-</p>
                    <div className='sm:flex grid justify-center items-center gap-x-2 gap-y-1'>
                        <button onClick={() => {
                            setCookie("visit", isRegistered);
                            router.push(`/test-chatbot`)
                        }}
                            className='border-2 border-gray-300 p-2 font-semibold hover:bg-green-100'>Test Chatbot</button>

                        <div className='relative'>
                            <button
                                className='flex gap-x-1 border-2 border-gray-300 p-2 font-semibold hover:bg-green-100 justify-between items-center'
                                onClick={() => ControlIntegrate(integrate, setIntegrate)}>
                                <p>Integrate on your website</p>
                                <svg
                                    width="25px"
                                    height="25px"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`${integrate === false ? "rotate-0" : "rotate-180"}`}>
                                    <rect x={0} fill="none" width={24} height={24} />
                                    <g>
                                        <path d="M13 20V7.83l5.59 5.59L20 12l-8-8-8 8 1.41 1.41L11 7.83V20h2z" />
                                    </g>
                                </svg>
                            </button>
                            <div className={`absolute grid w-full bg-green-100 ${integrate === false ? "hidden" : "visible"}`}>
                                <button
                                    className='p-2 border-b-2 border-gray-300 w-full text-[14px] text-start font-semibold hover:bg-gray-200'
                                    onClick={() => router.push("/chatbot-integration")}
                                >Chatbot Integration Instructions</button>
                                <button
                                    className='p-2 border-b-2 border-gray-300 w-full text-[14px] text-start font-semibold hover:bg-gray-200 flex justify-between'
                                    onClick={() => ControlMail(mail, setMail)}>
                                    <p>Mail Instructions</p>
                                    <svg
                                        width="25px"
                                        height="25px"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={`${mail === false ? "rotate-0" : "rotate-180"}`}>
                                        <rect x={0} fill="none" width={24} height={24} />
                                        <g>
                                            <path d="M13 20V7.83l5.59 5.59L20 12l-8-8-8 8 1.41 1.41L11 7.83V20h2z" />
                                        </g>
                                    </svg>
                                </button>
                                <div>
                                    {mail === true &&
                                        <form
                                            onSubmit={handleSubmit((data) => SendInstruction(data))}
                                            className='p-3 grid gap-y-3'>
                                            <label htmlFor="email">Enter Email :-</label>
                                            <div className='grid gap-y-3'>
                                                <input
                                                    type="email"
                                                    {...register('email', { required: true })}
                                                    className='border-2 border-gray-300 p-1 rounded-[5px]'
                                                    placeholder='example@gmail.com' />
                                                {errors?.email && <p className='text-[12px] text-red-500'>Email is required</p>}
                                                <button
                                                    type='submit'
                                                    className='w-fit border-2 border-gray-600 p-1 m-auto rounded-[5px] bg-gray-300 text-gray-600 font-semibold'>Send Instructions</button>
                                            </div>
                                        </form>
                                    }
                                </div>
                            </div>
                        </div>

                        <button
                            className=' border-2 border-gray-300 p-2 font-semibold hover:bg-green-100'
                            onClick={() => ControlTestIntegration(router)}>Test Integration</button>

                    </div>
                    <button
                        onClick={() => setView(false)}
                        className='font-semibold text-red-500'>Close</button>
                </div>

                <div>
                    <img
                        src={isRegistered?.image !== "" ? isRegistered?.image : "#"}
                        alt="Company Image"
                        className='w-[200px] my-5' />
                    <p className='font-semibold'>Company Name :- {isRegistered?.name}</p>
                    <p className='font-semibold'>Company Title :- {isRegistered?.title}</p>
                    <p className='font-semibold'>Company Description :- {isRegistered?.description}</p>
                    <p className='font-semibold'>Company URL :- {isRegistered?.url}</p>
                    <p className='font-semibold'>Company Logo :- {isRegistered?.logo}</p>
                    <p className='font-semibold'>Company Image :- {isRegistered?.image}</p>
                </div>
            </div>

        </div>
    )
}

export default ViewCompanyDetails