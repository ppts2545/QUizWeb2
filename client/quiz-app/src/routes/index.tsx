import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './Home';
import Signup from '../components/Signup_Box/Signup_Box';
import Login from '../components/Login_Box/Login_Box';
import CreateRoom from '../components/RoomCreate_Box/RoomCreate_Box';
import RoomDetail from './RoomDetail';

const AppRoutes = () => {
  const location = useLocation();
  const [isHome, setIsHome] = useState(location.pathname === '/');
  
  useEffect(() => {
    // Check if we're on the home route
    setIsHome(location.pathname === '/');
  }, [location]);

  return (
    <div className="app-content-wrapper">
      {/* Home content is always rendered */}
      <div className={`home-background ${!isHome ? 'blurred' : ''}`}>
        <Home />
      </div>
      
      {/* Modal content for other routes */}
      {!isHome && (
        <div className="modal-overlay">
          <div className="modal-content">
            <Routes>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/create-room" element={<CreateRoom />} />
              <Route path="/room/:slug" element={<RoomDetail />} />
            </Routes>
          </div>
        </div>
      )}
      
      {/* Routes for direct navigation */}
      {isHome && (
        <Routes>
          <Route path="/" element={null} /> {/* Home is already rendered above */}
        </Routes>
      )}
    </div>
  );
};

export default AppRoutes;