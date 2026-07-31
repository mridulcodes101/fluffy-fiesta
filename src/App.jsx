import React from 'react';
import Hero from './components/Hero/Hero';
import LittleThoughts from './components/LittleThoughts/LittleThoughts';
import SmileCards from './components/SmileCards/SmileCards';
import MiniGame from './components/MiniGame/MiniGame';
import SecretMessage from './components/SecretMessage/SecretMessage';
import TinyPromise from './components/TinyPromise/TinyPromise';
import FinalQuestion from './components/FinalQuestion/FinalQuestion';
import Footer from './components/Footer/Footer';

import CursorTrail from './components/common/CursorTrail/CursorTrail';
import ScrollIndicator from './components/common/ScrollIndicator/ScrollIndicator';
import WelcomeOverlay from './components/common/WelcomeOverlay/WelcomeOverlay';
import WelcomeBackBadge from './components/common/WelcomeBackBadge/WelcomeBackBadge';
import AmbientSurprises from './components/common/AmbientSurprises/AmbientSurprises';

import './styles/global.css';
import './styles/animations.css';

/**
 * App Component - Root layout for "For Mishti 🌸"
 */
function App() {
  return (
    <div className="app-container">
      {/* Intro Welcome Envelope Loading Screen */}
      <WelcomeOverlay />

      {/* Global Interactive Common Components */}
      <CursorTrail />
      <ScrollIndicator />
      <WelcomeBackBadge />
      <AmbientSurprises />

      {/* Main Sections */}
      <main>
        <Hero />
        <LittleThoughts />
        <SmileCards />
        <MiniGame />
        <SecretMessage />
        <TinyPromise />
        <FinalQuestion />
      </main>

      <Footer />
    </div>
  );
}

export default App;
