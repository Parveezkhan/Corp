import Login from './Pages/Login'
import Signup from './Pages/Signup.js';
import Home from './Layout/Home.js'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Calculate from './calculator/calculate.js';
import Clouds_card_container from './Home_Components/Clouds_card_container.js';
import Side_Nav from  './Layout/Side_Nav.js'
import Service  from './Services/Service.js';
import {Account} from './users/Account.js';
import User_List from './users/user_list.js'
import Catalogs from './components/Catalogs.js'
import Catalog from './components/Catalog.js'
import PrivateRoute from './Privacy/PrivateRoute.js';

function App() {
 
  

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/local/server' element={<PrivateRoute><Calculate/></PrivateRoute>}/>
        <Route path='/services' element={<PrivateRoute><Clouds_card_container/></PrivateRoute>} />
        <Route path='/nav' element={<Side_Nav/>} />
        <Route path='/services/:cloud' element={<PrivateRoute><Service/></PrivateRoute>}/>
        <Route path='/account/create_user' element={<PrivateRoute><Account/></PrivateRoute>}></Route>
        <Route path='/account/user_list' element={<PrivateRoute><User_List/></PrivateRoute>}></Route>
        <Route path='/catalogs' element={<PrivateRoute><Catalogs/></PrivateRoute>}></Route>
        <Route path='/catalog' element={<PrivateRoute><Catalog/></PrivateRoute>}></Route>
      </Routes>
      
    </Router>
    
    </>
  );
}

export default App;
