import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/authority-dashboard.css";

export default function AuthorityDashboard() {
  const navigate = useNavigate();

  const [complaints, setComplaints] = useState([]);

  const user =
    JSON.parse(localStorage.getItem("resolve360_user")) || {};

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("complaints")) || [];

    setComplaints(saved);
  }, []);

  const total = complaints.length;

  const pending = complaints.filter(
    (item) => item.status === "Pending"
  ).length;

  const inProgress = complaints.filter(
    (item) => item.status === "In Progress"
  ).length;

  const resolved = complaints.filter(
    (item) => item.status === "Resolved"
  ).length;

  function logout() {
    localStorage.removeItem("resolve360_user");
    localStorage.removeItem("role");

    navigate("/login");
  }

  return (
    <div className="authority-layout">

      {/* SIDEBAR */}

      <aside className="authority-sidebar">

        <div className="authority-logo">
          RESOLVE<span>360</span>
        </div>

        <nav>

          <button
            className="sidebar-link active"
            onClick={() =>
              navigate("/authority/dashboard")
            }
          >
            🏠 Dashboard
          </button>

          <button
            className="sidebar-link"
            onClick={() =>
              navigate("/authority/complaints")
            }
          >
            📋 Complaints
          </button>

        </nav>

        <button
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </button>

      </aside>

      {/* MAIN */}

      <main className="authority-main">

        <div className="authority-header">

          <div>
            <p className="authority-label">
              AUTHORITY PORTAL
            </p>

            <h1>
              Welcome back 👋
            </h1>

            <p>
              Manage and resolve complaints efficiently.
            </p>
          </div>

          <div className="authority-user">

            <div className="user-avatar">
              {user.name
                ? user.name.charAt(0).toUpperCase()
                : "A"}
            </div>

            <div>
              <strong>
                {user.name || "Authority"}
              </strong>

              <span>
                {user.role || "Admin"}
              </span>
            </div>

          </div>

        </div>

        {/* STATS */}

        <div className="stats-grid">

          <div className="stat-card">
            <span>📋</span>
            <p>Total Complaints</p>
            <h2>{total}</h2>
          </div>

          <div className="stat-card">
            <span>⏳</span>
            <p>Pending</p>
            <h2>{pending}</h2>
          </div>

          <div className="stat-card">
            <span>🔄</span>
            <p>In Progress</p>
            <h2>{inProgress}</h2>
          </div>

          <div className="stat-card">
            <span>✓</span>
            <p>Resolved</p>
            <h2>{resolved}</h2>
          </div>

        </div>

        {/* QUICK ACTIONS */}

        <section className="authority-section">

          <h2>
            Quick Actions
          </h2>

          <div className="quick-actions">

            <button
              onClick={() =>
                navigate("/authority/complaints")
              }
            >
              <span>📋</span>
              <div>
                <strong>View Complaints</strong>
                <small>
                  View and manage all complaints
                </small>
              </div>
            </button>

            <button
              onClick={() =>
                navigate("/authority/status-update")
              }
            >
              <span>🔄</span>
              <div>
                <strong>Update Status</strong>
                <small>
                  Update complaint progress
                </small>
              </div>
            </button>

          </div>

        </section>

        {/* RECENT COMPLAINTS */}

        <section className="authority-section">

          <div className="section-heading">

            <h2>
              Recent Complaints
            </h2>

            <button
              onClick={() =>
                navigate("/authority/complaints")
              }
            >
              View All →
            </button>

          </div>

          {complaints.length === 0 ? (

            <div className="empty-state">
              <div>📭</div>
              <h3>No complaints yet</h3>
              <p>
                Complaints submitted by students
                will appear here.
              </p>
            </div>

          ) : (

            <div className="recent-list">

              {complaints
                .slice(0, 5)
                .map((complaint) => (

                  <div
                    className="recent-item"
                    key={complaint.id}
                    onClick={() =>
                      navigate(
                        `/authority/complaint-details/${complaint.id}`
                      )
                    }
                  >

                    <div>

                      <strong>
                        {complaint.title ||
                          complaint.subject ||
                          "Complaint"}
                      </strong>

                      <p>
                        {complaint.category ||
                          "General"}
                      </p>

                    </div>

                    <span
                      className={`status ${String(
                        complaint.status || "Pending"
                      )
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
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