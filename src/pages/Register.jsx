import { Link } from "react-router-dom";
import "../styles/register.css";
import logo from "../assets/logo.png";
import {useState} from "react";

function Register() {

        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");

        function handleContinue() {
        const user = {
        email: email,
        password: password
    };

    localStorage.setItem(
        "registeredUser",
        JSON.stringify(user)
    );
}
    

    return (

        <div className="register-page">

            <img
                src={logo}
                className="register-logo"
                alt="Resolve360 Logo"
            />

            <h1>Create Account</h1>

            {/* Progress Bar */}

            <div className="progress">

                <div className="step active">

                    <div className="circle">
                        1
                    </div>

                    <p>
                        Profile
                    </p>

                </div>

                <div className="line"></div>

                <div className="step">

                    <div className="circle">
                        2
                    </div>

                    <p>
                        Role
                    </p>

                </div>

                <div className="line"></div>

                <div className="step">

                    <div className="circle">
                        3
                    </div>

                    <p>
                        Done
                    </p>

                </div>

            </div>

            {/* Form */}

            <div className="register-box">

                <input
                    type="text"
                    placeholder="Full Name"
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Username"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Confirm Password"
                />

                <select defaultValue="">

                    <option value="" disabled>
                        Select Gender
                    </option>

                    <option value="male">
                        Male
                    </option>

                    <option value="female">
                        Female
                    </option>

                    <option value="other">
                        Other
                    </option>

                </select>

                <button onClick={handleContinue}>
                    CONTINUE
                </button>

                <p className="login-text">

                    Already have an account?

                    {" "}

                    <Link to="/login">
                        Login
                    </Link>

                </p>

            </div>

        </div>

    );

}

export default Register;