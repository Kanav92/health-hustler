// import React, { useState } from 'react';
// import "bootstrap/dist/css/bootstrap.min.css";
// import { useNavigate } from 'react-router-dom';
// import { jwtDecode } from 'jwt-decode';
// import { FaHeartbeat } from "react-icons/fa";
// // import Image from '.././assets/Images/login.svg'; // Replace with your actual image path
// import axios from 'axios';


// function Signup() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     role: 'User', // Default role
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5000/api/v1/signup', formData);
//       alert(response.data.message);

//       const token = response.data.token;
//       if (!token) {
//         console.log('Token not found');
//         return;
//       }

//       localStorage.setItem('token', token);
//       const decoded = jwtDecode(token);
//       const role = decoded.role;

//       if (role === 'User') {
//         navigate('/admininfo');
//       } else {
//         navigate('/admininfo');
//       }
//     } catch (error) {
//       console.error(error.response?.data?.message || 'An error occurred');
//       alert('Signup failed!');
//     }
//   };

//   return (
//     <div className="d-flex" style={{ height: "100vh", backgroundColor: "#f8f9fa" }}>
      
//       {/* Sidebar */}
//       <div className="d-flex flex-column" style={{ flex: 1 }}>
//         <div
//           className="d-flex flex-column justify-content-center align-items-center text-white p-4"
//           style={{
//             flex: 1,
//             background: "linear-gradient(45deg, rgb(11, 23, 158), #218838)",
//             color: "white",
//             textAlign: "center",
//           }}
//         >
//           <FaHeartbeat size={50} style={{ marginBottom: "1rem" }} />
//           <h1 style={{ fontSize: "2rem", margin: 0 }}>Welcome to Our Platform</h1>
//           <p style={{ fontStyle: "italic", fontSize: "1.1rem", marginTop: "1rem" }}>
//             "Your journey begins here. Join us to explore new possibilities."
//           </p>
//         </div>
//         <div
//           className="d-flex justify-content-center align-items-center p-4"
//           style={{ flex: 1, backgroundColor: "#f0f0f0" }}
//         >
//           {/* <img
//             src={Image}
//             alt="Motivational"
//             style={{ maxWidth: "80%", height: "auto" }}
//           /> */}
//         </div>
//       </div>

//       {/* Signup Form */}
//       <div
//         className="d-flex flex-column justify-content-center align-items-center p-4"
//         style={{ flex: 2, backgroundColor: "#ffffff" }}
//       >
//         <div className="bg-white p-4 rounded shadow" style={{ width: "100%", maxWidth: "500px" }}>
//           <h2 className="text-center mb-4">Signup</h2>
//           <form onSubmit={handleSubmit}>
//             <div className="mb-3">
//               <label htmlFor="name"><strong>Name</strong></label>
//               <input
//                 type="text"
//                 name="name"
//                 className="form-control rounded-0"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="email"><strong>Email</strong></label>
//               <input
//                 type="email"
//                 name="email"
//                 className="form-control rounded-0"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="password"><strong>Password</strong></label>
//               <input
//                 type="password"
//                 name="password"
//                 className="form-control rounded-0"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="role"><strong>Role</strong></label>
//               <select
//                 name="role"
//                 className="form-control rounded-0"
//                 value={formData.role}
//                 onChange={handleChange}
//                 required
//               >
//                 {/* <option value="User">User</option> */}
//                 <option value="Admin">Admin</option>
//               </select>
//             </div>
//             <button type="submit" className="btn btn-success w-100 rounded-0">
//               Sign Up
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;








import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { FaHeartbeat } from "react-icons/fa";
import axios from 'axios';

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'User', // Default role
    walletAddress: '', // New wallet address field
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/v1/signup', formData);
      alert(response.data.message);

      const token = response.data.token;
      if (!token) {
        console.log('Token not found');
        return;
      }

      localStorage.setItem('token', token);
      const decoded = jwtDecode(token);
      const role = decoded.role;

      if (role === 'Admin') {
        navigate('/admininfo');
      } else {
        navigate('/admininfo');
      }
    } catch (error) {
      console.error(error.response?.data?.message || 'An error occurred');
      alert('Signup failed!');
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
          <FaHeartbeat size={50} style={{ marginBottom: "1rem" }} />
          <h1 style={{ fontSize: "2rem", margin: 0 }}>Welcome to Our Platform</h1>
          <p style={{ fontStyle: "italic", fontSize: "1.1rem", marginTop: "1rem" }}>
            "Your journey begins here. Join us to explore new possibilities."
          </p>
        </div>
        <div
          className="d-flex justify-content-center align-items-center p-4"
          style={{ flex: 1, backgroundColor: "#f0f0f0" }}
        >
          {/* <img src={Image} alt="Motivational" style={{ maxWidth: "80%", height: "auto" }} /> */}
        </div>
      </div>

      {/* Signup Form */}
      <div
        className="d-flex flex-column justify-content-center align-items-center p-4"
        style={{ flex: 2, backgroundColor: "#ffffff" }}
      >
        <div className="bg-white p-4 rounded shadow" style={{ width: "100%", maxWidth: "500px" }}>
          <h2 className="text-center mb-4">Signup</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name"><strong>Name</strong></label>
              <input
                type="text"
                name="name"
                className="form-control rounded-0"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
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
            <div className="mb-3">
              <label htmlFor="walletAddress"><strong>Wallet Address</strong></label>
              <input
                type="text"
                name="walletAddress"
                className="form-control rounded-0"
                value={formData.walletAddress}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="role"><strong>Role</strong></label>
              <select
                name="role"
                className="form-control rounded-0"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <button type="submit" className="btn btn-success w-100 rounded-0">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;

