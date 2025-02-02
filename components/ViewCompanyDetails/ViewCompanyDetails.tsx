"use client"
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

type CompanyDataType = [{
    userId: string,
    name: string,
    title: string,
    description: string,
    url: string,
    logo: string,
    image: string,
}]
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

    return (
        <div className='bg-white p-5 pb-14 rounded-[10px]'>
            <div>
                <div className='flex gap-x-4 justify-between sm:items-center items-start border-b-2 border-gray-300 pb-2'>
                    <p className='text-[25px] font-bold underline'>Company Details :-</p>
                    <div className='sm:flex grid justify-center items-center gap-x-2 gap-y-1'>
                        <button onClick={() => {
                            setCookie("visit", isRegistered);
                            router.push(`/test-chatbot`)
                        }}
                        className='border-2 border-gray-300 p-2 font-semibold hover:bg-green-100'>Test Chatbot</button>

                        <div className='relative'>
                            <button
                                className='flex gap-x-1 border-2 border-gray-300 p-2 font-semibold hover:bg-green-100 justify-center items-center'
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
                            <div className={`absolute grid w-full bg-green-100 ${integrate===false ? "hidden":"visible"}`}>
                                <button className='p-2 border-b-2 border-gray-300 w-full text-[14px] text-start font-semibold hover:bg-gray-200'>Chatbot Integration Instructions</button>
                                <button className='p-2 border-b-2 border-gray-300 w-full text-[14px] text-start font-semibold hover:bg-gray-200'>Mail Instructions</button>
                            </div>
                        </div>

                        <button 
                        className=' border-2 border-gray-300 p-2 font-semibold hover:bg-green-100'>Test Integration</button>

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