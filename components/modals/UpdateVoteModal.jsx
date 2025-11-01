import React, { useState, useEffect } from 'react';
import Modal from './Modal';

const UpdateVoteModal = ({ vote, onClose, setVotes, currentUser, setUpdatedTable }) => {
  const [name, setName] = useState(vote.name);
  const [visibility, setVisibility] = useState(vote.visibility);
  const [password, setPassword] = useState(vote.password ? vote.password : null);
  const [status, setStatus] = useState(vote.status);
  const [options, setOptions] = useState(vote.options);
  const [error, setError] = useState('');
  const [debouncedName, setDebouncedName] = useState('');
  const [tableExists, setTableExists] = useState(false);
  console.log(vote,'vote.password');
  
  const handleCountChange = (optionIndex, newCount) => {
    const count = parseInt(newCount, 10);
    setOptions(prevOptions =>
      prevOptions.map((opt, idx) =>
        idx === optionIndex
          ? { ...opt, count: !isNaN(count) && count >= 0 ? count : '' }
          : opt
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.trim() === '') {
      setError('Vote name cannot be empty.');
      return;
    }
    if (visibility === 'private') {      
      if (password === '' || password === null || password === undefined) {
        setError("Enter Valid Password")
        return;
      }
    }
    if (tableExists) {
      setError('Table name already exists. Please choose a different name.');
      return;
    }
    console.log(name, visibility, password, options, currentUser, 'currentUser', vote);
    let formData = {
      currentTabeleName: vote.name,
      updatedTabelName: name,
      userName: vote.username,
      updateVotes: options,
      security: visibility,
      password: visibility === 'private' ? password : null,
      status: status,
    }

    // setVotes(prevVotes => prevVotes.map(v => 
    //   v.id === vote.id
    //     ? {
    //         ...v,
    //         name,
    //         visibility,
    //         password: visibility === 'private' ? password : undefined,
    //         status,
    //         options,
    //       }
    //     : v
    // ));

    const response = await fetch("https://voteappbackend-snuf.onrender.com/updateTable", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();
    console.log(data, 'datadata');

    if (response.ok) {
      setUpdatedTable(true)
      onClose();
    } else {
      setError("Update Failed")
    }
  };
  useEffect(() => {
    if (!debouncedName) return;

    const checkTableNameUnique = async () => {
      setError(null);
      setTableExists(false);
      try {
        const res = await fetch("https://voteappbackend-snuf.onrender.com/check-table", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: debouncedName }),
        });
        const data = await res.json();

        if (data.exists) {
          if (vote.name !== name) {
            setError("Table already exists");
            setTableExists(true);
          }
        } else {
          setTableExists(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    checkTableNameUnique();
  }, [debouncedName]);
  return (
    <Modal title="Update Vote" onClose={onClose} size="lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <p className="text-red-400 bg-red-900/20 p-3 rounded-md text-center">{error}</p>}
        <div>
          <label htmlFor="update-vote-name" className="block text-sm font-medium text-slate-300 mb-2">Vote Name</label>
          <input
            type="text"
            id="update-vote-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setDebouncedName(name)}
            required
            className="w-full px-3 py-2 border border-slate-600 bg-slate-700 text-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Vote Counts</label>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
            {options.map((option, index) => (
              <div
                key={index}
                className="flex items-center justify-between space-x-4 p-2 bg-slate-700/50 rounded-md"
              >
                <span
                  className="text-slate-100 truncate"
                  title={option.text}
                >
                  {option.text}
                </span>
                <input
                  type="number"
                  min="0"
                  value={option.count}
                  onChange={(e) => handleCountChange(index, e.target.value)}
                  className="w-24 px-2 py-1 border border-slate-600 bg-slate-900 text-slate-100 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  aria-label={`Votes for ${option.text}`}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <span className="block text-sm font-medium text-slate-300 mb-2">Visibility</span>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="radio" name="visibility" value="public" checked={visibility === 'public'} onChange={() => setVisibility('public')} className="form-radio h-4 w-4 text-indigo-600 bg-slate-700 border-slate-600" />
                <span>Public</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="radio" name="visibility" value="private" checked={visibility === 'private'} onChange={() => setVisibility('private')} className="form-radio h-4 w-4 text-indigo-600 bg-slate-700 border-slate-600" />
                <span>Private</span>
              </label>
            </div>
          </div>
          <div>
            <span className="block text-sm font-medium text-slate-300 mb-2">Status</span>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="radio" name="status" value="live" checked={status === 'live'} onChange={() => setStatus('live')} className="form-radio h-4 w-4 text-indigo-600 bg-slate-700 border-slate-600" />
                <span>Live</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="radio" name="status" value="completed" checked={status === 'completed'} onChange={() => setStatus('completed')} className="form-radio h-4 w-4 text-indigo-600 bg-slate-700 border-slate-600" />
                <span>Completed</span>
              </label>
            </div>
          </div>
        </div>

        {visibility === 'private' && (
          <div>
            <label htmlFor="update-vote-password" className="block text-sm font-medium text-slate-300 mb-2">Password</label>
            <input
              type="password"
              id="update-vote-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password or leave blank to keep old"
              className="w-full px-3 py-2 border border-slate-600 bg-slate-700 text-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        )}

        <p className="text-sm text-slate-400">Note: Option names cannot be changed, but you can manually adjust vote counts.</p>

        <div className="flex justify-end space-x-3 pt-4">
          <button type="button" onClick={onClose} className="py-2 px-4 bg-slate-600 hover:bg-slate-500 text-white font-semibold rounded-md transition-colors">
            Cancel
          </button>
          <button type="submit" className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition-colors">
            Save Changes
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default UpdateVoteModal;