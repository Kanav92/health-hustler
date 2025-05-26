import React from "react";
import { FaHeartbeat } from "react-icons/fa";
import "./login.css"; // Make sure this import exists

const CLIENT_ID = "23QCJS";
const REDIRECT_URI = "https://fitbit-app-frontend.vercel.app/callback";

const FITBIT_AUTH_URL = `https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
  REDIRECT_URI
)}&scope=activity%20nutrition%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight&expires_in=604800`;

function Login() {
  const handleLogin = () => {
    window.location.href = FITBIT_AUTH_URL;
  };

  return (
    <div className="login-background blue">
      <div className="login-container">
        <div className="login-card">
          <div className="heart-icon">
            <FaHeartbeat className="text-5xl" />
          </div>
          
          <h1 className="login-title">
            Connect with Fitbit
          </h1>
          
          <p className="login-description">
            Sync your health and wellness data with our app. Monitor your heart rate, sleep, activity, and more in one place.
          </p>
          
          <button
            onClick={handleLogin}
            className="login-button"
          >
            Connect to Fitbit
          </button>
          
          <div className="login-footer">
            <p>Hello!</p>
            <p>{new Date().toLocaleTimeString()} {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;


// import React from "react";
// import { ethers } from "ethers";
// import { FaHeartbeat } from "react-icons/fa";
// import "./login.css";

// const CLIENT_ID = "23QCJS";
// const REDIRECT_URI = "https://fitbit-app-frontend.vercel.app/callback";
// const FITBIT_AUTH_URL = `https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
//   REDIRECT_URI
// )}&scope=activity%20nutrition%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight&expires_in=604800`;

// const RECEIVER_ADDRESS = "0x9CC6d00953096d9166762e0e7950E9c1C65c709B";
// const PAYMENT_AMOUNT_USD = 0.00001;
// const ETH_PRICE_ESTIMATE = 3800; // Assume 1 ETH = $3800 for estimation

// function Login() {
//   const handleLogin = async () => {
//     try {
//       // Check MetaMask
//       if (!window.ethereum) {
//         alert("Please install MetaMask to proceed.");
//         return;
//       }

//       // Request connection
//       await window.ethereum.request({ method: "eth_requestAccounts" });
//       const provider = new ethers.BrowserProvider(window.ethereum);
//       const signer = await provider.getSigner();

//       // Convert USD to ETH estimate
//       const ethAmount = PAYMENT_AMOUNT_USD / ETH_PRICE_ESTIMATE;
//       const valueInWei = ethers.parseEther(ethAmount.toFixed(18));

//       // Send transaction
//       const tx = await signer.sendTransaction({
//         to: RECEIVER_ADDRESS,
//         value: valueInWei,
//       });

//       // Wait for confirmation
//       await tx.wait();

//       // Redirect to Fitbit
//       window.location.href = FITBIT_AUTH_URL;

//     } catch (error) {
//       console.error("Payment or redirect error:", error);
//       alert("Transaction failed or rejected.");
//     }
//   };

//   return (
//     <div className="login-background blue">
//       <div className="login-container">
//         <div className="login-card">
//           <div className="heart-icon">
//             <FaHeartbeat className="text-5xl" />
//           </div>
//           <h1 className="login-title">Connect with Fitbit</h1>
//           <p className="login-description">
//             Sync your health and wellness data with our app. Monitor your heart rate, sleep, activity, and more in one place.
//           </p>
//           <button onClick={handleLogin} className="login-button">
//             Connect to Fitbit (Pay $0.00001)
//           </button>
//           <div className="login-footer">
//             <p>Hello!</p>
//             <p>{new Date().toLocaleTimeString()} {new Date().toLocaleDateString()}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;


