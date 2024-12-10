import React from 'react'
import { Navigate , useLocation} from 'react-router-dom';

const PrivateRoute = ({children})=> {
    const isLoggedIn = localStorage.getItem('auth') !== null;
    const location = useLocation()
  
    return isLoggedIn ? (
      <>{children}</>
    ) : (
      <Navigate
        replace={true}
        to="/login"
        state={`${location.pathname}` }
      />
    )
  }

export default PrivateRoute