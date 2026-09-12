import { Link } from "react-router-dom";
import "../styles/login.css";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import {useState} from "react";

function Login() {

    function handleLogin() {

    const savedUser = JSON.parse(
        localStorage.getItem("registeredUser")
    );

    if (!savedUser) {
        alert("No account found. Please register first.");
        return;
    }

    if (
        email === savedUser.email &&
        password === savedUser.password
    ) {
        localStorage.setItem("isLoggedIn", "true");
        navigate("/student/dashboard");
    } else {
        alert("Invalid email or password.");
    }
}

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (

        <div className="login-page">

            <div className="brand-header">

                <img
                    src={logo}
                    className="login-logo"
                    alt="Resolve360 Logo"
                />

                <h1 className="brand-name">
                    RESOLVE<span>360</span>
                </h1>

                <p className="brand-tagline">
                    ANY ISSUE. ANYTIME. ANYWHERE.
                </p>

            </div>

            <h2 className="welcome-title">
                Welcome Back
            </h2>

            <div className="login-box">

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />

                <button onClick={handleLogin}>
                    LOGIN
                </button>

                <p className="register-text">

                    New to Resolve360?

                    <br />

                    <Link to="/register">
                        Create an account
                    </Link>

                </p>

            </div>

        </div>

    );

}

export default Login;