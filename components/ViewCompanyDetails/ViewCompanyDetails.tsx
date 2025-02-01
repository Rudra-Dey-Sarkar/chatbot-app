"use client"
import React from 'react'

type CompanyDataType = [{
    userId: string,
    name: string,
    title: string,
    description: string,
    url: string,
    logo: string,
    image: string,
}]

function ViewCompanyDetails({ isRegistered, setView }: { isRegistered: CompanyDataType[0] | undefined, setView: React.Dispatch<React.SetStateAction<boolean>> }) {
    return (
        <div className='bg-white p-5 pb-14 rounded-[10px]'>
            <div>
                <div className='flex justify-between'>
                    <p className='text-[25px] font-bold underline'>Company Details :-</p>
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
                    <p className='font-semibold'>Company Provider :- {isRegistered?.title}</p>
                    <p className='font-semibold'>Company Description :- {isRegistered?.description}</p>
                    <p className='font-semibold'>Company URL :- {isRegistered?.url}</p>
                    <p className='font-semibold'>Company Icon :- {isRegistered?.logo}</p>
                    <p className='font-semibold'>Company Image :- {isRegistered?.image}</p>
                </div>
            </div>

        </div>
    )
}

export default ViewCompanyDetails