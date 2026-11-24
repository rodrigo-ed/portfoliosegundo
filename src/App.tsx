import {useState} from 'react';
import {FaqSection} from './components/FaqSection.tsx';
import {Footer} from './components/Footer.tsx';
import {Header} from './components/Header.tsx';
import {HeroSection} from './components/HeroSection.tsx';
import {ProcessSection} from './components/ProcessSection.tsx';
import {ResultsSection} from './components/ResultsSection.tsx';
import {SchedulingChat} from './components/SchedulingChat.tsx';
import {ServicesSection} from './components/ServicesSection.tsx';
import type {ServiceId} from './domain/scheduling.ts';

export default function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<ServiceId | null>(null);

  const openGeneralChat = () => {
    setPreselectedService(null);
    setChatOpen(true);
  };

  const openServiceChat = (serviceId: ServiceId) => {
    setPreselectedService(serviceId);
    setChatOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-[#0A0A0A]">
      <a
        href="#conteudo-principal"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-[#0A0A0A] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Ir para o conteúdo principal
      </a>

      <Header onOpenChat={openGeneralChat} />

      <main id="conteudo-principal">
        <HeroSection onOpenChat={openGeneralChat} />
        <ServicesSection onSelectServiceForChat={openServiceChat} />
        <ResultsSection onOpenChat={openGeneralChat} />
        <ProcessSection />
        <FaqSection onOpenChat={openGeneralChat} />
      </main>

      <Footer onOpenChat={openGeneralChat} />

      <SchedulingChat
        isOpen={chatOpen}
        preselectedService={preselectedService}
        onOpen={openGeneralChat}
        onClose={() => setChatOpen(false)}
      />
    </div>
  );
}
