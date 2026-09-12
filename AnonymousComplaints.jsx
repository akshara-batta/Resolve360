import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/anonymous-complaints.css";

function AnonymousComplaints() {
  const navigate = useNavigate();

  const [complaints, setComplaints] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    loadComplaints();
  }, []);

  function loadComplaints() {
    const saved =
      JSON.parse(localStorage.getItem("complaints")) || [];

    const anonymousOnly = saved.filter(
      (item) => item.anonymous === true
    );

    setComplaints(anonymousOnly);
  }

  function updateStatus(id, newStatus) {
    const allComplaints =
      JSON.parse(localStorage.getItem("complaints")) || [];

    const updated = allComplaints.map((item) => {

      if (item.id !== id) {
        return item;
      }

      return {
        ...item,
        status: newStatus,
        adminNote:
          newStatus === "Resolved"
            ? "Your complaint has been resolved."
            : "Your complaint is being reviewed."
      };

    });

    localStorage.setItem(
      "complaints",
      JSON.stringify(updated)
    );

    loadComplaints();

    window.dispatchEvent(
      new Event("complaintsUpdated")
    );
  }

  const filteredComplaints =
    filter === "All"
      ? complaints
      : complaints.filter(
          (item) => item.status === filter
        );

  return (
    <div className="anonymous-page">

      {/* HEADER */}

      <header className="anonymous-header">

        <div
          className="anonymous-logo"
          onClick={() =>
            navigate("/authority/dashboard")
          }
        >
          RESOLVE<span>360</span>
        </div>

        <button
          onClick={() =>
            navigate("/authority/dashboard")
          }
        >
          ← Admin Dashboard
        </button>

      </header>


      {/* MAIN */}

      <main className="anonymous-main">

        <section className="anonymous-title">

          <span>
            PRIVACY CENTER
          </span>

          <h1>
            Anonymous <strong>Complaints</strong>
          </h1>

          <p>
            Review complaints while protecting
            the identity of the reporting student.
          </p>

        </section>


        {/* FILTERS */}

        <div className="anonymous-filters">

          {[
            "All",
            "Pending",
            "In Progress",
            "Resolved"
          ].map((item) => (

            <button
              key={item}
              className={
                filter === item
                  ? "active-filter"
                  : ""
              }
              onClick={() =>
                setFilter(item)
              }
            >
              {item}
            </button>

          ))}

        </div>


        {/* LIST */}

        {filteredComplaints.length === 0 ? (

          <div className="anonymous-empty">

            <div>
              ?
            </div>

            <h2>
              No anonymous complaints
            </h2>

            <p>
              There are currently no anonymous
              complaints matching this filter.
            </p>

          </div>

        ) : (

          <div className="anonymous-list">

            {filteredComplaints
              .slice()
              .reverse()
              .map((complaint) => (

                <div
                  className="anonymous-card"
                  key={complaint.id}
                >

                  {/* CARD HEADER */}

                  <div className="anonymous-card-top">

                    <div>

                      <small>
                        COMPLAINT #
                        {String(complaint.id).slice(-6)}
                      </small>

                      <h2>
                        {complaint.title}
                      </h2>

                    </div>

                    <span
                      className={`anonymous-status ${
                        complaint.status === "Resolved"
                          ? "resolved"
                          : complaint.status === "In Progress"
                          ? "progress"
                          : "pending"
                      }`}
                    >
                      {complaint.status}
                    </span>

                  </div>


                  {/* PRIVACY */}

                  <div className="privacy-banner">

                    <span>
                      ✓
                    </span>

                    <p>
                      <strong>
                        Identity Protected
                      </strong>

                      <br />

                      This complaint was submitted anonymously.
                      Student name and email are hidden.
                    </p>

                  </div>


                  {/* DETAILS */}

                  <div className="anonymous-details">

                    <div>
                      <small>
                        CATEGORY
                      </small>

                      <p>
                        {complaint.category}
                      </p>
                    </div>

                    <div>
                      <small>
                        PRIORITY
                      </small>

                      <p>
                        {complaint.priority}
                      </p>
                    </div>

                    <div>
                      <small>
                        LOCATION
                      </small>

                      <p>
                        {complaint.location}
                      </p>
                    </div>

                    <div>
                      <small>
                        SUBMITTED
                      </small>

                      <p>
                        {complaint.date}
                      </p>
                    </div>

                  </div>


                  {/* DESCRIPTION */}

                  <div className="anonymous-description">

                    <small>
                      COMPLAINT DESCRIPTION
                    </small>

                    <p>
                      {complaint.description}
                    </p>

                  </div>


                  {/* SLA */}

                  <div className="anonymous-sla">

                    <div>

                      <small>
                        SLA STATUS
                      </small>

                      <strong>
                        {complaint.slaStatus ||
                          "Not Started"}
                      </strong>

                    </div>

                    <div>

                      <small>
                        SLA LIMIT
                      </small>

                      <strong>
                        {complaint.slaHours || "Not Set"}
                        {complaint.slaHours
                          ? " hours"
                          : ""}
                      </strong>

                    </div>

                  </div>


                  {/* ACTIONS */}

                  <div className="anonymous-actions">

                    {complaint.status !== "In Progress" &&
                      complaint.status !== "Resolved" && (

                        <button
                          onClick={() =>
                            updateStatus(
                              complaint.id,
                              "In Progress"
                            )
                          }
                        >
                          Start Review
                        </button>

                    )}

                    {complaint.status !== "Resolved" && (

                      <button
                        className="resolve-btn"
                        onClick={() =>
                          updateStatus(
                            complaint.id,
                            "Resolved"
                          )
                        }
                      >
                        Mark Resolved
                      </button>

                    )}

                  </div>

                </div>

              ))}

          </div>

        )}

      </main>

    </div>
  );
}

export default AnonymousComplaints;