import React, { useState } from "react";
import "./Signup_Box.css";
import GoogleOneTap from '../GoogleOneTap/GoogleOneTap';


const Signup: React.FC = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");

  // 1. Send verification code
  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/user/sendVerificationCode", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (res.ok) {
      setStep(2);
      setMessage("Verification code sent to your email.");
    } else {
      setMessage(data.message || "Failed to send code.");
    }
  };

  // 2. Verify code
  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/user/verifyCode", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code }),
    });
    const data = await res.json();
    if (res.ok) {
      setToken(data.token);
      setStep(3);
      setMessage("Code verified! Please set your username and password.");
      return
    } else {
      setMessage(data.message || "Invalid or expired code.");
    }
  };

  // 3. Create account
  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/user/submitCreateAccount", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: name, password, token }),
    });
    const data = await res.json();
    if (res.ok) {
      setMessage("Account created successfully!");
      setStep(4);
    } else {
      setMessage(data.message || "Failed to create account.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Create Account</h2>
        <p>{message}</p>
        {step === 1 && (
          <form onSubmit={handleSendCode}>
            <label>
              Email:
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </label>
            <input type="submit" value="Send Verification Code" />
          </form>
        )}
        {step === 2 && (
          <form onSubmit={handleVerifyCode}>
            <label>
              Enter the 6-digit verification code:
              <input
                type="text"
                value={code}
                onChange={e => setCode(e.target.value)}
                required
              />
            </label>
            <input type="submit" value="Verify Code" />
          </form>
        )}
        {step === 3 && (
          <form onSubmit={handleCreateAccount}>
            <label>
              Name:
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </label>
            <input type="submit" value="Create Account" />
          </form>
        )}
        {step === 4 && (
          <div>
            <p>Signup complete! You can now log in.</p>
          </div>
        )}
        <div>
            <p>Already have an account? <a href="/login">Login here</a>.</p>    
        </div>
        <GoogleOneTap/>
      </div>
    </div>
  );
};

export default Signup;