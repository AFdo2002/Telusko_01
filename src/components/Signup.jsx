import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const navigate = useNavigate();

  // Validate password strength
  const validatePassword = (password) => {
    const lowerCase = /[a-z]/.test(password);
    const upperCase = /[A-Z]/.test(password);
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const length = password.length >= 8;

    if (length && lowerCase && upperCase && specialChar) {
      setPasswordStrength('Strong');
    } else if (length && (lowerCase || upperCase || specialChar)) {
      setPasswordStrength('Medium');
    } else {
      setPasswordStrength('Weak');
    }
  };

  // Real-time validation for username
  const validateUsername = (username) => {
    if (username.length < 8) {
      setUsernameError('Username must be at least 8 characters long');
    } else {
      setUsernameError('');
    }
  };

  // Real-time validation for password
  const validatePasswordInput = (password) => {
    const lowerCase = /[a-z]/.test(password);
    const upperCase = /[A-Z]/.test(password);
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const length = password.length >= 8;

    if (!length) {
      setPasswordError('Password must be at least 8 characters long');
    } else if (!(lowerCase && upperCase && specialChar)) {
      setPasswordError('Password must contain at least one lowercase letter, one uppercase letter, and one special character');
    } else {
      setPasswordError('');
    }
  };

  // Real-time validation for confirm password
  const validateConfirmPassword = (confirmPassword) => {
    if (confirmPassword !== password) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for empty fields
    if (!username || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    // Check for validation errors
    if (usernameError || passwordError || confirmPasswordError) {
      setError('Please fix the errors before submitting');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', {
        username,
        password,
      });
      if (response.status === 201) {
        alert('Signup successful! Redirecting to login...');
        setTimeout(() => navigate('/login'), 2000);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4">Sign up</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              validateUsername(e.target.value);
            }}
            className="w-full p-2 border rounded"
            required
          />
          {usernameError && <p className="text-red-500 text-sm mt-1">{usernameError}</p>}
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validatePassword(e.target.value);
              validatePasswordInput(e.target.value);
            }}
            className="w-full p-2 border rounded"
            required
          />
          {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
          <p className="text-sm mt-1">Password Strength: {passwordStrength}</p>
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              validateConfirmPassword(e.target.value);
            }}
            className="w-full p-2 border rounded"
            required
          />
          {confirmPasswordError && <p className="text-red-500 text-sm mt-1">{confirmPasswordError}</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Sign up
        </button>
        <p className="mt-4 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;