import React, { useState } from 'react';
import VoteCard from './VoteCard';
import ViewVoteModal from './modals/ViewVoteModal';
import UpdateVoteModal from './modals/UpdateVoteModal';

const MyVotes = ({ currentUser, votes, setVotes, setDeletedTable, setUpdatedTable }) => {
  const [viewingVote, setViewingVote] = useState(null);
  const [editingVote, setEditingVote] = useState(null);

  const myVotes = votes.filter((vote) => vote.username === currentUser.username);

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
          setDeletedTable(true);
          alert(data.error); // Example: "Table not found"
        } else {
          alert(data.message); // "Vote table and options deleted successfully"
        }
      } catch (error) {
        console.error("Error deleting vote:", error);
        alert("Something went wrong!");
      }
    }
  };
  const handleView = async (vote, isEdit = false) => {
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
            isEdit
          }),
        });
        const data = await res.json();
        if (res.ok && data) {
          let newVote = { ...vote, options: data.options, password: data.password };

          if (!isEdit)
            setViewingVote(newVote);
          else
            setEditingVote(newVote);
        }
      } else {
        setViewingVote(vote);
      }
    } catch (error) {
      console.error("Error fetching votes:", error);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-6">My Votes</h2>
      {myVotes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myVotes.map((vote, index) => (
            <VoteCard
              key={index}
              vote={vote}
              currentUser={currentUser}
              onView={() => handleView(vote)}
              onUpdate={() => handleView(vote, true)}
              onDelete={() => handleDelete(vote)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-6 bg-slate-800 rounded-lg">
          <h3 className="text-xl font-semibold text-white">You haven't created any votes yet.</h3>
          <p className="text-slate-400 mt-2">Go to the "Create Vote" section to get started!</p>
        </div>
      )}

      {viewingVote && (
        <ViewVoteModal
          vote={viewingVote}
          currentUser={currentUser}
          onClose={() => setViewingVote(null)}
          setVotes={setVotes}
        />
      )}

      {editingVote && (
        <UpdateVoteModal
          vote={editingVote}
          onClose={() => setEditingVote(null)}
          setVotes={setVotes}
          currentUser={currentUser}
          setUpdatedTable={setUpdatedTable}
        />
      )}
    </div>
  );
};

export default MyVotes;