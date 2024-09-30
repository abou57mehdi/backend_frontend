import React from "react";

const Contact = () => {
  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Contact Us</h2>
          <p className="text-center">You can reach us at:</p>
          <ul className="list-unstyled text-center">
            <li>
              <strong>Email:</strong> support@cardealership.com
            </li>
            <li>
              <strong>Phone:</strong> +1 234 567 890
            </li>
            <li>
              <strong>Address:</strong> 123 Car Street, Auto City, USA
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Contact;
