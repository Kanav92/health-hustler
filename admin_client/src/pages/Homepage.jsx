import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import background from '.././assets/Images/background.svg';
import logo from '.././assets/Images/logo.svg'; // Add your logo file to the assets folder

function Frontpage() {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                padding: "0",
                margin: "0",
                backgroundImage: `url(${background})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "100%" ,
                position: "absolute", // or "relative", "fixed", etc.
                top: "50%", // adjust as needed
                left: "50%", // adjust as needed
                transform: "translate(-50%, -50%)", 
            }}
        >
            {/* Navigation Bar */}
            <nav
                style={{
                    position: "absolute",
                    top: "0",
                    width: "100%",
                    backgroundColor: "rgba(255, 255, 255, 0.9)", // Semi-transparent white
                    padding: "10px 30px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                    <img src={logo} alt="Logo" style={{ height: "40px" }} />
                    <a
                        style={{
                            fontSize: "1.8rem",
                            fontWeight: "bold",
                            color: "#4e73df",
                            textDecoration: "none",
                        }}
                        href="/"
                    >
                        Health Platform
                    </a>
                </div>
                <div style={{ display: "flex", gap: "25px" }}>
                    <Link
                        style={{
                            color: "#6c757d",
                            textDecoration: "none",
                            fontSize: "1rem",
                            fontWeight: "500",
                        }}
                        to="/signup"
                    >
                        Register
                    </Link>
                    <Link
                        style={{
                            color: "#6c757d",
                            textDecoration: "none",
                            fontSize: "1rem",
                            fontWeight: "500",
                        }}
                        to="/login"
                    >
                        Login
                    </Link>
                    <a
                        style={{
                            color: "#6c757d",
                            textDecoration: "none",
                            fontSize: "1rem",
                            fontWeight: "500",
                        }}
                        href="/about"
                    >
                        About Us
                    </a>
                    <a
                        style={{
                            color: "#6c757d",
                            textDecoration: "none",
                            fontSize: "1rem",
                            fontWeight: "500",
                        }}
                        href="/benefits"
                    >
                        Benefits
                    </a>
                </div>
            </nav>

            {/* Hero Section */}
            <header
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    backgroundColor: "rgba(0, 0, 0, 0.7)", // Semi-transparent black
                    color: "#ffffff",
                    padding: "50px",
                    borderRadius: "15px",
                    maxWidth: "700px",
                }}
            >
                <h1
                    style={{
                        fontSize: "3rem",
                        fontWeight: "800",
                        marginBottom: "15px",
                        lineHeight: "1.2",
                        textShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)",
                    }}
                >
                    Welcome to the <span style={{ color: "#1cc88a" }}>Health Platform</span>
                </h1>
                <p
                    style={{
                        fontSize: "1.3rem",
                        marginBottom: "30px",
                        lineHeight: "1.5",
                    }}
                >
                    Your trusted partner in healthcare management. Empowering lives with innovation and care.
                </p>
                <div style={{ display: "flex", gap: "15px" }}>
                    <Link
                        to="/signup"
                        style={{
                            backgroundColor: "#4e73df",
                            color: "#ffffff",
                            padding: "12px 25px",
                            borderRadius: "8px",
                            textDecoration: "none",
                            fontSize: "1.1rem",
                            fontWeight: "600",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                       Continue as admin
                    </Link>
                    <Link
                        to="https://fitbit-app-frontend.vercel.app"
                        style={{    
                            backgroundColor: "#1cc88a",
                            color: "#ffffff",
                            padding: "12px 25px",
                            borderRadius: "8px",
                            textDecoration: "none",
                            fontSize: "1.1rem",
                            fontWeight: "600",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        Continue as User
                    </Link>
                </div>
            </header>
        </div>
    );
}

export default Frontpage;
