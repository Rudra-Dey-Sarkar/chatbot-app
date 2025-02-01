"use client"
import { getCookie } from 'cookies-next';
import React, { useEffect, useState } from 'react'
import { useForm, UseFormGetValues, UseFormSetValue } from 'react-hook-form'
import toast from 'react-hot-toast';
import ViewCompanyDetails from '../ViewCompanyDetails/ViewCompanyDetails';
import { useRouter } from 'next/navigation';

type CompanyDataType = [{
    userId: string,
    name: string,
    url: string,
    description: string,
    icon: string,
    image: string,
    provider: string,
}]
async function Scrap(getValues: UseFormGetValues<CompanyDataType[0]>, setValue: UseFormSetValue<CompanyDataType[0]>, setDescription: React.Dispatch<React.SetStateAction<boolean>>) {
    setDescription(true);
    const url = getValues("url");
    try {
        const response = await fetch('/api/scrap', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url: url })
        })
        const data = await response.json();
        if (data?.status === 200) {
            setValue("description", data?.message?.description);
            setValue("image", data?.message?.image);
            setValue("icon", data?.message?.icon);
            setValue("provider", data?.message?.provider);
        } else {
            console.log(data?.message);
        }
        setDescription(false);
    } catch (error) {
        console.log("Cannot send the data due to :-", error);
        setDescription(false);
    }
}
async function RegisterCompany(data: CompanyDataType[0], setIsRegistered: React.Dispatch<React.SetStateAction<CompanyDataType[0] | undefined>>, setProgress: React.Dispatch<React.SetStateAction<boolean>>) {
    try {
        const response = await fetch("/api/register-company", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const resData = await response.json();
        if (resData?.status === 200) {
            setIsRegistered(resData?.message?.[0]);
            toast.success("Company Registered Successfully");
            window.setTimeout(()=>{
                setProgress(true);
                }, 10000)
        } else {
            toast.error("Cannot Register Company");
            console.log(resData?.message);
        }
    } catch (errors) {
        console.log("Cannot Proceed To Register User Due To :-", errors);
        toast.error("Cannot Register Company");
    }
}

function AddCompany() {
    const router = useRouter();
    const [description, setDescription] = useState<boolean>(false);
    const [isRegistered, setIsRegistered] = useState<CompanyDataType[0] | undefined>(undefined);
    const [progress, setProgress] = useState<boolean>(false);
    const [view, setView] = useState<boolean>(false);

    useEffect(() => {
        const cookies = getCookie("user");
        if (cookies !== undefined && typeof cookies === "string") {
            const userCookies = JSON.parse(cookies);
            setValue("userId", userCookies?.[0]?.email);
        } else {
            console.log("No User Details Available");
        }
    }, []);

    const form = useForm<CompanyDataType[0]>({
        defaultValues: {
            userId: "",
            name: "",
            url: "",
            description: "",
            icon: "",
            image: "",
            provider: "",
        }
    });

    const { register, handleSubmit, getValues, formState: { errors }, setValue } = form;
    return (
        <div className='flex w-full h-[100vh] justify-center items-center'>
            {isRegistered === undefined ?
                <form
                    onSubmit={handleSubmit((data) => RegisterCompany(data, setIsRegistered, setProgress) )}
                    className='grid gap-y-2 w-fit h-fit border-2 border-gray-300 p-3 rounded-[10px] m-auto'>
                    <label htmlFor="email">Enter Company Name :-</label>
                    <input
                        type="name"
                        {...register('name', { required: true })}
                        className='border-2 border-gray-300 p-1 rounded-[5px]' />
                    {errors?.name && <p className='text-[12px] text-red-500'>Company Name is required</p>}


                    <label htmlFor="email">Enter Company URL :-</label>
                    <input
                        type="text"
                        {...register('url', { required: true })}
                        className='border-2 border-gray-300 p-1 rounded-[5px]' />
                    {errors?.url && <p className='text-[12px] text-red-500'>Company URL is required</p>}

                    <label htmlFor="url">Enter Company Description :-</label>
                    <div className='flex gap-x-2'>
                        <input
                            type="text"
                            disabled={description === true}
                            {...register('description', { required: true })}
                            className={`border-2 border-gray-300 p-1 rounded-[5px] ${description === true ? "bg-gray-300" : ""}`} />
                        <button
                            disabled={description === true}
                            onClick={() => Scrap(getValues, setValue, setDescription)}
                            className={`border-2 border-gray-300 font-semibold p-1 rounded-[5px] ${description === true ? "bg-gray-300" : ""}`}>Auto Fill</button>
                    </div>
                    {errors?.description && <p className='text-[12px] text-red-500'>Company Description is required</p>}

                    <button
                        type='submit'
                        className='w-fit border-2 border-gray-600 p-1 m-auto rounded-[5px] bg-gray-300 text-gray-600 font-semibold'>Register Company Details</button>
                </form>
                :
                <div className='grid border-2 border-gray-500 gap-y-2 w-fit h-fit p-5 rounded-[10px] '>
                    <p className='text-[25px] font-bold underline'>Chatbot Training</p>
                    <p className='text-[20px] font-semibold'>Detected 2 Pages !</p>
                    <p className={`font-semibold text-red-500 ${progress === false ? "animate-pulse animate-alternate" : ""} `}>Scraping Page Data In Progress</p>
                    {progress === false ? <button
                        className={`border-4 border-gray-500 p-3 w-full rounded-[10px] font-semibold hover:bg-gray-200`}>Page 1 Data is Scraping</button> : <p
                            className="font-semibold">0 Pages</p>}
                    <p className='font-semibold text-green-500 '>Scraped Data Page Successfully</p>
                    <div className='grid gap-y-2'>
                        <button
                            className={`border-4 border-gray-500 p-3 w-full rounded-[10px] font-semibold hover:bg-gray-200`}
                            onClick={() => setView(true)}>View Page 1 Data </button>
                        {progress === true && <button
                            className={`border-4 border-gray-500 p-3 w-full rounded-[10px] font-semibold hover:bg-gray-200`}
                            onClick={() => setView(true)}>View Page 2 Data</button>}
                    </div>
                    <button 
                    className='border-4 border-gray-300 bg-green-300 p-2 rounded-full font-semibold m-auto text-gray-700'
                    onClick={()=>router.push("/dashboard")}>Go To Dashboard</button>
                </div>
            }
            {view === true &&
                <div
                    className='fixed inset-0 flex items-end justify-center bg-black bg-opacity-50 z-50'
                    onClick={() => setView(false)}>
                    <div
                        className='rounded-md shadow-lg w-full'
                        onClick={(e) => e.stopPropagation()}>
                        <ViewCompanyDetails isRegistered={isRegistered} setView={setView} />
                    </div>
                </div>
            }
        </div>
    )
}

export default AddCompany