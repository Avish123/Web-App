import React, { useEffect, useState, useRef } from 'react';
import { SendIcon, MicIcon, SmileIcon, PaperclipIcon, InfoIcon } from 'lucide-react';
// Sample bot responses for demo
const getBotResponse = message => {
  const lowerMsg = message.toLowerCase();
  if (lowerMsg.includes('stress') || lowerMsg.includes('exam')) {
    return "It's normal to feel stressed about exams. Have you tried breaking your study sessions into smaller, manageable chunks? Also, remember to take regular breaks and practice deep breathing exercises.";
  } else if (lowerMsg.includes('sleep') || lowerMsg.includes('insomnia')) {
    return 'Sleep issues can significantly impact your mental health. Try establishing a regular sleep schedule, avoiding screens before bed, and creating a relaxing bedtime routine. Would you like me to suggest some relaxation techniques?';
  } else if (lowerMsg.includes('lonely') || lowerMsg.includes('alone')) {
    return 'Feeling lonely at university is quite common. Have you considered joining student clubs or organizations related to your interests? This can be a great way to meet like-minded people.';
  } else if (lowerMsg.includes('anxiety') || lowerMsg.includes('anxious')) {
    return 'Anxiety can be challenging to deal with. Mindfulness meditation and grounding techniques can help in the moment. Would you like to try a quick grounding exercise with me?';
  } else if (lowerMsg.includes('time management') || lowerMsg.includes('busy')) {
    return 'Time management is crucial for university students. Have you tried using tools like calendars or to-do lists? The Pomodoro technique (working for 25 minutes, then taking a 5-minute break) can also be very effective.';
  } else {
    return "Thank you for sharing that with me. How does this situation make you feel? I'm here to listen and support you.";
  }
};
export const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);
  // Initialize with bot greeting
  useEffect(() => {
    setMessages([{
      id: 1,
      text: "Hello! I'm your mental well-being assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }]);
  }, []);
  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  }, [messages]);
  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;
    // Add user message
    const newUserMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages([...messages, newUserMessage]);
    setInputMessage('');
    // Simulate bot thinking with setTimeout
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: getBotResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prevMessages => [...prevMessages, botResponse]);
    }, 1000);
  };
  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  const handleSuggestionClick = suggestion => {
    setInputMessage(suggestion);
  };
  const suggestions = ["I'm feeling stressed about my exams", "I can't sleep well lately", 'I feel lonely at university', 'How can I manage anxiety?', 'I need help with time management'];
  return <div className="flex flex-col h-[600px] bg-gray-50 rounded-lg">
      {/* Chat Messages */}
      <div className="flex-grow overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map(message => <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-lg ${message.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-800'}`}>
                <p>{message.text}</p>
                <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-blue-200' : 'text-gray-500'}`}>
                  {message.timestamp.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
              })}
                </p>
              </div>
            </div>)}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Suggested Responses */}
      {messages.length < 3 && <div className="px-4 py-2 bg-white border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => <button key={index} className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm rounded-full px-3 py-1 transition-colors" onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion}
              </button>)}
          </div>
        </div>}

      {/* Input Area */}
      <div className="border-t border-gray-200 p-4 bg-white">
        <div className="flex items-center">
          <div className="flex-grow relative">
            <input type="text" value={inputMessage} onChange={e => setInputMessage(e.target.value)} onKeyPress={handleKeyPress} placeholder="Type your message..." className="w-full border border-gray-300 rounded-full pl-4 pr-12 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
              <button className="text-gray-500 hover:text-gray-700 p-1" title="Add emoji">
                <SmileIcon size={18} />
              </button>
              <button className="text-gray-500 hover:text-gray-700 p-1" title="Attach">
                <PaperclipIcon size={18} />
              </button>
            </div>
          </div>
          <div className="ml-2 flex space-x-2">
            <button className="bg-gray-200 hover:bg-gray-300 rounded-full p-2 text-gray-700" title="Voice input">
              <MicIcon size={20} />
            </button>
            <button onClick={handleSendMessage} className="bg-blue-600 hover:bg-blue-700 rounded-full p-2 text-white" title="Send">
              <SendIcon size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>;
};