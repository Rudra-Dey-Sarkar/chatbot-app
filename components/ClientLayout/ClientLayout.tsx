"use client"
import React,{ useEffect, useContext} from 'react'
import { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { getCookie } from 'cookies-next'
import { GlobalContext } from '../../GlobalContext/GlobalContext'


function ClientLayout({ children }: { children: React.ReactNode }) {
  const {present, setPresent}:any = useContext(GlobalContext)
  const router = useRouter();

  useEffect(()=>{
    const cookies = getCookie("user");
    if(cookies!==undefined && typeof cookies==="string"){
      setPresent(true);
      router.push("/dashboard");   
    }else{
      setPresent(false);
      console.log("No User Details Available");
    }
  },[present]);

  return (
    <div className='w-full h-[100vh]'>
      <Toaster/>
      {children}
    </div>
  )
}

export default ClientLayout