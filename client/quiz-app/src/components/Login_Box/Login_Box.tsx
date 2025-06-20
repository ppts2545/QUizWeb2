import React from 'react';
import "./Login_Box.css";
// Update the import path and casing if needed
import GoogleOneTap from '../GoogleOneTap/GoogleOneTap';

const Login: React.FC = () => {
    return(
        <div className="modal-overlay">
            <div className="modal">
                <h2>Login</h2>
                <form>
                    <div>
                        <label>Email:</label>
                        <input type="email" name="email" required />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" name="password" required />
                    </div>
                    <input type="submit" value="Login Account" />
                </form>
                <GoogleOneTap/>
            </div>
        </div>
    )
}

export default Login;