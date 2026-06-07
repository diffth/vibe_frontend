/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { Landmark, TrendingUp, HelpCircle, Sparkles, ChevronRight } from 'lucide-react';

export default function FinancialCalculator() {
  const [monthlyAmount, setMonthlyAmount] = useState(500000); // Default: 50만 원
  const [years, setYears] = useState(3); // Default: 3년
  const [interestRate, setInterestRate] = useState(5.5); // Default: 5.5%

  const months = years * 12;

  // Real 적금 (Savings) Formula in Korea:
  // Each monthly deposit gets interest for remaining months.
  // Sum = MonthlyAmount * (Rate / 12) * (months * (months + 1) / 2)
  const principal = monthlyAmount * months;
  const interestBeforeTax = Math.floor(
    monthlyAmount * (interestRate / 100 / 12) * ((months * (months + 1)) / 2)
  );
  const tax = Math.floor(interestBeforeTax * 0.154); // Standard Korean Interest Tax 15.4%
  const interestAfterTax = interestBeforeTax - tax;
  const totalPayout = principal + interestAfterTax;

  const formatKrw = (value: number) => {
    return new Intl.NumberFormat('ko-KR').format(value) + '원';
  };

  const getFormatKrwShort = (value: number) => {
    if (value >= 100000000) {
      const eoc = Math.floor(value / 100000000);
      const rest = Math.floor((value % 100000000) / 10000);
      return `${eoc}억 ${rest > 0 ? rest.toLocaleString() : ''}만원`;
    }
    return `${Math.floor(value / 10000).toLocaleString()}만원`;
  };

  const principalRatio = (principal / totalPayout) * 100;
  const taxRatio = (tax / totalPayout) * 100;
  const interestRatio = (interestAfterTax / totalPayout) * 100;

  return (
    <section id="calculator-section" className="py-20 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-toss-blue tracking-wider uppercase">목돈 불리기 시뮬레이션</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-toss-gray-900 tracking-tight mt-2">
            내가 모을 수 있는 최고 금액은?
          </h2>
          <p className="text-sm text-toss-gray-600 mt-3">
            매월 저축하는 금액에 따른 납입 원금과 비과세/과세 15.4% 세금을 제한 실수령 수익을 빠르게 계산해 드립니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Controls Panel */}
          <div className="lg:col-span-6 bg-toss-gray-50 rounded-3xl p-6 md:p-8 border border-toss-gray-100 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              {/* Monthly Deposit Slider */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-toss-gray-600">매월 얼마를 적금할까요?</span>
                  <span className="text-sm font-extrabold text-toss-blue">
                    {getFormatKrwShort(monthlyAmount)}
                  </span>
                </div>
                <input
                  type="range"
                  min="100000"
                  max="5000000"
                  step="100000"
                  id="monthly-amt-range"
                  value={monthlyAmount}
                  onChange={(e) => setMonthlyAmount(Number(e.target.value))}
                  className="w-full h-2 bg-toss-gray-200 rounded-lg appearance-none cursor-pointer accent-toss-blue focus:outline-hidden"
                />
                <div className="flex justify-between text-[10px] text-toss-gray-400 font-medium">
                  <span>10만 원</span>
                  <span>150만 원</span>
                  <span>300만 원</span>
                  <span>500만 원</span>
                </div>
              </div>

              {/* Years Selector Buttons */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-toss-gray-600 block">적금 기간 선택</span>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 5].map((y) => (
                    <button
                      key={y}
                      id={`calc-year-${y}`}
                      onClick={() => setYears(y)}
                      className={`py-3 text-xs font-bold rounded-xl transition-all ${
                        years === y
                          ? 'bg-toss-blue text-white shadow-xs'
                          : 'bg-white border border-toss-gray-200 text-toss-gray-600 hover:border-toss-gray-300'
                      }`}
                    >
                      {y}년 ({y * 12}개월)
                    </button>
                  ))}
                </div>
              </div>

              {/* Interest Rate Slider */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-toss-gray-600">연이자율 (적금율)</span>
                  <span className="text-sm font-extrabold text-emerald-600">{interestRate.toFixed(1)}%</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="12.0"
                  step="0.1"
                  id="interest-rate-range"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-2 bg-toss-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-500 focus:outline-hidden"
                />
                <div className="flex justify-between text-[10px] text-toss-gray-400 font-medium">
                  <span>1.0% (시중 보통)</span>
                  <span>5.0% (특판 수준)</span>
                  <span>8.0% (특고이율)</span>
                  <span>12.0% (초고속 저축)</span>
                </div>
              </div>
            </div>

            {/* Static Hint Box */}
            <div className="flex gap-2.5 p-4 bg-white/70 rounded-2xl border border-toss-gray-200 text-[11px] text-toss-gray-500 leading-relaxed">
              <HelpCircle className="w-4 h-4 text-toss-blue shrink-0 mt-0.5" />
              <p>
                본 시뮬레이션은 월 단위 거치 정기적금 이율 산출방식을 정밀하게 적용했으며, 국세청 고시 및 조세특례법상 이자소득세 14%와 지방소득세 1.4% 총 합산 세율 <strong>15.4%</strong>를 철저히 공제하여 계산합니다.
              </p>
            </div>
          </div>

          {/* Visualization Output Panel */}
          <div className="lg:col-span-6 bg-white border border-toss-gray-200 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-xs">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-toss-gray-400">만기 세후 총 예상 수령액</span>
                <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full text-[10px] font-bold">
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                  <span>복리 가산 최적화</span>
                </div>
              </div>

              {/* Mega Total Number display */}
              <div className="py-2">
                <h1 className="text-3xl md:text-4xl font-extrabold text-toss-gray-905 tracking-tight font-display">
                  {formatKrw(totalPayout)}
                </h1>
                <p className="text-xs text-toss-gray-500 mt-1">
                  총 원금 {formatKrw(principal)} 대비 세후 수령액이 약{' '}
                  <span className="font-extrabold text-toss-blue">
                    {formatKrw(interestAfterTax)}
                  </span>{' '}
                  증가되었습니다.
                </p>
              </div>

              {/* Segmented Percentage Progress Visualizer */}
              <div className="space-y-2 pt-4">
                <div className="h-6 w-full bg-toss-gray-100 rounded-full overflow-hidden flex">
                  {/* Principal segment */}
                  <div
                    style={{ width: `${principalRatio}%` }}
                    className="h-full bg-toss-blue transition-all duration-550"
                  />
                  {/* Clean Interest split */}
                  <div
                    style={{ width: `${interestRatio}%` }}
                    className="h-full bg-emerald-500 transition-all duration-550"
                  />
                </div>

                {/* Progress Legends */}
                <div className="flex justify-between items-center text-[10px] text-toss-gray-500 pt-1">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-toss-blue" />
                    <span>납입 원금 ({principalRatio.toFixed(1)}%)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span>세후 실제 이자 ({interestRatio.toFixed(1)}%)</span>
                  </div>
                </div>
              </div>

              {/* Subtotal ledger block */}
              <div className="space-y-3 pt-6 border-t border-toss-gray-100">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-toss-gray-500">원금 총액</span>
                  <span className="font-bold text-toss-gray-800">{formatKrw(principal)}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-toss-gray-500">지급 이자액 (세전 이율)</span>
                  <span className="font-semibold text-toss-gray-800">{formatKrw(interestBeforeTax)}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-red-500">
                  <span className="text-red-400">이자소득세 (적격 15.4% 원천징수)</span>
                  <span>- {formatKrw(tax)}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-bold text-emerald-600 pt-2 border-t border-toss-gray-50">
                  <span>세후 순이자 소득</span>
                  <span>+ {formatKrw(interestAfterTax)}</span>
                </div>
              </div>
            </div>

            {/* CTA to link with high-value product */}
            <div className="mt-8 pt-4 border-t border-toss-gray-100">
              <button className="w-full py-4.5 bg-toss-gray-100 hover:bg-toss-gray-200 text-toss-gray-700 font-extrabold text-xs.5 md:text-sm rounded-xl transition-all flex items-center justify-center gap-1.5 active:scale-99">
                <Landmark className="w-4 h-4 text-toss-blue" />
                <span>시뮬레이션 기반 맞춤형 우대 적금 보러 가기</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
