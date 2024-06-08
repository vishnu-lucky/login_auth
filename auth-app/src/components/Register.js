
import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className="signup-container">
      <h2>Register</h2>
      <Link to="/Signup">Register</Link>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default Register;
