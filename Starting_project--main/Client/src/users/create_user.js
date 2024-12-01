// src/components/UserCreationForm.js
import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Dropdown, DropdownButton, ButtonGroup } from 'react-bootstrap';

//import css
import '../styles/create_user.css'


const UserCreationForm = () => {
  const [formData, setFormData] = useState({
    userName:'',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: 'male',
    dateOfBirth: '',
    country:'',
    city:'',
    description:'',
    disabled:'no',
  });
  // const [disabled,setDisabled]=useState('no');

  //password generator


const [password, setPassword] = useState('');
const PasswordGenerator = () => {

  let charset = "";
  let newPassword = "";

   charset += "123@$abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz";
  //  charset += "0123456789";
  //  charset += "abcdefghijklmnopqrstuvwxyz";
  // charset += "abcdefghijklmnopqrstuvwxyz";

  for(let i=0;i<11;i++){
    newPassword+=charset.charAt(Math.floor(Math.random()*10))
  }
  setPassword(newPassword)
}

const [imagePreview, setImagePreview] = useState(null); // State for image preview
const [errorMessage, setErrorMessage] = useState(null); // Error state for validation

  //
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChangepassword = (e) => {
    let { name, value } = e.target;
    if(formData.disabled === 'no'){
      value='yes'
    }
    else{value='no'}
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form Data Submitted:', formData);
  };

// Handle image file change
const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    // Preview the image
    setImagePreview(URL.createObjectURL(file));
    // Store the file in state
    setFormData({
      ...formData,
      profileImage: file,
    });
    setErrorMessage(null); // Clear error on successful upload
  }
};


//clear data
const handleClearData=(e)=>{
   e.preventDefault();
   console.log('hi')
   setFormData({
    userName:'',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: 'male',
    dateOfBirth: '',
    country:'',
    city:'',
    description:'',
    disabled:'no',
  })
}

  return (
    <Container >
      <Form >
        <div className='border border-3  border-primary w-50 m-2 p-2 rounded '>
      <Row className=" w-100 p-2  ">
      <h2 className='text-center text-info'>Create New User</h2>
        <Col md={6} sm={12}>
          
        <Form.Group controlId="userName">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                placeholder="Enter user name"
                required
              />
            </Form.Group>
          
            <Form.Group controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter first name"
                required
              />
            </Form.Group>

            <Form.Group controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter last name"
                required
              />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                required
              />
            </Form.Group>

            <Form.Group controlId="formGender">
              <Form.Label>Gender</Form.Label>
              <div>
                <Form.Check
                  type="radio"
                  label="Male"
                  name="gender"
                  value="male"
                  checked={formData.gender === 'male'}
                  onChange={handleChange}
                  required
                />
               <Form.Check
                  type="radio"
                  label="Female"
                  name="gender"
                  value="female"
                  checked={formData.gender === 'female'}
                  onChange={handleChange}
                  required
                />
              </div>
            </Form.Group>

            <Form.Group controlId="generate_password" className='mt-2'>
              <Form.Check
                type="checkbox"
                label="Generate Password"
                name="disabled"
                value='yes'
                // checked={setDisabled ('yes')}
                onChange={handleChangepassword}
                
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className={formData.disabled ==='yes' ? 'disabled-field' : ""}
                // required
              />
            </Form.Group>

            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                className={formData.disabled ==='yes' ? 'disabled-field' : ""}
                // required
              />
            </Form.Group>

           

            <Form.Group controlId="dateOfBirth">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* dropdown for authority */}
             <Form.Group controlId="formRole">
              <Form.Label>Role</Form.Label>
              <Form.Control
                as="select"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="moderator">Moderator</option>
              </Form.Control>
            </Form.Group>
           
          
        </Col>
        <Col md={6} sm={12}> <Form.Group controlId="formImage">
        
        <Form.Group controlId="formCountry">
              <Form.Label>Select Country</Form.Label>
              <Form.Control
                as="select"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              >
                <option value="india">India</option>
                <option value="usa">Usa</option>
                <option value="russia">Russia</option>
              </Form.Control>
            </Form.Group>

        <Form.Group controlId="city">
              <Form.Label>City/Town</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter city/town"
                required
              />
            </Form.Group>

            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>

              <Form.Label>Profile Image</Form.Label>
              <Form.Control
                type="file"
                name="profileImage"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
              {imagePreview && (
                <div className="mt-3 text-center">
                  <h5>Image Preview:</h5>
                  <img
                   className='rounded-circle'
                    src={imagePreview}
                    alt="Profile Preview"
                    style={{ width: '100px', height: '100px' }}
                  />
                </div>
              )}
            </Form.Group></Col>
      </Row>
      <Row className='justify-content-center w-100'> <Button variant="primary" type="submit" block className='mt-3 w-50'>
              Create User
            </Button>
            <button className=" btn btn-secondary w-50 m-3" type="button" block  onClick={handleClearData}>
              Clear All
            </button>
            </Row>
            </div>
      </Form>
    </Container>
  );
};

export default UserCreationForm;
