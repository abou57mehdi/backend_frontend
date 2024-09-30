import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";  // Custom hook to check authentication

function PostReview() {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();  // Use this hook to check if the user is logged in
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [sentiment, setSentiment] = useState("positive");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      alert("You need to log in to post a review.");
      return;
    }

    const reviewData = { author, content, sentiment };

    fetch(`accounts/api/dealers/${id}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}` // Include token for authentication
      },
      body: JSON.stringify(reviewData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          navigate(`/dealer/${id}`);
        } else {
          alert("Failed to submit review.");
        }
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Post a Review for Dealer</h2>
      <form onSubmit={handleSubmit} className="form-group">
        <div className="mb-3">
          <label htmlFor="author" className="form-label">Your Name</label>
          <input
            type="text"
            id="author"
            className="form-control"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="content" className="form-label">Review Content</label>
          <textarea
            id="content"
            className="form-control"
            rows="4"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your review here"
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="sentiment" className="form-label">Sentiment</label>
          <select
            id="sentiment"
            className="form-select"
            value={sentiment}
            onChange={(e) => setSentiment(e.target.value)}
          >
            <option value="positive">Positive</option>
            <option value="neutral">Neutral</option>
            <option value="negative">Negative</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary btn-block">Submit Review</button>
      </form>
    </div>
  );
}

export default PostReview;
