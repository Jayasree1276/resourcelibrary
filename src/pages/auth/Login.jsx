import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../../styles/login.css";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [role, setRole] = useState("user");
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userAnswer !== captchaAnswer) {
      alert("Incorrect CAPTCHA!");
      generateCaptcha();
      setUserAnswer("");
      return;
    }

    login(role);



    
    if (role === "admin") {
      navigate("/admin/dashboard", { replace: true });
    } else {
      navigate("/home", { replace: true });
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">

        {/* LEFT SIDE - FORM */}
        <div className="login-form">
          <h2>Welcome Back </h2>
          <p className="subtitle">Please login to continue</p>

          <form onSubmit={handleSubmit}>

            <select
              className="input"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">Login as User</option>
              <option value="admin">Login as Admin</option>
            </select>

            <input
              type="email"
              placeholder="Email Address"
              className="input"
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="input"
              required
            />

            {/* CAPTCHA */}
            <div className="captcha-box">
              <span>Solve: {captchaQuestion}</span>
              <button type="button" onClick={generateCaptcha}>
                ↻
              </button>
            </div>

            <input
              type="text"
              placeholder="Enter CAPTCHA"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="input"
              required
            />

            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
        </div>

        {/* RIGHT SIDE - IMAGE */}
        <div className="login-image">
          <img
            src="https://cdn-icons-png.flaticon.com/512/295/295128.png"
            alt="login illustration"
          />
        </div>

      </div>
    </div>
  );
};

export default Login;