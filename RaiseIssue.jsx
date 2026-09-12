import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/raise-issue.css";

function RaiseIssue() {
  const navigate = useNavigate();

  const user =
    JSON.parse(localStorage.getItem("resolve360_user")) || {};

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [anonymous, setAnonymous] = useState(false);

  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    setError("");

    if (!title.trim()) {
      setError("Please enter a complaint title.");
      return;
    }

    if (!category) {
      setError("Please select a category.");
      return;
    }

    if (!location.trim()) {
      setError("Please enter the location.");
      return;
    }

    if (!description.trim()) {
      setError("Please describe your issue.");
      return;
    }

    const oldComplaints =
      JSON.parse(localStorage.getItem("complaints")) || [];

    const newComplaint = {
      id: Date.now(),

      title: title.trim(),

      category,

      priority,

      location: location.trim(),

      description: description.trim(),

      anonymous,

      status: "Pending",

      studentName: anonymous
        ? "Anonymous Student"
        : user.name || "Student",

      studentEmail: anonymous
        ? ""
        : user.email || "",

      email: anonymous
        ? ""
        : user.email || "",

      hostel: user.hostel || "",

      date: new Date().toLocaleDateString(),

      time: new Date().toLocaleTimeString(),

      createdAt: new Date().toISOString(),

      adminNote: "",

      slaHours: 0,

      slaStatus: "Not Started"
    };

    const updatedComplaints = [
      ...oldComplaints,
      newComplaint
    ];

    localStorage.setItem(
      "complaints",
      JSON.stringify(updatedComplaints)
    );

    alert("Complaint Submitted Successfully!");

    setTitle("");
    setCategory("");
    setPriority("Medium");
    setLocation("");
    setDescription("");
    setAnonymous(false);

    navigate("/student/complaints");
  }

  return (
    <div className="raise-page">

      {/* HEADER */}

      <header className="raise-header">

        <div
          className="raise-logo"
          onClick={() => navigate("/student/dashboard")}
        >
          RESOLVE<span>360</span>
        </div>

        <button
          className="back-btn"
          onClick={() => navigate("/student/dashboard")}
        >
          ← Dashboard
        </button>

      </header>


      {/* MAIN */}

      <main className="raise-main">

        <div className="raise-heading">

          <div className="issue-badge">
            NEW COMPLAINT
          </div>

          <h1>
            Raise an <span>Issue</span>
          </h1>

          <p>
            Tell us what went wrong and we'll connect your
            complaint with the right authority.
          </p>

        </div>


        {/* FORM */}

        <form
          className="raise-form"
          onSubmit={handleSubmit}
        >

          {/* TITLE */}

          <div className="form-group">

            <label>
              Complaint Title
            </label>

            <input
              type="text"
              placeholder="e.g. Water leakage in Room 204"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
            />

          </div>


          {/* CATEGORY + PRIORITY */}

          <div className="form-row">

            <div className="form-group">

              <label>
                Category
              </label>

              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
              >

                <option value="">
                  Select category
                </option>

                <option value="Hostel">
                  Hostel
                </option>

                <option value="Electricity">
                  Electricity
                </option>

                <option value="Water">
                  Water
                </option>

                <option value="Cleanliness">
                  Cleanliness
                </option>

                <option value="Food">
                  Food
                </option>

                <option value="Maintenance">
                  Maintenance
                </option>

                <option value="Security">
                  Security
                </option>

                <option value="Other">
                  Other
                </option>

              </select>

            </div>


            <div className="form-group">

              <label>
                Priority
              </label>

              <select
                value={priority}
                onChange={(e) =>
                  setPriority(e.target.value)
                }
              >

                <option value="Low">
                  Low
                </option>

                <option value="Medium">
                  Medium
                </option>

                <option value="High">
                  High
                </option>

                <option value="Urgent">
                  Urgent
                </option>

              </select>

            </div>

          </div>


          {/* LOCATION */}

          <div className="form-group">

            <label>
              Location
            </label>

            <input
              type="text"
              placeholder="e.g. Girls Hostel - Room 204"
              value={location}
              onChange={(e) =>
                setLocation(e.target.value)
              }
            />

          </div>


          {/* DESCRIPTION */}

          <div className="form-group">

            <label>
              Describe Your Issue
            </label>

            <textarea
              rows="6"
              placeholder="Explain your problem in detail..."
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
            />

          </div>


          {/* ANONYMOUS OPTION */}

          <div className="anonymous-box">

            <label className="anonymous-option">

              <input
                type="checkbox"
                checked={anonymous}
                onChange={(e) =>
                  setAnonymous(e.target.checked)
                }
              />

              <span className="custom-check"></span>

              <div>

                <strong>
                  Submit anonymously
                </strong>

                <p>
                  Your name and email will not be
                  visible to the authority.
                </p>

              </div>

            </label>

          </div>


          {/* USER */}

          <div className="complainant-box">

            <div className="user-circle">

              {anonymous
                ? "?"
                : user.name
                ? user.name.charAt(0).toUpperCase()
                : "S"}

            </div>

            <div>

              <p className="submitted-label">
                SUBMITTED BY
              </p>

              <strong>
                {anonymous
                  ? "Anonymous Student"
                  : user.name || "Student"}
              </strong>

              <p>
                {user.hostel || "Hostel"}
              </p>

            </div>

          </div>


          {/* ERROR */}

          {error && (
            <div className="form-error">
              ⚠ {error}
            </div>
          )}


          {/* SUBMIT */}

          <button
            type="submit"
            className="submit-issue-btn"
          >
            Submit Complaint
            <span>→</span>
          </button>

        </form>


        {/* PROCESS */}

        <div className="raise-info">

          <div>
            <span>01</span>
            <p>Submit complaint</p>
          </div>

          <div>
            <span>02</span>
            <p>Authority reviews</p>
          </div>

          <div>
            <span>03</span>
            <p>Track resolution</p>
          </div>

        </div>

      </main>

    </div>
  );
}

export default RaiseIssue;