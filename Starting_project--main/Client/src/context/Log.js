import {useState,useEffect,createContext} from 'react';

const LogContext = createContext();
const LogProvider=({children})=>{
    const [log,setLog]=useState(false);
    return (
        <>
        <LogContext.Provider value={[log,setLog]}>
            {children}
        </LogContext.Provider>
        </>
    )
}
export {LogContext,LogProvider};