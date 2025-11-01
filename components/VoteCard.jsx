import React from 'react';

const EyeIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.432 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
const PencilIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
  </svg>
);
const TrashIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.036-2.134H8.716C7.58 2.25 6.67 3.204 6.67 4.384v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>
);

const VoteCard = ({ vote, currentUser, onView, onUpdate, onDelete }) => {
  const isCreator = vote.username === currentUser.username;
  const totalVotes = vote.totalVotes || 0;

  return (
    <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden flex flex-col justify-between transition-transform duration-300 hover:transform hover:-translate-y-1 hover:shadow-indigo-500/30">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-white pr-2 break-words">{vote.name}</h3>
            <div className="flex-shrink-0 flex space-x-2">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                vote.status === 'live' ? 'bg-green-500/20 text-green-300' : 'bg-slate-600 text-slate-300'
                }`}>
                {vote.status}
                </span>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                vote.visibility === 'public' ? 'bg-sky-500/20 text-sky-300' : 'bg-purple-500/20 text-purple-300'
                }`}>
                {vote.visibility}
                </span>
            </div>
        </div>
        <p className="text-slate-400 text-sm mb-4">{vote.optionCount} options · {totalVotes} total votes</p>
      </div>

      <div className="bg-slate-800/50 p-4 border-t border-slate-700 flex justify-end space-x-2">
        <button onClick={onView} className="flex items-center space-x-2 text-sm font-medium py-2 px-3 rounded-md bg-slate-700 hover:bg-indigo-600 text-slate-100 transition-colors">
          <EyeIcon className="w-4 h-4" />
          <span>View</span>
        </button>
        {isCreator && (
          <>
            <button onClick={onUpdate} className="flex items-center space-x-2 text-sm font-medium py-2 px-3 rounded-md bg-slate-700 hover:bg-yellow-500 text-slate-100 transition-colors">
                <PencilIcon className="w-4 h-4" />
                <span>Update</span>
            </button>
            <button onClick={onDelete} className="flex items-center space-x-2 text-sm font-medium py-2 px-3 rounded-md bg-slate-700 hover:bg-red-500 text-slate-100 transition-colors">
                <TrashIcon className="w-4 h-4" />
                <span>Delete</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default VoteCard;