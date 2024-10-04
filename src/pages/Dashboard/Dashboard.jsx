import React from "react";
import { useState, useEffects} from "react";
import { useNavigate } from "react-router-dom";

function Dashboard(){
    const [isLoggedIn, setIsLoggedIn]=useState(false);
    const navigate = useNavigate();

    // Check if the user is logged in (using localStorage in this example)
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
        setIsLoggedIn(true);
        } else {
        setIsLoggedIn(false);
        }
    }, []);

     // Handle navigation to signup and login pages
     const handleLogin = () => {
        navigate('/login');
     }

     const handleSignup = () => {
        navigate('/signup');
     }
    return(
        <div>
            {isLoggedIn ? (
                <div>
                    <h2>Welcome to the Admin Dashboard</h2>
                    {/* Here you can display the actual dashboard data */}
                    <p>This is where your dashboard data will be shown.</p>
                </div>):(
                <div>
                    <h2>Please log in or sign up to access the dashboard</h2>
                    <button onClick={handleLogin}>Login</button>
                    <button onClick={handleSignup}>Sign Up</button>
                </div>
            )}

        </div>
    )
}

export default Dashboard;