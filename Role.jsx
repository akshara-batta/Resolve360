import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/role.css";

const roles = [
  "Student",
  "Worker",
  "Supervisor",
  "Admin"
];

function Role() {
  const navigate = useNavigate();

  const savedUser =
    JSON.parse(localStorage.getItem("resolve360_user")) || {};

  const [role, setRole] = useState("");
  const [hostel, setHostel] = useState("");
  const [error, setError] = useState("");

  const handleContinue = () => {
    setError("");

    console.log("SELECTED ROLE:", role);

    // ==============================
    // NO ROLE SELECTED
    // ==============================

    if (!role) {
      setError("Please select a role.");
      return;
    }

    // ==============================
    // STUDENT HOSTEL REQUIRED
    // ==============================

    if (role === "Student" && !hostel) {
      setError("Please select your hostel.");
      return;
    }

    // ==============================
    // SAVE USER
    // ==============================

    const updatedUser = {
      ...savedUser,
      role: role,
      hostel: role === "Student" ? hostel : ""
    };

    localStorage.setItem(
      "resolve360_user",
      JSON.stringify(updatedUser)
    );

    localStorage.setItem("role", role);

    console.log("SAVED ROLE:", localStorage.getItem("role"));

    // ==============================
    // ADMIN
    // ==============================

    if (role === "Admin") {
      console.log("GOING TO ADMIN DASHBOARD");

      navigate("/admin/dashboard");

      return;
    }

    // ==============================
    // SUPERVISOR
    // ==============================

    if (role === "Supervisor") {
      console.log("GOING TO AUTHORITY DASHBOARD");

      navigate("/authority/dashboard");

      return;
    }

    // ==============================
    // WORKER
    // ==============================

    if (role === "Worker") {
      console.log("GOING TO AUTHORITY DASHBOARD");

      navigate("/authority/dashboard");

      return;
    }

    // ==============================
    // STUDENT
    // ==============================

    if (role === "Student") {
      console.log("GOING TO STUDENT DASHBOARD");

      navigate("/student/dashboard");

      return;
    }
  };

  return (
    <div className="role-page">

      <div className="role-card">

        {/* ==============================
            LOGO
        ============================== */}

        <div className="auth-logo">
          RESOLVE<span>360</span>
        </div>

        {/* ==============================
            HEADING
        ============================== */}

        <p className="auth-label">
          ACCOUNT TYPE
        </p>

        <h1>
          Choose your role
        </h1>

        <p className="auth-subtitle">
          Your role decides which dashboard you see.
        </p>

        {/* ==============================
            ROLE OPTIONS
        ============================== */}

        <div className="role-grid">

          {roles.map((item) => (
            <button
              key={item}
              type="button"
              className={
                role === item
                  ? "role-option selected"
                  : "role-option"
              }
              onClick={() => {
                setRole(item);
                setError("");

                if (item !== "Student") {
                  setHostel("");
                }
              }}
            >
              {item}
            </button>
          ))}

        </div>

        {/* ==============================
            STUDENT HOSTEL
        ============================== */}

        {role === "Student" && (
          <div className="hostel-section">

            <p>
              Select Hostel
            </p>

            <div className="hostel-grid">

              <button
                type="button"
                className={
                  hostel === "Girls Hostel"
                    ? "role-option selected"
                    : "role-option"
                }
                onClick={() => {
                  setHostel("Girls Hostel");
                  setError("");
                }}
              >
                Girls Hostel
              </button>

              <button
                type="button"
                className={
                  hostel === "Boys Hostel"
                    ? "role-option selected"
                    : "role-option"
                }
                onClick={() => {
                  setHostel("Boys Hostel");
                  setError("");
                }}
              >
                Boys Hostel
              </button>

            </div>

          </div>
        )}

        {/* ==============================
            ERROR
        ============================== */}

        {error && (
          <p className="auth-error">
            {error}
          </p>
        )}

        {/* ==============================
            CONTINUE
        ============================== */}

        <button
          type="button"
          className="auth-submit"
          onClick={handleContinue}
        >
          Continue →
        </button>

      </div>

    </div>
  );
}

export default Role;