// import React, { useEffect, useState } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import axios from "axios";

// function Callback() {
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();
//   const [status, setStatus] = useState("Processing Fitbit login...");

//   useEffect(() => {
//     const code = searchParams.get("code");

//     if (code) {
//       axios
//         .get(`https://fitbit-app-backend.vercel.app/callback?code=${code}`, {
//           withCredentials: true, // ✅ Required to include session cookie
//         })
//         .then((response) => {
//             console.log("user_id",  response.data.user_id);
//             console.log("access_token", response.data.access_token);
//           localStorage.setItem("user_id", response.data.user_id);
//             localStorage.setItem("access_token", response.data.access_token);
//           setStatus("Login successful! Redirecting to profile...");
            
//           setTimeout(() => {
//             navigate("/profile");
//           }, 1000);
//         })
//         .catch((error) => {
//           console.error("Error exchanging code for token:", error.response?.data || error.message);
//           setStatus("Failed to log in with Fitbit.");
//         });
//     } else {
//       setStatus("No authorization code found in URL.");
//     }
//   }, [searchParams, navigate]);

//   return (
//     <div>
//       <h2>{status}</h2>
//     </div>
//   );
// }

// export default Callback;

import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

function Callback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("Processing Fitbit login...");

  useEffect(() => {
    const code = searchParams.get("code");

    if (code) {
      axios
        .get(`https://fitbit-app-backend.vercel.app/callback?code=${code}`, {
          withCredentials: true,
        })
        .then((response) => {
          console.log("user_id", response.data.user_id);
          console.log("access_token", response.data.access_token);
          localStorage.setItem("user_id", response.data.user_id);
          localStorage.setItem("access_token", response.data.access_token);
          setStatus("Login successful! Redirecting to profile...");
          setTimeout(() => {
            navigate("/profile");
          }, 1000);
        })
        .catch((error) => {
          console.error("Error exchanging code for token:", error.response?.data || error.message);
          setStatus("Failed to log in with Fitbit.");
        });
    } else {
      setStatus("No authorization code found in URL.");
    }
  }, [searchParams, navigate]);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.spinner}></div>
        <h2 style={styles.statusText}>{status}</h2>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  card: {
    background: "#fff",
    padding: "2rem 3rem",
    borderRadius: "1rem",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  spinner: {
    margin: "0 auto 1.5rem",
    width: "50px",
    height: "50px",
    border: "6px solid #e3e3e3",
    borderTop: "6px solid #00bcd4",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  statusText: {
    color: "#333",
    fontSize: "1.2rem",
  },
};

// Add animation using global CSS-in-JS technique
const styleSheet = document.styleSheets[0];
const keyframes =
  `@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }`;
styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

export default Callback;



// import React, { useEffect, useState } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import axios from "axios";

// // Configure axios globally
// axios.defaults.withCredentials = true;
// axios.defaults.baseURL = "https://fitbit-app-backend.vercel.app";

// function Callback() {
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();
//   const [status, setStatus] = useState("Processing Fitbit login...");

//   useEffect(() => {
//     const code = searchParams.get("code");

//     if (!code) {
//       setStatus("No authorization code found in URL.");
//       return;
//     }

//     const exchangeCode = async () => {
//       try {
//         // First exchange code for token
//         const authResponse = await axios.get(`/callback?code=${code}`);
        
//         // Then immediately test the profile endpoint
//         const profileResponse = await axios.get('/profile');
        
//         localStorage.setItem("user_id", authResponse.data.user_id);
//         setStatus("Login successful! Redirecting to profile...");
//         navigate("/profile");
//       } catch (error) {
//         console.error("Authentication error:", {
//           response: error.response?.data,
//           message: error.message
//         });
        
//         setStatus(`Failed: ${error.response?.data?.error || error.message}`);
//       }
//     };

//     exchangeCode();
//   }, [searchParams, navigate]);

//   return (
//     <div>
//       <h2>{status}</h2>
//       {status.includes("Failed") && (
//         <button onClick={() => window.location.reload()}>Try Again</button>
//       )}
//     </div>
//   );
// }

// export default Callback;
