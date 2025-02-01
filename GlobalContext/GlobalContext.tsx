"use client"
import React, {useState,createContext, useEffect} from 'react'

interface GlobalContextType {
    present: boolean;
    setPresent: React.Dispatch<React.SetStateAction<boolean>>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

function GlobalContextWrapper({children}: { children: React.ReactNode }) {
    const [present, setPresent] = useState<boolean>(false);

    useEffect(()=>{
        if(typeof window !=="undefined"){
            const savedPresent = localStorage.getItem("present")
            if(savedPresent){
                setPresent(JSON.parse(savedPresent));
            }
        }
    },[]);

  return (
    <GlobalContext.Provider value={{present, setPresent}}>
        {children}
    </GlobalContext.Provider>
  )
}

export {GlobalContextWrapper, GlobalContext}