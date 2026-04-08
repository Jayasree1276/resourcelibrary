import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import UserLayout from "../../components/user/UserLayout";
import "../../styles/user.css";
import { getResourceById } from "../../utils/resourceStore";

const ResourceDetails = () => {
  const { id } = useParams();
  const [feedback, setFeedback] = useState("");
  const [resource, setResource] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 🔷 Fetch from backend
  useEffect(() => {
    setIsLoading(true);
    getResourceById(id)
      .then((data) => {
        setResource(data);
      })
      .catch((err) => {
        console.error(err);
        setResource(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!feedback.trim()) {
      alert("Please enter feedback");
      return;
    }
    alert("Feedback submitted (Demo)");
    setFeedback("");
  };

  // 🔷 If not found
  if (isLoading) {
    return (
      <UserLayout>
        <div className="resource-details resource-details-card">
          <h1 className="page-title">Loading Resource</h1>
          <p>Please wait while we fetch the resource details.</p>
        </div>
      </UserLayout>
    );
  }

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
          {/* 🔷 Subject instead of category */}
          <span className="resource-pill">{resource.subject}</span>

          <div className="resource-details-meta">
            <p><strong>Type:</strong> {resource.type}</p>
            <p><strong>Access:</strong> Download from the link below</p>
          </div>

          {/* 🔥 Download Button */}
          <a href={resource.fileUrl} target="_blank" rel="noreferrer">
            <button className="primary-btn">Download Resource</button>
          </a>
        </div>

        {/* 🔷 Feedback Section (unchanged) */}
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
