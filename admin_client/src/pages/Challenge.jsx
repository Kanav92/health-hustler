import React, { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaWallet } from "react-icons/fa";
import { GiBodyHeight, GiWeight } from "react-icons/gi";
import { MdOutlineMedicalServices } from "react-icons/md";
import { RiGenderlessLine } from "react-icons/ri";

const UserInfo = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    height: "",
    weight: "",
    age: "",
    gender: "Male",
    medicalConditions: "a",
    walletAddress: "",
  });

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/user_info",
        { ...userInfo },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response.data.message);
      const newToken = response.data.token;
      if (!newToken) {
        console.error("Token not found");
        return;
      }
      localStorage.setItem("newToken", newToken);
      const decoded = jwtDecode(newToken);
      const { gender, age, height, weight } = decoded;
      const BMI = weight / (height / 100) ** 2;

      if (gender === "Male") {
        if (age <= 50) {
          if (BMI < 18.5) navigate("/groupsd");
          else if (BMI >= 18.5 && BMI <= 24.9) navigate("/groupsg");
          else navigate("/groupse");
        } else navigate("/groupsf");
      } else {
        if (age <= 50) {
          if (BMI < 18.5) navigate("/groupsd");
          else if (BMI >= 18.5 && BMI <= 24.9) navigate("/groupsg");
          else navigate("/groupse");
        } else navigate("/groupsf");
      }
    } catch (error) {
      console.error(error.response?.data?.message || "An error occurred");
      alert("Failed to update user info!");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>
          <FaUserCircle style={styles.icon} /> User Information
        </h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label>
              <GiBodyHeight style={styles.icon} /> Height (in cm)
            </label>
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
            <label>
              <GiWeight style={styles.icon} /> Weight (in kg)
            </label>
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
            <label>
              <FaUserCircle style={styles.icon} /> Age
            </label>
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
            <label>
              <RiGenderlessLine style={styles.icon} /> Gender
            </label>
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
            <label>
              <MdOutlineMedicalServices style={styles.icon} /> Medical Conditions
            </label>
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
            <label>
              <FaWallet style={styles.icon} /> Wallet Address
            </label>
            <input
              type="text"
              name="walletAddress"
              value={userInfo.walletAddress}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          <button type="submit" style={styles.button}>
            Submit Info
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    padding: "20px",
    background: "linear-gradient(135deg, #1e3c72, #2a5298, #e0eafc)",
    backgroundAttachment: "fixed",
    overflow: "hidden",
  },
  card: {
    width: "90%",
    maxWidth: "500px",
    padding: "30px",
    borderRadius: "16px",
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
    backdropFilter: "blur(12px)",
    transition: "transform 0.3s ease-in-out",
  },
  title: {
    textAlign: "center",
    fontSize: "1.8rem",
    fontWeight: "600",
    marginBottom: "20px",
    color: "#222",
  },
  icon: {
    marginRight: "8px",
    color: "#007bff",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    outline: "none",
    transition: "border 0.3s ease",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  button: {
    padding: "12px 20px",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(135deg, #007bff, #00d4ff)",
    color: "#fff",
    fontSize: "1.2rem",
    cursor: "pointer",
    transition: "background 0.3s ease",
    fontWeight: "bold",
  },
};

export default UserInfo;
