import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Side_Nav from "../Layout/Side_Nav";
import axios from "axios";

//import toastify
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//import css
import "../styles/user_list.css";

//import context
import { EditUserContext, editContext } from "../context/EditUserContext";

//collect new field

const User_list = (props) => {
  const context = useContext(editContext);

  const [fields, setFields] = useState([
    "#",
    "Admin For User",
    "User Name",
    "Catalog",
    "Role",
    "Edit",
  ]);
  const [field, setField] = useState("");
  const [numUsers, setNumUsers] = useState("");
  const [adminUsername, setAdminUsername] = useState("");
  const [adminId, setAdminid] = useState();
  const [generatedUsers, setGeneratedUsers] = useState([]);
  const [adminUser, setAdminUser] = useState();
  const [selectCategory, setSelectCategory]=useState();
  const [configsOnId,setConfigOnId] = useState([]);

  //state for edit
  const [editUsername,setEditUsername]=useState('');
  const [editPassword,setEditPassword]=useState('');
  const [editRole,setEditRole]=useState('');
  const [editInstance,setEditinstance]=useState('');
  const [editCategory,setEditCategory]=useState('');
  const [editUserId,setEditUserId]=useState();

  const handleGetinputdata = (e) => {
    e.preventDefault();
    let searchvalue = e.target.search_data.value.trim();
    setSearchQuery(searchvalue);
  };

  const [users, setUsers] = useState([]);
  useEffect(() => {
    const loggedUser = async () => {
      const user = JSON.parse(localStorage.getItem("auth"));
      console.log(user);
      if (user.role === "superadmin" || user.role === "admin") {
        const getUserDetails = await axios.post(
          "http://localhost:5000/api/auth/get-user",
          { emailAddress: user.user.emailAddress }
        );
        setAdminUser(user.user.emailAddress);
        const getUsers = await axios.post(
          "http://localhost:5000/api/auth/getadminusers",
          { adminId: getUserDetails.data.user._id }
        );
        setUsers(getUsers.data.getUser);

        //get configs on admin id
        const getConfigs = await axios.post('http://localhost:5000/api/services/get_awsConfigOnId',{
          adminId:getUserDetails.data.user._id
        })
        setConfigOnId(getConfigs.data.configs)
      }

    };
    loggedUser();
  }, []);

  const [searchQuery, setSearchQuery] = useState("");

  // Filter options based on the search query
  let filteredOptions = users;

  filteredOptions = users.filter((option) =>
    option.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  //handeldelete
  const handleDelete = async (e, user) => {
    e.preventDefault();
    try {
      const deleteUser = await axios.post(
        "http://localhost:5000/api/auth/deleteAutoUser",
        { userId: user._id }
      );
    } catch (error) {
      console.log(error);
    }
    setUsers((prevItems) =>
      prevItems.filter((item) => item.userName !== user.userName)
    );
  };

  //handle edit
  const navigate = useNavigate();
  const handleEdit = (e,user) => {
    e.preventDefault();
    // context.edit = true;
    // navigate("/account/create_user");
    setEditCategory(user.catalogInstance)
    setEditUsername(user.userName)
    setEditPassword(user.password)
    setEditRole(user.role)
    setEditUserId(user._id)
  };

  const handleSaveChanges=async (e)=>{
    try{
      const updateAutoUser = await axios.post('http://localhost:5000/api/auth/updateAutoUser',
        {
           id:editUserId ,
           userName:editUsername,
           password:editPassword,
           adminId:adminId,
           catalogInstance:editCategory,
           role:editRole,
        }
      )
      
      if(updateAutoUser.data.success){
        toast.success(updateAutoUser.data.message)
      }
      else{
        toast.error(updateAutoUser.data.message)
      }
    }
    catch(error){
      console.log(error)
    }
    
  }

  const HandleUsers = async (e) => {
    e.preventDefault();
    // setField(e.target.addfield.value);
    // setFields([...fields, e.target.addfield.value]);
    const user = await axios.post("http://localhost:5000/api/auth/get-user", {
      emailAddress: adminUsername,
    });
    if (user.data.success === false) {
      toast.error("Admin is not found");
      return;
    } else {
      setAdminid(user.data.user._id);
    }

    const generateRandomCredentials = () => {
      const randomUsername = `user${Math.floor(Math.random() * 10000)}`;
      const randomPassword = Math.random().toString(36).slice(-8); // Generate random password of 8 characters
      return { randomUsername, randomPassword };
    };

    const users = [];
    for (let i = 0; i < numUsers; i++) {
      const { randomUsername, randomPassword } = generateRandomCredentials();
      users.push({
        userName: randomUsername,
        password: randomPassword,
        adminId: user.data.user._id,
        catalogInstance:selectCategory,
      });
    }
    setGeneratedUsers(users);
    try {
      const userpost = await axios.post(
        "http://localhost:5000/api/auth/set_users",
        { users }
      );
      if (userpost.data.success) {
        toast.success(userpost.data.message);
      } else {
        toast.error(userpost.data.message);
      }
    } catch (error) {
      console.log(error);
    }
    setAdminUsername("");
    setNumUsers("");
  };

  //  setNumUsers ('');
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
                onChange={(e) => setSearchQuery(e.target.value)}
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
                        value={adminUsername}
                        onChange={(e) => setAdminUsername(e.target.value)}
                      ></input>
                      <select
                        class="form-select mb-1"
                        aria-label="Default select example"
                        value={selectCategory}
                        onChange={(e)=>setSelectCategory(e.target.value)}
                      >
                      <option >Select catalog category</option>
                        {configsOnId.map((catalog)=>(
                          <option value={catalog.catalogName}>{catalog.catalogName}</option>
                        ))}
                      </select>
                      <input
                        type="text"
                        name="createusers"
                        placeholder="create users"
                        className="form-control"
                        value={numUsers}
                        onChange={(e) => setNumUsers(e.target.value)}
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
            <tr>
              {fields.map((item) => (
                <th scope="col">{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredOptions.map((user, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{adminUser}</td>
                <td>{user.userName}</td>
                <td>{user.catalogInstance}</td>
                <td>{user.role}</td>
                
                <td>
                  <div className="user_modification d-flex flex-row justify-content-start text-start">
                    {/* <button
                      type="button"
                      className="btn btn-primary mx-1"
                      onClick={handleEdit}
                    > */}

<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo"
onClick={(e)=>handleEdit(e,user)}
>Edit</button>

<div class="modal fade " id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog " role="document" style={{top:'70px'}}>
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Edit User</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group">
            <label for="user-name" class="col-form-label" >Username:</label>
            <input type="text" class="form-control" id="user-name" value={editUsername} onChange={(e)=>setEditUsername(e.target.value)}/>
          </div>
          <div class="form-group">
            <label for="password" class="col-form-label" >Password:</label>
            <input type="text" class="form-control" id="password" value={editPassword} onChange={(e)=>setEditPassword(e.target.value)}/>
          </div>
          <div class="form-group">
            <label for="role" class="col-form-label">Role:</label>
            <input type="text" class="form-control" id="role" value={editRole} onChange={(e)=>setEditRole(e.target.value)}/>
          </div>
          <div className="form-group">
          <label for="category" class="col-form-label">Select Category:</label>
          <select
                        class="form-select mb-1"
                        id='category'
                        aria-label="Default select example"
                        value={editCategory}
                        onChange={(e)=>setEditCategory(e.target.value)}
                      >
                      <option >Select catalog category</option>
                        {configsOnId.map((catalog)=>(
                          <option value={catalog.catalogName}>{catalog.catalogName}</option>
                        ))}
                      </select>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onClick={(e)=>handleSaveChanges(e)}>Save Changes</button>
      </div>
    </div>
  </div>
</div>
                      {/* Edit */}

                    {/* </button> */}
                    <button
                      type="button"
                      className="btn btn-danger mx-1"
                      onClick={(e) => handleDelete(e, user)}
                    >
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
