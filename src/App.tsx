import { useState } from 'react';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import GamingBackground3D from './components/GamingBackground3D';
import HackathonsSection from './components/HackathonsSection';
import HeroSection from './components/HeroSection';
import LearningJourneySection from './components/LearningJourneySection';
import Navbar from './components/Navbar';
import ProjectModal from './components/ProjectModal';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import type { ProjectItem } from './data/portfolioData';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <div className="relative min-h-screen bg-[#050507] text-[#F1F5F9]">
      {/* Fixed interactive Three.js Gaming Black 3D Background */}
      <GamingBackground3D />

      {/* Main Portfolio Content Layered Above WebGL Canvas */}
      <div className="relative z-10">
        <Navbar />

        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection onSelectProject={setSelectedProject} />
          <HackathonsSection />
          <LearningJourneySection />
          <ContactSection />
        </main>

        <Footer />
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
