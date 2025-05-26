import React from 'react';

function Confo() {
  const styles = {
    body: {
      background: 'linear-gradient(135deg, #F3E5AB, #FF8C94)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 0,
      fontFamily: "'Arial', sans-serif",
    },
    container: {
      maxWidth: '600px',
      width: '90%',
      padding: '40px',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderRadius: '15px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
      textAlign: 'center',
    },
    title: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '20px',
      textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
    },
    message: {
      fontSize: '18px',
      color: '#555',
      marginBottom: '20px',
      lineHeight: '1.5',
    },
    button: {
      padding: '12px 20px',
      fontSize: '16px',
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
        <h1 style={styles.title}>Confirmation Page</h1>
        <p style={styles.message}>
          Your response has been recorded. Please keep checking your status to see if you are verified or not. 
          You can log out from here and try logging in again after few hours to check your verification status.
        </p>
        <button
          style={styles.button}
          onMouseEnter={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseLeave={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
          onClick={() => {
            // Logic for logging out can be added here
            alert('You have been logged out.');
            window.location.href = '/login'; // Redirect to login page
          }}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

export default Confo;
