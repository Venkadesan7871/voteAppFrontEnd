import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Dashboard from './components/Dashboard';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogout = () => {
    setCurrentUser(null);
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        {isRegistering ? (
          <RegisterPage
            onSwitchToLogin={() => setIsRegistering(false)}
          />
        ) : (
          <LoginPage
            onLogin={setCurrentUser}
            onSwitchToRegister={() => setIsRegistering(true)}
          />
        )}
      </div>
    );
  }

  return <Dashboard currentUser={currentUser} onLogout={handleLogout} />;
};

export default App;