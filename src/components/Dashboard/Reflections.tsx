import React, { useState } from 'react';
import { PlusIcon, TrashIcon, CalendarIcon, BookOpenIcon } from 'lucide-react';
// Sample reflection data
const sampleReflections = [{
  id: 1,
  title: 'First week at university',
  content: 'Today was my first day at the university. I felt a mix of excitement and anxiety. Meeting new people was challenging but also rewarding. I hope to make some good friends soon.',
  date: new Date(2023, 8, 5)
}, {
  id: 2,
  title: 'Preparing for midterms',
  content: "I've been studying for my midterm exams all week. The pressure is building up, but I'm trying to stay organized and take regular breaks. I need to remember to breathe and take care of myself during this stressful period.",
  date: new Date(2023, 9, 12)
}, {
  id: 3,
  title: 'Group project challenges',
  content: 'Working on the group project has been difficult. Communication issues and different working styles are causing friction. I need to find a way to express my concerns constructively and help the team work better together.',
  date: new Date(2023, 10, 3)
}];
export const Reflections = () => {
  const [reflections, setReflections] = useState(sampleReflections);
  const [isWriting, setIsWriting] = useState(false);
  const [currentReflection, setCurrentReflection] = useState({
    title: '',
    content: ''
  });
  const [selectedReflection, setSelectedReflection] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [reflectionToDelete, setReflectionToDelete] = useState(null);
  const handleNewReflection = () => {
    setIsWriting(true);
    setSelectedReflection(null);
    setCurrentReflection({
      title: '',
      content: ''
    });
  };
  const handleSaveReflection = () => {
    if (currentReflection.title.trim() === '' || currentReflection.content.trim() === '') {
      return;
    }
    const newReflection = {
      id: Date.now(),
      title: currentReflection.title,
      content: currentReflection.content,
      date: new Date()
    };
    setReflections([newReflection, ...reflections]);
    setIsWriting(false);
    setCurrentReflection({
      title: '',
      content: ''
    });
  };
  const handleSelectReflection = reflection => {
    setSelectedReflection(reflection);
    setIsWriting(false);
  };
  const confirmDelete = id => {
    setReflectionToDelete(id);
    setShowDeleteConfirm(true);
  };
  const handleDeleteReflection = () => {
    setReflections(reflections.filter(reflection => reflection.id !== reflectionToDelete));
    setShowDeleteConfirm(false);
    setReflectionToDelete(null);
    if (selectedReflection && selectedReflection.id === reflectionToDelete) {
      setSelectedReflection(null);
    }
  };
  const formatDate = date => {
    const today = new Date();
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    }
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  return <div className="h-full">
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Are you sure you want to delete this reflection?
            </h3>
            <div className="flex justify-end space-x-3">
              <button onClick={() => setShowDeleteConfirm(false)} className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md">
                No
              </button>
              <button onClick={handleDeleteReflection} className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-md">
                Yes
              </button>
            </div>
          </div>
        </div>}
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="w-1/3 border-r border-gray-200 h-full overflow-y-auto">
          <div className="p-4">
            <button onClick={handleNewReflection} className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md">
              <PlusIcon size={16} />
              <span>New Reflection</span>
            </button>
          </div>
          <div className="divide-y divide-gray-200">
            {reflections.length > 0 ? reflections.map(reflection => <div key={reflection.id} onClick={() => handleSelectReflection(reflection)} className={`p-4 cursor-pointer hover:bg-gray-50 ${selectedReflection && selectedReflection.id === reflection.id ? 'bg-blue-50' : ''}`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-800 truncate">
                        {reflection.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {formatDate(reflection.date)}
                      </p>
                    </div>
                    <button onClick={e => {
                e.stopPropagation();
                confirmDelete(reflection.id);
              }} className="text-gray-400 hover:text-red-500">
                      <TrashIcon size={16} />
                    </button>
                  </div>
                  <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                    {reflection.content}
                  </p>
                </div>) : <div className="p-4 text-center text-gray-500">
                <BookOpenIcon size={24} className="mx-auto mb-2 text-gray-300" />
                No reflections yet. Start journaling to track your thoughts and
                feelings.
              </div>}
          </div>
        </div>
        {/* Main Content */}
        <div className="w-2/3 p-6 overflow-y-auto">
          {isWriting ? <div className="space-y-4">
              <input type="text" value={currentReflection.title} onChange={e => setCurrentReflection({
            ...currentReflection,
            title: e.target.value
          })} placeholder="Reflection title" className="w-full border-b border-gray-300 pb-2 text-xl font-medium focus:outline-none focus:border-blue-500" />
              <p className="text-sm text-gray-500 flex items-center">
                <CalendarIcon size={14} className="mr-1" />
                {formatDate(new Date())}
              </p>
              <textarea value={currentReflection.content} onChange={e => setCurrentReflection({
            ...currentReflection,
            content: e.target.value
          })} placeholder="Write your thoughts here..." className="w-full h-64 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"></textarea>
              <div className="flex justify-end space-x-3">
                <button onClick={() => setIsWriting(false)} className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md">
                  Cancel
                </button>
                <button onClick={handleSaveReflection} className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md">
                  Save Reflection
                </button>
              </div>
            </div> : selectedReflection ? <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800">
                {selectedReflection.title}
              </h2>
              <p className="text-sm text-gray-500 flex items-center">
                <CalendarIcon size={14} className="mr-1" />
                {formatDate(selectedReflection.date)}
              </p>
              <div className="prose max-w-none">
                <p>{selectedReflection.content}</p>
              </div>
            </div> : <div className="h-full flex flex-col items-center justify-center text-center">
              <BookOpenIcon size={64} className="text-gray-300 mb-4" />
              <h3 className="text-xl font-medium text-gray-700 mb-2">
                Personal Reflections
              </h3>
              <p className="text-gray-500 mb-6">
                Your private space for thoughts and feelings
              </p>
              <button onClick={handleNewReflection} className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md">
                <PlusIcon size={16} />
                <span>Start Writing</span>
              </button>
            </div>}
        </div>
      </div>
    </div>;
};