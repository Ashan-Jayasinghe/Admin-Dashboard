import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for API calls
import { toast } from 'react-hot-toast'; // Import toast for notifications
import './Signup.css'; // Import the correct CSS file for Signup

function Signup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: null,
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    const { name, email, password, confirmPassword } = formData;

    if (!name) {
      toast.error('Name is required');
      newErrors.name = 'Name is required';
    }

    if (!email) {
      toast.error('Email is required');
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('Email address is invalid');
      newErrors.email = 'Email address is invalid';
    }

    if (!password) {
      toast.error('Password is required');
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return; // Stop submission if there are validation errors
    }

    try {
      const response = await axios.post('https://your-api-url.com/signup', formData);

      if (response.status === 200) {
        toast.success('Signup successful! Please log in.');
        navigate('/login'); // Redirect to login page
      } else {
        toast.error(response.data.message || 'Signup failed');
        setErrors({ ...errors, api: response.data.message || 'Signup failed' });
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message); // Show error from server
        setErrors({ ...errors, api: error.response.data.message });
      } else {
        toast.error('An error occurred. Please try again later.'); // General error
        setErrors({ ...errors, api: 'An error occurred. Please try again later.' });
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <h2 className="signup-heading">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="signup-input"
            />
            {errors.name && <p className="error-message">{errors.name}</p>}
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="signup-input"
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="signup-input"
            />
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>
          <div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="signup-input"
            />
            {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
          </div>
          {errors.api && <p className="error-message">{errors.api}</p>}
          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
        <p className="signup-footer-text">
          Already have an account?{' '}
          <a href="/login" className="signup-link">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;