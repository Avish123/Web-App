import React from 'react';
import { HeartIcon } from 'lucide-react';
export const Footer = () => {
  return <footer className="bg-white shadow-inner mt-10">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white text-sm font-bold">M</span>
              </div>
              <span className="ml-2 text-lg font-semibold text-gray-800">
                MindfulU
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Supporting mental well-being of Sri Lankan university students
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#" className="text-sm text-gray-600 hover:text-blue-600">
              About Us
            </a>
            <a href="#" className="text-sm text-gray-600 hover:text-blue-600">
              Contact
            </a>
            <a href="#" className="text-sm text-gray-600 hover:text-blue-600">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-gray-600 hover:text-blue-600">
              Terms of Service
            </a>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-4 flex flex-col items-center">
          <p className="text-sm text-gray-500">
            © 2023 MindfulU. All rights reserved.
          </p>
          <div className="flex items-center mt-2 text-sm text-gray-500">
            <span>Made with</span>
            <HeartIcon size={16} className="mx-1 text-red-500" />
            <span>for mental well-being research</span>
          </div>
        </div>
      </div>
    </footer>;
};