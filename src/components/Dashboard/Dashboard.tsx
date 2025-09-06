import React, { useState } from 'react';
import { ChatInterface } from '../Chat/ChatInterface';
import { Reflections } from './Reflections';
import { MentalHealthAssessment } from '../Assessment/MentalHealthAssessment';
import { MessageSquareIcon, BookOpenIcon, BrainIcon } from 'lucide-react';
export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('chat');
  const renderTabContent = () => {
    switch (activeTab) {
      case 'chat':
        return <ChatInterface />;
      case 'reflections':
        return <Reflections />;
      case 'assessment':
        return <MentalHealthAssessment />;
      default:
        return <ChatInterface />;
    }
  };
  return <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome to MindfulU
        </h1>
      </div>
      {/* Dashboard Tabs */}
      <div className="flex flex-wrap justify-center mb-6">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex flex-wrap">
            <button className={`flex items-center justify-center px-4 py-3 sm:px-6 w-1/2 sm:w-1/4 border-b-2 text-sm sm:text-base font-medium ${activeTab === 'chat' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`} onClick={() => setActiveTab('chat')}>
              <MessageSquareIcon size={18} className="mr-2" />
              Chat
            </button>
            <button className={`flex items-center justify-center px-4 py-3 sm:px-6 w-1/2 sm:w-1/4 border-b-2 text-sm sm:text-base font-medium ${activeTab === 'reflections' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`} onClick={() => setActiveTab('reflections')}>
              <BookOpenIcon size={18} className="mr-2" />
              Reflections
            </button>
            <button className={`flex items-center justify-center px-4 py-3 sm:px-6 w-1/2 sm:w-1/4 border-b-2 text-sm sm:text-base font-medium ${activeTab === 'assessment' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`} onClick={() => setActiveTab('assessment')}>
              <BrainIcon size={18} className="mr-2" />
              Assessment
            </button>
          </div>
          <div className="p-4 sm:p-6">{renderTabContent()}</div>
        </div>
      </div>
    </div>;
};