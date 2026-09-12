import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/done.css";

function Done() {
  const navigate = useNavigate();

  const [user, setUser] = useState({});

  useEffect(() => {
    const savedUser =
      JSON.parse(localStorage.getItem("resolve360_user")) || {};

    setUser(savedUser);
  }, []);

  return (
    <div className="done-page">

      <div className="done-card">

        <div className="done-icon">
          ✓
        </div>

        <div className="done-logo">
          RESOLVE<span>360</span>
        </div>

        <h1>
          Welcome, {user.name || "User"}!
        </h1>

        <p className="done-message">
          Your account has been created successfully.
        </p>

        {user.hostel && (
          <p className="done-hostel">
            Hostel: <strong>{user.hostel}</strong>
          </p>
        )}

        <div className="done-buttons">

          <button
            className="done-primary"
            onClick={() => {
              const role =
                localStorage.getItem("role") || "Student";

              if (role === "Student") {
                navigate("/student/dashboard");
              } else {
                navigate("/authority/dashboard");
              }
            }}
          >
            Go to Dashboard →
          </button>

          <button
            className="done-secondary"
            onClick={() => navigate("/login")}
          >
            Back to Login
          </button>

        </div>

      </div>

    </div>
  );
}

export default Done;