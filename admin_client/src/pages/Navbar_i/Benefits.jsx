import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminBack from '../.././assets/Images/adminback.svg';
import UserBack from '../.././assets/Images/userback.svg';
import { useNavigate } from "react-router-dom";


const Benefits = () => {
    const navigate = useNavigate();
    return (
        <div className="container my-5">
            {/* Return to Homepage Button */}
            <div className="text-center mb-4">
                <button 
                    onClick={() => window.location.href = "/"} 
                    className="btn btn-lg btn-outline-primary fw-bold shadow-sm"
                    style={{ borderRadius: "25px" }}
                >
                    ⬅️ Return to Homepage
                </button>
            </div>
            
            {/* Benefits Header */}
            <h1 className="text-center mb-4 fw-bold" style={{ color: "#343a40" }}>🌟 Benefits of Joining Us 🌟</h1>
            <p className="text-center text-muted fs-5 mb-5">
                Discover the amazing opportunities we offer for Admins and Users. Join us to experience a platform built for you!
            </p>
            
            {/* Benefits as Admin Section */}
            <div className="row align-items-center my-5">
                <div className="col-md-6">
                    <h2 className="fw-bold text-primary">✨ As Admin</h2>
                    <ul className="list-group list-group-flush mt-3">
                        <li className="list-group-item border-0 p-2">
                            <span className="fw-bold text-primary">✔️</span> Full control over the platform.
                        </li>
                        <li className="list-group-item border-0 p-2">
                            <span className="fw-bold text-primary">✔️</span> Manage users and permissions seamlessly.
                        </li>
                        <li className="list-group-item border-0 p-2">
                            <span className="fw-bold text-primary">✔️</span> Access to detailed analytics and reports.
                        </li>
                        <li className="list-group-item border-0 p-2">
                            <span className="fw-bold text-primary">✔️</span> Customize the user experience to meet your needs.
                        </li>
                    </ul>
                </div>
                <div className="col-md-6 text-center">
                    <img
                        src={AdminBack}
                        alt="Admin Benefits"
                        className="img-fluid rounded shadow"
                        style={{
                            maxHeight: '300px',
                            transition: "transform 0.3s",
                            cursor: "pointer",
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    />
                </div>
            </div>

            <hr className="my-5" />

            {/* Benefits as User Section */}
            <div className="row align-items-center my-5">
                <div className="col-md-6 order-md-2">
                    <h2 className="fw-bold text-success">✨ As User</h2>
                    <ul className="list-group list-group-flush mt-3">
                        <li className="list-group-item border-0 p-2">
                            <span className="fw-bold text-success">✔️</span> Easy access to features and resources.
                        </li>
                        <li className="list-group-item border-0 p-2">
                            <span className="fw-bold text-success">✔️</span> Participate in a vibrant community.
                        </li>
                        <li className="list-group-item border-0 p-2">
                            <span className="fw-bold text-success">✔️</span> Enjoy a seamless and secure experience.
                        </li>
                        <li className="list-group-item border-0 p-2">
                            <span className="fw-bold text-success">✔️</span> Personalized recommendations for you.
                        </li>
                    </ul>
                </div>
                <div className="col-md-6 order-md-1 text-center">
                    <img
                        src={UserBack}
                        alt="User Benefits"
                        className="img-fluid rounded shadow"
                        style={{
                            maxHeight: '300px',
                            transition: "transform 0.3s",
                            cursor: "pointer",
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    />
                </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-5">
            <p className="fs-5 text-muted">Ready to elevate your experience?</p>
            <button 
                onClick={() => navigate("/signup")} // Redirect to /signup
                className="btn btn-success btn-lg shadow-sm px-5"
                style={{ borderRadius: "25px" }}
            >
                Join Now 🚀
            </button>
        </div>
        </div>
    );
};

export default Benefits;
