import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';

function App() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      <main className="pt-20">
        <HeroSection />
      </main>
    </div>
  );
}

export default App;