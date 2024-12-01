import React, { useState,createContext } from 'react'


const editContext=createContext();
const EditUserContext = ({children}) => {

  const [edit,setEdit]=useState(false)
  return (
    <editContext.Provider value={{edit,setEdit}}>
        {children}
    </editContext.Provider>
  )
}

export  {EditUserContext,editContext};