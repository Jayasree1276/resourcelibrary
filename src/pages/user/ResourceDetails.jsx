import { useParams } from "react-router-dom";
import { useState } from "react";
import UserLayout from "../../components/user/UserLayout";
import "../../styles/user.css";

const ResourceDetails = () => {
  const { id } = useParams();
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!feedback) {
      alert("Please enter feedback");
      return;
    }
    alert("Feedback submitted (Demo)");
    setFeedback("");
  };

  return (
    <UserLayout>
      <div className="resource-details">
        <h1 className="page-title">Resource Details</h1>

        <div className="resource-info">
          <h2>Resource ID: {id}</h2>
          <p>
            This is a detailed description of the selected educational resource.
            It includes notes, guides, and study materials.
          </p>

          <button className="primary-btn">Download Resource</button>
        </div>

        <div className="feedback-section">
          <h3>Leave Feedback</h3>

          <form onSubmit={handleSubmit}>
            <textarea
              className="feedback-input"
              placeholder="Write your feedback..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />

            <button type="submit" className="primary-btn">
              Submit Feedback
            </button>
          </form>
        </div>
      </div>
    </UserLayout>
  );
};

export default ResourceDetails;