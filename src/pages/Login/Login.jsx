import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import { toast } from 'react-hot-toast'; // Import toast
import './Login.css';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const { email, password } = formData;

    if (!email) {
      toast.error('Email is required'); // Toast for empty email
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('Email address is invalid'); // Toast for invalid email
      return false;
    }

    if (!password) {
      toast.error('Password is required'); // Toast for empty password
      return false;
    } else if (password.length < 6) {
      toast.error('Password must be at least 6 characters'); // Toast for short password
      return false;
    }

    return true; // Validation passed
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return; 
    }

    try {
      const response = await axios.post('https://your-api-url.com/login', formData);
      
      localStorage.setItem('authToken', response.data.token);
      toast.success('Login successful!'); 
      navigate('/dashboard'); 
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message); 
      } else {
        toast.error('An error occurred. Please try again later.'); 
      }
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h2 className="login-heading">Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="login-input"
            />
          </div>
          <div className="password-container">
            <input
              type={passwordVisible ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="login-input password-input" // Added a class for styling
            />
            <span className="password-toggle" onClick={togglePasswordVisibility}>
              <span className="material-icons">
                {passwordVisible ? 'visibility' : 'visibility_off'}
              </span>
            </span>
          </div>
          <button type="submit" className="login-button">
            Log In
          </button>
        </form>
        <p className="login-footer-text">
          Don't have an account?{' '}
          <a href="/signup" className="login-link">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;