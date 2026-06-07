/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Github, Contact2, HelpCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-toss-gray-900 text-toss-gray-400 py-16 border-t border-toss-gray-800">
      <div className="max-w-6xl mx-auto px-6 space-y-12">
        {/* Footer Brand & Legal list */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-toss-blue flex items-center justify-center">
                <div className="w-3 h-3 rounded-full border border-white bg-transparent" />
              </div>
              <span className="font-display font-extrabold text-white tracking-tight text-lg">
                toss
              </span>
            </div>
            <p className="text-xs text-toss-gray-500 max-w-xs leading-relaxed">
              토스는 시중 은행과의 정보 연계를 통해 모든 지엽적인 금융 프로세스를 모바일 터치 한 번으로 통합 관리하는 서비스 플랫폼입니다.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-toss-gray-200 mb-3">회사 소개</h4>
            <ul className="space-y-2 text-xs text-toss-gray-400">
              <li><span className="hover:text-white cursor-pointer transition-colors">공동체 소개</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">채용 정보</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">뉴스룸 / 블로그</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">브랜드 가이드</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-toss-gray-200 mb-3">고객지원</h4>
            <ul className="space-y-2 text-xs text-toss-gray-400">
              <li><span className="hover:text-white cursor-pointer transition-colors">자주 묻는 질문</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">토스 안심보상제</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">금리인하요구권</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">민원접수 안내</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-toss-gray-200 mb-3">고객센터 안내</h4>
            <ul className="space-y-2 text-xs text-toss-gray-400">
              <li><span className="text-white font-extrabold">전화: 1599-4905</span></li>
              <li><span>이메일: support@toss.im</span></li>
              <li><span>(24시간 365일 상시 운영 도움방)</span></li>
            </ul>
          </div>
        </div>

        {/* Corporate specifications and legal smallprint */}
        <div className="pt-8 border-t border-toss-gray-800 space-y-4">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-toss-gray-400">
            <span className="text-white hover:underline cursor-pointer font-extrabold">개인정보 처리방침</span>
            <span className="hover:text-white cursor-pointer transition-colors">서비스 이용약관</span>
            <span className="hover:text-white cursor-pointer transition-colors">스마트폰 관리 가이드</span>
            <span className="hover:text-white cursor-pointer transition-colors">위치기반서비스 이용약관</span>
          </div>

          <div className="text-[10px] text-toss-gray-600 space-y-1.5 leading-relaxed">
            <p>
              (주)비바리퍼블리카 | 대표: 이승건 | 사업자등록번호: 120-88-182500 | 통신판매업신고: 제 2026-서울강남-0318호
            </p>
            <p>
              서울특별시 강남구 테헤란로 142, 아크플레이스 12층 | 고객센터: 1599-4905 (평생 무료, 24시간 연중무휴)
            </p>
            <p>
              호스팅 서비스 제공자: (주)비바리퍼블리카 | Copyright &copy; Viva Republica, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
