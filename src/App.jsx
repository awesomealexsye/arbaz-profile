import React, { useState } from 'react';
import GalaxyBackground from './components/GalaxyBackground';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Services from './components/Services';
import Process from './components/Process';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Technologies from './components/Technologies';
import Stats from './components/Stats';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SpaceLoader from './components/SpaceLoader';

import SEO from './components/SEO';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    // Small delay before showing content for smooth transition
    setTimeout(() => {
      setShowContent(true);
    }, 100);
  };

  return (
    <div className="App">
      <SEO />
      {isLoading && <SpaceLoader onComplete={handleLoadingComplete} />}

      {/* Main Content with Smooth Entrance */}
      <div className={`main-content-wrapper ${showContent ? 'entered-space' : 'entering-space'}`}>
        <GalaxyBackground />
        <Navigation />
        <Hero />
        <About />
        <Skills />
        <Services />
        <Process />
        <Experience />
        <Projects />
        <Technologies />
        <Stats />
        <Contact />
        <Footer />
      </div>

      {/* Smooth Entrance Animation Styles */}
      <style>{`
        .main-content-wrapper {
          transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .entering-space {
          opacity: 0;
          transform: scale(0.9) translateY(50px);
          filter: blur(10px);
        }

        .entered-space {
          opacity: 1;
          transform: scale(1) translateY(0);
          filter: blur(0);
        }
      `}</style>
    </div>
  );
}

export default App;
