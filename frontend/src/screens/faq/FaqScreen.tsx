"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

const ChevronRightIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m8.25 4.5 7.5 7.5-7.5 7.5"
    />
  </svg>
);

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m19.5 8.25-7.5 7.5-7.5-7.5"
    />
  </svg>
);

const faqData = [
  {
    id: 1,
    question: "What is Liv?",
    answer:
      "LIV is your AI-powered longevity coach. She gives you daily science-backed nudges and challenges tailored to your health goals and habits, helping you build better routines and live longer, healthier, and happier.",
  },
  {
    id: 2,
    question: "Do I need to download an app?",
    answer:
      "No download required! LIV is a progressive web app (PWA) that works instantly in your browser on any device. You can add it to your home screen for an app-like experience, but there's no need to visit the App Store or Google Play.",
  },
  {
    id: 3,
    question: "How do daily nudge challenges work?",
    answer:
      "Each morning, LIV sends you a personalized nudge focused on one of the 7 Pillars of Longevity. You complete the challenge, check in at night, and earn points for progress. The more you interact, the smarter and more tailored your nudges become.",
  },
  {
    id: 4,
    question: "What are the 7 Pillars of longevity?",
    answer:
      "The 7 Pillars are: Sleep, Movement, Nutrition, Supplements, Prevention, Detox, and Stress. LIV's nudges and challenges are built around these proven foundations for a longer, healthier life.",
  },
  {
    id: 5,
    question: "Is Liv free?",
    answer:
      "Yes! LIV is free to use. You get daily nudges, challenges, and longevity tracking at no cost. Premium features may be added in the future, but the core experience is always free.",
  },
];

export default function FaqScreen() {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(
    new Set([1])
  );
  const router = useRouter();

  const toggleExpanded = (id: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const handleAskLiv = () => {
    router.push("/ask-liv");
  };

  return (
    <div className="min-h-screen bg-white">
      <Header theme="dark" />
      <div className="lg:hidden">
        <div className="px-6 md:px-10 pt-10">
          <div className="mb-10">
            <h1 className="text-[28px] md:text-[36px] font-bold text-[#101010] leading-tight">
              Got questions?
              <br />
              Liv's got answers
            </h1>
          </div>

          <div className="space-y-4 mb-12 max-w-2xl md:mx-auto">
            {faqData.map((item) => (
              <div
                key={item.id}
                className="bg-[#fffbfb] rounded-[15px] border border-black/50 overflow-hidden"
              >
                <button
                  onClick={() => toggleExpanded(item.id)}
                  className="w-full px-5 md:px-6 py-4 md:py-5 flex items-center justify-between text-left hover:bg-[#fef7f7] transition-colors"
                >
                  <span className="text-[14px] md:text-[15px] font-bold text-[#101010] pr-4">
                    {item.question}
                  </span>
                  <div className="flex-shrink-0">
                    {expandedItems.has(item.id) ? (
                      <ChevronDownIcon className="w-5 h-5 text-[#1e1e1e]" />
                    ) : (
                      <ChevronRightIcon className="w-5 h-5 text-[#1e1e1e]" />
                    )}
                  </div>
                </button>

                {expandedItems.has(item.id) && (
                  <div className="px-5 md:px-6 pb-4 md:pb-5">
                    <p className="text-[14px] md:text-[15px] text-[#000000] leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mb-8 max-w-2xl md:mx-auto md:text-center">
            <h2 className="text-[20px] md:text-[22px] font-bold text-[#101010] mb-2 md:mb-3">
              Still curious?
            </h2>
            <p className="text-[14px] md:text-[15px] text-[#000000] mb-6 md:mb-8 leading-relaxed">
              Didn't see your question? Ask Liv directly-she's listening.
            </p>

            <button
              onClick={handleAskLiv}
              className="bg-[#4ade80] text-white px-6 md:px-8 py-2 md:py-3 rounded-lg text-[11px] md:text-[12px] font-semibold uppercase tracking-wider hover:bg-[#22c55e] transition-colors"
            >
              ASK LIV
            </button>
          </div>
        </div>
      </div>

      <div className="hidden lg:block">
        <div className="max-w-4xl mx-auto px-8 py-1">
          <div className="mb-12">
            <h1 className="text-[48px] font-bold text-[#101010] leading-tight text-center">
              Got questions?
              <br />
              Liv's got answers
            </h1>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="space-y-6 mb-12">
              {faqData.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#fffbfb] rounded-[15px] border border-black/50 overflow-hidden"
                >
                  <button
                    onClick={() => toggleExpanded(item.id)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#fef7f7] transition-colors"
                  >
                    <span className="text-[16px] font-bold text-[#101010] pr-6">
                      {item.question}
                    </span>
                    <div className="flex-shrink-0">
                      {expandedItems.has(item.id) ? (
                        <ChevronDownIcon className="w-6 h-6 text-[#1e1e1e]" />
                      ) : (
                        <ChevronRightIcon className="w-6 h-6 text-[#1e1e1e]" />
                      )}
                    </div>
                  </button>

                  {expandedItems.has(item.id) && (
                    <div className="px-6 pb-5">
                      <p className="text-[15px] text-[#000000] leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="text-center">
              <h2 className="text-[24px] font-bold text-[#101010] mb-3">
                Still curious?
              </h2>
              <p className="text-[15px] text-[#000000] mb-8 leading-relaxed">
                Didn't see your question? Ask Liv directly-she's listening.
              </p>

              <button
                onClick={handleAskLiv}
                className="bg-[#4ade80] text-white px-8 py-3 rounded-lg text-[12px] font-semibold uppercase tracking-wider hover:bg-[#22c55e] transition-colors"
              >
                ASK LIV
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
