
import React, { useContext, useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Side_Nav from "../Layout/Side_Nav";
import axios from 'axios';

//import css
import "../styles/user_list.css";

//import context
import {EditUserContext,editContext} from '../context/EditUserContext'

//collect new field

const User_list = (props) => {
  const context=useContext(editContext);

  const [fields, setFields] = useState([
    "#",
    "Admin For User",
    "First Name",
    "Last Name",
    "Email Address",
    "Country",
    "City/State",
    "Last Access",
    "Edit",
  ]);
  const [field, setField] = useState("");
  const [numUsers, setNumUsers] = useState("");
  const [adminUsername,setAdminUsername] = useState('');
  const [adminId , setAdminid] = useState();
  const [generatedUsers, setGeneratedUsers] = useState([]);
  

  const handleGetinputdata = (e) => {
    e.preventDefault();
    let searchvalue=(e.target.search_data.value).trim()
    setSearchQuery(searchvalue)
  };

  const [users,setUsers]=useState([
    {admin:"A1",firstName:"Mark",lastName:"otto",emailAddress:"@markotto",country:"India",city:"Bangalore",lastAccess:"1 day ago"},
    {admin:"A2",firstName:"Larry",lastName:"page",emailAddress:"@larrypage",country:"India",city:"Bangalore",lastAccess:"2 day ago"},
    {admin:"A3",firstName:"john",lastName:"mark",emailAddress:"@johnmark",country:"India",city:"Bangalore",lastAccess:"3 day ago"}
  
])

  const [searchQuery,setSearchQuery]=useState("");

  // Filter options based on the search query
  let filteredOptions = users;

   filteredOptions = users.filter((option) =>
    option.firstName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  //handeldelete
  const handleDelete=(e,name)=>{
    e.preventDefault();
    setUsers((prevItems)=>prevItems.filter(item=>item.firstName!==name))
    
  }

  //handle edit
  const navigate=useNavigate()
  const handleEdit=(e)=>{
    e.preventDefault();
    context.edit=true;
    navigate('/account/create_user');
  }
  const HandleUsers =async (e) => {
    e.preventDefault();
    // setField(e.target.addfield.value);
    // setFields([...fields, e.target.addfield.value]);
    const user = await axios.post("http://localhost:5000/api/auth/get-user",
      { emailAddress: adminUsername }
    )
    setAdminid(user.data.user._id);


    const generateRandomCredentials = () => {
      const randomUsername = `user${Math.floor(Math.random() * 10000)}`;
      const randomPassword = Math.random().toString(36).slice(-8); // Generate random password of 8 characters
      return { randomUsername, randomPassword };
    };

    const users = [];
    for (let i = 0; i < numUsers; i++) {
      const { randomUsername, randomPassword } = generateRandomCredentials();
      users.push({ username: randomUsername, password: randomPassword, Id: adminId });
    }
    setGeneratedUsers(users);
    console.log(gereratedUsers)
    try {
      const userpost = await axios.post('http://localhost:5000/api/auth/set_users',
        { generatedUsers }
      )
    }
    catch (error) {
      console.log(error);
    }
  }
 
  
  return (
    <>
      <Side_Nav />
      <div className="container2 p-2 container">
        <div className="top-section d-flex flex-row justify-content-center my-3">
          <div className="search_bar my-3">
            <form
              class="form-inline d-flex flex-row  justify-content-center"
              onSubmit={handleGetinputdata}
            >
              <input
                className="form-control mr-sm-1 search_form"
                name="search_data"
                type="search"
                placeholder="Search firstname"
                aria-label="Search"
                onChange={(e)=>setSearchQuery(e.target.value)}
              />
              <button class="btn btn-outline-success mx-4  " type="submit">
                Search 
              </button>
            </form>
          </div>

          <div className="my-3">
            <a
              class="btn btn-primary"
              data-toggle="collapse"
              href="#addfield"
              role="button"
              aria-expanded="false"
              aria-controls="addfield"
            >
              Toggle Add Users
            </a>
          </div>
          <div className="my-3  d-flex justify-content-end">
            {/* <button className='btn btn-success '>+createusers Field</button> */}

            <div class="row">
              <div class="col">
                <div class="collapse multi-collapse" id="addfield">
                  <div class="card card-body add_field">
                    <form onSubmit={HandleUsers}>
                    <input
                        type="text"
                        name="admin"
                        placeholder="enter admin username"
                        className="form-control mb-1"
                        onChange={(e)=>setAdminUsername(e.target.value)}
                      ></input>
                      <input
                        type="text"
                        name="createusers"
                        placeholder="create users"
                        className="form-control"
                        onChange={(e)=>setNumUsers(e.target.value)}
                      ></input>
                      <button
                        type="submit"
                        className="btn btn-success my-2 w-100"
                      >
                        Add
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <table className="table table-hover border border-1 m-3 w-80">
          <thead>
            {/* <th scope="col">#</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email Address </th>
              <th scope="col">Country</th>
              <th scope="col">City/State </th>
              <th scopr="col">Last Access</th>
              <th scope="col">Edit</th> */}
            <tr>
              {fields.map((item) => (
                <th scope="col">{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredOptions.map((user,index)=>(
              <tr>
                <th scope='row'>{index}</th>
                <td>{user.admin}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.emailAddress}</td>
                <td>{user.country}</td>
                <td>{user.city}</td>
                <td>{user.lastAccess}</td>
                <td>
                <div className="user_modification d-flex flex-row justify-content-start text-start">
                  <button type="button" className="btn btn-primary mx-1" onClick={handleEdit}>
                    Edit
                  </button>
                  <button type="button" className="btn btn-danger mx-1" onClick={(e)=>handleDelete(e,user.firstName)}>
                    Delete
                  </button>
                </div>
              </td>
              </tr>
            ))}
            {/* <tr>
              <th scope="row">1</th>
              <td>A1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>India</td>
              <td>@Bangalore</td>
              <td>1 day ago</td>
              <td>
                <div className="user_modification d-flex flex-row justify-content-start text-start">
                  <button type="button" className="btn btn-primary mx-1">
                    Edit
                  </button>
                  <button type="button" className="btn btn-danger mx-1">
                    Delete
                  </button>
                </div>
              </td>
            </tr> */}
            {/* <tr>
              <th scope="row">2</th>
              <td>A2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
              <td>India</td>
              <td>@Bangalore</td>
              <td>1 day ago</td>
              <td>
                <div className="user_modification d-flex flex-row justify-content-start text-start">
                  <button type="button" className="btn btn-primary mx-1">
                    Edit
                  </button>
                  <button type="button" className="btn btn-danger mx-1">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>A3</td>
              <td>Larry</td>
              <td>Bird</td>
              <td>@twitter</td>
              <td>India</td>
              <td>@Bangalore</td>
              <td>1 day ago</td>
              <td>
                <div className="user_modification d-flex flex-row justify-content-start text-start">
                  <button type="button" className="btn btn-primary mx-1">
                    Edit
                  </button>
                  <button type="button" className="btn btn-danger mx-1">
                    Delete
                  </button>
                </div>
              </td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default User_list;
