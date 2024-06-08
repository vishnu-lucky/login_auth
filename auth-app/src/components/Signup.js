import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from 'react-router-dom'; 
import axios from 'axios';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      toast.error('Please fill all the fields');
    } else {
      try {
        const response = await axios.post('http://localhost:5000/api/auth/Signup', { email, password });
        toast.success('Registered successfully');
        return <Navigate to="/login" />; 
      } catch (error) {
        toast.error('Registration failed');
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
        <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
      </form>
    </div>
  );
};

export default Signup;
