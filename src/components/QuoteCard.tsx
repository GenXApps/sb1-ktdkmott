import React, { useState } from 'react';
import { Quote, QuoteUpdate, QuoteSection as QuoteSectionType } from '../types/quote';
import { BookHeart, Edit2, Check, X } from 'lucide-react';
import { formatDate } from '../utils/dateUtils';
import { useQuotes } from '../context/QuoteContext';
import { useAuth } from '../context/AuthContext';
import { QuoteSection } from './QuoteSection';
import { CompletionBadge } from './CompletionBadge';
import { ImageUpload } from './ImageUpload';

interface QuoteCardProps {
  quote: Quote;
  isCurrentWeek: boolean;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ quote, isCurrentWeek }) => {
  const { updateQuote } = useQuotes();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedQuote, setEditedQuote] = useState<QuoteUpdate>({
    theme: quote.theme,
    talkName: quote.talkName,
    sections: quote.sections,
    completed: quote.completed,
    image: quote.image,
  });

  const startDate = new Date(quote.startDate);
  const endDate = new Date(quote.endDate);

  const handleSectionChange = (section: keyof QuoteSectionType, value: string) => {
    setEditedQuote(prev => ({
      ...prev,
      sections: {
        ...prev.sections,
        [section]: value
      }
    }));
  };

  const handleImageUpload = (imageUrl: string) => {
    setEditedQuote(prev => ({
      ...prev,
      image: imageUrl
    }));
  };

  const handleImageRemove = () => {
    setEditedQuote(prev => ({
      ...prev,
      image: undefined
    }));
  };

  const handleSave = () => {
    updateQuote(quote.id, editedQuote);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedQuote({
      theme: quote.theme,
      talkName: quote.talkName,
      sections: quote.sections,
      completed: quote.completed,
      image: quote.image
    });
    setIsEditing(false);
  };

  const toggleCompletion = () => {
    const updates = {
      ...editedQuote,
      completed: !quote.completed
    };
    updateQuote(quote.id, updates);
  };

  return (
    <div className={`p-6 rounded-lg shadow-lg transition-all duration-300 ${
      isCurrentWeek 
        ? 'bg-gradient-to-br from-[#002d5c] via-[#003d7c] to-[#004b8d] text-white border-2 border-[#c4b000]/30' 
        : quote.completed
        ? 'bg-gradient-to-br from-[#002d5c] to-[#004b8d] text-white'
        : 'bg-gradient-to-br from-[#003d7c] to-[#002d5c] text-white'
    }`}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-white/90">
          {formatDate(startDate)} - {formatDate(endDate)}
        </span>
        {isEditing ? (
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={editedQuote.theme}
              onChange={(e) => setEditedQuote(prev => ({ ...prev, theme: e.target.value }))}
              className="px-2 py-1 rounded text-xs font-semibold bg-white text-[#002d5c] border border-[#002d5c]"
            />
          </div>
        ) : (
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#c4b000] text-[#002d5c]">
            {quote.theme}
          </span>
        )}
      </div>

      {(quote.image || isEditing) && (
        <div className="mb-4">
          {isEditing ? (
            <ImageUpload
              currentImage={editedQuote.image}
              onImageUpload={handleImageUpload}
              onImageRemove={handleImageRemove}
            />
          ) : quote.image && (
            <img
              src={quote.image}
              alt="Quote illustration"
              className="w-full h-48 object-cover rounded-lg"
            />
          )}
        </div>
      )}

      <div className="mb-4">
        {isEditing ? (
          <textarea
            value={editedQuote.talkName}
            onChange={(e) => setEditedQuote(prev => ({ ...prev, talkName: e.target.value }))}
            className="w-full px-3 py-2 rounded text-gray-800 font-medium border border-[#002d5c] resize-none min-h-[60px]"
            placeholder="Enter talk name..."
          />
        ) : (
          <h2 className="text-lg font-medium break-words leading-tight text-white">
            {quote.talkName}
          </h2>
        )}
      </div>

      <div className="flex items-start space-x-3">
        <BookHeart className="w-6 h-6 flex-shrink-0 text-[#c4b000]" />
        <div className="flex-grow">
          {Object.keys(quote.sections).map((section) => (
            <QuoteSection
              key={section}
              section={section as keyof QuoteSectionType}
              value={editedQuote.sections[section as keyof QuoteSectionType]}
              isEditing={isEditing}
              onChange={(value) => handleSectionChange(section as keyof QuoteSectionType, value)}
              isCurrentWeek={isCurrentWeek}
            />
          ))}
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <CompletionBadge
          completed={quote.completed || false}
          onClick={toggleCompletion}
          isCurrentWeek={isCurrentWeek}
        />
        
        {user?.isAdmin && (
          isEditing ? (
            <div className="flex space-x-2">
              <button
                onClick={handleCancel}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
                title="Cancel"
              >
                <X className="w-4 h-4" />
              </button>
              <button
                onClick={handleSave}
                className="p-2 rounded-full bg-[#c4b000] hover:bg-[#d4c010] text-[#002d5c]"
                title="Save"
              >
                <Check className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
              title="Edit"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default QuoteCard;