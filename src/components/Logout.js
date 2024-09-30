import React from 'react';
import axios from 'axios';
import './styles.css'; // Import your CSS file

const Logout = ({ onLogout }) => {  // Accept onLogout prop
    const handleLogout = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/accounts/logout/');
            if (response.data.status === 'success') {
                alert('Logged out successfully!');
                onLogout(); // Call the onLogout function
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred while logging out.');
        }
    };

    return (
        <div className="d-flex justify-content-center mt-4">
            <button className="btn btn-danger" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
};

export default Logout;
