"use client"
import React, { useState } from 'react'
import Login from '../Login/Login'
import Register from '../Register/Register'
import Verify from '../Verify/Verify'

function ControlLogReg(isRegistered: boolean, setIsRegistered: React.Dispatch<React.SetStateAction<boolean>>) {
    if (isRegistered === false) {
        setIsRegistered(true);
    } else {
        setIsRegistered(false);
    }
}

function LogReg({setLogReg}:{setLogReg: React.Dispatch<React.SetStateAction<boolean>>}) {
    const [isRegistered, setIsRegistered] = useState<boolean>(false);
    const [verified, setVerified] = useState<string>("");
    return (
        <div className='w-fit h-fit bg-white text-black p-5 rounded-[10px]'>
            {verified !== "" ?
                <div className='w-fit h-fit'>
                    <Verify verified={verified} setVerified={setVerified} />
                </div>
                : <div className='w-fit h-fit'>
                    {isRegistered === false ?
                        <div className='w-fit h-fit' >
                            <Login setVerified={setVerified} />
                            <p>You don't have an accound ? <button onClick={() => ControlLogReg(isRegistered, setIsRegistered)}>Register</button></p>
                        </div>
                        : <div className='w-fit h-fit'>
                            <Register setVerified={setVerified} setLogReg={setLogReg} />
                            <p>You already have an accound ? <button onClick={() => ControlLogReg(isRegistered, setIsRegistered)}>Login</button></p>
                        </div>}
                </div>
            }

        </div>
    )
}

export default LogReg