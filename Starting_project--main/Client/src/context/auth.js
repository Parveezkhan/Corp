import React from 'react'
import { useState , createContext, useContext ,useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext();
const AuthProvider = ({children}) => {
    const [auth,setAuth]=useState({
        user:null,
        token:"",
        role:"",
    })

    //default axios
   axios.defaults.headers.common["Authorization"] =auth?.token;
  useEffect(()=>{
    const data = localStorage.getItem('auth');
    if(data){
        const parseData= JSON.parse(data);
        setAuth({
            ...auth,
            user:parseData.user,
            token:parseData.token,
            role:parseData.role,
        })
    }
  },[]);
  return (
    <>
    <AuthContext.Provider value={[auth,setAuth]}>
      {children}
    </AuthContext.Provider>
    </>
  )
}

export  {AuthContext,AuthProvider};