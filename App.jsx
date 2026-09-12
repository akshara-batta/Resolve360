import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

// ===============================
// COMMON PAGES
// ===============================
import Intro from "./pages/Intro";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Role from "./pages/Role";
import Done from "./pages/Done";

// ===============================
// STUDENT PAGES
// ===============================
import Dashboard from "./pages/Dashboard";
import RaiseIssue from "./pages/RaiseIssue";
import StudentComplaints from "./pages/StudentComplaints";

// ===============================
// AUTHORITY PAGES
// Worker + Supervisor
// ===============================
import AuthorityDashboard from "./pages/Authority/AuthorityDashboard";
import AuthorityComplaints from "./pages/Authority/AuthorityComplaints";
import ComplaintDetails from "./pages/Authority/ComplaintDetails";
import StatusUpdate from "./pages/Authority/StatusUpdate";

// ===============================
// ADMIN PAGES
// ===============================
import AdminDashboard from "./pages/Authority/AdminDashboard";
import AnonymousComplaints from "./pages/Authority/AnonymousComplaints";
import SLASettings from "./pages/Authority/SLASettings";

// ===============================
// 404 PAGE
// ===============================
function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#090714",
        color: "white",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
        padding: "20px"
      }}
    >
      <h1
        style={{
          fontSize: "80px",
          margin: "0 0 10px"
        }}
      >
        404
      </h1>

      <h2>
        Page Not Found
      </h2>

      <p
        style={{
          color: "#aaa",
          marginBottom: "25px"
        }}
      >
        The page you are looking for does not exist.
      </p>

      <button
        onClick={() => {
          window.location.href = "/login";
        }}
        style={{
          padding: "12px 22px",
          border: "none",
          borderRadius: "10px",
          background: "#8b5cf6",
          color: "white",
          cursor: "pointer",
          fontSize: "16px"
        }}
      >
        Go to Login
      </button>
    </div>
  );
}

// ===============================
// MAIN APP
// ===============================
function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* =================================
            COMMON ROUTES
        ================================= */}

        <Route
          path="/"
          element={<Intro />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/role"
          element={<Role />}
        />

        <Route
          path="/done"
          element={<Done />}
        />


        {/* =================================
            STUDENT ROUTES
        ================================= */}

        <Route
          path="/student/dashboard"
          element={<Dashboard />}
        />

        {/* Old dashboard URL
            redirects to student dashboard */}
        <Route
          path="/dashboard"
          element={
            <Navigate
              to="/student/dashboard"
              replace
            />
          }
        />

        <Route
          path="/student/raise-issue"
          element={<RaiseIssue />}
        />

        <Route
          path="/student/complaints"
          element={<StudentComplaints />}
        />


        {/* =================================
            AUTHORITY ROUTES
            Worker + Supervisor
        ================================= */}

        <Route
          path="/authority/dashboard"
          element={<AuthorityDashboard />}
        />

        <Route
          path="/authority/complaints"
          element={<AuthorityComplaints />}
        />

        <Route
          path="/authority/complaint-details"
          element={<ComplaintDetails />}
        />

        <Route
          path="/authority/complaint-details/:id"
          element={<ComplaintDetails />}
        />

        <Route
          path="/authority/status-update"
          element={<StatusUpdate />}
        />

        <Route
          path="/authority/status-update/:id"
          element={<StatusUpdate />}
        />


        {/* =================================
            ADMIN ROUTES
        ================================= */}

        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/anonymous-complaints"
          element={<AnonymousComplaints />}
        />

        <Route
          path="/admin/sla-settings"
          element={<SLASettings />}
        />


        {/* =================================
            OLD ADMIN URLS
            These keep your existing buttons
            working even if they still use
            /authority/...
        ================================= */}

        <Route
          path="/authority/anonymous-complaints"
          element={
            <Navigate
              to="/admin/anonymous-complaints"
              replace
            />
          }
        />

        <Route
          path="/authority/sla-settings"
          element={
            <Navigate
              to="/admin/sla-settings"
              replace
            />
          }
        />


        {/* =================================
            404
        ================================= */}

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;