import { useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import "../../styles/admin.css";

const UploadResource = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "Coding",
    description: "",
    file: null,
    status: "Published",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "file") {
      setFormData({ ...formData, file: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Resource Uploaded Successfully (Demo)");
  };

  return (
    <AdminLayout>
      <div className="admin-wrapper">
        <div className="admin-container">
          <h2 className="page-title">Upload New Resource</h2>

          <form onSubmit={handleSubmit}>

            {/* ===== BASIC INFO CARD ===== */}
            <div className="card-section">
              <h3>Basic Information</h3>

              <input
                type="text"
                name="title"
                placeholder="Resource Title"
                value={formData.title}
                onChange={handleChange}
                className="admin-input"
                required
              />

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="admin-select"
              >
                <option>Coding</option>
                <option>Business</option>
                <option>Mathematics</option>
                <option>Languages</option>
                <option>Aptitude</option>
                <option>Human Resources</option>
              </select>

              <textarea
                name="description"
                rows="4"
                placeholder="Write resource description..."
                value={formData.description}
                onChange={handleChange}
                className="admin-textarea"
              />
            </div>

            {/* ===== FILE UPLOAD CARD ===== */}
            <div className="card-section">
              <h3>Upload File</h3>

              <div className="upload-box">
                <input
                  type="file"
                  name="file"
                  onChange={handleChange}
                  required
                />
                <p>Drag & Drop file here or click to upload</p>
              </div>

              {formData.file && (
                <p className="file-preview">
                  📁 {formData.file.name}
                </p>
              )}
            </div>

            {/* ===== STATUS CARD ===== */}
            <div className="card-section">
              <h3>Publishing Status</h3>

              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="status"
                    value="Published"
                    checked={formData.status === "Published"}
                    onChange={handleChange}
                  />
                  Published
                </label>

                <label>
                  <input
                    type="radio"
                    name="status"
                    value="Draft"
                    checked={formData.status === "Draft"}
                    onChange={handleChange}
                  />
                  Draft
                </label>
              </div>
            </div>

            <button type="submit" className="submit-btn">
              🚀 Publish Resource
            </button>

          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UploadResource;