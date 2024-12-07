import React from 'react';
import { QuoteGrid } from './components/QuoteGrid';
import { getCurrentWeekInfo, formatDate } from './utils/dateUtils';
import { BookHeart } from 'lucide-react';
import { QuoteProvider } from './context/QuoteContext';
import { AuthProvider } from './context/AuthContext';
import { AdminControls } from './components/AdminControls';
import CovenantPathDashboard from './components/CovenantPathDashboard';

function App() {
  const currentWeekInfo = getCurrentWeekInfo();

  return (
    <AuthProvider>
      <QuoteProvider>
        <div className="min-h-screen bg-gray-50">
          <header className="bg-[#002d5c] text-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <BookHeart className="w-8 h-8 text-[#c4b000]" />
                  <h1 className="text-3xl font-bold">Walking the Covenant Path in 2025</h1>
                </div>
                <AdminControls />
              </div>
            </div>
          </header>

          <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <CovenantPathDashboard />
            
            <div className="mb-8">
              <div className="bg-[#002d5c] text-white rounded-lg p-6 shadow-lg">
                {currentWeekInfo ? (
                  <>
                    <h2 className="text-xl font-semibold mb-2">
                      Current Period: {formatDate(currentWeekInfo.startDate)} - {formatDate(currentWeekInfo.endDate)}
                    </h2>
                    <p className="text-white/80">
                      {currentWeekInfo.weekNumber}/52 - Every moment brings new wisdom. 
                      Explore my personal reflections and insights gathered throughout the year.
                    </p>
                  </>
                ) : (
                  <p className="text-white/80">
                    52 Invitations and Inspirations by President Nelson to Help Individuals and Families Remember the Blessings of Being a Disciple of Jesus Christ in the Latter Days
                  </p>
                )}
              </div>
            </div>
            <QuoteGrid />
          </main>

          <footer className="bg-white mt-12 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
              <p className="text-center text-gray-500">
                Created With Love For Our Nibley 17th Ward Family
              </p>
            </div>
          </footer>
        </div>
      </QuoteProvider>
    </AuthProvider>
  );
}

export default App;