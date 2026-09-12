import { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/submit-complaint.css";

function SubmitComplaint() {

    const [category, setCategory] = useState("");
    const [issue, setIssue] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");

    const complaintTypes = {
        Electricity: [
            "Power cut",
            "Frequent power fluctuations",
            "Lights not working",
            "Fans not working",
            "Switch / socket problem",
            "Other"
        ],

        Water: [
            "No water supply",
            "Low water pressure",
            "Water leakage",
            "Drinking water problem",
            "Water quality issue",
            "Other"
        ],

        Mess: [
            "Food quality",
            "Mess cleanliness / hygiene",
            "Food shortage",
            "Menu-related issue",
            "Mess timing issue",
            "Other"
        ],

        Cleanliness: [
            "Washroom not clean",
            "Garbage not collected",
            "Common area not clean",
            "Pest / insect issue",
            "Other"
        ],

        Hostel: [
            "Room maintenance",
            "Furniture problem",
            "AC / fan problem",
            "Bathroom problem",
            "Other"
        ]
    };

    function handleCategoryChange(event) {
        setCategory(event.target.value);
        setIssue("");
    }

    function handleSubmit() {

    if (!category) {
        alert("Please select a category.");
        return;
    }

    if (!issue) {
        alert("Please select a specific issue.");
        return;
    }

    if (!location.trim()) {
        alert("Please enter the location.");
        return;
    }

    if (!description.trim()) {
        alert("Please describe the issue.");
        return;
    }

    const complaint = {
        id: "RC-" + Date.now(),
        category: category,
        issue: issue,
        location: location,
        description: description,
        status: "Pending",
        date: new Date().toLocaleDateString()
    };

const existingComplaints =
    JSON.parse(localStorage.getItem("complaints")) || [];

existingComplaints.push(complaint);

localStorage.setItem(
    "complaints",
    JSON.stringify(existingComplaints)
);

alert("Complaint submitted successfully!");
}

    return (
        <div className="student-dashboard">

            {/* Sidebar */}
            <aside className="student-sidebar">

                <div className="student-brand">
                    <h2>RESOLVE<span>360</span></h2>
                    <p>STUDENT PORTAL</p>
                </div>

                <nav className="student-nav">

                    <Link
                        to="/student/dashboard"
                        className="nav-item"
                    >
                        Dashboard
                    </Link>

                    <Link
                        to="/student/submit"
                        className="nav-item active"
                    >
                        Submit New Complaint
                    </Link>

                    <Link
                        to="/student/tracking"
                        className="nav-item"
                    >
                        Complaint Tracking
                    </Link>

                </nav>

                <div className="sidebar-bottom">
                    <button className="logout-btn">
                        Logout
                    </button>
                </div>

            </aside>


            {/* Main Content */}
            <main className="student-main">

                <header className="student-header">

                    <div>
                        <p className="dashboard-label">
                            SUBMIT COMPLAINT
                        </p>

                        <h1>Report an Issue</h1>

                        <p className="dashboard-subtitle">
                            Tell us about the issue you are facing.
                        </p>
                    </div>

                    <div className="student-profile">

                        <div className="profile-circle">
                            A
                        </div>

                        <div>
                            <p className="profile-name">
                                Akshara
                            </p>

                            <p className="profile-role">
                                Student
                            </p>
                        </div>

                    </div>

                </header>


                {/* Complaint Form */}
                <section className="complaint-form-section">

                    <div className="complaint-form-card">

                        <div className="form-heading">

                            <h2>Complaint Details</h2>

                            <p>
                                Select the type of issue and provide some details.
                            </p>

                        </div>


                        {/* Category */}
                        <div className="form-group">

                            <label>
                                Category
                            </label>

                            <select
                                value={category}
                                onChange={handleCategoryChange}
                            >

                                <option value="" disabled>
                                    Select category
                                </option>

                                <option value="Electricity">
                                    Electricity
                                </option>

                                <option value="Water">
                                    Water
                                </option>

                                <option value="Mess">
                                    Mess
                                </option>

                                <option value="Cleanliness">
                                    Cleanliness
                                </option>

                                <option value="Hostel">
                                    Hostel
                                </option>

                            </select>

                        </div>


                        {/* Specific Issue */}
                        <div className="form-group">

                            <label>
                                Specific Issue
                            </label>

                            <select
                                value={issue}
                                onChange={(event) => setIssue(event.target.value)}
                                disabled={!category}
                            >

                                <option value="" disabled>
                                    {category
                                        ? "Select specific issue"
                                        : "Select a category first"
                                    }
                                </option>

                                {category &&
                                    complaintTypes[category].map(
                                        (item, index) => (
                                            <option
                                                key={index}
                                                value={item}
                                            >
                                                {item}
                                            </option>
                                        )
                                    )
                                }

                            </select>

                        </div>


                        {/* Location */}
                        <div className="form-group">

                            <label>
                                Location
                            </label>

                            <input
                                type="text"
                                placeholder="Enter location"
                                value={location}
                                onChange={(event) => setLocation(event.target.value)}
                            />

                        </div>


                        {/* Description */}
                        <div className="form-group">

                            <label>
                                Description
                            </label>

                            <textarea
                                placeholder="Describe the issue..."
                                rows="6"
                                value = {description}
                                onChange={(event) => setDescription(event.target.value)}
                            ></textarea>

                        </div>


                        {/* Buttons */}
                        <div className="form-actions">

                            <Link
                                to="/student/dashboard"
                                className="cancel-btn"
                            >
                                Cancel
                            </Link>

                            <button className="submit-btn"
                                    onClick={handleSubmit}>
                                Submit Complaint
                            </button>

                        </div>

                    </div>

                </section>

            </main>

        </div>
    );
}

export default SubmitComplaint;