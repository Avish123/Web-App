import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { CalendarIcon } from 'lucide-react';
// Generate sample data for demo
const generateSampleData = () => {
  const data = [];
  const today = new Date();
  for (let i = 13; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    data.push({
      date: date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      }),
      mood: Math.floor(Math.random() * 5) + 1,
      journal: ''
    });
  }
  return data;
};
export const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState(3);
  const [journalEntry, setJournalEntry] = useState('');
  const [moodData, setMoodData] = useState(generateSampleData);
  const [viewType, setViewType] = useState('weekly');
  const handleMoodSubmit = () => {
    const today = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
    // Check if today's entry already exists
    const updatedData = [...moodData];
    const todayIndex = updatedData.findIndex(item => item.date === today);
    if (todayIndex !== -1) {
      updatedData[todayIndex] = {
        date: today,
        mood: selectedMood,
        journal: journalEntry
      };
    } else {
      updatedData.push({
        date: today,
        mood: selectedMood,
        journal: journalEntry
      });
    }
    setMoodData(updatedData);
    setJournalEntry('');
    // In a real app, we would save this data to a database
  };
  const displayData = viewType === 'weekly' ? moodData.slice(-7) : moodData;
  const moodEmojis = ['😢', '😔', '😐', '🙂', '😄'];
  const moodLabels = {
    1: 'Very Bad',
    2: 'Bad',
    3: 'Neutral',
    4: 'Good',
    5: 'Very Good'
  };
  return <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">Mood Tracker</h2>
        <p className="text-gray-600">
          Track your daily mood to identify patterns
        </p>
      </div>
      {/* Today's Mood Entry */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          How are you feeling today?
        </h3>
        <div className="flex justify-center items-center space-x-4 my-6">
          {[1, 2, 3, 4, 5].map(mood => <button key={mood} onClick={() => setSelectedMood(mood)} className={`w-12 h-12 flex items-center justify-center rounded-full text-2xl ${selectedMood === mood ? 'bg-blue-100 border-2 border-blue-500' : 'bg-gray-100 hover:bg-gray-200'}`}>
              {moodEmojis[mood - 1]}
            </button>)}
        </div>
        <div className="text-center text-sm text-gray-600 mb-6">
          {moodLabels[selectedMood]}
        </div>
        <div className="mb-4">
          <label htmlFor="journal" className="block text-sm font-medium text-gray-700 mb-2">
            Add a journal entry about your day (optional)
          </label>
          <textarea id="journal" rows={4} value={journalEntry} onChange={e => setJournalEntry(e.target.value)} className="w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500" placeholder="Write about your day, feelings, or anything significant that happened..."></textarea>
        </div>
        <button onClick={handleMoodSubmit} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md">
          Submit
        </button>
      </div>
      {/* Mood History */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Mood History</h3>
          <div className="flex space-x-2">
            <button onClick={() => setViewType('weekly')} className={`px-3 py-1 text-sm rounded-md ${viewType === 'weekly' ? 'bg-blue-100 text-blue-700 font-medium' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              Weekly View
            </button>
            <button onClick={() => setViewType('monthly')} className={`px-3 py-1 text-sm rounded-md ${viewType === 'monthly' ? 'bg-blue-100 text-blue-700 font-medium' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              Monthly View
            </button>
          </div>
        </div>
        {moodData.length > 0 ? <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              {viewType === 'weekly' ? <BarChart data={displayData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" />
                  <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} />
                  <Tooltip />
                  <Bar dataKey="mood" fill="#4F46E5" />
                </BarChart> : <LineChart data={displayData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" />
                  <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="mood" stroke="#4F46E5" strokeWidth={2} />
                </LineChart>}
            </ResponsiveContainer>
          </div> : <div className="flex flex-col items-center justify-center h-64 text-center">
            <CalendarIcon size={48} className="text-gray-300 mb-4" />
            <p className="text-gray-500">
              No mood data recorded yet. Start tracking your mood daily!
            </p>
          </div>}
      </div>
    </div>;
};