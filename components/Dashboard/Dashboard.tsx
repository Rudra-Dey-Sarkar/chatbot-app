"use client"
import React, { useState, useEffect, useContext } from 'react'
import { Toaster } from 'react-hot-toast'
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
    userId: string,
    name: string,
    url: string,
    description: string,
    icon: string,
    image: string,
    provider: string,
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
function ControlLogout(setPresent: any, router: any) {
    deleteCookie("user");
    setPresent(false);
    router.push("/")
}

function Dashboard() {
    const { present, setPresent }: any = useContext(GlobalContext)
    const [user, setUser] = useState<UserDataTypes | undefined>(undefined);
    const [isRegistered, setIsRegistered] = useState<CompanyDataType[0] | undefined>(undefined);
    const [view, setView] = useState<boolean>(false);
    const [companies, setCompanies] = useState<CompanyDataType | any[]>([]);

    const router = useRouter();

    useEffect(() => {
        const cookies = getCookie("user");
        if (cookies !== undefined && typeof cookies === "string") {
            const userCookies = JSON.parse(cookies);
            setUser(userCookies);
            ViewCompany(userCookies?.[0]?.email, setCompanies);
        } else {
            console.log("No User Details Available");
        }
    }, []);

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
                            <div key={index}>
                                <button
                                    className='p-2 border-b-2 border-gray-300 w-full text-start font-semibold hover:bg-gray-200'
                                    onClick={() => {
                                        setIsRegistered(company);
                                        setView(true);
                                    }}>{company.name}</button>
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