import React from 'react';
import "./Login_Box.css";
import GoogleOneTap from '../GoogleOneTap/GoogleOneTap';
import { useNavigate } from 'react-router-dom';
import cancelImage from '../../assets/icons/cancel48.png'; // Adjust the path as necessary

const Login: React.FC = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");
    const [success, setSuccess] = React.useState("");
    const navigate = useNavigate();

    const handleClose = () => {
        navigate('/'); // Redirect to home or another page
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const res = await fetch("/api/user/userLogin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
                credentials: 'include' // Include cookies in the request
            });

            const data = await res.json();

            if (res.ok) {
                setSuccess("Login successful!");
                // Example: redirect or update global state
                setTimeout(() => {
                    // Redirect to dashboard or update global state
                    navigate('/')
                }, 1000);
            } else {
                setError(data.message || "Login failed. Please try again.");
            }
        } catch (err) {
            setError("An unexpected error occurred. Please try again.");
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Login</h2>
                <button className="close-button" onClick={handleClose}><img src={cancelImage} alt="Close" /></button>
                <form onSubmit={handleLogin}>
                    <div>
                        <label>Email:</label>
                        <input 
                            type="email" 
                            name="email" 
                            required 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input 
                            type="password" 
                            name="password" 
                            required 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </div>
                    {error && <p className="error">{error}</p>}
                    {success && <p className="success">{success}</p>}
                    <input type="submit" value="Login Account" />
                </form>
                <GoogleOneTap />
            </div>
        </div>
    );
};

export default Login;
