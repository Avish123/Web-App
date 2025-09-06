import React, { useState } from 'react';
import { MenuIcon, UserIcon } from 'lucide-react';
export const Header = ({
  isLoggedIn,
  onLogout,
  onLogoClick
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  return <header className="bg-white shadow-md w-full">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={onLogoClick}>
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white text-xl font-bold">M</span>
            </div>
            <span className="ml-2 text-xl font-semibold text-gray-800">
              MindfulU
            </span>
          </div>
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {!isLoggedIn ? <>
                <a href="#" className="text-gray-600 hover:text-blue-600">
                  Home
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-600">
                  About
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-600">
                  Features
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-600">
                  Contact
                </a>
              </> : <>
                <a href="#" className="text-gray-600 hover:text-blue-600">
                  Dashboard
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-600">
                  Assessment
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-600">
                  Journal
                </a>
              </>}
          </div>
          {/* Right Side Menu (Auth) */}
          <div className="flex items-center space-x-4">
            {/* Auth Buttons */}
            {!isLoggedIn ? <div className="hidden md:flex items-center space-x-2">
                <button onClick={() => onLogoClick()} className="px-4 py-2 text-blue-600 hover:text-blue-800">
                  Login
                </button>
                <button onClick={() => onLogoClick()} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Sign Up
                </button>
              </div> : <div className="relative">
                <button className="flex items-center text-gray-700 hover:text-blue-600" onClick={() => setUserMenuOpen(!userMenuOpen)}>
                  <UserIcon size={20} />
                </button>
                {userMenuOpen && <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50">
                      Settings
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50" onClick={() => {
                onLogout();
                setUserMenuOpen(false);
              }}>
                      Logout
                    </button>
                  </div>}
              </div>}
            {/* Mobile menu button */}
            <button className="md:hidden text-gray-600 hover:text-blue-600" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <MenuIcon size={24} />
            </button>
          </div>
        </div>
        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="pt-2 space-y-1">
              {!isLoggedIn ? <>
                  <a href="#" className="block px-3 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md">
                    Home
                  </a>
                  <a href="#" className="block px-3 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md">
                    About
                  </a>
                  <a href="#" className="block px-3 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md">
                    Features
                  </a>
                  <a href="#" className="block px-3 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md">
                    Contact
                  </a>
                  <button onClick={() => onLogoClick()} className="block w-full text-left px-3 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md">
                    Login
                  </button>
                  <button onClick={() => onLogoClick()} className="block w-full text-left px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Sign Up
                  </button>
                </> : <>
                  <a href="#" className="block px-3 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md">
                    Dashboard
                  </a>
                  <a href="#" className="block px-3 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md">
                    Assessment
                  </a>
                  <a href="#" className="block px-3 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md">
                    Journal
                  </a>
                  <a href="#" className="block px-3 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md">
                    Settings
                  </a>
                  <button onClick={onLogout} className="block w-full text-left px-3 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md">
                    Logout
                  </button>
                </>}
            </div>
          </div>}
      </div>
    </header>;
};