import React, { useState } from 'react';
import AuthContainer from './AuthContainer';
import { useSelector, useDispatch } from "react-redux";
import { updateUserDetails } from '@/store/action';


const LoginPage = ({ onLogin, onSwitchToRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch("https://voteappbackend-snuf.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const data = await res.json();

    if (data.message === "Login successful!") {
      const user = { id: data.user.id, username: data.user.username };
      dispatch(updateUserDetails(user));
      onLogin(user);
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <AuthContainer title="Login">
      <form className="mt-8 space-y-6" onSubmit={handleLogin}>
        {error && <p className="text-red-400 text-center">{error}</p>}
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <input
              id="username"
              name="username"
              type="text"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-600 bg-slate-700 text-slate-100 placeholder-slate-400 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-600 bg-slate-700 text-slate-100 placeholder-slate-400 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-slate-800"
          >
            Sign in
          </button>
        </div>
      </form>
      <p className="mt-2 text-center text-sm text-slate-400">
        Don't have an account?{' '}
        <button onClick={onSwitchToRegister} className="font-medium text-indigo-400 hover:text-indigo-300">
          Register here
        </button>
      </p>
    </AuthContainer>
  );
};

export default LoginPage;