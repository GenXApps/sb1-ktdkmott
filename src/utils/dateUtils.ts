export interface WeekInfo {
  weekNumber: number;
  startDate: Date;
  endDate: Date;
}

export const getWeeksFor2025 = (): WeekInfo[] => {
  const weeks: WeekInfo[] = [];
  const startOfYear = new Date(2025, 0, 1);
  
  // Adjust to first week's Monday
  const firstMonday = new Date(startOfYear);
  while (firstMonday.getDay() !== 1) {
    firstMonday.setDate(firstMonday.getDate() + 1);
  }

  for (let i = 0; i < 52; i++) {
    const startDate = new Date(firstMonday);
    startDate.setDate(startDate.getDate() + (i * 7));
    
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 6);

    weeks.push({
      weekNumber: i + 1,
      startDate,
      endDate
    });
  }

  return weeks;
};

export const getCurrentWeekInfo = (): WeekInfo | null => {
  const today = new Date();
  const weeks = getWeeksFor2025();
  
  return weeks.find(week => 
    today >= week.startDate && today <= week.endDate
  ) || null;
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });
};