/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface BentoCard {
  id: string;
  title: string;
  description: string;
  badge?: string;
  tagline: string;
  gradient: string;
  textColor: string;
  delay: number;
}

export interface TransferRecipient {
  id: string;
  name: string;
  bank: string;
  accountNumber: string;
  avatarColor: string;
  imageUrl?: string;
}

export interface CreditHabit {
  id: string;
  title: string;
  scoreChange: number;
  description: string;
  checked: boolean;
  category: string;
}
