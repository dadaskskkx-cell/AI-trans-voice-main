import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { ProductModules } from './components/ProductModules';
import { VoiceGallery } from './components/VoiceGallery';
import { Showcase } from './components/Showcase';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { Modal } from './components/Modal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen text-slate-50 selection:bg-pink-500/30">
      <Navbar onCtaClick={handleOpenModal} />
      
      <main>
        <Hero onCtaClick={handleOpenModal} />
        <Features />
        <ProductModules />
        <VoiceGallery />
        <Showcase />
        <ContactSection />
      </main>

      <Footer onCtaClick={handleOpenModal} />
      
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}

export default App;