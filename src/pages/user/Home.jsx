import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserLayout from "../../components/user/UserLayout";
import "../../styles/user.css";

const Home = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentSlide, setCurrentSlide] = useState(0);

  // 🔥 Hero Banners with Images
  const banners = [
    {
      title: "Master Modern Coding",
      subtitle: "Build real-world applications with structured coding resources",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475",
    },
    {
      title: "Business & Strategy Essentials",
      subtitle: "Learn finance, management and business growth strategies",
      image:
        "https://images.unsplash.com/photo-1507679799987-c73779587ccf",
    },
    {
      title: "Aptitude & Interview Preparation",
      subtitle: "Crack competitive exams and job interviews with confidence",
      image:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644",
    },
  ];

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === banners.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // 🔥 Resources
  const resources = [
    { id: 1, title: "React Complete Guide", category: "Coding", size: "2.1 MB", rating: 4.7 },
    { id: 2, title: "HR Management Basics", category: "Human Resources", size: "1.4 MB", rating: 4.3 },
    { id: 3, title: "Advanced Mathematics Notes", category: "Mathematics", size: "3.2 MB", rating: 4.8 },
    { id: 4, title: "English Communication Skills", category: "Languages", size: "1.9 MB", rating: 4.5 },
    { id: 5, title: "Quantitative Aptitude Tricks", category: "Aptitude", size: "2.3 MB", rating: 4.6 },
    { id: 6, title: "Business Strategy Fundamentals", category: "Business", size: "2.8 MB", rating: 4.4 },
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

  const filteredResources =
    selectedCategory === "All"
      ? resources
      : resources.filter((res) => res.category === selectedCategory);

  return (
    <UserLayout>

      {/* 🔥 HERO SECTION */}
      <div
        className="highlight-banner"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${banners[currentSlide].image})`,
        }}
      >
        <div className="banner-left">
          <h2>{banners[currentSlide].title}</h2>
          <p>{banners[currentSlide].subtitle}</p>
          <button className="primary-btn">Explore Now</button>

          <div className="banner-dots">
            {banners.map((_, index) => (
              <span
                key={index}
                className={`dot ${
                  currentSlide === index ? "active-dot" : ""
                }`}
                onClick={() => setCurrentSlide(index)}
              ></span>
            ))}
          </div>
        </div>
      </div>

      <h1 className="page-title">Explore Educational Resources</h1>

      {/* 🔥 CATEGORY FILTER */}
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

      {/* 🔥 RESOURCE GRID */}
      <div className="card-grid">
        {filteredResources.map((resource) => (
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
        ))}
      </div>

    </UserLayout>
  );
};

export default Home;