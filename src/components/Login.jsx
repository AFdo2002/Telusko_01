import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  // Real-time validation for username
  const validateUsername = (username) => {
    if (username.length < 8) {
      setUsernameError('Username must be at least 8 characters long');
    } else {
      setUsernameError('');
    }
  };

  // Real-time validation for password
  const validatePassword = (password) => {
    if (password.length === 0) {
      setPasswordError('Password cannot be empty');
    } else {
      setPasswordError('');
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for empty fields
    if (!username || !password) {
      setError('All fields are required');
      return;
    }

    // Check for validation errors
    if (usernameError || passwordError) {
      setError('Please fix the errors before submitting');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password,
      });
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', username);
        navigate('/landing');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4">Log in</h2>
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
            }}
            className="w-full p-2 border rounded"
            required
          />
          {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Log in
        </button>
        <p className="mt-4 text-center">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;