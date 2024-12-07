import React, { createContext, useContext, useState } from 'react';
import { Quote, QuoteUpdate } from '../types/quote';
import { quotes as initialQuotes } from '../data/quotes';
import { IMAGES } from '../constants/images';

interface QuoteContextType {
  quotes: Quote[];
  templeImage: string;
  christImage: string;
  centerImage: string;
  updateQuote: (id: number, updates: QuoteUpdate) => void;
  updateTempleImage: (imageUrl: string) => void;
  updateChristImage: (imageUrl: string) => void;
  updateCenterImage: (imageUrl: string) => void;
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

export const QuoteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [quotes, setQuotes] = useState<Quote[]>(initialQuotes);
  const [templeImage, setTempleImage] = useState<string>(IMAGES.LOGAN_TEMPLE);
  const [christImage, setChristImage] = useState<string>(IMAGES.CHRIST);
  const [centerImage, setCenterImage] = useState<string>(IMAGES.CENTER);

  const updateQuote = (id: number, updates: QuoteUpdate) => {
    setQuotes(prevQuotes =>
      prevQuotes.map(quote =>
        quote.id === id ? { ...quote, ...updates } : quote
      )
    );
  };

  const updateTempleImage = (imageUrl: string) => {
    setTempleImage(imageUrl);
  };

  const updateChristImage = (imageUrl: string) => {
    setChristImage(imageUrl);
  };

  const updateCenterImage = (imageUrl: string) => {
    setCenterImage(imageUrl);
  };

  return (
    <QuoteContext.Provider value={{ 
      quotes, 
      templeImage, 
      christImage,
      centerImage,
      updateQuote, 
      updateTempleImage,
      updateChristImage,
      updateCenterImage
    }}>
      {children}
    </QuoteContext.Provider>
  );
};

export const useQuotes = () => {
  const context = useContext(QuoteContext);
  if (context === undefined) {
    throw new Error('useQuotes must be used within a QuoteProvider');
  }
  return context;
};