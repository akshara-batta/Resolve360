import { BrowserRouter, Routes, Route } from "react-router-dom";
import Intro from "./pages/Intro";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/Student/StudentDashboard";
import SubmitComplaint from "./pages/Student/SubmitComplaint";
import ComplaintTracking from "./pages/Student/ComplaintTracking";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route path="/" element={<Intro />} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register/>}/>

                <Route path="/student/dashboard" element={<StudentDashboard/>}/>

                <Route path="/student/submit" element={<SubmitComplaint/>}/>

                <Route path="/student/tracking" element={<ComplaintTracking/>}/>

            </Routes>

        </BrowserRouter>

    );

}

export default App;