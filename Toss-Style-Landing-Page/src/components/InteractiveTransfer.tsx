/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TransferRecipient } from '../types';
import { Fingerprint, CheckCircle2, Wallet, RotateCcw, History, ArrowRight, ArrowDown } from 'lucide-react';

const RECIPIENTS: TransferRecipient[] = [
  { id: '1', name: '김토스', bank: '토스뱅크', accountNumber: '1000-023-4859', avatarColor: 'bg-blue-500' },
  { id: '2', name: '박수민', bank: '국민은행', accountNumber: '429002-01-2094', avatarColor: 'bg-purple-500' },
  { id: '3', name: '이한결', bank: '신한은행', accountNumber: '110-382-958291', avatarColor: 'bg-amber-500' },
  { id: '4', name: '최윤서', bank: '우리은행', accountNumber: '1002-392-11029', avatarColor: 'bg-emerald-500' },
];

export default function InteractiveTransfer() {
  const [balance, setBalance] = useState(500000); // User's dynamic balance
  const [selectedRecipient, setSelectedRecipient] = useState<TransferRecipient>(RECIPIENTS[0]);
  const [amount, setAmount] = useState<number>(0);
  const [isBioScanning, setIsBioScanning] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [history, setHistory] = useState<{ id: string; recipient: TransferRecipient; amount: number; date: string }[]>([]);

  const quickAmounts = [10000, 30000, 50000, 100000];

  const handleQuickAmount = (val: number) => {
    setAmount((prev) => Math.min(balance, prev + val));
  };

  const handleClear = () => {
    setAmount(0);
  };

  const executeTransfer = () => {
    if (amount <= 0) return;
    if (amount > balance) return;

    // Trigger fingerprint scanning simulation
    setIsBioScanning(true);

    setTimeout(() => {
      setIsBioScanning(false);
      setIsSuccess(true);
      setBalance((prev) => prev - amount);

      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      
      setHistory((prev) => [
        {
          id: Math.random().toString(),
          recipient: selectedRecipient,
          amount: amount,
          date: timeStr,
        },
        ...prev,
      ]);
    }, 1800);
  };

  const handleResetSuccess = () => {
    setIsSuccess(false);
    setAmount(0);
  };

  const formatKrw = (value: number) => {
    return new Intl.NumberFormat('ko-KR').format(value) + '원';
  };

  return (
    <section id="transfer-section" className="py-20 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-toss-blue tracking-wider uppercase">1초 송금 서비스</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-toss-gray-905 tracking-tight mt-2">
            지문 검색만큼 빠른 간편송금
          </h2>
          <p className="text-sm text-toss-gray-500 mt-3">
            가장 자주 사용하는 연락처나 계좌에 수수료 평생 무료로 안전하고 간단하게 이체해 보세요.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left panel: Transfer Widget */}
          <div className="lg:col-span-7 bg-toss-gray-50 rounded-3xl p-6 md:p-8 border border-toss-gray-100 flex flex-col relative overflow-hidden min-h-[500px]">
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.div
                  key="form-view"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6 flex-1 flex flex-col"
                >
                  {/* Balance header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-toss-gray-500 text-xs font-medium">
                      <Wallet className="w-4 h-4 text-toss-blue" />
                      <span>내 출금 가능 계좌</span>
                    </div>
                    <span className="text-xs font-bold text-toss-gray-900">
                      잔액: {formatKrw(balance)}
                    </span>
                  </div>

                  {/* Recipient Picker */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-toss-gray-400">받는 사람 선택</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {RECIPIENTS.map((rec) => {
                        const isSelected = selectedRecipient.id === rec.id;
                        return (
                          <div
                            key={rec.id}
                            id={`recipient-card-${rec.id}`}
                            onClick={() => setSelectedRecipient(rec)}
                            className={`p-3 rounded-2xl border text-center cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-white border-toss-blue shadow-xs ring-1 ring-toss-blue'
                                : 'bg-white border-toss-gray-200 hover:border-toss-gray-300'
                            }`}
                          >
                            <div className={`w-8 h-8 rounded-full ${rec.avatarColor} text-white flex items-center justify-center font-bold text-xs mx-auto mb-2`}>
                              {rec.name[0]}
                            </div>
                            <h4 className="text-xs font-bold text-toss-gray-800">{rec.name}</h4>
                            <p className="text-[10px] text-toss-gray-400 mt-0.5">{rec.bank}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Dynamic Amount Input */}
                  <div className="space-y-2 flex-1">
                    <label className="text-xs font-semibold text-toss-gray-400">송금할 금액</label>
                    <div className="bg-white border border-toss-gray-200 rounded-2xl p-4 flex items-center justify-between">
                      <div className="space-y-1">
                        <span className="text-[10px] text-toss-gray-400">계좌 이치</span>
                        <h3 className="text-2xl font-bold tracking-tight text-toss-gray-950">
                          {amount === 0 ? (
                            <span className="text-toss-gray-300 font-normal">송금액을 더해주세요</span>
                          ) : (
                            formatKrw(amount)
                          )}
                        </h3>
                      </div>
                      {amount > 0 && (
                        <button
                          onClick={handleClear}
                          className="p-1.5 text-toss-gray-400 hover:text-toss-gray-600 rounded-full hover:bg-toss-gray-100 transition-all"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {/* Quick Add Buttons */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {quickAmounts.map((val) => (
                        <button
                          key={val}
                          id={`quick-amt-${val}`}
                          onClick={() => handleQuickAmount(val)}
                          disabled={amount >= balance}
                          className="px-3.5 py-1.5 bg-white border border-toss-gray-200 hover:border-toss-gray-300 text-toss-gray-700 text-xs font-semibold rounded-lg transition-colors disabled:opacity-50"
                        >
                          +{val.toLocaleString()}원
                        </button>
                      ))}
                      <button
                        onClick={() => setAmount(balance)}
                        className="px-3.5 py-1.5 bg-toss-blue-light text-toss-blue text-xs font-bold rounded-lg hover:bg-toss-blue-light/80 transition-colors"
                      >
                        전액 기입
                      </button>
                    </div>
                  </div>

                  {/* Final Action CTA */}
                  <button
                    id="transfer-action-btn"
                    onClick={executeTransfer}
                    disabled={amount <= 0 || amount > balance}
                    className="w-full py-4 bg-toss-blue text-white rounded-xl text-sm font-bold shadow-sm transition-all hover:bg-toss-blue-dark disabled:bg-toss-gray-200 disabled:text-toss-gray-400 hover:scale-101 active:scale-99"
                  >
                    {selectedRecipient.name}님에게 {amount > 0 ? formatKrw(amount) : ''} 송금하기
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="success-view"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center justify-center flex-1 text-center py-8"
                >
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: [1.2, 0.9, 1], opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-4 border border-emerald-100"
                  >
                    <CheckCircle2 className="w-10 h-10" />
                  </motion.div>
                  <h3 className="text-xl font-extrabold text-toss-gray-900">송금이 안전하게 성공했어요!</h3>
                  <div className="p-4 bg-white rounded-2xl border border-toss-gray-100 shadow-sm mt-4 min-w-[280px] text-left space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-toss-gray-400">받는 분</span>
                      <span className="font-bold text-toss-gray-800">{selectedRecipient.name} ({selectedRecipient.bank})</span>
                    </div>
                    <div className="flex justify-between text-xs border-t border-toss-gray-50 pt-1.5">
                      <span className="text-toss-gray-400">이체 계좌</span>
                      <span className="text-toss-gray-500 font-mono">{selectedRecipient.accountNumber}</span>
                    </div>
                    <div className="flex justify-between text-xs border-t border-toss-gray-50 pt-1.5">
                      <span className="text-toss-gray-400">보낸 금액</span>
                      <span className="font-extrabold text-toss-blue">{formatKrw(amount)}</span>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-8 w-full max-w-[280px]">
                    <button
                      onClick={handleResetSuccess}
                      className="flex-1 py-2.5 bg-toss-gray-100 hover:bg-toss-gray-200 text-toss-gray-700 font-bold text-xs rounded-xl transition-all"
                    >
                      더 보내기
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Biometric Scanning Panel Overlay */}
            <AnimatePresence>
              {isBioScanning && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-white/95 backdrop-blur-xs flex flex-col items-center justify-center z-10 p-6 text-center"
                >
                  <div className="relative">
                    {/* Pulsing ring */}
                    <div className="absolute inset-[-15px] rounded-full bg-toss-blue/10 animate-ping" />
                    <div className="w-20 h-20 bg-toss-blue-light text-toss-blue rounded-full flex items-center justify-center">
                      <Fingerprint className="w-12 h-12" />
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-toss-gray-900 mt-6">보안 인증 중...</h4>
                  <p className="text-xs text-toss-gray-400 mt-2">
                    {selectedRecipient.name} 대표계좌로 보내는 중<br />
                    손가락 지문이나 얼굴 인증을 대기하고 있습니다
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right panel: Live Transaction Feed of Current Session */}
          <div className="lg:col-span-5 bg-white border border-toss-gray-200 rounded-3xl p-6 min-h-[500px] flex flex-col shadow-xs">
            <div className="flex items-center gap-2 pb-4 border-b border-toss-gray-100 mb-4">
              <History className="w-4 h-4 text-toss-gray-500" />
              <h3 className="text-sm font-bold text-toss-gray-800">실시간 송금 피드 (세션 기록)</h3>
            </div>

            <div className="flex-1 flex flex-col justify-center">
              {history.length === 0 ? (
                <div className="text-center py-10 space-y-3">
                  <div className="w-10 h-10 bg-toss-gray-100 rounded-full flex items-center justify-center mx-auto text-toss-gray-400">
                    <ArrowDown className="w-5 h-5" />
                  </div>
                  <p className="text-xs text-toss-gray-400 max-w-[200px] mx-auto leading-relaxed">
                    왼쪽 패널에서 모의 송금을 완료하면 이체 내역이 실시간으로 여기에 기록됩니다.
                  </p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
                  <AnimatePresence>
                    {history.map((record) => (
                      <motion.div
                        key={record.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex items-center justify-between p-3.5 bg-toss-gray-50 rounded-xl"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-7 h-7 rounded-full ${record.recipient.avatarColor} text-white flex items-center justify-center text-[10px] font-bold`}>
                            {record.recipient.name[0]}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-bold text-toss-gray-800">{record.recipient.name}</span>
                              <span className="text-[10px] text-toss-gray-400 font-medium">{record.recipient.bank}</span>
                            </div>
                            <span className="text-[9px] text-toss-gray-400 font-mono block">{record.recipient.accountNumber}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-extrabold text-toss-blue block">{formatKrw(record.amount)}</span>
                          <span className="text-[9px] text-toss-gray-450 font-mono">{record.date}</span>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Quick Summary card */}
            <div className="mt-4 p-4 bg-toss-blue-light/50 border border-toss-blue-light rounded-2xl flex items-center gap-3 text-xs">
              <span className="text-[15px]">&#x1F4E1;</span>
              <p className="text-toss-gray-700 leading-relaxed">
                토스 송금은 실시간 망을 통해 즉시 거래가 종결되며, <strong className="text-toss-blue font-bold">평생 수수료 이체 0원</strong>을 약속합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
