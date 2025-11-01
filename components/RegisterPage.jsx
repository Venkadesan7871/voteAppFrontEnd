import React, { useState } from 'react';
import AuthContainer from './AuthContainer';

const RegisterPage = ({ onSwitchToLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const res = await fetch("https://voteappbackend-snuf.onrender.com/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    // response convert
    const data = await res.json();
    if (data.message === "Username already exists!") {
      setError(data.message);
      return
    }
    onSwitchToLogin();
  };

  return (
    <AuthContainer title="Register">
      <form className="mt-8 space-y-6" onSubmit={handleRegister}>
        {error && <p className="text-red-400 text-center">{error}</p>}
        <div className="rounded-md shadow-sm">
          <input
            name="username"
            type="text"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-600 bg-slate-700 text-slate-100 placeholder-slate-400 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-[-1px]"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            name="password"
            type="password"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-600 bg-slate-700 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-[-1px]"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            name="confirm-password"
            type="password"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-600 bg-slate-700 text-slate-100 placeholder-slate-400 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-slate-800"
          >
            Register
          </button>
        </div>
      </form>
      <p className="mt-2 text-center text-sm text-slate-400">
        Already have an account?{' '}
        <button onClick={onSwitchToLogin} className="font-medium text-indigo-400 hover:text-indigo-300">
          Login here
        </button>
      </p>
    </AuthContainer>
  );
};

export default RegisterPage;