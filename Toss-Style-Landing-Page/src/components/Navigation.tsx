/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Smartphone, X, QrCode, ArrowRight, Download, CheckCircle } from 'lucide-react';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phoneNo, setPhoneNo] = useState('');
  const [isSmsSent, setIsSmsSent] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSendSms = (e: FormEvent) => {
    e.preventDefault();
    if (!phoneNo || phoneNo.length < 10) return;
    setIsSmsSent(true);
    setTimeout(() => {
      setIsSmsSent(false);
      setPhoneNo('');
    }, 4000);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80; // offset for sticky nav
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        id="main-nav"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-toss-gray-100 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-full bg-toss-blue flex items-center justify-center transition-transform group-hover:rotate-12 duration-300">
              <div className="w-4 h-4 rounded-full border-2 border-white bg-transparent" />
            </div>
            <span className="font-display font-extrabold text-xl tracking-tight text-toss-gray-900 group-hover:text-toss-blue transition-colors">
              toss
            </span>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('transfer-section')}
              className="text-sm font-medium text-toss-gray-600 hover:text-toss-gray-900 transition-colors"
            >
              간편송금
            </button>
            <button
              onClick={() => scrollToSection('credit-section')}
              className="text-sm font-medium text-toss-gray-600 hover:text-toss-gray-900 transition-colors"
            >
              신용점수
            </button>
            <button
              onClick={() => scrollToSection('calculator-section')}
              className="text-sm font-medium text-toss-gray-600 hover:text-toss-gray-900 transition-colors"
            >
              목돈계산기
            </button>
            <button
              onClick={() => scrollToSection('features-section')}
              className="text-sm font-medium text-toss-gray-600 hover:text-toss-gray-900 transition-colors"
            >
              주요서비스
            </button>
          </div>

          {/* Action Button */}
          <div>
            <button
              id="app-download-nav-btn"
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-toss-blue text-white rounded-lg text-sm font-semibold hover:bg-toss-blue-dark active:scale-95 transition-all shadow-sm flex items-center gap-1.5"
            >
              <Smartphone className="w-4 h-4" />
              <span>앱 다운로드</span>
            </button>
          </div>
        </div>
      </nav>

      {/* App Download Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-toss-gray-900/40 backdrop-blur-xs"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-toss-gray-100 z-10 p-6 md:p-8"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-toss-gray-400 hover:text-toss-gray-600 rounded-full hover:bg-toss-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-toss-blue-light text-toss-blue rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Download className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-toss-gray-900 tracking-tight">
                  금융이 더욱 쉬워집니다
                </h3>
                <p className="text-sm text-toss-gray-500 mt-2">
                  QR코드 스캔 또는 번호 전송으로 토스 앱을 간편하게 받으세요
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center p-4 bg-toss-gray-50 rounded-xl mb-6">
                {/* QR Section */}
                <div className="flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-toss-gray-200 pb-6 md:pb-0 md:pr-6">
                  <div className="p-3 bg-white rounded-lg shadow-xs border border-toss-gray-200">
                    <QrCode className="w-32 h-32 text-toss-gray-800" />
                  </div>
                  <span className="text-xs font-semibold text-toss-gray-600 mt-3 flex items-center gap-1">
                    카메라로 스캔하기
                  </span>
                </div>

                {/* SMS Link Section */}
                <div className="flex flex-col justify-center h-full">
                  <h4 className="text-sm font-bold text-toss-gray-800 mb-2">
                    휴대폰 번호로 설치 링크 전송
                  </h4>
                  <p className="text-xs text-toss-gray-500 mb-4 leading-relaxed">
                    본인 확인 유출 위험 없이 안전하고 암호화된 SMS 링크를 발송합니다.
                  </p>

                  <AnimatePresence mode="wait">
                    {!isSmsSent ? (
                      <motion.form
                        key="sms-form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSendSms}
                        className="space-y-2"
                      >
                        <input
                          type="tel"
                          placeholder="010-1234-5678"
                          value={phoneNo}
                          onChange={(e) => setPhoneNo(e.target.value.replace(/[^0-9-]/g, ''))}
                          className="w-full px-3 py-2 text-sm bg-white border border-toss-gray-300 rounded-lg focus:outline-hidden focus:border-toss-blue"
                          required
                        />
                        <button
                          type="submit"
                          className="w-full py-2 bg-toss-blue hover:bg-toss-blue-dark text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
                        >
                          <span>보내기</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </motion.form>
                    ) : (
                      <motion.div
                        key="sms-success"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="flex flex-col items-center justify-center py-4 text-center text-emerald-600"
                      >
                        <CheckCircle className="w-8 h-8 mb-2 animate-bounce" />
                        <span className="text-sm font-semibold">발송 완료!</span>
                        <span className="text-xs text-toss-gray-400 mt-1">곧 설치 문자가 도착합니다.</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="text-center">
                <span className="text-xs text-toss-gray-400">
                  아이폰(iOS) 및 안드로이드(Android) 모두 무료로 사용 가능합니다.
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
