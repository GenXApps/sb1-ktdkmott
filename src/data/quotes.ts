import { Quote } from '../types/quote';
import { getWeeksFor2025 } from '../utils/dateUtils';

const weeks = getWeeksFor2025();

const defaultTalkNames = [
  'Finding Inner Peace',
  'Building Strong Relationships',
  'Personal Growth Journey',
  'Spiritual Development'
];

export const quotes: Quote[] = weeks.map((week, index) => ({
  id: index + 1,
  startDate: week.startDate.toISOString(),
  endDate: week.endDate.toISOString(),
  theme: ['Growth', 'Love', 'Wisdom', 'Courage'][Math.floor(Math.random() * 4)],
  talkName: defaultTalkNames[Math.floor(Math.random() * defaultTalkNames.length)],
  sections: {
    invitation: '',
    inspiration: '',
    promisedBlessing: ''
  },
  completed: false
}));