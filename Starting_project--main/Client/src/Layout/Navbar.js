import {Link} from 'react-router-dom';
import logo from "../images/Logo...png"

const Navbar=()=>{
   return (
    <navbar >
        <div className='border-bottom border-primary'>
    <div className="navbar-logo">
    <nav className="navbar navbar-light bg-light ">
    <Link to="/" class="navbar-brand mb-0 h1 " style={{width:'250px'}}>
    <img src={logo} className="d-inline-block align-top mx-2 "  alt='' style={{width:"100px",height:"50px"}}></img></Link>
    <div className="log-sin m-3">
        <Link to="/login" className="btn btn-primary mx-3 rounded">Login</Link>
        <Link to="/signup" className="btn btn-danger mx-3 rounded">Signup</Link>
    </div>
     </nav>
    </div>
    </div>
</navbar>
   )

}
export default Navbar;