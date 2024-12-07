import React, { useState } from 'react';
import { LogOut, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { LoginDialog } from './LoginDialog';

export const AdminControls: React.FC = () => {
  const { user, logout } = useAuth();
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  return (
    <>
      <div className="flex items-center space-x-2">
        {user ? (
          <button
            onClick={logout}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#002d5c] text-white hover:bg-[#003d7c] transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm">Logout</span>
          </button>
        ) : (
          <button
            onClick={() => setShowLoginDialog(true)}
            className="p-2 rounded-full bg-[#c4b000] text-[#002d5c] hover:bg-[#d4c010] transition-colors"
            title="Admin Login"
          >
            <Settings className="w-5 h-5" />
          </button>
        )}
      </div>

      <LoginDialog 
        isOpen={showLoginDialog}
        onClose={() => setShowLoginDialog(false)}
      />
    </>
  );
};