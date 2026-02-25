import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/login.css";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  const [captchaQuestion, setCaptchaQuestion] = useState("");
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [userAnswer, setUserAnswer] = useState("");

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    setCaptchaQuestion(`${num1} + ${num2}`);
    setCaptchaAnswer((num1 + num2).toString());
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (userAnswer !== captchaAnswer) {
      alert("Incorrect CAPTCHA!");
      generateCaptcha();
      setUserAnswer("");
      return;
    }

    alert("Registered Successfully 🎉");
    navigate("/");
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">

        <div className="login-left">
          <h2>Create Account ✨</h2>
          <p>Join EduLibrary today</p>

          <form onSubmit={handleSubmit}>

            <div className="form-field">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label>Register As</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="captcha-row">
              <span>Solve: {captchaQuestion}</span>
              <button type="button" onClick={generateCaptcha}>
                ↻
              </button>
            </div>

            <div className="form-field">
              <label>Enter CAPTCHA</label>
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                required
              />
            </div>

            <button className="login-btn">Register</button>

          </form>
        </div>

        <div className="login-right">
          <div className="login-illustration">
            📝
          </div>
        </div>

      </div>
    </div>
  );
};

export default Register;