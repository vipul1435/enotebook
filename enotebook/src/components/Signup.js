import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';

export default function Signup() {
    const {showAlert} = useContext(noteContext);
    const navigate = useNavigate();
    const host = "http://localhost:5000";
    const [credentials, setcredentials] = useState({name:"",email:"",password:""});
    const onChange =(e) =>{
        setcredentials({...credentials, [e.target.name]:e.target.value})
    }
    const onSubmit = async(e) =>{
      e.preventDefault();
      const response = await fetch(`${host}/api/auth/createUser`,{
          method : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({name:credentials.name,email:credentials.email, password:credentials.password})
      })
      const json = await response.json();
      if(json.success){
          localStorage.setItem('token',json.authToken);
          navigate("/")
          showAlert("Signup successfully","success");
      } else {
        showAlert("signup failed","danger");
      }
  }
  return (
    <div className="container mt-5">
      <h4 className='mb-3'>Enter your details for Signup </h4>
        <form onSubmit={onSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control"name='name' onChange={onChange} placeholder='Enter your name here' id="name" aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control"name='email' onChange={onChange} placeholder='Enter your email here' id="email" aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" name='password' placeholder='Enter your password here' onChange={onChange} className="form-control" id="password"/>
            </div>
            <button type="submit" className="btn btn-primary mt-2">Login</button>
        </form>
    </div>
  )
}
