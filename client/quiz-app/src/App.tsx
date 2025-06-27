import React from 'react';
import './App.css'
import Navbar from './components/Navbar/Navbar';
import AppRoutes from './routes';

function App() {
  return (
    <>
      <Navbar />
      <AppRoutes />
    </>
  )
}

export default App;