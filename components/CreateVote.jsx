import React, { useState, useEffect } from 'react';

// Replicating the enum with a JS object
const DashboardView = {
    CREATE_VOTE: 'CREATE_VOTE',
    ALL_VOTES: 'ALL_VOTES',
    MY_VOTES: 'MY_VOTES',
};

const CreateVote = ({ currentUser, setVotes, setActiveView }) => {
    const [name, setName] = useState('');
    const [visibility, setVisibility] = useState('public');
    const [password, setPassword] = useState('');
    const [options, setOptions] = useState(['', '']);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [debouncedName, setDebouncedName] = useState('');
    const [tableExists, setTableExists] = useState(false);

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const addOption = () => {
        if (options.length < 10) {
            setOptions([...options, '']);
        }
    };

    const removeOption = (index) => {
        if (options.length > 2) {
            const newOptions = options.filter((_, i) => i !== index);
            setOptions(newOptions);
        }
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (name.trim() === '') {
            setError('Vote name cannot be empty.');
            return;
        }
        const filledOptions = options.filter(opt => opt.trim() !== '');
        if (filledOptions.length < 2) {
            setError('Please provide at least two non-empty options.');
            return;
        }
        if (new Set(filledOptions).size !== filledOptions.length) {
            setError('Options must be unique.');
            return;
        }
        if(tableExists) {
            setError('Table name already exists. Please choose a different name.');
            return;
        }

        const newVote = {
            id: Date.now().toString(),
            name,
            creatorId: currentUser.id,
            visibility,
            password: visibility === 'private' ? password : null,
            options: filledOptions.map((opt, index) => ({ id: `${Date.now()}-${index}`, text: opt, count: 0 })),
            status: 'live',
            voters: [],
            username: currentUser.username,
        };
        try {
            const res = await fetch("https://voteappbackend-snuf.onrender.com/create-vote", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newVote)
            });
            const data = await res.json();
            console.log(data,'data' );
            
        } catch (error) {
            console.error(error);
        }
        // setVotes(prevVotes => [...prevVotes, newVote]);
        setActiveView(DashboardView.MY_VOTES);
    };

    useEffect(() => {
        if (!debouncedName) return;

        const checkTableNameUnique = async () => {
            setError(null);
            setMessage(null);
            setTableExists(false);
            try {
                const res = await fetch("https://voteappbackend-snuf.onrender.com/check-table", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name: debouncedName }),
                });
                const data = await res.json();

                if (data.exists) {
                    setError("Table already exists");
                    setTableExists(true);
                } else {
                    setMessage("Table name is available");
                    setTableExists(false);
                }
            } catch (error) {
                console.error(error);
            }
        };

        checkTableNameUnique();
    }, [debouncedName]);

    return (
        <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-6">Create a New Vote</h2>
            <form onSubmit={handleSubmit} className="p-8 bg-slate-800 rounded-lg shadow-lg space-y-6">
                {error && <p className="text-red-400 bg-red-900/20 border border-red-500/50 p-3 rounded-md text-center">{error}</p>}
                {message && <p className="text-green-400 bg-green-900/20 border border-green-500/50 p-3 rounded-md text-center">{message}</p>}
                <div>
                    <label htmlFor="vote-name" className="block text-sm font-medium text-slate-300 mb-2">Table Name</label>
                    <input
                        type="text"
                        id="vote-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onBlur={() => setDebouncedName(name)} // trigger check only when input loses focus
                        required
                        className="w-full px-3 py-2 border border-slate-600 bg-slate-700 text-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <span className="block text-sm font-medium text-slate-300 mb-2">Visibility</span>
                    <div className="flex space-x-4">
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input type="radio" name="visibility" value="public" checked={visibility === 'public'} onChange={() => setVisibility('public')} className="form-radio h-4 w-4 text-indigo-600 bg-slate-700 border-slate-600 focus:ring-indigo-500" />
                            <span className="text-slate-100">Public</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input type="radio" name="visibility" value="private" checked={visibility === 'private'} onChange={() => setVisibility('private')} className="form-radio h-4 w-4 text-indigo-600 bg-slate-700 border-slate-600 focus:ring-indigo-500" />
                            <span className="text-slate-100">Private</span>
                        </label>
                    </div>
                </div>

                {visibility === 'private' && (
                    <div>
                        <label htmlFor="vote-password" className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                        <input
                            type="password"
                            id="vote-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-slate-600 bg-slate-700 text-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Options</label>
                    <div className="space-y-3">
                        {options.map((option, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <input
                                    type="text"
                                    value={option}
                                    onChange={(e) => handleOptionChange(index, e.target.value)}
                                    className="w-full px-3 py-2 border border-slate-600 bg-slate-700 text-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder={`Option ${index + 1}`}
                                />
                                {options.length > 2 && (
                                    <button type="button" onClick={() => removeOption(index)} className="p-2 text-slate-400 hover:text-red-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 8.707a1 1 0 00-1.414 1.414L8.586 11l-1.293 1.293a1 1 0 101.414 1.414L10 12.414l1.293 1.293a1 1 0 001.414-1.414L11.414 11l1.293-1.293a1 1 0 00-1.414-1.414L10 9.586 8.707 8.707z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                    {options.length < 10 && (
                        <button type="button" onClick={addOption} className="mt-3 text-sm font-medium text-indigo-400 hover:text-indigo-300">
                            + Add another option
                        </button>
                    )}
                </div>

                <div className="pt-4">
                    <button type="submit" className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-md transition-colors duration-200">
                        Create Vote
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateVote;
