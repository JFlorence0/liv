"use client";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export default function PrivacyPolicyScreen() {
  return (
    <div className="min-h-screen bg-white">
      <Header theme="dark" />

      <div className="lg:hidden">
        <div className="px-6 md:px-10 pt-10">
          <div className="mb-10">
            <h1 className="text-[28px] md:text-[36px] font-bold text-[#101010] leading-tight">
              Privacy Policy
            </h1>
            <p className="text-[14px] md:text-[15px] text-[#666666] mt-2">
              Last updated: August 5, 2025
            </p>
          </div>

          <div className="space-y-8 mb-12 max-w-2xl md:mx-auto">
            <section className="bg-[#fffbfb] rounded-[15px] border border-black/50 p-5 md:p-6">
              <h2 className="text-[16px] md:text-[18px] font-bold text-[#101010] mb-3">
                Introduction
              </h2>
              <p className="text-[14px] md:text-[15px] text-[#000000] leading-relaxed">
                At Liv, we are committed to protecting your privacy and ensuring
                the security of your personal information. This Privacy Policy
                explains how we collect, use, disclose, and safeguard your
                information when you use our AI longevity coaching service.
              </p>
            </section>

            <section className="bg-[#fffbfb] rounded-[15px] border border-black/50 p-5 md:p-6">
              <h2 className="text-[16px] md:text-[18px] font-bold text-[#101010] mb-3">
                Information We Collect
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-[14px] md:text-[15px] font-semibold text-[#101010] mb-2">
                    Personal Information
                  </h3>
                  <p className="text-[14px] md:text-[15px] text-[#000000] leading-relaxed">
                    We collect information you provide directly, including your
                    name, email address, phone number, and health goals when you
                    create an account or interact with our service.
                  </p>
                </div>
                <div>
                  <h3 className="text-[14px] md:text-[15px] font-semibold text-[#101010] mb-2">
                    Usage Data
                  </h3>
                  <p className="text-[14px] md:text-[15px] text-[#000000] leading-relaxed">
                    We automatically collect information about how you use our
                    service, including your interactions with daily nudges,
                    response patterns, and engagement metrics.
                  </p>
                </div>
                <div>
                  <h3 className="text-[14px] md:text-[15px] font-semibold text-[#101010] mb-2">
                    Health Information
                  </h3>
                  <p className="text-[14px] md:text-[15px] text-[#000000] leading-relaxed">
                    With your consent, we may collect health-related information
                    you choose to share to personalize your longevity coaching
                    experience.
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-[#fffbfb] rounded-[15px] border border-black/50 p-5 md:p-6">
              <h2 className="text-[16px] md:text-[18px] font-bold text-[#101010] mb-3">
                How We Use Your Information
              </h2>
              <ul className="space-y-2 text-[14px] md:text-[15px] text-[#000000] leading-relaxed">
                <li>
                  • Provide personalized daily nudges and coaching
                  recommendations
                </li>
                <li>• Track your progress and adjust your longevity plan</li>
                <li>• Communicate with you about your account and our services</li>
                <li>• Improve our AI algorithms and service quality</li>
                <li>• Ensure the security and integrity of our platform</li>
                <li>• Comply with legal obligations and protect our rights</li>
              </ul>
            </section>

            <section className="bg-[#fffbfb] rounded-[15px] border border-black/50 p-5 md:p-6">
              <h2 className="text-[16px] md:text-[18px] font-bold text-[#101010] mb-3">
                Information Sharing and Disclosure
              </h2>
              <p className="text-[14px] md:text-[15px] text-[#000000] leading-relaxed mb-3">
                We do not sell, trade, or rent your personal information to
                third parties. We may share your information only in the
                following circumstances:
              </p>
              <ul className="space-y-2 text-[14px] md:text-[15px] text-[#000000] leading-relaxed">
                <li>• With your explicit consent</li>
                <li>• With service providers who help us operate our platform</li>
                <li>• When required by law or to protect our legal rights</li>
                <li>
                  • In connection with a business transaction (merger,
                  acquisition, etc.)
                </li>
                <li>• To protect the safety and security of our users</li>
              </ul>
            </section>

            <section className="bg-[#fffbfb] rounded-[15px] border border-black/50 p-5 md:p-6">
              <h2 className="text-[16px] md:text-[18px] font-bold text-[#101010] mb-3">
                Data Security
              </h2>
              <p className="text-[14px] md:text-[15px] text-[#000000] leading-relaxed">
                We implement appropriate technical and organizational security
                measures to protect your personal information against
                unauthorized access, alteration, disclosure, or destruction.
                This includes encryption, secure servers, and regular security
                assessments.
              </p>
            </section>

            <section className="bg-[#fffbfb] rounded-[15px] border border-black/50 p-5 md:p-6">
              <h2 className="text-[16px] md:text-[18px] font-bold text-[#101010] mb-3">
                Your Rights
              </h2>
              <p className="text-[14px] md:text-[15px] text-[#000000] leading-relaxed mb-3">
                You have the right to:
              </p>
              <ul className="space-y-2 text-[14px] md:text-[15px] text-[#000000] leading-relaxed">
                <li>• Access and review your personal information</li>
                <li>• Correct inaccurate or incomplete information</li>
                <li>• Delete your account and personal data</li>
                <li>• Opt-out of certain communications</li>
                <li>• Request data portability</li>
                <li>• Object to certain processing activities</li>
              </ul>
            </section>

            <section className="bg-[#fffbfb] rounded-[15px] border border-black/50 p-5 md:p-6">
              <h2 className="text-[16px] md:text-[18px] font-bold text-[#101010] mb-3">
                Data Retention
              </h2>
              <p className="text-[14px] md:text-[15px] text-[#000000] leading-relaxed">
                We retain your personal information for as long as necessary to
                provide our services and fulfill the purposes outlined in this
                Privacy Policy, unless a longer retention period is required by
                law.
              </p>
            </section>

            <section className="bg-[#fffbfb] rounded-[15px] border border-black/50 p-5 md:p-6">
              <h2 className="text-[16px] md:text-[18px] font-bold text-[#101010] mb-3">
                Children's Privacy
              </h2>
              <p className="text-[14px] md:text-[15px] text-[#000000] leading-relaxed">
                Our service is not intended for children under 18 years of age.
                We do not knowingly collect personal information from children
                under 18. If we become aware that we have collected such
                information, we will take steps to delete it promptly.
              </p>
            </section>

            <section className="bg-[#fffbfb] rounded-[15px] border border-black/50 p-5 md:p-6">
              <h2 className="text-[16px] md:text-[18px] font-bold text-[#101010] mb-3">
                Changes to This Privacy Policy
              </h2>
              <p className="text-[14px] md:text-[15px] text-[#000000] leading-relaxed">
                We may update this Privacy Policy from time to time. We will
                notify you of any material changes by posting the new Privacy
                Policy on this page and updating the "Last updated" date. We
                encourage you to review this Privacy Policy periodically.
              </p>
            </section>

            <section className="bg-[#fffbfb] rounded-[15px] border border-black/50 p-5 md:p-6">
              <h2 className="text-[16px] md:text-[18px] font-bold text-[#101010] mb-3">
                Contact Us
              </h2>
              <p className="text-[14px] md:text-[15px] text-[#000000] leading-relaxed">
                If you have any questions about this Privacy Policy or our
                privacy practices, please contact us at:
              </p>
              <div className="mt-3 text-[14px] md:text-[15px] text-[#000000] leading-relaxed">
                <p>Email: privacy@go-liv.com</p>
              </div>
            </section>
          </div>
        </div>
      </div>

      <div className="hidden lg:block">
        <div className="max-w-4xl mx-auto px-8 py-1">
          <div className="mb-12">
            <h1 className="text-[48px] font-bold text-[#101010] leading-tight text-center">
              Privacy Policy
            </h1>
            <p className="text-[16px] text-[#666666] text-center mt-4">
              Last updated: August 5, 2025
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-8 mb-12">
              <section className="bg-[#fffbfb] rounded-[15px] border border-black/50 p-6">
                <h2 className="text-[20px] font-bold text-[#101010] mb-4">
                  Introduction
                </h2>
                <p className="text-[15px] text-[#000000] leading-relaxed">
                  At Liv, we are committed to protecting your privacy and
                  ensuring the security of your personal information. This
                  Privacy Policy explains how we collect, use, disclose, and
                  safeguard your information when you use our AI longevity
                  coaching service.
                </p>
              </section>

              <section className="bg-[#fffbfb] rounded-[15px] border border-black/50 p-6">
                <h2 className="text-[20px] font-bold text-[#101010] mb-4">
                  Information We Collect
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-[16px] font-semibold text-[#101010] mb-2">
                      Personal Information
                    </h3>
                    <p className="text-[15px] text-[#000000] leading-relaxed">
                      We collect information you provide directly, including
                      your name, email address, phone number, and health goals
                      when you create an account or interact with our service.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-[16px] font-semibold text-[#101010] mb-2">
                      Usage Data
                    </h3>
                    <p className="text-[15px] text-[#000000] leading-relaxed">
                      We automatically collect information about how you use our
                      service, including your interactions with daily nudges,
                      response patterns, and engagement metrics.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-[16px] font-semibold text-[#101010] mb-2">
                      Health Information
                    </h3>
                    <p className="text-[15px] text-[#000000] leading-relaxed">
                      With your consent, we may collect health-related
                      information you choose to share to personalize your
                      longevity coaching experience.
                    </p>
                  </div>
                </div>
              </section>

              <section className="bg-[#fffbfb] rounded-[15px] border border-black/50 p-6">
                <h2 className="text-[20px] font-bold text-[#101010] mb-4">
                  How We Use Your Information
                </h2>
                <ul className="space-y-2 text-[15px] text-[#000000] leading-relaxed">
                  <li>
                    • Provide personalized daily nudges and coaching
                    recommendations
                  </li>
                  <li>• Track your progress and adjust your longevity plan</li>
                  <li>
                    • Communicate with you about your account and our services
                  </li>
                  <li>• Improve our AI algorithms and service quality</li>
                  <li>• Ensure the security and integrity of our platform</li>
                  <li>• Comply with legal obligations and protect our rights</li>
                </ul>
              </section>

              <section className="bg-[#fffbfb] rounded-[15px] border border-black/50 p-6">
                <h2 className="text-[20px] font-bold text-[#101010] mb-4">
                  Information Sharing and Disclosure
                </h2>
                <p className="text-[15px] text-[#000000] leading-relaxed mb-3">
                  We do not sell, trade, or rent your personal information to
                  third parties. We may share your information only in the
                  following circumstances:
                </p>
                <ul className="space-y-2 text-[15px] text-[#000000] leading-relaxed">
                  <li>• With your explicit consent</li>
                  <li>
                    • With service providers who help us operate our platform
                  </li>
                  <li>• When required by law or to protect our legal rights</li>
                  <li>
                    • In connection with a business transaction (merger,
                    acquisition, etc.)
                  </li>
                  <li>• To protect the safety and security of our users</li>
                </ul>
              </section>

              <section className="bg-[#fffbfb] rounded-[15px] border border-black/50 p-6">
                <h2 className="text-[20px] font-bold text-[#101010] mb-4">
                  Data Security
                </h2>
                <p className="text-[15px] text-[#000000] leading-relaxed">
                  We implement appropriate technical and organizational security
                  measures to protect your personal information against
                  unauthorized access, alteration, disclosure, or destruction.
                  This includes encryption, secure servers, and regular security
                  assessments.
                </p>
              </section>

              <section className="bg-[#fffbfb] rounded-[15px] border border-black/50 p-6">
                <h2 className="text-[20px] font-bold text-[#101010] mb-4">
                  Your Rights
                </h2>
                <p className="text-[15px] text-[#000000] leading-relaxed mb-3">
                  You have the right to:
                </p>
                <ul className="space-y-2 text-[15px] text-[#000000] leading-relaxed">
                  <li>• Access and review your personal information</li>
                  <li>• Correct inaccurate or incomplete information</li>
                  <li>• Delete your account and personal data</li>
                  <li>• Opt-out of certain communications</li>
                  <li>• Request data portability</li>
                  <li>• Object to certain processing activities</li>
                </ul>
              </section>

              <section className="bg-[#fffbfb] rounded-[15px] border border-black/50 p-6">
                <h2 className="text-[20px] font-bold text-[#101010] mb-4">
                  Data Retention
                </h2>
                <p className="text-[15px] text-[#000000] leading-relaxed">
                  We retain your personal information for as long as necessary
                  to provide our services and fulfill the purposes outlined in
                  this Privacy Policy, unless a longer retention period is
                  required by law.
                </p>
              </section>

              <section className="bg-[#fffbfb] rounded-[15px] border border-black/50 p-6">
                <h2 className="text-[20px] font-bold text-[#101010] mb-4">
                  Children's Privacy
                </h2>
                <p className="text-[15px] text-[#000000] leading-relaxed">
                  Our service is not intended for children under 18 years of
                  age. We do not knowingly collect personal information from
                  children under 18. If we become aware that we have collected
                  such information, we will take steps to delete it promptly.
                </p>
              </section>

              <section className="bg-[#fffbfb] rounded-[15px] border border-black/50 p-6">
                <h2 className="text-[20px] font-bold text-[#101010] mb-4">
                  Changes to This Privacy Policy
                </h2>
                <p className="text-[15px] text-[#000000] leading-relaxed">
                  We may update this Privacy Policy from time to time. We will
                  notify you of any material changes by posting the new Privacy
                  Policy on this page and updating the "Last updated" date. We
                  encourage you to review this Privacy Policy periodically.
                </p>
              </section>

              <section className="bg-[#fffbfb] rounded-[15px] border border-black/50 p-6">
                <h2 className="text-[20px] font-bold text-[#101010] mb-4">
                  Contact Us
                </h2>
                <p className="text-[15px] text-[#000000] leading-relaxed">
                  If you have any questions about this Privacy Policy or our
                  privacy practices, please contact us at:
                </p>
                <div className="mt-3 text-[15px] text-[#000000] leading-relaxed">
                  <p>Email: privacy@liv.ai</p>
                  <p>Address: 13th Street. 40 W 13th St, New York, NY 100211, USA</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
