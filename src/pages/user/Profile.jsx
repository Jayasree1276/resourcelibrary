import { useState } from "react";
import UserLayout from "../../components/user/UserLayout";
import "../../styles/user.css";

const Profile = () => {
  const [formData, setFormData] = useState({
    fullName: "Akash Kumar",
    nickName: "Akash",
    gender: "Male",
    country: "India",
    language: "English",
    timeZone: "GMT+5:30",
    email: "akash@email.com",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    alert("Profile Updated Successfully 🎉");
  };

  return (
    <UserLayout>
      <div className="profile-container">

        {/* Welcome Header */}
        <div className="profile-header">
          <h2>Welcome, {formData.fullName.split(" ")[0]}</h2>
          <p>Manage your profile information</p>
        </div>

        {/* Profile Card */}
        <div className="profile-card">

          {/* Top Section */}
          <div className="profile-top">
            <div className="profile-avatar">
              {formData.fullName.charAt(0)}
            </div>

            <div>
              <h3>{formData.fullName}</h3>
              <p>{formData.email}</p>
            </div>

            <button className="edit-btn-profile">
              Edit
            </button>
          </div>

          {/* Form Grid */}
          <div className="profile-grid">

            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Nick Name</label>
              <input
                type="text"
                name="nickName"
                value={formData.nickName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Language</label>
              <input
                type="text"
                name="language"
                value={formData.language}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Time Zone</label>
              <input
                type="text"
                name="timeZone"
                value={formData.timeZone}
                onChange={handleChange}
              />
            </div>

          </div>

          <button className="save-profile-btn" onClick={handleSave}>
            Save Changes
          </button>

        </div>

      </div>
    </UserLayout>
  );
};

export default Profile;