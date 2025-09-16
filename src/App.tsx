import React, { useState } from 'react';
import { Header } from './components/Layout/Header';
import { Footer } from './components/Layout/Footer';
import { LandingPage } from './components/Home/LandingPage';
import { Dashboard } from './components/Dashboard/Dashboard';
import { Login } from './components/Auth/Login';
import { Signup } from './components/Auth/Signup';
export function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Mock login function
  const handleLogin = (email, password) => {
    // In a real app, this would validate with Firebase Auth
    if (email && password) {
      setIsLoggedIn(true);
      setCurrentPage('dashboard');
    }
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('landing');
  };
  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onGetStarted={() => setCurrentPage('login')} />;
      case 'login':
        return <Login onLogin={handleLogin} onSignupClick={() => setCurrentPage('signup')} />;
      case 'signup':
        return <Signup onSignup={handleLogin} onLoginClick={() => setCurrentPage('login')} />;
      case 'dashboard':
        return <Dashboard />;
      default:
        return <LandingPage onGetStarted={() => setCurrentPage('login')} />;
    }
  };
  return <div className="flex flex-col min-h-screen bg-gradient-to-br from-yellow-500 to-purple-5">
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} onLogoClick={() => setCurrentPage(isLoggedIn ? 'dashboard' : 'landing')} />
      <main className="flex-grow w-full">{renderPage()}</main>
      <Footer />
    </div>;
}