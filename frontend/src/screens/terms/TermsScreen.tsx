"use client";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

const termsData = [
  {
    id: 1,
    section: "1. Acceptance of Terms",
    content:
      'By accessing and using Liv, you accept and agree to be bound by the terms and provision of this agreement. These Terms of Service ("Terms") govern your use of our AI longevity coaching service. If you do not agree to abide by the above, please do not use this service.',
  },
  {
    id: 2,
    section: "2. Description of Service",
    content:
      "Liv is an AI-powered longevity coaching platform that provides personalized health and wellness guidance through daily nudges, science-backed recommendations, and habit tracking. Our service is designed to help users make informed decisions about their health and longevity, but it is not a substitute for professional medical advice.",
  },
  {
    id: 3,
    section: "3. Medical Disclaimer",
    content:
      "Liv is not a medical device or healthcare provider. The information and recommendations provided by our AI coach are for educational and informational purposes only. Always consult with qualified healthcare professionals before making any medical decisions or changes to your health regimen. Liv does not diagnose, treat, cure, or prevent any disease.",
  },
  {
    id: 4,
    section: "4. User Accounts and Responsibilities",
    content:
      "You are responsible for maintaining the confidentiality of your account information and password. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate, current, and complete. You are responsible for all activities that occur under your account.",
  },
  {
    id: 5,
    section: "5. Privacy and Data Protection",
    content:
      "Your privacy is important to us. We collect, use, and protect your personal information in accordance with our Privacy Policy. By using Liv, you consent to the collection and use of your information as outlined in our Privacy Policy. We implement appropriate security measures to protect your personal data.",
  },
  {
    id: 6,
    section: "6. Intellectual Property Rights",
    content:
      "All content, features, and functionality of Liv, including but not limited to text, graphics, logos, images, and software, are owned by Liv and are protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, or create derivative works without our explicit written permission.",
  },
  {
    id: 7,
    section: "7. Prohibited Uses",
    content:
      "You agree not to use Liv for any unlawful purpose or any purpose prohibited under this clause. Prohibited uses include but are not limited to: violating laws and regulations, transmitting harmful or malicious code, attempting to gain unauthorized access to our systems, or using the service to harm others.",
  },
  {
    id: 8,
    section: "8. Limitation of Liability",
    content:
      "In no event shall Liv, its officers, directors, employees, or agents be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the service.",
  },
  {
    id: 9,
    section: "9. Service Availability",
    content:
      "We strive to maintain continuous service availability but cannot guarantee uninterrupted access. We reserve the right to modify, suspend, or discontinue any part of our service at any time without notice. We are not liable for any modification, suspension, or discontinuation of the service.",
  },
  {
    id: 10,
    section: "10. Modifications to Terms",
    content:
      "We reserve the right to modify these Terms of Service at any time. We will notify users of any material changes through our platform or via email. Your continued use of Liv after such modifications constitutes your acceptance of the updated terms.",
  },
  {
    id: 11,
    section: "11. Termination",
    content:
      "We may terminate or suspend your account and access to Liv immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the service will cease immediately.",
  },
  {
    id: 12,
    section: "12. Governing Law",
    content:
      "These Terms shall be interpreted and governed by the laws of the jurisdiction in which Liv operates, without regard to conflict of law provisions. Any legal action or proceeding arising under these Terms will be brought exclusively in the courts of that jurisdiction.",
  },
  {
    id: 13,
    section: "13. Contact Information",
    content:
      "If you have any questions about these Terms of Service, please contact us through our support channels within the Liv platform or reach out to our customer service team. We are committed to addressing your concerns promptly and professionally.",
  },
];

export default function TermsScreen() {
  return (
    <div className="min-h-screen bg-white">
      <Header theme="dark" />

      <div className="lg:hidden">
        <div className="px-6 md:px-10 pt-10">
          <div className="mb-10">
            <h1 className="text-[28px] md:text-[36px] font-bold text-[#101010] leading-tight">
              Terms of Service
            </h1>
            <p className="text-[14px] md:text-[15px] text-[#666666] mt-3 leading-relaxed">
              Last updated: January 2025
            </p>
          </div>

          <div className="space-y-6 mb-12 max-w-2xl md:mx-auto">
            {termsData.map((item) => (
              <div
                key={item.id}
                className="bg-[#fffbfb] rounded-[15px] border border-black/50 overflow-hidden p-5 md:p-6"
              >
                <h2 className="text-[16px] md:text-[18px] font-bold text-[#101010] mb-3">
                  {item.section}
                </h2>
                <p className="text-[14px] md:text-[15px] text-[#000000] leading-relaxed">
                  {item.content}
                </p>
              </div>
            ))}
          </div>

          <div className="mb-8 max-w-2xl md:mx-auto md:text-center">
            <h2 className="text-[20px] md:text-[22px] font-bold text-[#101010] mb-2 md:mb-3">
              Questions about our terms?
            </h2>
            <p className="text-[14px] md:text-[15px] text-[#000000] mb-6 md:mb-8 leading-relaxed">
              If you have any questions about these Terms of Service, we're here
              to help.
            </p>

            <button className="bg-[#4ade80] text-white px-6 md:px-8 py-2 md:py-3 rounded-lg text-[11px] md:text-[12px] font-semibold uppercase tracking-wider hover:bg-[#22c55e] transition-colors">
              CONTACT SUPPORT
            </button>
          </div>
        </div>
      </div>

      <div className="hidden lg:block">
        <div className="max-w-4xl mx-auto px-8 py-1">
          <div className="mb-12">
            <h1 className="text-[48px] font-bold text-[#101010] leading-tight text-center">
              Terms of Service
            </h1>
            <p className="text-[16px] text-[#666666] text-center mt-4">
              Last updated: January 2025
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-8 mb-12">
              {termsData.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#fffbfb] rounded-[15px] border border-black/50 overflow-hidden p-8"
                >
                  <h2 className="text-[20px] font-bold text-[#101010] mb-4">
                    {item.section}
                  </h2>
                  <p className="text-[15px] text-[#000000] leading-relaxed">
                    {item.content}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <h2 className="text-[24px] font-bold text-[#101010] mb-3">
                Questions about our terms?
              </h2>
              <p className="text-[15px] text-[#000000] mb-8 leading-relaxed">
                If you have any questions about these Terms of Service, we're
                here to help.
              </p>

              <button className="bg-[#4ade80] text-white px-8 py-3 rounded-lg text-[12px] font-semibold uppercase tracking-wider hover:bg-[#22c55e] transition-colors">
                CONTACT SUPPORT
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
