import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { Dialog } from './Dialog';
import { TempleOverlay } from './TempleOverlay';

interface CompletionBadgeProps {
  completed: boolean;
  onClick: () => void;
  isCurrentWeek: boolean;
}

export const CompletionBadge: React.FC<CompletionBadgeProps> = ({ completed, onClick, isCurrentWeek }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [showTempleOverlay, setShowTempleOverlay] = useState(false);

  const handleClick = () => {
    if (!completed) {
      setShowDialog(true);
    } else {
      onClick();
    }
  };

  const handleConfirm = () => {
    setShowDialog(false);
    setShowTempleOverlay(true);
    setTimeout(() => {
      setShowTempleOverlay(false);
      onClick();
    }, 3000);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={`flex items-center space-x-2 px-3 py-1.5 rounded-full transition-all duration-300 ${
          completed
            ? 'bg-[#c4b000] text-[#002d5c] hover:bg-[#d4c010]'
            : 'bg-white/10 text-white hover:bg-white/20'
        }`}
      >
        <Check className={`w-4 h-4 ${completed ? 'opacity-100' : 'opacity-0'}`} />
        <span className="text-xs font-medium">
          {completed ? 'Completed' : 'Click Here to Discuss'}
        </span>
      </button>

      <Dialog isOpen={showDialog} onClose={() => setShowDialog(false)}>
        <div className="text-center">
          <h3 className="text-lg font-medium text-[#002d5c] mb-4">
            For Discussion
          </h3>
          <p className="text-gray-600 mb-6">
            How can President Nelson's teaching draw me closer to the Savior?
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setShowDialog(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="px-4 py-2 text-sm font-medium text-white bg-[#002d5c] rounded-md hover:bg-[#003d7c]"
            >
              Mark as Complete
            </button>
          </div>
        </div>
      </Dialog>

      <TempleOverlay 
        isVisible={showTempleOverlay} 
        onClose={() => setShowTempleOverlay(false)} 
      />
    </>
  );
};