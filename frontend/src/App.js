import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'; // Import your custom CSS
import Login from './components/Login';
import Register from './components/Register';
import Logout from './components/Logout';
import Dealers from './components/Dealer'; // Import Dealers component
import About from './components/About'; // Import About component
import Contact from './components/Contact'; // Import Contact component

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // State to track authentication

    const handleLoginSuccess = () => {
        setIsAuthenticated(true); // Set authenticated state to true
    };

    const handleLogoutSuccess = () => {
        setIsAuthenticated(false); // Set authenticated state to false
    };

    return (
        <Router>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <Link className="navbar-brand" to="/" style={{ color: '#28a745' }}>Car Dealership</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/about" style={{ color: '#28a745' }}>About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/contact" style={{ color: '#28a745' }}>Contact</Link>
                            </li>
                            {isAuthenticated && (
                                <li className="nav-item">
                                    <Link className="nav-link" to="/logout" style={{ color: '#28a745' }}>Logout</Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="container mt-4">
                <Routes>
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login onSuccess={handleLoginSuccess} />} />
                    <Route path="/logout" element={<Logout onLogout={handleLogoutSuccess} />} />
                    <Route path="/dealers" element={<Dealers />} />
                    <Route path="/" element={
                        <>
                            <div className="form-wrapper mb-3">
                                <Register />
                            </div>
                            <div className="form-wrapper mb-3">
                                <Login onSuccess={handleLoginSuccess} />
                            </div>
                        </>
                    } />
                </Routes>
            </div>

            {/* Render the Logout button conditionally */}
            {isAuthenticated && (
                <div className="container mt-4">
                    <div className="alert alert-info">
                        You are logged in!
                    </div>
                    <div className="text-center">
                        <Logout onLogout={handleLogoutSuccess} />
                    </div>
                </div>
            )}
        </Router>
    );
};

export default App;
