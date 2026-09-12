import "../../styles/student-profile.css";

function StudentProfile() {

    const savedUser = JSON.parse(
        localStorage.getItem("registeredUser")
    )

    if(!savedUser){
        return (
        <div className="student-profile-page">
        <p>No user found.</p>
            </div>
        )
    }

    return (

        <div className="student-profile-page">

            <h1>
                My Profile
            </h1>

            <div className="profile-card">

                <div className="profile-page-circle">
                    A
                </div>

                <h2>
                    Akshara
                </h2>

                <p>
                    Student
                </p>

                <div className="profile-details">

                    <p>
                        <strong>FullName:</strong> {savedUser.fullName}
                    </p>

                    <p>
                        <strong>UserName:</strong> {savedUser.username}
                    </p>

                    <p>
                        <strong>Email:</strong> {savedUser.email}
                    </p>

                    <p>
                        <strong>Password:</strong> ........
                    </p>   

                    <p>
                        <strong>Gender:</strong> {savedUser.gender}
                    </p>    

                    <p>
                        <strong>Role:</strong> Student
                    </p>                                 

                </div>

            </div>

        </div>

    );

}

export default StudentProfile;