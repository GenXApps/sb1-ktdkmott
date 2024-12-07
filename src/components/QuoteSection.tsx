import React from 'react';
import { QuoteSection as QuoteSectionType } from '../types/quote';

interface QuoteSectionProps {
  section: keyof QuoteSectionType;
  value: string;
  isEditing: boolean;
  onChange: (value: string) => void;
  isCurrentWeek: boolean;
}

export const QuoteSection: React.FC<QuoteSectionProps> = ({
  section,
  value,
  isEditing,
  onChange,
  isCurrentWeek,
}) => {
  const sectionTitles = {
    invitation: 'Invitation',
    inspiration: 'Inspiration',
    promisedBlessing: 'Promised Blessing'
  };

  // If not editing and no value, don't render anything
  if (!isEditing && !value) {
    return null;
  }

  return (
    <div className="mb-4">
      <h3 className="text-sm font-semibold mb-2 text-[#c4b000]">
        {sectionTitles[section]}
      </h3>
      {isEditing ? (
        <textarea
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Enter ${sectionTitles[section].toLowerCase()}...`}
          className="w-full p-2 rounded text-gray-800 min-h-[80px] text-sm border border-[#002d5c]/20 focus:border-[#002d5c] focus:ring focus:ring-[#002d5c]/20"
        />
      ) : (
        <p className="text-sm leading-relaxed text-white/90">
          {value}
        </p>
      )}
    </div>
  );
};