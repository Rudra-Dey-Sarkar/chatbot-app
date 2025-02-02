"use client"
import { useRouter } from 'next/navigation';
import React from 'react'

function TestIntegration({ caseId }: { caseId: string }) {
  const router = useRouter();
  if (caseId === "1") {
    return (
      <div className='flex w-full h-[100vh] bg-green-500 justify-center items-center'>
        <div className=' w-fit grid gap-y-10 justify-center items-center'>
          <p className='w-fit font-bold text-[2.5rem] text-white text-center'>Chatbot Integration Successfull 🎉</p>

          <div className='flex justify-center gap-x-5'>
            <button
              className='border-2 border-white p-2 text-white font-semibold hover:bg-gray-600'
              onClick={() => { router.push(`/dashboard`) }}>Explore Admin Panel</button>
            <button className='border-2 border-white p-2 text-white font-semibold hover:bg-gray-600'
              onClick={() => { router.push(`/dashboard`) }}>Start talking to your Chatbot</button>
            <button className='border-2 border-white p-2 text-white font-semibold hover:bg-gray-600'
              onClick={() => { router.push(`/dashboard`) }}>Share</button>
          </div>
        </div>
      </div>
    )
  } else {
    return (

    <div className='flex w-full h-[100vh] bg-red-500 justify-center items-center'>
      <div className=' w-fit grid gap-y-10 justify-center items-center'>
        <p className='w-fit font-bold text-[2.5rem] text-white text-center'>Chatbot Integration Failed 😔</p>

        <div className='flex justify-center gap-x-5'>
          <button
            className='border-2 border-white p-2 text-white font-semibold hover:bg-gray-600'
            onClick={() => { router.push(`/dashboard`) }}>Back To Dashboard</button>
        </div>
      </div>
    </div>
    );
  }
}

export default TestIntegration