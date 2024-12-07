export interface QuoteSection {
  invitation: string;
  inspiration: string;
  promisedBlessing: string;
}

export interface Quote {
  id: number;
  startDate: string;
  endDate: string;
  theme: string;
  talkName: string;
  sections: QuoteSection;
  completed?: boolean;
  image?: string;
}

export type QuoteUpdate = {
  theme: string;
  talkName: string;
  sections: QuoteSection;
  completed?: boolean;
  image?: string;
};