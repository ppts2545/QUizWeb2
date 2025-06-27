import React from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css";


const Navbar: React.FC = () => {
  const handleHomeClick = () => {
    console.log("Home clicked");
    // Add specific logic for Home
  };

  const handleQuizClick = () => {
    console.log("Quiz clicked");
    // Add specific logic for Quiz
    
  };

  const handleLeaderboardClick = () => {
    console.log("Leaderboard clicked");
    // Add specific logic for Leaderboard
  };

  const handleAboutClick = () => {
    console.log("About clicked");
    // Add specific logic for About
  };


  return (
    <nav className="navbar">
      <div className="logo">🌟 MyWebsite</div>
      <ul className="nav-list">
        <li>
          <Link to="/" className="nav-link" onClick={handleHomeClick}>
            Home
          </Link>
        </li>
        <li className="quiz_navbar_link">
          <Link to="/quiz" onClick={handleQuizClick}>Quiz</Link>
            <div className="room-dropdown">
              <Link to="/create-room" >Create Room</Link>
              <Link to="/quiz/2">Join Room</Link>
              <Link to="/quiz/3">Room Info</Link>
            </div>
        </li>
        <li>
          <Link to="/leaderboard" className="nav-link" onClick={handleLeaderboardClick}>
            Leaderboard
          </Link>
        </li>
        <li>
          <Link to="/about" className="nav-link" onClick={handleAboutClick}>
            Abouts
          </Link>
        </li>
        <li className="account-link">
          Account ▼
          <div className="account-dropdown">
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
