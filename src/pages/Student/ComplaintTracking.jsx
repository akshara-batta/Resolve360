import {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import "../../styles/complaint-tracking.css";

function ComplaintTracking() {
    const [complaints, setComplaints] = useState([]);
    const [filter, setFilter] = useState("All");

    useEffect(() => {
    const savedComplaints =
        JSON.parse(localStorage.getItem("complaints")) || [];

    setComplaints(savedComplaints);
    }, []);

    const filteredComplaints =
    filter === "All"
        ? complaints
        : complaints.filter(
            (complaint) => complaint.status === filter
        );


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
                        className="nav-item"
                    >
                        Submit New Complaint
                    </Link>

                    <Link
                        to="/student/tracking"
                        className="nav-item active"
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
                            COMPLAINT TRACKING
                        </p>

                        <h1>Track Your Complaints</h1>

                        <p className="dashboard-subtitle">
                            View the status and progress of your submitted complaints.
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


                {/* Filter Section */}
                <section className="tracking-top">

                    <div className="tracking-count">
                        <h2>Your Complaints</h2>
                        <p>{complaints.length} complaints submitted</p>
                    </div>

                    <select className="status-filter" 
                            value={filter}
                            onChange={(event) => setFilter(event.target.value)}>
                        <option value="All">All Complaints</option>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Closed">Closed</option>
                    </select>

                </section>


                {/* Complaints */}
                <section className="tracking-list">

    {filteredComplaints.map((complaint) => (

        <div className="tracking-card" key={complaint.id}>

            <div className="tracking-card-top">

                <div>
                    <p className="complaint-id">
                        #{complaint.id}
                    </p>

                    <h2>{complaint.issue}</h2>

                    <p className="complaint-meta">
                        {complaint.category} • {complaint.issue}
                    </p>
                </div>

                <span className={`status ${complaint.status === "Pending" 
                                            ? "pending" 
                                            : complaint.status === "In Progress" 
                                            ? "progress" 
                                            : complaint.status === "resolved"
                                            ? "resolved"
                                            : "closed"}`}>
                    {complaint.status}
                </span>

            </div>


            <div className="tracking-details">

                <div>
                    <span>Location</span>
                    <p>{complaint.location}</p>
                </div>

                <div>
                    <span>Submitted</span>
                    <p>{complaint.date}</p>
                </div>

            </div>


            <div className="progress-wrapper">

                <div className="progress-label">
                    <span>Complaint Progress</span>
                    <span>{complaint.status}</span>
                </div>

                <div className="progress-bar">

                    <div
                        className={`progress-fill ${
                            complaint.status === "Pending"
                                ? "pending-fill"
                                : complaint.status === "In Progress"
                                ? "progress-fill-active"
                                : complaint.status === "Resolved"
                                ? "resolved-fill"
                                : "closed-fill"
                        }`}
                    ></div>

                </div>

            </div>

        </div>

    ))}

</section>

            </main>

        </div>
    );
}

export default ComplaintTracking;