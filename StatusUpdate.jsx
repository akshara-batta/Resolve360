import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/status-update.css";

export default function StatusUpdate() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [complaints, setComplaints] = useState([]);
  const [selectedId, setSelectedId] = useState(id || "");
  const [status, setStatus] = useState("Pending");
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("complaints")) || [];

    setComplaints(saved);

    if (id) {
      const selected = saved.find(
        (item) =>
          String(item.id) === String(id)
      );

      if (selected) {
        setStatus(
          selected.status || "Pending"
        );

        setNote(
          selected.adminNote || ""
        );
      }
    }
  }, [id]);

  function handleComplaintChange(e) {
    const value = e.target.value;

    setSelectedId(value);
    setMessage("");

    const selected = complaints.find(
      (item) =>
        String(item.id) === String(value)
    );

    if (selected) {
      setStatus(
        selected.status || "Pending"
      );

      setNote(
        selected.adminNote || ""
      );
    }
  }

  function updateStatus(e) {
    e.preventDefault();

    if (!selectedId) {
      setMessage(
        "Please select a complaint."
      );
      return;
    }

    const updatedComplaints =
      complaints.map((item) => {

        if (
          String(item.id) ===
          String(selectedId)
        ) {
          return {
            ...item,
            status: status,
            adminNote: note
          };
        }

        return item;
      });

    localStorage.setItem(
      "complaints",
      JSON.stringify(updatedComplaints)
    );

    setComplaints(updatedComplaints);

    setMessage(
      "Complaint status updated successfully!"
    );
  }

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
            className="sidebar-link"
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

        <button
          className="back-btn"
          onClick={() =>
            navigate("/authority/complaints")
          }
        >
          ← Back to Complaints
        </button>

        <div className="status-page-header">

          <p className="authority-label">
            AUTHORITY PORTAL
          </p>

          <h1>
            Update Complaint Status
          </h1>

          <p>
            Update the progress of a complaint
            and add an optional note.
          </p>

        </div>

        <form
          className="status-form"
          onSubmit={updateStatus}
        >

          {/* COMPLAINT */}

          <div className="form-group">

            <label>
              Select Complaint
            </label>

            <select
              value={selectedId}
              onChange={
                handleComplaintChange
              }
            >

              <option value="">
                Select a complaint
              </option>

              {complaints.map(
                (complaint) => (

                  <option
                    key={complaint.id}
                    value={complaint.id}
                  >
                    #{complaint.id} -{" "}
                    {complaint.title ||
                      complaint.subject ||
                      "Complaint"}
                  </option>

                )
              )}

            </select>

          </div>

          {/* STATUS */}

          <div className="form-group">

            <label>
              Status
            </label>

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
            >

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

          {/* NOTE */}

          <div className="form-group">

            <label>
              Admin Note
            </label>

            <textarea
              value={note}
              onChange={(e) =>
                setNote(e.target.value)
              }
              placeholder="Add an optional note..."
              rows="5"
            />

          </div>

          {message && (
            <p className="status-message">
              {message}
            </p>
          )}

          <button
            type="submit"
            className="primary-action"
          >
            Save Changes →
          </button>

        </form>

      </main>

    </div>
  );
}