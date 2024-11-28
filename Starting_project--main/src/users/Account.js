import React from 'react'

//import components
import Side_Nav from '../Layout/Side_Nav' 
import Create_User from './create_user'

//import css
import '../styles/Account.css'
import { Container } from 'react-bootstrap';

export const Account = () => {
  return (
  <>
  <Side_Nav/>
  <div className='container2 '> 
    <div className='container-fluid p-2 '>
      <Create_User/>
    </div>
  </div>
  </>
    
  
  )
}
