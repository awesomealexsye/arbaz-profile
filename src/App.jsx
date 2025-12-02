import React from 'react';
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

import SEO from './components/SEO';

function App() {
  return (
    <div className="App">
      <SEO />
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
  );
}

export default App;

