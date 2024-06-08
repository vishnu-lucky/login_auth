import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import AuthProvider, { AuthContext } from './context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          
          <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={
              <AuthContext.Consumer>
                {({ user }) => user ? <Home /> : <Navigate to="/login" />}
              </AuthContext.Consumer>
            } />
          </Routes>
          <ToastContainer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
