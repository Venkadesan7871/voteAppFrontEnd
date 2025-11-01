import React, { useState } from 'react';
import VoteCard from './VoteCard';
import ViewVoteModal from './modals/ViewVoteModal';
import UpdateVoteModal from './modals/UpdateVoteModal';

const AllVotes = ({ currentUser, votes, setVotes, setDeletedTable, setUpdatedTable }) => {
  const [selectedVote, setSelectedVote] = useState(null);
  const [editingVote, setEditingVote] = useState(null);


  const publicVotes = votes.filter(v => v.visibility === 'public' || v.visibility === 'private' || v.username === currentUser.username);

  const handleView = async (vote,isEdit=false) => {    
    try {
      const isCreator = vote.username === currentUser.username;

      if (vote.visibility === 'public' || isCreator) {
        const res = await fetch("https://voteappbackend-snuf.onrender.com/view-votes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: vote.username,
            tableName: vote.name,
            isEdit,
          }),
        });
        const data = await res.json();
        
        if (res.ok && data) {
          let newVote = { ...vote, options: data.options, password: data.password };

          if (!isEdit)
            setSelectedVote(newVote);
          else
            setEditingVote(newVote);
        }
      }else{
        setSelectedVote(vote);
      }
    } catch (error) {
      console.error("Error fetching votes:", error);
    }
  };
  const handleDelete = async (vote) => {
    setDeletedTable(false);
    if (window.confirm("Are you sure you want to delete this vote? This action cannot be undone.")) {
      try {
        const res = await fetch("https://voteappbackend-snuf.onrender.com/delete-vote", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(vote)
        });

        const data = await res.json();

        if (!res.ok) {
          alert(data.error); // Example: "Table not found"
        } else {
          setDeletedTable(true);
          alert(data.message); // "Vote table and options deleted successfully"
        }
      } catch (error) {
        console.error("Error deleting vote:", error);
        alert("Something went wrong!");
      }
    }
  };
  
  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-6">All Votes</h2>
      {publicVotes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publicVotes.map((vote, index) => (
            <VoteCard
              key={index}
              vote={vote}
              currentUser={currentUser}
              onView={() => handleView(vote)}
              onUpdate={() => handleView(vote,true)}
              onDelete={() => handleDelete(vote)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-6 bg-slate-800 rounded-lg">
          <h3 className="text-xl font-semibold text-white">No Public Votes Yet</h3>
          <p className="text-slate-400 mt-2">Be the first to create a public vote for everyone to see!</p>
        </div>
      )}

      {selectedVote && (
        <ViewVoteModal
          vote={selectedVote}
          currentUser={currentUser}
          onClose={() => setSelectedVote(null)}
          setSelectedVote={setSelectedVote}
          setVotes={setVotes}
        />
      )}
      {editingVote && (
        <UpdateVoteModal
          vote={editingVote}
          onClose={() => setEditingVote(null)}
          setVotes={setVotes}
          currentUser = {currentUser}
          setUpdatedTable={setUpdatedTable}
        />
      )}
    </div>
  );
};

export default AllVotes;