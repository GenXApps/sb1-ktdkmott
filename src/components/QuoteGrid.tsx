import React from 'react';
import { getCurrentWeekInfo } from '../utils/dateUtils';
import QuoteCard from './QuoteCard';
import { useQuotes } from '../context/QuoteContext';

export const QuoteGrid: React.FC = () => {
  const { quotes } = useQuotes();
  const currentWeekInfo = getCurrentWeekInfo();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {quotes.map((quote) => (
        <QuoteCard
          key={quote.id}
          quote={quote}
          isCurrentWeek={
            currentWeekInfo?.startDate.toISOString() === quote.startDate &&
            currentWeekInfo?.endDate.toISOString() === quote.endDate
          }
        />
      ))}
    </div>
  );
};