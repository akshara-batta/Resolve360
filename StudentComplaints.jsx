import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/student-complaints.css";

function StudentComplaints() {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const savedUser =
      JSON.parse(localStorage.getItem("resolve360_user")) || {};

    const savedComplaints =
      JSON.parse(localStorage.getItem("complaints")) || [];

    setUser(savedUser);

    const myComplaints = savedComplaints.filter(
      (complaint) =>
        complaint.email === savedUser.email ||
        complaint.studentEmail === savedUser.email
    );

    setComplaints(myComplaints);
  }, []);

  function getStatusClass(status) {
    if (status === "Resolved") {
      return "status-resolved";
    }

    if (status === "In Progress") {
      return "status-progress";
    }

    return "status-pending";
  }

  function handleRaiseAnother() {
    navigate("/student/raise-issue");
  }

  function handleDashboard() {
    navigate("/student/dashboard");
  }

  return (
    <div className="complaints-page">

      {/* ================= HEADER ================= */}

      <header className="complaints-header">

        <div
          className="complaints-logo"
          onClick={handleDashboard}
        >
          RESOLVE<span>360</span>
        </div>

        <button
          className="complaints-back-btn"
          onClick={handleDashboard}
        >
          ← Dashboard
        </button>

      </header>


      {/* ================= MAIN ================= */}

      <main className="complaints-main">

        {/* TITLE */}

        <section className="complaints-title">

          <div className="complaints-badge">
            STUDENT PORTAL
          </div>

          <h1>
            My <span>Complaints</span>
          </h1>

          <p>
            Track your reported issues and see their latest
            resolution status.
          </p>

        </section>


        {/* ================= USER INFO ================= */}

        <div className="student-info-card">

          <div className="student-avatar">
            {user.name
              ? user.name.charAt(0).toUpperCase()
              : "S"}
          </div>

          <div className="student-info-text">

            <small>LOGGED IN AS</small>

            <h3>
              {user.name || "Student"}
            </h3>

            <p>
              {user.email || "student@resolve360.com"}
            </p>

          </div>

          <div className="complaint-count">

            <small>TOTAL COMPLAINTS</small>

            <strong>
              {complaints.length}
            </strong>

          </div>

        </div>


        {/* ================= NO COMPLAINTS ================= */}

        {complaints.length === 0 ? (

          <div className="empty-complaints">

            <div className="empty-icon">
              📋
            </div>

            <h2>
              No complaints yet
            </h2>

            <p>
              You haven't reported any issues yet.
            </p>

            <button
              onClick={handleRaiseAnother}
            >
              Raise Your First Issue →
            </button>

          </div>

        ) : (

          /* ================= COMPLAINT LIST ================= */

          <div className="complaints-list">

            {complaints
              .slice()
              .reverse()
              .map((complaint) => (

                <div
                  className="complaint-card"
                  key={complaint.id}
                >

                  {/* TOP */}

                  <div className="complaint-top">

                    <div>

                      <span className="complaint-id">
                        #{String(complaint.id).slice(-6)}
                      </span>

                      <h2>
                        {complaint.title}
                      </h2>

                    </div>

                    <span
                      className={`status-pill ${getStatusClass(
                        complaint.status
                      )}`}
                    >
                      {complaint.status || "Pending"}
                    </span>

                  </div>


                  {/* DETAILS */}

                  <div className="complaint-details">

                    <div>
                      <small>
                        CATEGORY
                      </small>

                      <p>
                        {complaint.category || "Other"}
                      </p>
                    </div>


                    <div>
                      <small>
                        PRIORITY
                      </small>

                      <p>
                        {complaint.priority || "Medium"}
                      </p>
                    </div>


                    <div>
                      <small>
                        LOCATION
                      </small>

                      <p>
                        {complaint.location || "Not provided"}
                      </p>
                    </div>


                    <div>
                      <small>
                        SUBMITTED
                      </small>

                      <p>
                        {complaint.date || "Today"}
                      </p>
                    </div>

                  </div>


                  {/* DESCRIPTION */}

                  <div className="complaint-description">

                    <small>
                      DESCRIPTION
                    </small>

                    <p>
                      {complaint.description}
                    </p>

                  </div>


                  {/* AUTHORITY RESPONSE */}

                  {complaint.adminNote && (

                    <div className="authority-note">

                      <small>
                        AUTHORITY RESPONSE
                      </small>

                      <p>
                        {complaint.adminNote}
                      </p>

                    </div>

                  )}


                  {/* TIMELINE */}

                  <div className="complaint-timeline">

                    {/* STEP 1 */}

                    <div className="timeline-step active">

                      <span>
                        ✓
                      </span>

                      <p>
                        Submitted
                      </p>

                    </div>


                    {/* STEP 2 */}

                    <div
                      className={
                        complaint.status === "In Progress" ||
                        complaint.status === "Resolved"
                          ? "timeline-step active"
                          : "timeline-step"
                      }
                    >

                      <span>
                        2
                      </span>

                      <p>
                        In Review
                      </p>

                    </div>


                    {/* STEP 3 */}

                    <div
                      className={
                        complaint.status === "Resolved"
                          ? "timeline-step active"
                          : "timeline-step"
                      }
                    >

                      <span>
                        3
                      </span>

                      <p>
                        Resolved
                      </p>

                    </div>

                  </div>

                </div>

              ))}

          </div>

        )}


        {/* ================= RAISE ANOTHER ================= */}

        {complaints.length > 0 && (

          <button
            className="new-complaint-btn"
            onClick={handleRaiseAnother}
          >
            + Raise Another Issue
          </button>

        )}

      </main>

    </div>
  );
}

export default StudentComplaints;