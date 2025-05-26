import React, { useState } from 'react';
import axios from 'axios';
import { ethers } from 'ethers'; 
import { BrowserProvider, parseUnits } from 'ethers';
import { JsonRpcProvider } from 'ethers'; 
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const UserInfo = ({ token }) => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    height: '',
    weight: '',
    age: '',
    gender: 'Male',
    medicalConditions: 'a',
    walletAddress: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleMetaMaskPayment = async () => {
    if (!window.ethereum) {
      alert('MetaMask is not installed. Please install it to proceed.');
      return;
    }
  
    try {
      const recipientAddress = '0xE92cdcE94BFAe78481033cC6a3AdBdFD49DC17e5'; // Your wallet address
      const amountInUSD = 0.001; // Amount in USD
  
      // Connect to MetaMask using BrowserProvider
      const provider = new BrowserProvider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = await provider.getSigner();
  
      // Fetch the current ETH/USD price
      const ethPriceResponse = await axios.get(
        'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
      );
      const ethPriceInUSD = ethPriceResponse.data.ethereum.usd;
  
      // Convert the USD amount to ETH
      const transactionAmountInETH = amountInUSD / ethPriceInUSD;
      const transactionAmount = parseUnits(transactionAmountInETH.toFixed(18), 'ether'); // Convert to WEI
  
      // Send the transaction
      const transaction = await signer.sendTransaction({
        to: recipientAddress,
        value: transactionAmount,
      });
  
      console.log('Transaction:', transaction);
      alert(`Payment successful! Transaction Hash: ${transaction.hash}`);
      return transaction;
    } catch (error) {
      console.error('Payment Error:', error);
      alert('Payment failed. Please try again.');
      throw error;
    }
  };
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // First, make the payment
      await handleMetaMaskPayment();

      // After successful payment, save user info to the backend
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/v1/user_info',
        { ...userInfo },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);
      const newtoken = response.data.token;

      if (!newtoken) {
        console.log('Token not found');
        return;
      }

      // Store token and handle navigation logic
      localStorage.setItem('newtoken', newtoken);
      const decoded = jwtDecode(newtoken);
      console.log(decoded);

      const gender = decoded.gender;
      const age = decoded.age;
      const height = decoded.height;
      const weight = decoded.weight;
      const BMI = weight / (height ** 2);

      if (gender === 'Male') {
        if (age <= 50) {
          if (BMI < 18.5) {
            navigate('/group4');
          } else if (BMI >= 18.5 && BMI <= 24.9) {
            navigate('/group6');
          } else {
            navigate('/group5');
          }
        } else {
          navigate('/group7');
        }
      } else {
        if (age <= 50) {
          if (BMI < 18.5) {
            navigate('/group1');
          } else if (BMI >= 18.5 && BMI <= 24.9) {
            navigate('/group3');
          } else {
            navigate('/group2');
          }
        } else {
          navigate('/group7');
        }
      }
    } catch (error) {
      console.error(error.response?.data?.message || 'An error occurred');
      alert('Failed to update user info!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>User Information</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label>Height (in cm)</label>
            <input
              type="number"
              name="height"
              value={userInfo.height}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label>Weight (in kg)</label>
            <input
              type="number"
              name="weight"
              value={userInfo.weight}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label>Age</label>
            <input
              type="number"
              name="age"
              value={userInfo.age}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label>Gender</label>
            <select
              name="gender"
              value={userInfo.gender}
              onChange={handleChange}
              style={styles.input}
              required
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div style={styles.inputGroup}>
            <label>Medical Conditions</label>
            <select
              name="medicalConditions"
              value={userInfo.medicalConditions}
              onChange={handleChange}
              style={styles.input}
              required
            >
              <option value="a">Condition A</option>
              <option value="b">Condition B</option>
              <option value="c">Condition C</option>
            </select>
          </div>
          <div style={styles.inputGroup}>
            <label>Wallet Address</label>
            <input
              type="text"
              name="walletAddress"
              value={userInfo.walletAddress}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          <button type="submit" style={styles.button} disabled={isSubmitting}>
            {isSubmitting ? 'Processing...' : 'Submit Info'}
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f4f8',
  },
  card: {
    width: '400px',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  input: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '14px',
  },
  button: {
    padding: '10px 20px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default UserInfo;
