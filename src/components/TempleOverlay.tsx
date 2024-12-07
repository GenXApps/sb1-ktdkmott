import React from 'react';
import { useQuotes } from '../context/QuoteContext';

interface TempleOverlayProps {
  isVisible: boolean;
  onClose: () => void;
}

export const TempleOverlay: React.FC<TempleOverlayProps> = ({ isVisible, onClose }) => {
  const { templeImage } = useQuotes();
  
  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black transition-opacity duration-500"
      style={{ opacity: isVisible ? 1 : 0 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <img
          src={templeImage}
          alt="Temple"
          className="max-h-[70vh] object-cover rounded-lg shadow-2xl mb-8"
        />
        <h2 className="text-3xl font-bold text-white text-center mb-4">
          Great Job!
        </h2>
        <p className="text-xl text-white text-center">
          Keep Walking the Covenant Path
        </p>
      </div>
    </div>
  );
};