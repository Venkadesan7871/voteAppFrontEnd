import React, { useState, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import Header from './Header';
import Sidebar from './Sidebar';
import CreateVote from './CreateVote';
import AllVotes from './AllVotes';
import MyVotes from './MyVotes';

// In JS, we can define this as a simple object for clarity
const DashboardView = {
  CREATE_VOTE: 'CREATE_VOTE',
  ALL_VOTES: 'ALL_VOTES',
  MY_VOTES: 'MY_VOTES',
};

const Dashboard = ({ currentUser, onLogout }) => {
  const [votes, setVotes] = useLocalStorage('votes', []);
  const [activeView, setActiveView] = useState(DashboardView.ALL_VOTES);
  const [allVotesData, setAllVotesData] = useState([]);
  const [myVotes, setMyVotes] = useState([]);
  const [deletedTable, setDeletedTable] = useState(false);
  const [updatedTable,setUpdatedTable] = useState(false);
  useEffect(() => {
    const fetchAllVotes = async () => {
      try {
        const res = await fetch("https://voteappbackend-snuf.onrender.com/all-votes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: currentUser.username,
          }),
        });
        const data = await res.json();
        if (res.ok && data) {
          setAllVotesData(data);
        }

      } catch (error) {
        console.error("Error fetching votes:", error);
      }
    };
    const fetchMyVotes = async () => {
      try {
        const res = await fetch("https://voteappbackend-snuf.onrender.com/my-votes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: currentUser.username,
          }),
        });
        const data = await res.json();
        if (res.ok && data) {
          setMyVotes(data);
        }

      } catch (error) {
        console.error("Error fetching votes:", error);
      }
    };
    fetchMyVotes();
    fetchAllVotes();
  }, [activeView, deletedTable,updatedTable]);
  
  const renderContent = () => {
    switch (activeView) {
      case DashboardView.CREATE_VOTE:
        return <CreateVote currentUser={currentUser} setVotes={setVotes} setActiveView={setActiveView} />;
      case DashboardView.ALL_VOTES:
        return <AllVotes currentUser={currentUser} votes={allVotesData} setVotes={setVotes} setDeletedTable={setDeletedTable} setUpdatedTable={setUpdatedTable} />;
      case DashboardView.MY_VOTES:
        return <MyVotes currentUser={currentUser} votes={myVotes} setVotes={setVotes} setDeletedTable={setDeletedTable} setUpdatedTable={setUpdatedTable}/>;
      default:
        return <AllVotes currentUser={currentUser} votes={votes} setVotes={setVotes} setDeletedTable={setDeletedTable} setUpdatedTable={setUpdatedTable}/>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      <Header username={currentUser.username} onLogout={onLogout} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeView={activeView} setActiveView={setActiveView} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;