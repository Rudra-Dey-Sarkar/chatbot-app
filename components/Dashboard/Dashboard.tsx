"use client"
import React, { useState, useEffect, useContext } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { getCookie, deleteCookie } from 'cookies-next'
import { GlobalContext } from '../../GlobalContext/GlobalContext'
import Link from 'next/link'
import ViewCompanyDetails from '../ViewCompanyDetails/ViewCompanyDetails'


type UserDataTypes = [{
    name: string;
    email: string;
    password: string;
    verified: boolean;
}]
type CompanyDataType = [{
    _id: string,
    userId: string,
    name: string,
    title: string,
    description: string,
    url: string,
    logo: string,
    image: string,
}]

async function ViewCompany(userId: string, setCompanies: React.Dispatch<React.SetStateAction<any[] | CompanyDataType>>) {
    try {
        const response = await fetch("/api/view-company", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userId: userId })
        });

        const resData = await response.json();
        if (resData?.status === 200) {
            setCompanies(resData?.message);

        } else {
            console.log(resData?.message);
        }
    } catch (errors) {
        console.log("Cannot Proceed To View Company Data Due To :-", errors);
    }
}
async function RemoveCompany(Id: string, companies: any[] | CompanyDataType, setCompanies: React.Dispatch<React.SetStateAction<any[] | CompanyDataType>>) {
    try {
        const response = await fetch("/api/remove-company", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ Id: Id })
        });

        const resData = await response.json();
        if (resData?.status === 200) {
            setCompanies(companies.filter(company => company._id !== Id));
            toast.success("Company Removed");
        } else {
            toast.error("Cannot Remove Company");
            console.log(resData?.message);
        }
    } catch (errors) {
        toast.error("Cannot Remove Company");
        console.log("Cannot Proceed To Remove Company Data Due To :-", errors);
    }
}
function ControlLogout(setPresent: any, router: any) {
    deleteCookie("user");
    setPresent(false);
    router.push("/")
}
function Dashboard() {
    const router = useRouter();
    const [removeCompany, setRemoveCompany] = useState<boolean>(false);
    const { present, setPresent }: any = useContext(GlobalContext)
    const [user, setUser] = useState<UserDataTypes | undefined>(undefined);
    const [isRegistered, setIsRegistered] = useState<CompanyDataType[0] | undefined>(undefined);
    const [view, setView] = useState<boolean>(false);
    const [companies, setCompanies] = useState<CompanyDataType | any[]>([]);

    useEffect(() => {
        console.log("Render");
        const cookies = getCookie("user");
        if (cookies !== undefined && typeof cookies === "string") {
            const userCookies = JSON.parse(cookies);
            setUser(userCookies);
            ViewCompany(userCookies?.[0]?.email, setCompanies);
        } else {
            setCompanies([]);
            console.log("No User Details Available");
        }
    },[]);

    return (
        <div className='grid w-full h-[100vh]'>
            <div className='grid sm:text-[1.4rem] text-[1.2rem]'>
                <div className='w-full flex justify-between items-center bg-gray-100 px-3'>
                    <p className=' font-bold text-center underline w-fit h-fit'>Company Details :-</p>
                    <Link
                        href="/add-company"
                        className='border-4 border-gray-300 bg-green-500 w-fit h-fit px-2 py-1 rounded-full text-white font-bold'><p className='text-center'>Add Company +</p></Link>
                </div>
                {companies.length > 0 ?
                    <div>
                        {companies?.map((company: CompanyDataType[0], index: number) =>
                            <div key={index}
                                className='flex justify-between'>
                                <button
                                    className='p-2 border-b-2 border-gray-300 w-full text-[15px] text-start font-semibold hover:bg-gray-200'
                                    onClick={() => {
                                        setIsRegistered(company);
                                        setView(true);
                                    }}>{company.name}</button>
                                <button
                                    onClick={() => RemoveCompany(company?._id, companies, setCompanies)}
                                    className='p-2 border-b-2 border-gray-300 text-[15px] text-start font-semibold hover:bg-gray-200'><svg
                                        fill="#ff0000"
                                        id="Capa_1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                        width="25px"
                                        height="25px"
                                        viewBox="0 0 490.646 490.646"
                                        xmlSpace="preserve"
                                        stroke="#ff0000">
                                        <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                                        <g
                                            id="SVGRepo_tracerCarrier"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <g id="SVGRepo_iconCarrier">
                                            <g>
                                                <g>
                                                    <path d="M399.179,67.285l-74.794,0.033L324.356,0L166.214,0.066l0.029,67.318l-74.802,0.033l0.025,62.914h307.739L399.179,67.285z M198.28,32.11l94.03-0.041l0.017,35.262l-94.03,0.041L198.28,32.11z" />
                                                    <path d="M91.465,490.646h307.739V146.359H91.465V490.646z M317.461,193.372h16.028v250.259h-16.028V193.372L317.461,193.372z M237.321,193.372h16.028v250.259h-16.028V193.372L237.321,193.372z M157.18,193.372h16.028v250.259H157.18V193.372z" />
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                </button>
                            </div>
                        )}
                    </div>
                    :
                    <div>
                        <p className='font-semibold text-center'>No Companies present!</p>
                    </div>}
            </div>

            <button
                onClick={() => ControlLogout(setPresent, router)}
                className='border-4 border-gray-300 bg-red-500 w-fit h-fit px-5 py-2 rounded-full text-white font-bold m-auto'>Logout</button>

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

export default Dashboard