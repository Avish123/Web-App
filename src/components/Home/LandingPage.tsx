import React from 'react';
import { MessageSquareIcon, BarChartIcon, BookOpenIcon, CalendarIcon, BrainIcon } from 'lucide-react';
export const LandingPage = ({
  onGetStarted
}) => {
  return <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Supporting Mental Well-being of Sri Lankan University Students
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              AI-powered virtual assistant designed specifically for Sri Lankan
              private university students to provide mental health support,
              guidance, and resources.
            </p>
            <button onClick={onGetStarted} className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition duration-300">
              Get Started
            </button>
          </div>
        </div>
        {/* Wave Divider */}
        <div className="w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="w-full h-auto transform rotate-180">
            <path fill="#ffffff" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,42.7C1120,32,1280,32,1360,32L1440,32L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path>
          </svg>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                <MessageSquareIcon size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Smart Chatbot
              </h3>
              <p className="text-gray-600">
                Chat with our AI assistant about your feelings, concerns, and
                mental health.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                <BarChartIcon size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Mood Tracking
              </h3>
              <p className="text-gray-600">
                Track your daily mood patterns to gain insights into your
                emotional well-being over time.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                <BookOpenIcon size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Personal Reflections
              </h3>
              <p className="text-gray-600">
                Journal your thoughts and feelings in a private, secure space
                for self-reflection.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                <BrainIcon size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Mental Health Assessment
              </h3>
              <p className="text-gray-600">
                Take scientifically validated assessments to better understand
                your mental health status.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                <CalendarIcon size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Counseling Sessions
              </h3>
              <p className="text-gray-600">
                Get connected with professional counselors for virtual or
                in-person sessions when needed.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* About Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
              About MindfulU
            </h2>
            <p className="text-lg text-gray-700 mb-6 text-center">
              MindfulU is a research-based mental health application designed
              specifically for Sri Lankan private university students. Our
              mission is to provide accessible mental health support through
              technology, helping students navigate the challenges of university
              life.
            </p>
            <p className="text-md text-gray-600 italic text-center">
              This application is part of a research project studying AI-powered
              virtual assistants in supporting the mental well-being of Sri
              Lankan private university students.
            </p>
          </div>
        </div>
      </section>
    </div>;
};