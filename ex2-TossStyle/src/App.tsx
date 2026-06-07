/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';

import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import InteractiveTransfer from './components/InteractiveTransfer';
import CreditScoreSimulator from './components/CreditScoreSimulator';
import FinancialCalculator from './components/FinancialCalculator';
import BentoFeatures from './components/BentoFeatures';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';

export default function App() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-toss-gray-50 text-toss-gray-900 selection:bg-toss-blue-light selection:text-toss-blue">
      {/* 1. Header Navigation */}
      <Navigation />

      {/* 2. Brand Hero Section */}
      <HeroSection />

      {/* 3. Deep Brand Quote Banner */}
      <div className="bg-toss-blue py-14 text-white text-center px-6 relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-4 bg-linear-to-b from-black/5 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto space-y-2 relative z-10">
          <p className="text-xs font-bold text-white/70 uppercase tracking-widest font-display">TOSS ADVANTAGE</p>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            "금융이 쉬워진다, 모든 번거로움과 복잡함을 1초 만에 해결"
          </h2>
          <p className="text-xs sm:text-sm text-white/80 max-w-lg mx-auto">
            국내 2,000만 명의 성실 금융 소비자가 선택한 안전성과 간편함을 웹 시뮬레이터에서 간편하게 만나보세요.
          </p>
        </div>
      </div>

      {/* 4. Interactive Transfer Simulation (송금) */}
      <InteractiveTransfer />

      {/* 5. Credit Score booster (신용) */}
      <CreditScoreSimulator />

      {/* 6. Savings Yield Calculator (목돈계산기) */}
      <FinancialCalculator />

      {/* 7. Beautiful Bento Features list */}
      <BentoFeatures />

      {/* 8. FAQ Sections */}
      <FaqSection />

      {/* 9. Corporate standard Footer */}
      <Footer />

      {/* Floating Scroll up triggers */}
      <AnimatePresence>
        {showScroll && (
          <motion.button
            key="scroll-top-btn"
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 15 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 p-3.5 bg-white border border-toss-gray-200 text-toss-gray-700 hover:text-toss-blue hover:border-toss-blue rounded-full shadow-lg z-50 focus:outline-hidden hover:scale-105 active:scale-95 transition-all text-sm font-semibold"
          >
            <ArrowUp className="w-5 h-5 stroke-[2.5]" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

