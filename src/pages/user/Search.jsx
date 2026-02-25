import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserLayout from "../../components/user/UserLayout";
import "../../styles/user.css";

const Search = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const resources = [
    { id: 1, title: "React Complete Guide", category: "Coding", size: "2.1 MB", rating: 4.7 },
    { id: 2, title: "HR Management Basics", category: "Human Resources", size: "1.4 MB", rating: 4.3 },
    { id: 3, title: "Advanced Mathematics Notes", category: "Mathematics", size: "3.2 MB", rating: 4.8 },
    { id: 4, title: "English Communication Skills", category: "Languages", size: "1.9 MB", rating: 4.5 },
    { id: 5, title: "Quantitative Aptitude Tricks", category: "Aptitude", size: "2.3 MB", rating: 4.6 },
    { id: 6, title: "Business Strategy Fundamentals", category: "Business", size: "2.8 MB", rating: 4.4 },
    { id: 7, title: "Java Programming Notes", category: "Coding", size: "2.5 MB", rating: 4.6 },
    { id: 8, title: "Corporate Ethics Guide", category: "Business", size: "1.7 MB", rating: 4.2 },
  ];

  const categories = [
    "All",
    "Coding",
    "Human Resources",
    "Mathematics",
    "Languages",
    "Aptitude",
    "Business",
  ];

  const filteredResources = resources.filter((res) => {
    const matchesCategory =
      selectedCategory === "All" || res.category === selectedCategory;

    const matchesSearch = res.title
      .toLowerCase()
      .includes(query.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <UserLayout>
      <h1 className="page-title">Search Resources</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by title..."
        className="search-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* Category Filter */}
      <div className="category-bar">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-btn ${
              selectedCategory === cat ? "active-category" : ""
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="card-grid">
        {filteredResources.length === 0 ? (
          <p>No resources found.</p>
        ) : (
          filteredResources.map((resource) => (
            <div key={resource.id} className="resource-card advanced-card">
              <div className="card-header">
                <span className="subject-badge">{resource.category}</span>
              </div>

              <h3>{resource.title}</h3>

              <div className="card-meta">
                <span>📁 {resource.size}</span>
                <span>⭐ {resource.rating}</span>
              </div>

              <button
                className="primary-btn"
                onClick={() => navigate(`/resource/${resource.id}`)}
              >
                View Details
              </button>
            </div>
          ))
        )}
      </div>
    </UserLayout>
  );
};

export default Search;