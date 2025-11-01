import React from 'react';

const AuthContainer = ({ title, children }) => {
  return (
    <div className="w-full max-w-md p-8 space-y-8 bg-slate-800 rounded-2xl shadow-2xl shadow-indigo-500/10">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white">Voting App</h1>
        <h2 className="mt-2 text-xl font-semibold text-slate-300">{title}</h2>
      </div>
      {children}
    </div>
  );
};

export default AuthContainer;