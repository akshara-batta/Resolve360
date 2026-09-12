import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import "../styles/register.css";

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");
  const [gender, setGender] = useState("");

  const [error, setError] = useState("");

  const handleRegister = (e) => {

    e.preventDefault();

    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const user = {
      name,
      email,
      username,
      password,
      gender
    };

    localStorage.setItem(
      "registeredUser",
      JSON.stringify(user)
    );

    // Also keep the current user information
    localStorage.setItem(
      "resolve360_user",
      JSON.stringify(user)
    );

    navigate("/login");
  };

  return (

    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-logo">
          RESOLVE<span>360</span>
        </div>

        <p className="auth-label">
          CREATE ACCOUNT
        </p>

        <h1>
          Register
        </h1>

        <p className="auth-subtitle">
          Create your Resolve360 account.
        </p>

        <form onSubmit={handleRegister}>

          {/* NAME */}

          <div className="input-group">

            <label>
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              required
            />

          </div>


          {/* EMAIL */}

          <div className="input-group">

            <label>
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

          </div>


          {/* USERNAME */}

          <div className="input-group">

            <label>
              Username
            </label>

            <input
              type="text"
              placeholder="Choose a username"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              required
            />

          </div>


          {/* PASSWORD */}

          <div className="input-group">

            <label>
              Password
            </label>

            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />

          </div>


          {/* CONFIRM PASSWORD */}

          <div className="input-group">

            <label>
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              required
            />

          </div>


          {/* GENDER */}

          <div className="input-group">

            <label>
              Gender
            </label>

            <select
              value={gender}
              onChange={(e) =>
                setGender(e.target.value)
              }
              required
            >

              <option value="">
                Select gender
              </option>

              <option value="Female">
                Female
              </option>

              <option value="Male">
                Male
              </option>

              <option value="Other">
                Other
              </option>

            </select>

          </div>


          {/* ERROR */}

          {error && (

            <p className="auth-error">
              {error}
            </p>

          )}


          {/* BUTTON */}

          <button
            type="submit"
            className="auth-submit"
          >
            Create Account →
          </button>

        </form>


        <p className="auth-switch">

          Already have an account?{" "}

          <Link to="/login">
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Register;