/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Flame, CreditCard, Sparkles, TrendingUp, CheckCircle, FileText, Upload, RefreshCw } from 'lucide-react';

export default function BentoFeatures() {
  // Security scan state
  const [secStatus, setSecStatus] = useState<'idle' | 'scanning' | 'done'>('idle');
  const [securityScore, setSecurityScore] = useState(100);

  // Insurance simulated items state
  const [selectedReceipt, setSelectedReceipt] = useState<string | null>(null);
  const [claimCompleted, setClaimCompleted] = useState(false);
  const [isOcrProcessing, setIsOcrProcessing] = useState(false);

  // Executing mockup security scan
  const runSecurityScan = () => {
    setSecStatus('scanning');
    setTimeout(() => {
      setSecStatus('done');
      setSecurityScore(100);
    }, 2500);
  };

  const handleSelectReceipt = (title: string) => {
    setSelectedReceipt(title);
    setIsOcrProcessing(true);
    setClaimCompleted(false);
    setTimeout(() => {
      setIsOcrProcessing(false);
    }, 1500);
  };

  const executeClaim = () => {
    setClaimCompleted(true);
  };

  const handleResetInsurance = () => {
    setSelectedReceipt(null);
    setClaimCompleted(false);
    setIsOcrProcessing(false);
  };

  return (
    <section id="features-section" className="py-20 md:py-24 bg-toss-gray-50 border-t border-b border-toss-gray-200">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-toss-blue tracking-wider uppercase font-display">TOSS SERVICES</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-toss-gray-900 tracking-tight mt-2">
            지루한 한 마디 대신 직접 체험해보는 앱 기능
          </h2>
          <p className="text-sm text-toss-gray-600 mt-3">
            생활 속 숨 쉬듯 스며들어 혁신을 일구어 낸 토스의 편리한 코어 금융 모듈을 여기서 간단하게 시뮬레이션해 보세요.
          </p>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          
          {/* Card 1: Toss Pay (Hover physical card shift) */}
          <motion.div
            whileHover={{ y: -5 }}
            id="bento-tosspay"
            className="md:col-span-6 bg-white border border-toss-gray-200 rounded-3xl p-6 md:p-8 flex flex-col justify-between overflow-hidden relative shadow-xs min-h-[380px]"
          >
            <div className="space-y-3 z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-105 text-yellow-700 rounded-full text-[10px] font-bold">
                <Flame className="w-3.5 h-3.5 fill-current animate-bounce" />
                <span>누적 결제액 1위</span>
              </div>
              <h3 className="text-xl font-extrabold text-toss-gray-900">토스페이 (Toss Pay)</h3>
              <p className="text-xs text-toss-gray-500 leading-relaxed max-w-sm">
                결제 비밀번호 혹은 생체인증 단 한 번으로 온-오프라인 어느 매장에서도 수수료 할인 혜택을 챙기며 안전하게 결제합니다.
              </p>
            </div>

            {/* Simulated Card Interaction container */}
            <div className="relative h-44 flex items-center justify-center pt-8 z-10">
              {/* Virtual payment card with custom CSS hover gradients */}
              <motion.div
                whileHover={{ rotateY: 15, rotateX: -5, scale: 1.03 }}
                transition={{ type: 'spring', damping: 20 }}
                className="w-56 h-34 bg-linear-to-tr from-toss-blue to-indigo-600 rounded-2xl shadow-xl border border-white/25 p-4 flex flex-col justify-between text-white overflow-hidden cursor-pointer"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded-full border-2 border-white" />
                    <span className="text-[10px] tracking-widest font-bold">toss pay</span>
                  </div>
                  <div className="w-8 h-6 bg-yellow-400 rounded-sm shadow-xs" />
                </div>
                
                <div className="space-y-1">
                  <span className="text-[10px] tracking-widest block font-mono opacity-80">**** **** **** 8251</span>
                  <div className="flex justify-between items-center text-[9px] font-medium opacity-90">
                    <span>MEMBER PRIVILEGE</span>
                    <span>EXP 12/29</span>
                  </div>
                </div>
              </motion.div>

              {/* Glowing vector behind card */}
              <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-48 h-20 bg-toss-blue/10 blur-xl rounded-full" />
            </div>
            
            {/* Hover details text */}
            <span className="text-[10px] text-toss-gray-400 text-center select-none block">
              가상 신용카드를 마우스로 올려보시면 입체적인 각도 조절 피드백을 전달합니다.
            </span>
          </motion.div>

          {/* Card 2: Relief Protection System (Interactive Security Audit) */}
          <motion.div
            whileHover={{ y: -5 }}
            id="bento-security"
            className="md:col-span-6 bg-white border border-toss-gray-200 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-xs min-h-[380px]"
          >
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full text-[10px] font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>금융보안 최고등급 준수</span>
              </div>
              <h3 className="text-xl font-extrabold text-toss-gray-900">토스 안심보상제</h3>
              <p className="text-xs text-toss-gray-500 leading-relaxed max-w-sm">
                사기 피해 및 도용 사건 등 예측불허의 금융 피해 발생 시 최대 100%까지 보상하며, 최첨단 해킹 방지 모듈이 작동합니다.
              </p>
            </div>

            {/* Secure Sandbox Scanner UI */}
            <div className="bg-toss-gray-50 border border-toss-gray-200 rounded-2xl p-4 my-2 flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[140px]">
              <AnimatePresence mode="wait">
                {secStatus === 'idle' && (
                  <motion.div
                    key="sec-all-clear"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-3 flex flex-col items-center"
                  >
                    <span className="text-[20px]">&#x1F511;</span>
                    <span className="text-xs font-bold text-toss-gray-600">접속 중인 디바이스 환경 검사</span>
                    <button
                      onClick={runSecurityScan}
                      className="px-4 py-1.5 bg-toss-blue text-white hover:bg-toss-blue-dark text-[11px] font-bold rounded-lg transition-colors shadow-xs"
                    >
                      실시간 정밀 보안진단 시작
                    </button>
                  </motion.div>
                )}

                {secStatus === 'scanning' && (
                  <motion.div
                    key="sec-scanning"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-3"
                  >
                    <RefreshCw className="w-8 h-8 text-toss-blue mx-auto animate-spin" />
                    <div className="space-y-1">
                      <p className="text-xs font-extrabold text-toss-gray-800">보안 통신 프로토콜 진증 중...</p>
                      <p className="text-[10px] text-toss-gray-400 font-mono">
                        SSL CERTIFICATE / MEMORY EXPLOITS CORRUPTION AUDIT
                      </p>
                    </div>
                  </motion.div>
                )}

                {secStatus === 'done' && (
                  <motion.div
                    key="sec-done"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-3 text-emerald-600 flex flex-col items-center"
                  >
                    <CheckCircle className="w-8 h-8 text-emerald-500" />
                    <div className="space-y-0.5">
                      <p className="text-xs font-extrabold">디바이스 완벽 안전 상태 (Level 1 Premium)</p>
                      <p className="text-[10px] text-toss-gray-400 leading-relaxed font-mono">
                        SSL인증 우대 • 취약점 노출 차단율 {securityScore}% 최적화 완결
                      </p>
                    </div>
                    <button
                      onClick={() => setSecStatus('idle')}
                      className="text-[10px] text-toss-gray-400 hover:text-toss-blue font-semibold hover:underline"
                    >
                      다시 검사하기 &larr;
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <span className="text-[10px] text-toss-gray-400 text-center select-none block">
              위 진단기는 사용자의 실제 브라우저 정밀 안전 프로토콜을 해독하는 모범적인 실시간 시뮬레이터입니다.
            </span>
          </motion.div>

          {/* Card 3: Stock Ticker simulation chart */}
          <motion.div
            whileHover={{ y: -5 }}
            id="bento-securities"
            className="md:col-span-5 bg-white border border-toss-gray-200 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-xs min-h-[360px]"
          >
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-rose-50 text-rose-600 border border-rose-100 rounded-full text-[10px] font-semibold">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>실시간 시장 시황 연동</span>
              </div>
              <h3 className="text-xl font-extrabold text-toss-gray-900">토스증권 (Toss Securities)</h3>
              <p className="text-xs text-toss-gray-500 leading-relaxed">
                해외 주식 소수점 소액 투자부터, 직관적인 주식 차트와 실시간 커뮤니티 정보로 차원이 다른 투자 환경을 경험합니다.
              </p>
            </div>

            {/* Continuous SVG graph wave simulator */}
            <div className="h-28 w-full bg-rose-50/20 border border-rose-100 rounded-2xl p-4 flex flex-col justify-between overflow-hidden relative">
              <div className="flex justify-between items-start z-10">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-extrabold text-toss-gray-400 block font-mono">TOSS METRICS CORRELATION</span>
                  <span className="text-sm font-black text-rose-500 font-display">+18.42% UP</span>
                </div>
                <div className="text-right text-[10px] text-toss-gray-400">
                  <span className="block font-bold">인기 종목</span>
                  <span className="text-rose-500 font-extrabold">인공지능 코어 테크</span>
                </div>
              </div>

              {/* Animated stroke graph lines using pure JSX & native CSS animations */}
              <div className="absolute inset-x-0 bottom-0 h-16">
                <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
                  {/* Fill area */}
                  <path
                    d="M0,100 L0,70 Q50,45 100,60 T200,30 T300,50 T400,10 L400,100 Z"
                    className="fill-rose-100/30 font-display"
                  />
                  {/* Line stroke */}
                  <path
                    d="M0,70 Q50,45 100,60 T200,30 T300,50 T400,10"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    className="animate-pulse"
                  />
                </svg>
              </div>
            </div>

            <div className="flex justify-between items-center text-[10px] text-toss-gray-400">
              <span>* 20분 지연 기준</span>
              <span className="text-rose-550 font-bold hover:underline cursor-pointer">실시간 종목 호가창 보러 가기 &rarr;</span>
            </div>
          </motion.div>

          {/* Card 4: Insurance easy claim (Hospital receipt OCR simulation) */}
          <motion.div
            whileHover={{ y: -5 }}
            id="bento-insurance"
            className="md:col-span-7 bg-white border border-toss-gray-200 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-xs min-h-[360px]"
          >
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-indigo-50 text-indigo-650 border border-indigo-100 rounded-full text-[10px] font-semibold">
                <FileText className="w-3.5 h-3.5" />
                <span>서류인쇄 일체 불필요</span>
              </div>
              <h3 className="text-xl font-extrabold text-toss-gray-900">보험금 간편 청구</h3>
              <p className="text-xs text-toss-gray-500 leading-relaxed">
                병원에서 받은 영수증 사진 한 장만 있으면 복잡한 서류 작성 없이 소속 가입 보험회사(삼성화재, DB손보 등)에 바로 보험금 청구서를 발송합니다.
              </p>
            </div>

            {/* simulated claim setup interactive block */}
            <div className="bg-toss-gray-50 border border-toss-gray-200 rounded-2xl p-4 my-2 flex flex-col justify-center min-h-[160px] relative">
              <AnimatePresence mode="wait">
                {!selectedReceipt ? (
                  <motion.div
                    key="selector-view"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-3 text-center"
                  >
                    <Upload className="w-8 h-8 text-toss-blue/60 mx-auto" />
                    <p className="text-xs font-bold text-toss-gray-700">모의 검진 영수증을 선택하고 진단해 보세요</p>
                    
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => handleSelectReceipt('서울대학외래진료영수증')}
                        className="px-3 py-1.5 bg-white border border-toss-gray-200 rounded-lg text-[10px] font-bold text-toss-gray-600 hover:border-toss-blue hover:text-toss-blue transition-all"
                      >
                        종합병원 치과 영수증 (24,500원)
                      </button>
                      <button
                        onClick={() => handleSelectReceipt('연세아름이처방전')}
                        className="px-3 py-1.5 bg-white border border-toss-gray-200 rounded-lg text-[10px] font-bold text-toss-gray-600 hover:border-toss-blue hover:text-toss-blue transition-all"
                      >
                        내과 처방전 조제비 (15,200원)
                      </button>
                    </div>
                  </motion.div>
                ) : isOcrProcessing ? (
                  <motion.div
                    key="ocr-processing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center space-y-3"
                  >
                    <RefreshCw className="w-7 h-7 text-toss-blue mx-auto animate-spin" />
                    <p className="text-xs font-bold text-toss-gray-700">AI OCR 문자 판독 엔진 작동 중...</p>
                    <p className="text-[10px] text-toss-gray-400 font-mono">EXTRACTING CLAIM FEES AND DIAGNOSTIC CODES</p>
                  </motion.div>
                ) : !claimCompleted ? (
                  <motion.div
                    key="confirm-view"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-toss-blue flex items-center gap-1.5">
                        <CheckCircle className="w-4 h-4" />
                        AI 문서 판독 완료
                      </span>
                      <button
                        onClick={handleResetInsurance}
                        className="text-[10px] text-toss-gray-400 hover:text-toss-gray-600 hover:underline"
                      >
                        수정하기
                      </button>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-toss-gray-200 text-xs space-y-1.5">
                      <div className="flex justify-between">
                        <span className="text-toss-gray-400 font-medium">문서 형식</span>
                        <span className="font-extrabold text-toss-gray-800">{selectedReceipt}</span>
                      </div>
                      <div className="flex justify-between border-t border-toss-gray-50 pt-1.5">
                        <span className="text-toss-gray-400 font-medium">검진 청구액</span>
                        <span className="font-extrabold text-toss-blue">
                          {selectedReceipt.includes('서울') ? '24,500원' : '15,200원'}
                        </span>
                      </div>
                      <div className="flex justify-between border-t border-toss-gray-50 pt-1.5">
                        <span className="text-toss-gray-400 font-medium">대응 코드</span>
                        <span className="font-mono text-toss-gray-550">J20.9 (급성 기관지염 호전)</span>
                      </div>
                    </div>

                    <button
                      onClick={executeClaim}
                      className="w-full py-2 bg-toss-blue hover:bg-toss-blue-dark text-white rounded-lg text-xs font-bold transition-colors"
                    >
                      실제 규격 보험 대리 신청 송신하기
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success-view"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center space-y-3"
                  >
                    <div className="w-10 h-10 bg-emerald-50 rounded-full border border-emerald-100 flex items-center justify-center text-emerald-500 mx-auto">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <p className="text-xs font-bold text-emerald-700">모의 청구 패킷 전송이 끝났습니다!</p>
                    <button
                      onClick={handleResetInsurance}
                      className="px-4 py-1.5 bg-toss-gray-100 hover:bg-toss-gray-200 text-toss-gray-600 text-[10px] font-bold rounded-lg transition-colors"
                    >
                      처음으로
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="text-[10px] text-toss-gray-400 text-center select-none block">
              가상 영수증 종류를 골라주시면 실감 나는 OCR 문자 해독 시뮬레이션 및 심사를 개시합니다.
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
