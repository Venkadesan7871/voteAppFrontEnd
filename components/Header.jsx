import React from 'react';

const LogoutIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
    </svg>
);


const Header = ({ username, onLogout }) => {
  return (
    <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 shadow-md sticky top-0 z-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-white">
              <span className="text-indigo-400">Voting</span> App
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-slate-300 hidden sm:block">Welcome, <span className="font-semibold text-white">{username}</span></span>
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 bg-slate-700 hover:bg-red-500/80 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
            >
              <LogoutIcon className="w-5 h-5"/>
              <span className="hidden sm:block">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;