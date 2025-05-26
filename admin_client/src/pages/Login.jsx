import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { FaSignInAlt } from "react-icons/fa";
import Image from '../assets/Images/login.svg'; // Replace with your actual image path

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/v1/login', formData);
      alert(response.data.message);

      const token = response.data.token;
      if (!token) {
        alert('You must be signed in to submit the form.');
        return;
      }

      const decoded = jwtDecode(token);

      if (decoded.role=="Admin"){
        if (decoded.verified==true){ 
         if (decoded.group=='a'){
           navigate('/group1a')
         } 
         else if (decoded.group=='b'){
           navigate('/group2a')
         } 
         else if (decoded.group=='c'){
           navigate('/group3a')
         } 
         else if (decoded.group=='d'){
           navigate('/group4a')
         } 
         else if (decoded.group=='e'){
           navigate('/group5a')
         } 
         else if (decoded.group=='f'){
           navigate('/group6a')
         } 
         else if (decoded.group=='g'){
           navigate('/group7a')   
         }    
 
       }
       else{
         navigate('/failed')     
       }
     }
     else if (decoded.role=="User"){
       if (decoded.group=='a'){
         navigate('group1')
       }
       else if (decoded.group=='b'){
         navigate('/group2')
       } 
       else if (decoded.group=='c'){
         navigate('/group3')
       } 
       else if (decoded.group=='d'){
         navigate('/group4')
       } 
       else if (decoded.group=='e'){
         navigate('/group5')
       } 
       else if (decoded.group=='f'){
         navigate('/group6')
       } 
       else if (decoded.group=='g'){
         navigate('/group7')
       }    
 
     }
      
    } catch (error) {
      console.error(error.response?.data?.message || 'An error occurred');
      alert('Login failed!');
    }
  };

  return (
    <div className="d-flex" style={{ height: "100vh", backgroundColor: "#f8f9fa" }}>
      {/* Sidebar */}
      <div className="d-flex flex-column" style={{ flex: 1 }}>
        <div
          className="d-flex flex-column justify-content-center align-items-center text-white p-4"
          style={{
            flex: 1,
            background: "linear-gradient(45deg, rgb(11, 23, 158), #218838)",
            color: "white",
            textAlign: "center",
          }}
        >
          <FaSignInAlt size={50} style={{ marginBottom: "1rem" }} />
          <h1 style={{ fontSize: "2rem", margin: 0 }}>Welcome Back</h1>
          <p style={{ fontStyle: "italic", fontSize: "1.1rem", marginTop: "1rem" }}>
            "Log in to continue and access your account."
          </p>
        </div>
        <div
          className="d-flex justify-content-center align-items-center p-4"
          style={{ flex: 1, backgroundColor: "#f0f0f0" }}
        >
          <img
            src={Image}
            alt="Login Illustration"
            style={{ maxWidth: "80%", height: "auto" }}
          />
        </div>
      </div>

      {/* Login Form */}
      <div
        className="d-flex flex-column justify-content-center align-items-center p-4"
        style={{ flex: 2, backgroundColor: "#ffffff" }}
      >
        <div className="bg-white p-4 rounded shadow" style={{ width: "100%", maxWidth: "500px" }}>
          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email"><strong>Email</strong></label>
              <input
                type="email"
                name="email"
                className="form-control rounded-0"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password"><strong>Password</strong></label>
              <input
                type="password"
                name="password"
                className="form-control rounded-0"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 rounded-0">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
