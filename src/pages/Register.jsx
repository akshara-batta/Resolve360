import { Link, useNavigate} from "react-router-dom";
import "../styles/register.css";
import logo from "../assets/logo.png";
import {useState} from "react";

function Register() {

        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [confirmPassword, setConfirmPassword] = useState("");
        const [gender, setGender] = useState("");
        const [fullName, setFullName] = useState("");
        const [username, setUsername] = useState("");

        const navigate = useNavigate();

        function handleContinue() {

            if(email===""|| password===""){
                alert("Please enter your email and password.");
                return;
            }
        const user = {
        email: email,
        password: password,
        fullName : fullName,
        gender: gender,
        username: username

    };

    localStorage.setItem(
        "registeredUser",
        JSON.stringify(user)
    );

    if(password!=confirmPassword){
        alert("Passwords do not match!");
        return;
    }

    alert("Account created successfully! Please login.");
    navigate("/login");
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
                    value={fullName}
                    onChange={(e)=>setFullName(e.target.value)}
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
                    value={username}
                    onChange={(e)=> setUsername(e.target.value)}
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
                    value={confirmPassword}
                    onChange={(e)=> setConfirmPassword(e.target.value)}
                />

                <select value={gender}
                onChange={(e)=>setGender(e.target.value)}>

                    <option value="" disabled>
                        Select Gender
                    </option>

                    <option value="Male">
                        Male
                    </option>

                    <option value="Female">
                        Female
                    </option>

                    <option value="Other">
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