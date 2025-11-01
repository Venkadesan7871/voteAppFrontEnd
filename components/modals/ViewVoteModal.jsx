import React, { useState, useMemo } from 'react';
import Modal from './Modal';

const ViewVoteModal = ({ vote, currentUser, onClose, setVotes, setSelectedVote }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(vote.visibility === 'public');

  // const userHasVoted = useMemo(() => vote.voters.includes(currentUser.id), [vote.voters, currentUser.id]);
  const userHasVoted = false
  const isCreator = vote.username === currentUser.username;
  console.log(vote,'vote.options');
  
  // let totalVotes = useMemo(() => vote.options.reduce((sum, opt) => sum + opt.count, 0), [vote.options]);
  let totalVotes = vote.totalVotes;

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    console.log(password, 'password');
    const checkPass = await fetch("https://voteappbackend-snuf.onrender.com/check-pass", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: vote.username,
        tableName: vote.name,
        password,
      }),
    });
    const correctPass = await checkPass.json();
    
    if (correctPass.isPasswordMatch) {
      const res = await fetch("https://voteappbackend-snuf.onrender.com/view-votes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: vote.username,
          tableName: vote.name,
        }),
      });
      const data = await res.json();
      if (res.ok && data) {
        let newVote = { ...vote, options: data.options };
        setSelectedVote(newVote);
      }
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect password.');
    }
  };

  const handleVote = () => {
    if (!selectedOption) return;

    setVotes(prevVotes => prevVotes.map(v => {
      if (v.id === vote.id) {
        const newOptions = v.options.map(opt =>
          opt.id === selectedOption ? { ...opt, count: opt.count + 1 } : opt
        );
        return { ...v, options: newOptions, voters: [...v.voters, currentUser.id] };
      }
      return v;
    }));
    onClose();
  };

  const renderContent = () => {
    if (vote.visibility === 'private' && !isAuthenticated && !isCreator) {
      return (
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <p className="text-slate-300">This vote is private. Please enter the password to view and vote.</p>
          {authError && <p className="text-red-400">{authError}</p>}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-slate-600 bg-slate-700 text-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Vote Password"
          />
          <button type="submit" className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-md">
            Unlock
          </button>
        </form>
      );
    }

    // const showResults = userHasVoted || isCreator || vote.status === 'completed';
    const showResults = true;

    return (
      <div className="space-y-6">
        <div>
          <h4 className="text-lg font-semibold text-slate-200 mb-3">
            {showResults ? 'Results' : 'Cast Your Vote'}
          </h4>
          <div className="space-y-3">
            {vote.options.map((option,index) => {
              const percentage = totalVotes > 0 ? (option.count / totalVotes) * 100 : 0;
              return (
                <div key={index}>
                  {showResults ? (
                    <div className="relative p-3 bg-slate-700 rounded-md overflow-hidden">
                      <div className="absolute top-0 left-0 h-full bg-indigo-500/30" style={{ width: `${percentage}%` }}></div>
                      <div className="relative flex justify-between items-center z-10">
                        <span className="font-medium text-slate-100">{option.text}</span>
                        <span className="text-sm font-semibold text-slate-300">{option.count} votes ({percentage.toFixed(1)}%)</span>
                      </div>
                    </div>
                  ) : (
                    <label className={`block p-3 rounded-md cursor-pointer border-2 transition-colors ${selectedOption === option.id ? 'bg-indigo-500/30 border-indigo-500' : 'bg-slate-700 border-transparent hover:bg-slate-600'}`}>
                      <input
                        type="radio"
                        name="vote-option"
                        value={option.id}
                        checked={selectedOption === option.id}
                        onChange={(e) => setSelectedOption(e.target.value)}
                        className="hidden"
                      />
                      <span className="font-medium text-slate-100">{option.text}</span>
                    </label>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {!showResults && (
          <button
            onClick={handleVote}
            disabled={!selectedOption}
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-md disabled:bg-slate-600 disabled:cursor-not-allowed"
          >
            Submit Vote
          </button>
        )}

        {userHasVoted && !isCreator && (
          <p className="text-center text-green-400 bg-green-900/20 p-3 rounded-md">You have already voted.</p>
        )}
      </div>
    );
  };

  return (
    <Modal title={vote.name} onClose={onClose} size="lg">
      {renderContent()}
    </Modal>
  );
};

export default ViewVoteModal;