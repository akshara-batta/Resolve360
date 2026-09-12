import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/dashboard.css";

function Dashboard() {

  const navigate = useNavigate();

  const [user, setUser] = useState({});

  const [complaints, setComplaints] = useState([]);

  useEffect(() => {

    const savedUser =
      JSON.parse(
        localStorage.getItem("resolve360_user")
      ) || {};

    setUser(savedUser);

    const savedComplaints =
      JSON.parse(
        localStorage.getItem("complaints")
      ) || [];

    setComplaints(savedComplaints);

  }, []);

  const handleLogout = () => {

    localStorage.removeItem(
      "resolve360_user"
    );

    localStorage.removeItem(
      "role"
    );

    localStorage.removeItem(
      "isLoggedIn"
    );

    navigate("/login");

  };

  const myComplaints = complaints.filter(
    (complaint) =>
      complaint.email === user.email ||
      complaint.studentEmail === user.email ||
      complaint.userEmail === user.email
  );

  return (

    <div className="dashboard-page">

      {/* HEADER */}

      <header className="dashboard-header">

        <div className="dashboard-logo">
          R360
        </div>

        <div className="header-right">

          <span>
            {user.name || "User"}
          </span>

          <button
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </header>


      {/* MAIN */}

      <main className="dashboard-main">

        {/* WELCOME */}

        <div className="welcome-section">

          <p className="small-text">
            Welcome back 👋
          </p>

          <h1>
            {user.name || "User"}
          </h1>

          <p>
            {user.role || "Student"} Dashboard
          </p>

          {user.hostel && (

            <p className="hostel-text">
              {user.hostel}
            </p>

          )}

        </div>


        {/* CARDS */}

        <div className="dashboard-cards">


          {/* RAISE ISSUE */}

          <div
            className="dashboard-card"
            onClick={() =>
              navigate("/student/raise-issue")
            }
          >

            <div className="card-icon">
              📝
            </div>

            <h2>
              Raise an Issue
            </h2>

            <p>
              Report a new complaint or problem.
            </p>

          </div>


          {/* MY COMPLAINTS */}
{/* MY COMPLAINTS */}

<div
  className="dashboard-card"
  onClick={() =>
    alert(
      `You have ${myComplaints.length} complaint(s) submitted`
    )
  }
>

  <div className="card-icon">
    📋
  </div>

  <h2>
    My Complaints
  </h2>

  <p>
    Total complaints submitted.
  </p>

  <span>
    {myComplaints.length} complaint
    {myComplaints.length !== 1
      ? "s"
      : ""}
  </span>

</div>


          {/* QUICK RESOLUTION */}

          <div
            className="dashboard-card"
            onClick={() =>
              alert(
                "Quick Resolution section coming soon!"
              )
            }
          >

            <div className="card-icon">
              ⚡
            </div>

            <h2>
              Quick Resolution
            </h2>

            <p>
              Find frequently reported issues.
            </p>

          </div>


        </div>


        {/* WELCOME BUTTON */}

        <button
          className="welcome-btn"
          onClick={() =>
            navigate("/done")
          }
        >
          View Welcome Page
        </button>

      </main>

    </div>
  );
}

export default Dashboard;