import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import firstphoto from '../../assets/Images/aboutus123.svg';
import secondphoto from '../../assets/Images/aboutus1.svg';

const AboutUs = () => {
    const navigate = useNavigate();
    return (
        <div className="container my-5">
            {/* Page Header */}
            <header className="text-center mb-5">
                <h1 className="fw-bold display-4 text-primary">About Us</h1>
                <p className="text-muted fs-5">
                    Empowering lives with a revolutionary healthcare platform designed to bring innovation, convenience, and care to your fingertips.
                </p>
            </header>

            {/* Return to Homepage Button */}
            <div className="text-center mt-5">
                <a 
                    href="/" 
                    className="btn btn-primary btn-lg shadow-sm mt-4"
                    style={{ marginBottom: '20px' }} // Optional additional spacing
                  >
                    Return to Homepage
                </a>
            </div>


            {/* What We Do Section */}
            <section className="mb-5">
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <h2 className="fw-bold text-success">What We Do</h2>
                        <p className="mt-3 text-muted fs-5">
                            Our app is a one-stop solution for managing all your healthcare needs. From scheduling appointments with top doctors to tracking your health metrics, we make healthcare accessible and stress-free. Whether you're an individual seeking better health management or a provider streamlining operations, we've got you covered.
                        </p>
                        <ul className="list-group list-group-flush mt-4">
                            <li className="list-group-item">✔️ Book appointments with ease.</li>
                            <li className="list-group-item">✔️ Access personalized health insights.</li>
                            <li className="list-group-item">✔️ Stay updated with the latest in healthcare technology.</li>
                            <li className="list-group-item">✔️ Securely store and share medical records.</li>
                        </ul>
                    </div>
                    <div className="col-md-6 text-center">
                        <img
                            src={firstphoto}
                            alt="What We Do"
                            className="img-fluid rounded shadow"
                            style={{ maxHeight: '400px' }}
                        />
                    </div>
                </div>
            </section>

            <hr />

            {/* Why Choose Us Section */}
            <section className="my-5">
                <div className="row align-items-center">
                    <div className="col-md-6 order-md-2">
                        <h2 className="fw-bold text-primary">Why Choose Us?</h2>
                        <p className="mt-3 text-muted fs-5">
                            Our app stands out by focusing on creating a user-friendly experience that prioritizes your health and convenience. We blend cutting-edge technology with a compassionate approach to deliver healthcare solutions that truly make a difference.
                        </p>
                        <ul className="list-group list-group-flush mt-4">
                            <li className="list-group-item">✔️ User-friendly interface.</li>
                            <li className="list-group-item">✔️ Advanced AI for health insights.</li>
                            <li className="list-group-item">✔️ Trusted by thousands of users worldwide.</li>
                            <li className="list-group-item">✔️ Real-time notifications and reminders.</li>
                        </ul>
                    </div>
                    <div className="col-md-6 order-md-1 text-center">
                        <img
                            src={secondphoto}
                            alt="Why Choose Us"
                            className="img-fluid rounded shadow"
                            style={{ maxHeight: '400px' }}
                        />
                    </div>
                </div>
            </section>

            <hr />

            {/* Mission Section */}
            <section className="text-center my-5">
                <h2 className="fw-bold text-success">Our Mission</h2>
                <p className="mt-3 text-muted fs-5">
                    To revolutionize healthcare by bridging the gap between technology and care. We strive to provide everyone with accessible, affordable, and innovative healthcare solutions that improve lives.
                </p>
                <div className="mt-4">
                    <img
                        src={firstphoto}
                        alt="Our Mission"
                        className="img-fluid rounded shadow"
                        style={{ maxWidth: '600px' }}
                    />
                </div>
            </section>

            <hr />

            {/* Call to Action */}
            <div className="text-center mt-5">
                <p className="fs-5 text-muted">Ready to elevate your experience?</p>
                <button
                    onClick={() => navigate("/signup")}
                    className="btn btn-success btn-lg shadow-sm px-5"
                    style={{ borderRadius: "25px" }}
                >
                    Join Now 🚀
                </button>
            </div>
        </div>
    );
};

export default AboutUs;
