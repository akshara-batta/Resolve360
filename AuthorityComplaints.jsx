import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/authority-complaints.css";

export default function AuthorityComplaints() {
  const navigate = useNavigate();

  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("complaints")) || [];

    setComplaints(saved);
  }, []);

  function logout() {
    localStorage.removeItem("resolve360_user");
    localStorage.removeItem("role");
    navigate("/login");
  }

  const filteredComplaints = complaints.filter(
    (complaint) => {

      const text =
        `${complaint.title || ""} ${
          complaint.subject || ""
        } ${complaint.category || ""} ${
          complaint.description || ""
        }`.toLowerCase();

      const matchesSearch =
        text.includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" ||
        complaint.status === filter;

      return (
        matchesSearch &&
        matchesFilter
      );
    }
  );

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

        <div className="page-heading">

          <div>
            <p className="authority-label">
              AUTHORITY PORTAL
            </p>

            <h1>
              Complaints
            </h1>

            <p>
              View, search and manage complaints.
            </p>
          </div>

        </div>

        {/* SEARCH + FILTER */}

        <div className="complaint-controls">

          <input
            type="text"
            placeholder="Search complaints..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <select
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value)
            }
          >
            <option value="All">
              All
            </option>

            <option value="Pending">
              Pending
            </option>

            <option value="In Progress">
              In Progress
            </option>

            <option value="Resolved">
              Resolved
            </option>

          </select>

        </div>

        {/* COMPLAINT LIST */}

        <div className="complaints-container">

          {filteredComplaints.length === 0 ? (

            <div className="empty-state">

              <div>📭</div>

              <h3>
                No complaints found
              </h3>

              <p>
                Try changing your search
                or filter.
              </p>

            </div>

          ) : (

            filteredComplaints.map(
              (complaint) => (

                <div
                  className="complaint-card"
                  key={complaint.id}
                  onClick={() =>
                    navigate(
                      `/authority/complaint-details/${complaint.id}`
                    )
                  }
                >

                  <div className="complaint-top">

                    <div>

                      <h3>
                        {complaint.title ||
                          complaint.subject ||
                          "Complaint"}
                      </h3>

                      <p>
                        ID: #
                        {complaint.id}
                      </p>

                    </div>

                    <span
                      className={`status ${String(
                        complaint.status ||
                          "Pending"
                      )
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {complaint.status ||
                        "Pending"}
                    </span>

                  </div>

                  <p className="complaint-description">

                    {complaint.description ||
                      "No description available."}

                  </p>

                  <div className="complaint-meta">

                    <span>
                      📁{" "}
                      {complaint.category ||
                        "General"}
                    </span>

                    <span>
                      👤{" "}
                      {complaint.studentName ||
                        complaint.name ||
                        "Student"}
                    </span>

                    <span>
                      📅{" "}
                      {complaint.date ||
                        "Recently"}
                    </span>

                  </div>

                </div>

              )
            )

          )}

        </div>

      </main>

    </div>
  );
}