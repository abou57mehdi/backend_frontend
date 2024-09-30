import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap

const Dealers = () => {
  const [dealers, setDealers] = useState([]);
  const [selectedDealer, setSelectedDealer] = useState(null); // State to store the selected dealer
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch all dealers initially
    fetchDealers();
  }, []);

  const fetchDealers = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/accounts/api/dealers/"
      );
      setDealers(response.data); // Assuming the API returns an array of dealers
    } catch (error) {
      setError("Failed to fetch dealers");
    }
  };

  const fetchDealerById = async (dealer_id) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/accounts/api/dealers/${dealer_id}/`
      );
      setSelectedDealer(response.data); // Store the selected dealer in state
    } catch (error) {
      setError(`Failed to fetch dealer with ID ${dealer_id}`);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Dealers List</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row">
        <div className="col-md-6">
          <ul className="list-group">
            {dealers.map((dealer) => (
              <li
                key={dealer.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <span>{dealer.name}</span>
                <button
                  className="btn btn-primary"
                  onClick={() => fetchDealerById(dealer.id)}
                >
                  View Details
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-md-6">
          {/* Display the selected dealer's details */}
          {selectedDealer ? (
            <div className="card">
              <div className="card-body">
                <h3 className="card-title">Dealer Details</h3>
                <p className="card-text">
                  <strong>ID:</strong> {selectedDealer.id}
                </p>
                <p className="card-text">
                  <strong>Name:</strong> {selectedDealer.name}
                </p>
                <p className="card-text">
                  <strong>Description:</strong> {selectedDealer.description}
                </p>

                {/* Display Reviews */}
                <h4>Reviews</h4>
                {selectedDealer.reviews && selectedDealer.reviews.length > 0 ? (
                  <ul className="list-group">
                    {selectedDealer.reviews.map((review) => (
                      <li key={review.id} className="list-group-item">
                        <p>
                          <strong>Author:</strong> {review.author}
                        </p>
                        <p>
                          <strong>Content:</strong> {review.content}
                        </p>
                        <p>
                          <strong>Sentiment:</strong> {review.sentiment}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No reviews available for this dealer.</p>
                )}
              </div>
            </div>
          ) : (
            <p className="text-muted">Select a dealer to view details.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dealers;
