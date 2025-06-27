import React from 'react';
import './App.css'
import Navbar from './components/Navbar/Navbar.tsx';
import Slider from './components/SliderShow/Slide.tsx';
import Banner from './components/Banner_Adds/Banner_Add.tsx';
import Room_Thumbnail from './components/Room_Thumbnail/Room_Thumbnail.tsx';
import { Routes, Route } from 'react-router-dom'; // Only import Routes and Route
import Signup from './components/Signup_Box/Signup_Box.tsx';
import Login from './components/Login_Box/Login_Box.tsx';
import CreateRoom from './components/RoomCreate_Box/RoomCreate_Box.tsx';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <div className='main-content'>
              <Slider />
              <div className='add-banner-section'>
                <Banner 
                  title="Welcome to Quiz App" 
                  text="Test your knowledge with our quizzes" 
                  buttonText="Get Started"
                  className="top-banner"
                />
                <Banner 
                  title="Ready for Another Challenge?" 
                  text="Explore more quizzes below"
                  buttonText="Try Now"
                  className="bottom-banner"
                />
              </div>
            </div>
            <Room_Thumbnail />
          </>
        } />
        
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-room" element={<CreateRoom />} />
        
        <Route path="/room/:slug" element={
          <div className="room-detail">
            <h2>Room Details</h2>
            <p>This is a placeholder for room details.</p>
          </div>
        } />
      </Routes>
    </>
  )
}

export default App;