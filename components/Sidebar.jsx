import React from 'react';

// Replicating the enum with a JS object
const DashboardView = {
  CREATE_VOTE: 'CREATE_VOTE',
  ALL_VOTES: 'ALL_VOTES',
  MY_VOTES: 'MY_VOTES',
};

const PlusCircleIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const GlobeAltIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
);

const UserCircleIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const NavItem = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ease-in-out ${
      isActive
        ? 'bg-indigo-600 text-white shadow-lg'
        : 'text-slate-300 hover:bg-slate-700 hover:text-white'
    }`}
  >
    {icon}
    <span className="ml-3">{label}</span>
  </button>
);

const Sidebar = ({ activeView, setActiveView }) => {
  return (
    <aside className="w-64 bg-slate-800 p-4 border-r border-slate-700 flex-shrink-0">
      <nav className="space-y-2">
        <NavItem
          icon={<PlusCircleIcon className="w-6 h-6" />}
          label="Create Vote"
          isActive={activeView === DashboardView.CREATE_VOTE}
          onClick={() => setActiveView(DashboardView.CREATE_VOTE)}
        />
        <NavItem
          icon={<GlobeAltIcon className="w-6 h-6" />}
          label="All Votes"
          isActive={activeView === DashboardView.ALL_VOTES}
          onClick={() => setActiveView(DashboardView.ALL_VOTES)}
        />
        <NavItem
          icon={<UserCircleIcon className="w-6 h-6" />}
          label="My Votes"
          isActive={activeView === DashboardView.MY_VOTES}
          onClick={() => setActiveView(DashboardView.MY_VOTES)}
        />
      </nav>
    </aside>
  );
};

export default Sidebar;