import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/complaint-details.css";

export default function ComplaintDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [complaint, setComplaint] = useState(null);

  useEffect(() => {
    const complaints =
      JSON.parse(localStorage.getItem("complaints")) || [];

    let found;

    if (id) {
      found = complaints.find(
        (item) => String(item.id) === String(id)
      );
    } else {
      found = complaints[0];
    }

    setComplaint(found || null);
  }, [id]);

  function logout() {
    localStorage.removeItem("resolve360_user");
    localStorage.removeItem("role");

    navigate("/login");
  }

  if (!complaint) {
    return (
      <div className="authority-layout">

        <aside className="authority-sidebar">

          <div className="authority-logo">
            RESOLVE<span>360</span>
          </div>

          <nav>
            <button
              className="sidebar-link"
              onClick={() =>
                navigate("/authority/dashboard")
              }
            >
              🏠 Dashboard
            </button>

            <button
              className="sidebar-link active"
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

        <main className="authority-main">

          <button
            className="back-btn"
            onClick={() =>
              navigate("/authority/complaints")
            }
          >
            ← Back to Complaints
          </button>

          <div className="empty-state">
            <div>📭</div>

            <h3>
              Complaint not found
            </h3>

            <p>
              The complaint you're looking for
              does not exist.
            </p>
          </div>

        </main>

      </div>
    );
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
            className="sidebar-link"
            onClick={() =>
              navigate("/authority/dashboard")
            }
          >
            🏠 Dashboard
          </button>

          <button
            className="sidebar-link active"
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

        <button
          className="back-btn"
          onClick={() =>
            navigate("/authority/complaints")
          }
        >
          ← Back to Complaints
        </button>

        <div className="details-header">

          <div>

            <p className="authority-label">
              COMPLAINT DETAILS
            </p>

            <h1>
              {complaint.title ||
                complaint.subject ||
                "Complaint"}
            </h1>

            <p>
              Complaint ID: #{complaint.id}
            </p>

          </div>

          <span
            className={`status ${String(
              complaint.status || "Pending"
            )
              .toLowerCase()
              .replace(" ", "-")}`}
          >
            {complaint.status || "Pending"}
          </span>

        </div>

        {/* DETAILS */}

        <div className="details-grid">

          <div className="details-card">

            <h2>
              Complaint Information
            </h2>

            <div className="detail-row">

              <span>
                Category
              </span>

              <strong>
                {complaint.category ||
                  "General"}
              </strong>

            </div>

            <div className="detail-row">

              <span>
                Submitted By
              </span>

              <strong>
                {complaint.studentName ||
                  complaint.name ||
                  "Student"}
              </strong>

            </div>

            <div className="detail-row">

              <span>
                Hostel
              </span>

              <strong>
                {complaint.hostel ||
                  "Not specified"}
              </strong>

            </div>

            <div className="detail-row">

              <span>
                Date
              </span>

              <strong>
                {complaint.date ||
                  "Not specified"}
              </strong>

            </div>

          </div>

          <div className="details-card">

            <h2>
              Description
            </h2>

            <p className="description-text">
              {complaint.description ||
                "No description provided."}
            </p>

          </div>

        </div>

        {/* ACTION */}

        <div className="details-actions">

          <button
            className="primary-action"
            onClick={() =>
              navigate(
                `/authority/status-update/${complaint.id}`
              )
            }
          >
            Update Status →
          </button>

        </div>

      </main>

    </div>
  );
}