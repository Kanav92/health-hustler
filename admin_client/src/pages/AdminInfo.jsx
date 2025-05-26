import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

function AdminInfo({ token }) {
  const [formData, setFormData] = useState({
    leadershipSkills: '',
    timeCommitment: '',
    medicalExpertise: '',
    pastExperiences: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      alert('You must be signed in to submit the form.');
      return;
    }

    try {
      const decoded = jwtDecode(token);

      if (decoded.role !== 'Admin') {
        alert('You are not authorized to submit this form.');
        return;
      }

      const response = await axios.post(
        'http://localhost:5000/api/v1/admin_info',
        { ...formData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);
      navigate('/confo');
    } catch (error) {
      alert(error.response?.data?.message || 'An error occurred');
    }
  };

  const styles = {
    body: {
      background: 'linear-gradient(135deg, #89CFF0, #FFDAB9)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 0,
      fontFamily: "'Arial', sans-serif",
    },
    container: {
      maxWidth: '800px', // Increased the width
      width: '90%', // Makes it responsive
      padding: '40px', // Increased padding for a spacious feel
      backgroundColor: 'rgba(255, 255, 255, 0.85)',
      borderRadius: '15px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
      animation: 'fadeIn 1s ease-out',
    },
    title: {
      textAlign: 'center',
      fontSize: '32px', // Slightly larger title
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '20px',
      textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
    },
    formGroup: {
      marginBottom: '20px', // Added more spacing
    },
    label: {
      display: 'block',
      marginBottom: '10px', // Increased spacing
      fontWeight: 'bold',
      color: '#555',
    },
    input: {
      width: '100%',
      padding: '12px', // Added more padding
      fontSize: '16px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      outline: 'none',
      transition: 'border-color 0.3s',
    },
    textarea: {
      width: '100%',
      padding: '12px', // Added more padding
      fontSize: '16px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      outline: 'none',
      resize: 'vertical',
      transition: 'border-color 0.3s',
    },
    button: {
      width: '100%',
      padding: '15px', // Increased button height
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#fff',
      backgroundColor: '#007BFF',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
  };
  

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h2 style={styles.title}>Admin Information Form</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Leadership Skills:</label>
            <textarea
              style={styles.textarea}
              name="leadershipSkills"
              value={formData.leadershipSkills}
              onChange={handleChange}
              rows="4"
              placeholder="Enter leadership skills"
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Time Commitment:</label>
            <input
              style={styles.input}
              type="text"
              name="timeCommitment"
              value={formData.timeCommitment}
              onChange={handleChange}
              placeholder="Enter time commitment"
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Medical Expertise:</label>
            <input
              style={styles.input}
              type="text"
              name="medicalExpertise"
              value={formData.medicalExpertise}
              onChange={handleChange}
              placeholder="Enter medical expertise"
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Past Experiences:</label>
            <textarea
              style={styles.textarea}
              name="pastExperiences"
              value={formData.pastExperiences}
              onChange={handleChange}
              rows="4"
              placeholder="Enter past experiences"
              required
            />
          </div>
          <button
            type="submit"
            style={styles.button}
            onMouseEnter={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseLeave={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminInfo;
