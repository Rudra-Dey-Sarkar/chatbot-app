"use client"
import React, { useEffect, useState } from 'react'
import LogReg from '../LogReg/LogReg';


function ControlLogReg(logReg: boolean, setLogReg: React.Dispatch<React.SetStateAction<boolean>>) {
    if (logReg === false) {
        setLogReg(true);
    } else {
        setLogReg(false);
    }
}

function Main() {
    const [logReg, setLogReg] = useState<boolean>(false);
    return (
        <div className='grid w-full h-[100vh] justify-center items-center'>
            {logReg === true &&
                <div 
                className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'
                onClick={()=>setLogReg(false)}>
                    <div
                    className='rounded-md shadow-lg'
                    onClick={(e)=>e.stopPropagation()}>
                        <LogReg setLogReg={setLogReg} />
                    </div>
                </div>
            }
            <button
                onClick={() => ControlLogReg(logReg, setLogReg)}
                className='bg-green-100 font-semibold py-1 px-2 rounded-[5px] border-2 border-gray-300 text-gray-600'>Login/Register</button>
        </div>
    )
}

export default Main