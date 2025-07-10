import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import PricingPage from './pages/PricingPage';

function HomePage() {
  return (
    <main className="pt-20">
      <HeroSection />
    </main>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white font-sans">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pricing" element={<PricingPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;