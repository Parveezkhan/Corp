import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//import bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';


//import context
import { AuthProvider } from './context/auth';
import { LogProvider } from './context/Log';

//import toastify
import { ToastContainer } from 'react-toastify';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <AuthProvider>
   <LogProvider>
     <React.StrictMode>
    <App />
    <ToastContainer theme='dark'/>
  </React.StrictMode>
  </LogProvider>
  </AuthProvider>
 
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
