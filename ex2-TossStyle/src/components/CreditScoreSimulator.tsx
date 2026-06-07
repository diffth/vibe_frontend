/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CreditHabit } from '../types';
import { ArrowUp, Server, ShieldCheck, Check, Sparkles, AlertCircle, RotateCcw } from 'lucide-react';

const INITIAL_HABITS: CreditHabit[] = [
  { id: 'h1', title: '건강보험공단 납부공시 제출', scoreChange: 15, description: '최근 6개월간 연체 없이 납부한 실적을 증명합니다.', checked: false, category: '공공기록' },
  { id: 'h2', title: '국민연금 납부 내역 연동', scoreChange: 12, description: '국민연금공단의 정기적인 소득 세금 증빙을 연동합니다.', checked: false, category: '공공기록' },
  { id: 'h3', title: '통신 3사 연체 없음 제출', scoreChange: 18, description: '통신 요금을 성실히 납부한 최근 보증을 가져옵니다.', checked: false, category: '통신정보' },
  { id: 'h4', title: '꾸준한 체크카드 이용증명', scoreChange: 22, description: '주거래 은행 체크카드 정기 소비 결제이력을 가산합니다.', checked: false, category: '소비습관' },
];

export default function CreditScoreSimulator() {
  const [habits, setHabits] = useState<CreditHabit[]>(INITIAL_HABITS);
  const [baseScore, setBaseScore] = useState(720); // Base credit score
  const [isBoosting, setIsBoosting] = useState(false);
  const [boostCompleted, setBoostCompleted] = useState(false);
  const [celebrateAmt, setCelebrateAmt] = useState(0);

  // Total calculated score based on checked boxes
  const addedScore = habits.filter(h => h.checked).reduce((acc, h) => acc + h.scoreChange, 0);
  const totalScore = baseScore + (boostCompleted ? addedScore : 0);

  // Gauge calculations for SVG circle path
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  // We want to fill only 75% of the circle (arc representation)
  const maxScore = 1000;
  const minScore = 300;
  const scoreRatio = (totalScore - minScore) / (maxScore - minScore);
  const strokeDashoffset = circumference - (scoreRatio * 0.75 * circumference);

  const handleToggleHabit = (id: string) => {
    if (boostCompleted) return; // Prevent change after applying boost
    setHabits(prev =>
      prev.map(h => h.id === id ? { ...h, checked: !h.checked } : h)
    );
  };

  const executeBoost = () => {
    if (addedScore === 0) return;
    setIsBoosting(true);

    setTimeout(() => {
      setIsBoosting(false);
      setBoostCompleted(true);
      setCelebrateAmt(addedScore);
    }, 2200);
  };

  const handleReset = () => {
    setHabits(INITIAL_HABITS);
    setBoostCompleted(false);
    setCelebrateAmt(0);
  };

  // Score dynamic feedback metadata
  const getGradeName = (score: number) => {
    if (score >= 900) return { name: '최상위 신용군', color: 'text-violet-600', percent: '상위 3.2%', bgColor: 'bg-violet-50 border-violet-100' };
    if (score >= 820) return { name: '우수 금융 신용군', color: 'text-emerald-600', percent: '상위 11.5%', bgColor: 'bg-emerald-50 border-emerald-100' };
    if (score >= 700) return { name: '안정적인 신용군', color: 'text-toss-blue', percent: '상위 28.4%', bgColor: 'bg-toss-blue-light border-toss-blue-light' };
    return { name: '관리 관심군', color: 'text-amber-600', percent: '하위 55.2%', bgColor: 'bg-amber-50 border-amber-100' };
  };

  const currentGrade = getGradeName(totalScore);

  return (
    <section id="credit-section" className="py-20 md:py-24 bg-toss-gray-50 border-t border-b border-toss-gray-200">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-toss-blue tracking-wider uppercase">신용 관리의 시작</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-toss-gray-900 tracking-tight mt-2">
            숨겨진 신용점수 1분 만에 찾기
          </h2>
          <p className="text-sm text-toss-gray-600 mt-3">
            제출 서류 번거로움 없이 공인기관 연동 한 번으로 확실하게 신용 평가 가산점을 부여받으세요.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Arc Gauge Indicator */}
          <div className="lg:col-span-5 bg-white border border-toss-gray-200 rounded-3xl p-6 md:p-8 flex flex-col items-center justify-center text-center shadow-xs">
            <span className="text-xs font-bold text-toss-gray-400 mb-6">KCB 올크레딧 실시간 기준</span>

            {/* Circular Gauge Graphic */}
            <div className="relative w-48 h-48 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-225">
                {/* Background Gauge Arc */}
                <circle
                  cx="96"
                  cy="96"
                  r={radius}
                  className="stroke-toss-gray-100 fill-none"
                  strokeWidth="12"
                  strokeDasharray={`${circumference}`}
                  strokeDashoffset={`${circumference - 0.75 * circumference}`}
                  strokeLinecap="round"
                />
                {/* Filled Gauge Arc with smooth movement */}
                <motion.circle
                  cx="96"
                  cy="96"
                  r={radius}
                  className="stroke-toss-blue fill-none"
                  strokeWidth="12"
                  strokeDasharray={`${circumference}`}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset: strokeDashoffset }}
                  transition={{ type: 'spring', damping: 20, stiffness: 60 }}
                  strokeLinecap="round"
                />
              </svg>

              {/* Central Text Value */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
                <span className="text-[10px] uppercase tracking-widest text-toss-gray-400 font-bold">MY SCORE</span>
                <span className="text-4xl font-extrabold text-toss-gray-900 font-display">
                  {totalScore}점
                </span>
                <div className={`mt-1.5 px-2 py-0.5 rounded-full text-[9px] font-bold ${currentGrade.bgColor} ${currentGrade.color}`}>
                  {currentGrade.percent}
                </div>
              </div>
            </div>

            {/* Gauge details bottom card */}
            <div className="w-full mt-6 p-4 bg-toss-gray-50 rounded-2xl space-y-2 text-left">
              <div className="flex items-center justify-between text-xs">
                <span className="text-toss-gray-500 font-medium">신용등급 구분</span>
                <span className={`font-bold ${currentGrade.color}`}>{currentGrade.name}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-toss-gray-500 font-medium">제출 가능한 항목</span>
                <span className="font-bold text-toss-gray-800">
                  {habits.filter(h => !h.checked).length}개 대기 중
                </span>
              </div>
              {boostCompleted && celebrateAmt > 0 && (
                <div className="flex items-center justify-between text-xs border-t border-toss-gray-200 pt-2 text-emerald-600 font-bold">
                  <span>금일 총 상승치</span>
                  <span className="flex items-center gap-0.5">
                    <ArrowUp className="w-3.5 h-3.5" />
                    +{celebrateAmt}점 상승 완료!
                  </span>
                </div>
              )}
            </div>

            {boostCompleted && (
              <button
                onClick={handleReset}
                className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-toss-gray-500 hover:text-toss-blue transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>시뮬레이터 되돌리기</span>
              </button>
            )}
          </div>

          {/* Right Habit Submission Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-toss-gray-200 space-y-4">
              <h3 className="text-md font-bold text-toss-gray-800">지급 실적 제출 시 상승 가능한 공공 납부 내역</h3>
              <p className="text-xs text-toss-gray-500">
                원하는 항목을 선택하고 아래 제출을 누르시면 안전한 정부24 및 건강보험공단 API 연동 시뮬레이션이 자동 실행됩니다.
              </p>

              <div className="space-y-3">
                {habits.map((habit) => (
                  <div
                    key={habit.id}
                    onClick={() => handleToggleHabit(habit.id)}
                    className={`p-4 rounded-2xl border flex items-start gap-4 cursor-pointer transition-all ${
                      boostCompleted
                        ? habit.checked
                          ? 'border-emerald-200 bg-emerald-50/20 opacity-80 cursor-not-allowed'
                          : 'border-toss-gray-100 bg-toss-gray-50/50 opacity-40 cursor-not-allowed'
                        : habit.checked
                        ? 'border-toss-blue bg-toss-blue-light/30 shadow-xs'
                        : 'border-toss-gray-200 hover:border-toss-gray-300'
                    }`}
                  >
                    {/* Checkbox circle */}
                    <div className={`mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                      habit.checked
                        ? 'bg-toss-blue border-toss-blue text-white'
                        : 'border-toss-gray-300 bg-white'
                    }`}>
                      {habit.checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>

                    <div className="flex-1 space-y-0.5">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <span className="text-xs font-bold text-toss-gray-800">{habit.title}</span>
                        <span className="text-xs font-extrabold text-toss-blue flex items-center gap-0.5">
                          <ArrowUp className="w-3 h-3" />
                          +{habit.scoreChange}점
                        </span>
                      </div>
                      <p className="text-[11px] text-toss-gray-500 leading-relaxed">{habit.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Form trigger block & Feedback */}
              <div className="pt-4">
                <AnimatePresence mode="wait">
                  {!boostCompleted ? (
                    <motion.button
                      key="submit-btn"
                      onClick={executeBoost}
                      disabled={addedScore === 0}
                      className="w-full py-4 rounded-xl text-sm font-bold shadow-sm transition-all text-center flex items-center justify-center bg-toss-blue text-white hover:bg-toss-blue-dark disabled:bg-toss-gray-200 disabled:text-toss-gray-400"
                    >
                      <span>{addedScore > 0 ? `신용점수 +${addedScore}점 간편 올리기 신청` : '상승시킬 항목을 선택하세요'}</span>
                    </motion.button>
                  ) : (
                    <motion.div
                      key="success-banner"
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl text-center text-emerald-800"
                    >
                      <span className="text-sm font-bold flex items-center justify-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-emerald-600" />
                        성공적으로 신용 가산점 {celebrateAmt}점이 적용되었습니다!
                      </span>
                      <p className="text-xs text-emerald-600 mt-1">민간 신용사 KCB에 해당 가점 연동 패킷 전송을 마쳤습니다.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Document Sync simulation overlay */}
      <AnimatePresence>
        {isBoosting && (
          <div className="fixed inset-0 bg-toss-gray-900/40 backdrop-blur-xs z-100 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-sm w-full p-6 border border-toss-gray-100 shadow-2xl text-center space-y-6"
            >
              <div className="relative">
                <div className="absolute inset-[-10px] rounded-full bg-toss-blue/5 animate-pulse" />
                <div className="w-14 h-14 bg-toss-blue-light text-toss-blue rounded-full flex items-center justify-center mx-auto">
                  <Server className="w-7 h-7" />
                </div>
              </div>

              <div>
                <h4 className="text-md font-extrabold text-toss-gray-900">공공 마이데이터 안전 연동 중</h4>
                <p className="text-xs text-toss-gray-500 mt-1 leading-relaxed">
                  정부24 및 연금공단, 통신사 서버에 접근하여 공인 연동 패킷을 해독하고 신용 평가에 필요한 납부 확인 정보를 추출하고 있습니다.
                </p>
              </div>

              {/* Progress Simulation Dots */}
              <div className="space-y-2 max-w-[240px] mx-auto text-left py-2 border-t border-b border-toss-gray-100">
                <div className="flex items-center gap-2 text-[10px] text-toss-gray-650">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                  <span>건강보험 납입 이력 수집 중...</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-toss-gray-400">
                  <div className="w-1.5 h-1.5 bg-toss-gray-300 rounded-full" />
                  <span>KCB 정보 전송 준비 중...</span>
                </div>
              </div>

              <div className="text-[10px] text-toss-gray-400 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>정부 보안 가이드라인 준수 (SSL 256bit)</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
