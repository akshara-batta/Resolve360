import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/login.css";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    setError("");

    const registeredUser =
      JSON.parse(localStorage.getItem("registeredUser")) || null;

    if (!registeredUser) {
      setError("No registered account found. Please register first.");
      return;
    }

    if (
      email.trim() !== registeredUser.email ||
      password !== registeredUser.password
    ) {
      setError("Invalid email or password.");
      return;
    }

    // Save logged-in user's information
    localStorage.setItem(
      "resolve360_user",
      JSON.stringify(registeredUser)
    );

    // Go to role selection
    navigate("/role");
  }

  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="auth-logo">
          RESOLVE<span>360</span>
        </div>

        <p className="auth-label">WELCOME BACK</p>

        <h1>Login</h1>

        <p className="auth-subtitle">
          Login to continue to Resolve360.
        </p>

        <form onSubmit={handleLogin}>

          <div className="input-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <p className="auth-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="auth-submit"
          >
            Login →
          </button>

        </form>

        <p className="auth-switch">
          Don't have an account?{" "}
          <Link to="/register">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}