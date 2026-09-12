import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/admin-dashboard.css";
function AdminDashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const savedUser =
      JSON.parse(
        localStorage.getItem("resolve360_user")
      ) || {};

    const savedComplaints =
      JSON.parse(
        localStorage.getItem("complaints")
      ) || [];

    setUser(savedUser);
    setComplaints(savedComplaints);
  }, []);

  const totalComplaints = complaints.length;

  const pendingComplaints = complaints.filter(
    (complaint) =>
      complaint.status === "Pending" ||
      !complaint.status
  ).length;

  const inProgressComplaints = complaints.filter(
    (complaint) =>
      complaint.status === "In Progress"
  ).length;

  const resolvedComplaints = complaints.filter(
    (complaint) =>
      complaint.status === "Resolved"
  ).length;

  const anonymousComplaints = complaints.filter(
    (complaint) =>
      complaint.anonymous === true
  ).length;

  const breachedComplaints = complaints.filter(
    (complaint) =>
      complaint.slaStatus === "Breached"
  ).length;

  const handleLogout = () => {
    localStorage.removeItem("resolve360_user");
    localStorage.removeItem("role");
    localStorage.removeItem("isLoggedIn");

    navigate("/login");
  };

  return (
    <div className="admin-dashboard">

      {/* =========================
          HEADER
      ========================= */}

      <header className="admin-header">

        <div className="admin-logo">
          RESOLVE<span>360</span>
        </div>

        <div className="admin-header-right">

          <div className="admin-user">
            <strong>
              {user.name || "Admin"}
            </strong>

            <span>
              Admin
            </span>
          </div>

          <button
            className="admin-logout"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </header>


      {/* =========================
          MAIN
      ========================= */}

      <main className="admin-main">

        {/* WELCOME */}

        <section className="admin-welcome">

          <p>
            ADMIN PORTAL
          </p>

          <h1>
            Welcome back 👋
          </h1>

          <h2>
            {user.name || "Admin"}
          </h2>

          <span>
            Manage complaints, anonymous reports
            and SLA settings from one place.
          </span>

        </section>


        {/* =========================
            STATISTICS
        ========================= */}

        <section className="admin-stats">

          <div className="admin-stat-card">

            <div className="stat-icon">
              📋
            </div>

            <p>
              Total Complaints
            </p>

            <h2>
              {totalComplaints}
            </h2>

          </div>


          <div className="admin-stat-card">

            <div className="stat-icon">
              ⏳
            </div>

            <p>
              Pending
            </p>

            <h2>
              {pendingComplaints}
            </h2>

          </div>


          <div className="admin-stat-card">

            <div className="stat-icon">
              🔄
            </div>

            <p>
              In Progress
            </p>

            <h2>
              {inProgressComplaints}
            </h2>

          </div>


          <div className="admin-stat-card">

            <div className="stat-icon">
              ✓
            </div>

            <p>
              Resolved
            </p>

            <h2>
              {resolvedComplaints}
            </h2>

          </div>


          <div className="admin-stat-card">

            <div className="stat-icon">
              ⚠️
            </div>

            <p>
              SLA Breached
            </p>

            <h2>
              {breachedComplaints}
            </h2>

          </div>

        </section>


        {/* =========================
            QUICK ACTIONS
        ========================= */}

        <section className="admin-section">

          <div className="section-heading">

            <h2>
              Quick Actions
            </h2>

            <p>
              Manage Resolve360 from here.
            </p>

          </div>


          <div className="admin-action-grid">

            {/* ALL COMPLAINTS */}

            <button
              className="admin-action-card"
              onClick={() =>
                navigate("/authority/complaints")
              }
            >

              <div className="action-icon">
                📋
              </div>

              <div>
                <h3>
                  All Complaints
                </h3>

                <p>
                  View and manage all complaints.
                </p>
              </div>

              <span>
                →
              </span>

            </button>


            {/* ANONYMOUS */}

            <button
              className="admin-action-card"
              onClick={() =>
                navigate(
                  "/admin/anonymous-complaints"
                )
              }
            >

              <div className="action-icon">
                🕵️
              </div>

              <div>
                <h3>
                  Anonymous Complaints
                </h3>

                <p>
                  Review complaints submitted anonymously.
                </p>
              </div>

              <span>
                →
              </span>

            </button>


            {/* SLA */}

            <button
              className="admin-action-card"
              onClick={() =>
                navigate("/admin/sla-settings")
              }
            >

              <div className="action-icon">
                ⏱️
              </div>

              <div>
                <h3>
                  SLA Settings
                </h3>

                <p>
                  Configure response and resolution times.
                </p>
              </div>

              <span>
                →
              </span>

            </button>

          </div>

        </section>


        {/* =========================
            RECENT COMPLAINTS
        ========================= */}

        <section className="admin-section">

          <div className="section-heading">

            <div>

              <h2>
                Recent Complaints
              </h2>

              <p>
                Latest complaints submitted by students.
              </p>

            </div>

            <button
              className="view-all-btn"
              onClick={() =>
                navigate("/authority/complaints")
              }
            >
              View All →
            </button>

          </div>


          {complaints.length === 0 ? (

            <div className="empty-admin">

              <div>
                📭
              </div>

              <h3>
                No complaints yet
              </h3>

              <p>
                Complaints submitted by students
                will appear here.
              </p>

            </div>

          ) : (

            <div className="recent-list">

              {complaints
                .slice(-5)
                .reverse()
                .map((complaint, index) => (

                  <div
                    className="recent-item"
                    key={
                      complaint.id ||
                      complaint.createdAt ||
                      index
                    }
                  >

                    <div>

                      <strong>
                        {complaint.category ||
                          "General Complaint"}
                      </strong>

                      <p>
                        {complaint.description ||
                          "No description"}
                      </p>

                    </div>

                    <span>
                      {complaint.status ||
                        "Pending"}
                    </span>

                  </div>

                ))}

            </div>

          )}

        </section>

      </main>

    </div>
  );
}

export default AdminDashboard;