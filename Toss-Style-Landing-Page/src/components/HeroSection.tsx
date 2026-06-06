/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'motion/react';
import { ShieldCheck, TrendingUp, Sparkles, CreditCard, ArrowDownRight } from 'lucide-react';

export default function HeroSection() {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    // Dynamic asset counter simulation to represent clean financial flow
    const controls = animate(0, 134850700, {
      duration: 2.5,
      ease: 'easeOut',
      onUpdate: (latest) => setBalance(Math.floor(latest)),
    });
    return () => controls.stop();
  }, []);

  const formatKrw = (value: number) => {
    return new Intl.NumberFormat('ko-KR').format(value) + '원';
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80; // navigation height offset
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-b from-white via-toss-gray-50 to-white overflow-hidden">
      {/* Background Decorative Gradient Rings */}
      <div className="absolute top-20 right-[-10%] w-[500px] h-[500px] bg-toss-blue/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-[-10%] w-[400px] h-[400px] bg-sky-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Typography Block */}
        <div className="lg:col-span-7 space-y-8 z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-toss-blue-light text-toss-blue rounded-full text-xs font-semibold"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>대한민국 대표 생활 금융 앱</span>
          </motion.div>

          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-toss-gray-900 leading-[1.12]"
            >
              금융의 모든 것,<br />
              <span className="text-toss-blue">토스에서 쉽고 간편하게</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-toss-gray-600 max-w-xl leading-relaxed font-normal"
            >
              계좌 개설부터 송금, 투자, 대출, 보험까지.<br />
              복잡하고 번거로운 금융 절차를 걷어내고 하나로 해결해 드려요.
            </motion.p>
          </div>

          {/* Action Trigger Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
          >
            <button
              onClick={() => scrollToSection('transfer-section')}
              className="px-8 py-4 bg-toss-blue hover:bg-toss-blue-dark text-white rounded-xl text-md font-bold transition-all shadow-sm active:scale-98 text-center"
            >
              1초 만에 송금하기
            </button>
            <button
              onClick={() => scrollToSection('credit-section')}
              className="px-8 py-4 bg-toss-gray-100 hover:bg-toss-gray-200 text-toss-gray-700 rounded-xl text-md font-bold transition-all active:scale-98 text-center"
            >
              내 신용점수 조회
            </button>
          </motion.div>

          {/* Security & User Metatag */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center gap-6 pt-2"
          >
            <div className="flex items-center gap-2 text-toss-gray-500 text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>개인정보 철저 보호 및 24시간 보안 시스템</span>
            </div>
          </motion.div>
        </div>

        {/* Right Animated Visual Element (Mockup Balance Dashboard) */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 100, delay: 0.15 }}
            className="relative w-full max-w-[340px] bg-white rounded-3xl shadow-xl border border-toss-gray-100 p-6"
          >
            {/* Mockup Title bar */}
            <div className="flex items-center justify-between pb-4 border-b border-toss-gray-100 mb-5">
              <span className="text-xs font-semibold text-toss-gray-400">내 총 자산</span>
              <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
            </div>

            {/* Asset Counter */}
            <div className="space-y-1 mb-6">
              <span className="text-xs text-toss-gray-400 font-medium">연동된 계좌 4개 기준</span>
              <h2 className="text-2xl font-bold text-toss-gray-900 tracking-tight transition-all">
                {formatKrw(balance)}
              </h2>
            </div>

            {/* Simulated Balance Items list */}
            <div className="space-y-3">
              {/* Toss Bank Item */}
              <div className="flex items-center justify-between p-3 bg-toss-gray-50 hover:bg-toss-gray-100/80 rounded-xl transition-all cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-toss-blue/10 flex items-center justify-center text-toss-blue">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-toss-gray-800">토스뱅크 통장</h4>
                    <p className="text-[10px] text-toss-gray-400">수수료 무제한 면제</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-toss-blue">2,450,000원</span>
              </div>

              {/* Securities Item */}
              <div className="flex items-center justify-between p-3 bg-toss-gray-50 hover:bg-toss-gray-100/80 rounded-xl transition-all cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-toss-gray-800">토스증권 계좌</h4>
                    <p className="text-[10px] text-emerald-500 font-semibold">• 국내외 주식 실시간 거래</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-toss-gray-800">12,143,200원</span>
              </div>

              {/* Outside Bank Card */}
              <div className="flex items-center justify-between p-3 bg-toss-gray-50 hover:bg-toss-gray-100/80 rounded-xl transition-all cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-toss-gray-800">토스 신용카드</h4>
                    <p className="text-[10px] text-toss-gray-400">이번 달 결제 금액</p>
                  </div>
                </div>
                <div className="flex items-center gap-0.5 text-xs font-bold text-toss-gray-400">
                  <span>-82,500원</span>
                  <ArrowDownRight className="w-3.5 h-3.5 text-rose-500" />
                </div>
              </div>
            </div>

            {/* Quick action decorator inside card */}
            <div className="mt-5 pt-4 border-t border-toss-gray-100 flex justify-center">
              <span className="text-[11px] font-semibold text-toss-blue hover:underline cursor-pointer flex items-center gap-1">
                전체 자산 한 번에 연결하기 &rarr;
              </span>
            </div>

            {/* Float Element: Mini physical Credit card decoration */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [3, -2, 3],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute group -top-12 -right-10 w-28 h-40 bg-linear-to-tr from-sky-450 to-indigo-500 rounded-xl shadow-lg p-3 flex flex-col justify-between text-white border border-white/10 select-none cursor-pointer hidden md:flex"
            >
              <div className="flex justify-between items-start">
                <div className="w-6 h-4 bg-yellow-400 rounded-sm" />
                <div className="w-4 h-4 rounded-full border border-white/30" />
              </div>
              <div>
                <span className="text-[8px] tracking-wider font-mono opacity-80">toss BANK</span>
                <p className="text-[10px] font-serif tracking-widest font-bold">Han kyeol</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
