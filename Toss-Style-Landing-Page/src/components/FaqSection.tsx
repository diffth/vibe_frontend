/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FaqItem } from '../types';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'f1',
    question: '토스 송금 수수료는 정말 평생 무료인가요?',
    answer: '네, 그렇습니다! 토스는 시중 모든 시중은행 및 증권사 연동 계좌를 가리지 않고, 횟수나 금액 제한 없이 평생 송금 수수료 무료 원칙을 적용하고 있습니다. 조건 없는 혜택을 온전히 누려보세요.',
  },
  {
    id: 'f2',
    question: '신용점수를 조회하거나 보정하면 제 신용도가 떨어지나요?',
    answer: '절대 그렇지 않습니다. 신용 등급 조회 및 가점 실적 제출 서비스는 개인 신용 평가 불이익이 발생하지 않으며, 오히려 성실한 세금 및 통신비 납부를 가산하여 신용 평가사(KCB, NICE)의 실제 점수를 안전하게 합산 반영하는 이로운 도구입니다.',
  },
  {
    id: 'f3',
    question: '개인 공공정보와 계좌 인증 정보는 안전하게 보관되나요?',
    answer: '토스는 대한민국 금융위 산하 정식 승인을 획득한 ‘마이데이터 허가 사업자’로, 모든 접속 연결은 청와대, 금융결제원 정보보안에 대응하는 최고 수준의 SSL 256bit 암호화 패킷 터널로 처리됩니다. 수집된 모든 증적은 심사 외 일체 저장되지 않습니다.',
  },
  {
    id: 'f4',
    question: '안심보상제 프로그램은 어떤 보상을 지원하나요?',
    answer: '토스는 금융이 고객의 실수나 보이스피싱, 악성 해킹 앱 노출 등으로 자산 손해가 생길 경우 원인 규명 전이더라도 약관 기준에 의거하여 최대 1,000만 원 한대로 전액 우선 구제 보상하는 ‘토스 안심보상제’를 대한민국 핀테크 최초로 도입하여 시행 중입니다.',
  },
];

export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <HelpCircle className="w-8 h-8 text-toss-blue mx-auto mb-3" />
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-toss-gray-900">
            자주 묻는 질문 (FAQ)
          </h2>
          <p className="text-xs text-toss-gray-500 mt-2">
            사용자가 가장 궁금해하시는 핵심 질문들을 모아 정직하고 투명하게 대답해 드립니다.
          </p>
        </div>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                id={`faq-item-${item.id}`}
                className="border border-toss-gray-200 rounded-2xl overflow-hidden transition-all bg-toss-gray-50/30 hover:bg-white"
              >
                <button
                  onClick={() => toggleFaq(item.id)}
                  className="w-full p-5 text-left flex justify-between items-center gap-4 focus:outline-hidden"
                >
                  <span className="text-sm font-bold text-toss-gray-800 tracking-tight leading-relaxed">
                    {item.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-toss-gray-400 shrink-0"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="p-5 pt-0 text-xs text-toss-gray-600 border-t border-toss-gray-100 leading-relaxed font-normal bg-white">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
