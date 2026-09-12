import{useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/student-dashboard.css";

function StudentDashboard() {

    const [complaints, setComplaints] = useState([]);
    const navigate = useNavigate();

    function handleLogout(){
        localStorage.removeItem("isLoggedIn");
        navigate("/login");
    }

    useEffect(() => {
    const savedComplaints =
        JSON.parse(localStorage.getItem("complaints")) || [];

    setComplaints(savedComplaints);
    }, []);


return (

    <div className="student-dashboard">

        {/* SIDEBAR */}

        <aside className="student-sidebar">

            <div className="student-brand">

                <h2>
                    RESOLVE<span>360</span>
                </h2>

                <p>
                    STUDENT PORTAL
                </p>

            </div>

            <nav className="student-nav">

                <Link to="/student/dashboard" className="nav-item active">
                    Dashboard
                </Link>

                <Link to="/student/submit" className="nav-item">
                    Submit New Complaint
                </Link>

                <Link to="/student/tracking" className="nav-item">
                    Complaint Tracking
                </Link>

            </nav>

            <div className="sidebar-bottom">

                <button className="logout-btn" onClick={handleLogout}>
                    Logout
                </button>

            </div>

        </aside>


        {/* MAIN CONTENT */}

        <main className="student-main">

            <header className="student-header">

                <div>
                    <p className="dashboard-label">
                        STUDENT DASHBOARD
                    </p>

                    <h1>
                        Welcome Back 👋
                    </h1>

                    <p className="dashboard-subtitle">
                        Track and manage your complaints from one place.
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


            {/* STATISTICS */}

            <section className="stats-grid">

                <div className="stat-card">

                    <p>
                        Total Complaints
                    </p>

                    <h2>
                        {complaints.length}
                    </h2>

                </div>

                <div className="stat-card">

                    <p>
                        Pending
                    </p>

                    <h2>
                        {complaints.filter( (complaint) => complaint.status === "Pending" ).length}
                    </h2>

                </div>

                <div className="stat-card">

                    <p>
                        In Progress
                    </p>

                    <h2>
                        {complaints.filter( (complaint) => complaint.status === "Progress" ).length}
                    </h2>

                </div>

                <div className="stat-card">

                    <p>
                        Resolved
                    </p>

                    <h2>
                        {complaints.filter( (complaint) => complaint.status === "Resolved" ).length}
                    </h2>

                </div>

            </section>


            {/* QUICK ACTIONS */}

            <section className="dashboard-section">

                <div className="section-heading">

                    <h2>
                        Quick Actions
                    </h2>

                </div>

                <div className="quick-actions">

                    <Link to="/student/submit" className="action-card">

                        <div className="action-icon">
                            +
                        </div>

                        <div>
                            <h3>
                                Submit Complaint
                            </h3>

                            <p>
                                Report a new issue
                            </p>
                        </div>

                    </Link>


                    <Link to="/student/tracking" className="action-card">

                        <div className="action-icon">
                            →
                        </div>

                        <div>
                            <h3>
                                Track Complaint
                            </h3>

                            <p>
                                Check your complaint status
                            </p>
                        </div>

                    </Link>


                </div>

            </section>


            {/* RECENT COMPLAINTS */}

            <section className="dashboard-section">

                <div className="section-heading">

                    <h2>
                        Recent Complaints
                    </h2>

                    <Link to="/student/tracking">
                        View All
                    </Link>

                </div>


                <div className="complaints-card">

                    {complaints.length === 0 ? (
                        <p className="empty-message">
                            No complaints submitted yet.
                        </p>
                    ) : (
                complaints
                .slice(-3)
            .reverse()
            .map((complaint) => (
            <div className="complaint-row" key={complaint.id}>

                <div>
                    <h3>
                        {complaint.issue}
                    </h3>

                    <p>
                        Complaint #{complaint.id}
                    </p>
                </div>

                <span
                    className={`status ${
                        complaint.status === "Pending"
                            ? "pending"
                            : complaint.status === "In Progress"
                            ? "progress"
                            : "resolved"
                    }`}
                >
                    {complaint.status}
                </span>

            </div>
        ))
)}

                    

                </div>

            </section>

        </main>

    </div>

);


}

export default StudentDashboard;
