import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import UserLayout from "../../components/user/UserLayout";
import { resources } from "../../data/resources";
import "../../styles/user.css";

const ResourceDetails = () => {
  const { id } = useParams();
  const [feedback, setFeedback] = useState("");

  const resource = useMemo(
    () => resources.find((item) => item.id === Number(id)),
    [id]
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!feedback.trim()) {
      alert("Please enter feedback");
      return;
    }
    alert("Feedback submitted (Demo)");
    setFeedback("");
  };

  if (!resource) {
    return (
      <UserLayout>
        <div className="resource-details resource-details-card">
          <h1 className="page-title">Resource Not Found</h1>
          <p>This resource does not exist or was removed.</p>
          <Link to="/home" className="primary-btn" style={{ width: "fit-content" }}>
            Back to Dashboard
          </Link>
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <div className="resource-details">
        <h1 className="page-title">{resource.title}</h1>

        <div className="resource-info resource-details-card">
          <span className="resource-pill">{resource.category}</span>
          <p>{resource.description}</p>

          <div className="resource-details-meta">
            <p><strong>Size:</strong> {resource.size}</p>
            <p><strong>Rating:</strong> {resource.rating}</p>
            <p><strong>Format:</strong> {resource.format}</p>
            <p><strong>Author:</strong> {resource.author}</p>
            <p><strong>Last Updated:</strong> {resource.lastUpdated}</p>
          </div>

          <button className="primary-btn">Download Resource</button>
        </div>

        <div className="feedback-section resource-details-card">
          <h3>Leave Feedback</h3>
          <form onSubmit={handleSubmit}>
            <textarea
              className="feedback-input"
              placeholder="Write your feedback..."
              value={feedback}
              onChange={(event) => setFeedback(event.target.value)}
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
