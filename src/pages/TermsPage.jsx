import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

const fadeIn = {
  hidden: { opacity: 0, y: 12 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
  })
};

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-[var(--background)] font-manrope selection:bg-[#a0d1bc]/30 selection:text-[#00261b]">
      <Helmet>
        <title>Terms of Service | Scribloom</title>
        <meta name="description" content="Terms and conditions governing the use of the Scribloom platform." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://scribloom.vercel.app/terms" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Terms of Service | Scribloom" />
        <meta property="og:description" content="Terms and conditions governing the use of the Scribloom platform." />
        <meta property="og:url" content="https://scribloom.vercel.app/terms" />
        <meta property="og:site_name" content="Scribloom" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Terms of Service | Scribloom" />
        <meta name="twitter:description" content="Terms and conditions governing the use of the Scribloom platform." />
      </Helmet>

      <div className="max-w-[800px] mx-auto px-6 py-16 lg:py-24">

        <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={0}>
          <Link to="/home" className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-[#00261b]/40 hover:text-[#00261b] transition-colors mb-16 group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Garden
          </Link>
        </motion.div>

        <motion.header variants={fadeIn} initial="hidden" animate="visible" custom={1} className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-[#eae8e4] rounded-2xl flex items-center justify-center">
              <FileText size={20} className="text-[#00261b]" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#00261b]/40">Terms of Service</span>
          </div>
          <h1 className="font-newsreader text-5xl md:text-6xl font-bold text-[#00261b] tracking-tighter leading-[1.1] mb-4">
            The agreement between us.
          </h1>
          <p className="text-sm text-[#414944]/60 font-medium">Effective Date: September 1, 2026 &nbsp;|&nbsp; Last Updated: September 1, 2026</p>
        </motion.header>

        <div className="space-y-16">

          <motion.section variants={fadeIn} initial="hidden" animate="visible" custom={2}>
            <h2 className="font-newsreader font-bold text-2xl text-[#00261b] mb-4">1. Acceptance of Terms</h2>
            <div className="text-[15px] text-[#414944] leading-relaxed space-y-4">
              <p>By accessing or using Scribloom (the "Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree, do not use the Service.</p>
              <p>These Terms constitute a legally binding agreement between you ("User," "you") and Scribloom Technologies Pvt. Ltd. ("Scribloom," "we," "us"). We may update these Terms from time to time; continued use after changes take effect constitutes acceptance.</p>
            </div>
          </motion.section>

          <motion.section variants={fadeIn} initial="hidden" animate="visible" custom={3}>
            <h2 className="font-newsreader font-bold text-2xl text-[#00261b] mb-4">2. Eligibility</h2>
            <div className="text-[15px] text-[#414944] leading-relaxed space-y-4">
              <p>You must be at least 13 years old to create an account. By using Scribloom, you represent and warrant that you meet this age requirement and have the legal capacity to enter into these Terms.</p>
              <p>If you are using the Service on behalf of an organization, you represent that you have the authority to bind that organization to these Terms.</p>
            </div>
          </motion.section>

          <motion.section variants={fadeIn} initial="hidden" animate="visible" custom={4}>
            <h2 className="font-newsreader font-bold text-2xl text-[#00261b] mb-4">3. Account Registration & Security</h2>
            <div className="text-[15px] text-[#414944] leading-relaxed space-y-4">
              <p>To access certain features, you must create an account. You agree to:</p>
              <ul className="list-none space-y-2 ml-4">
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-[#00261b] rounded-full mt-2 shrink-0" /> Provide accurate, current, and complete information during registration.</li>
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-[#00261b] rounded-full mt-2 shrink-0" /> Maintain the security of your password and account credentials.</li>
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-[#00261b] rounded-full mt-2 shrink-0" /> Promptly update your account information if it changes.</li>
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-[#00261b] rounded-full mt-2 shrink-0" /> Accept responsibility for all activity that occurs under your account.</li>
              </ul>
              <p>You may not maintain more than one account. You may not share your account credentials with others. Impersonating another person or entity is prohibited.</p>
            </div>
          </motion.section>

          <motion.section variants={fadeIn} initial="hidden" animate="visible" custom={5}>
            <h2 className="font-newsreader font-bold text-2xl text-[#00261b] mb-4">4. Content Ownership</h2>
            <div className="text-[15px] text-[#414944] leading-relaxed space-y-4">
              <p><strong className="text-[#00261b]">You own your content.</strong> Scribloom does not claim ownership of any stories, comments, or other content you create. Publishing on our platform does not transfer your intellectual property rights to us.</p>
              <p><strong className="text-[#00261b]">License to display.</strong> By publishing content, you grant Scribloom a non-exclusive, worldwide, royalty-free license to display, distribute, and promote your content within the Service and its marketing materials. This license terminates when you delete your content or account.</p>
              <p><strong className="text-[#00261b]">Content removal.</strong> You may delete any of your content at any time. Upon deletion, we will remove it from active systems within 72 hours. Content may persist in CDN caches for up to 24 additional hours.</p>
            </div>
          </motion.section>

          <motion.section variants={fadeIn} initial="hidden" animate="visible" custom={6}>
            <h2 className="font-newsreader font-bold text-2xl text-[#00261b] mb-4">5. Content Responsibilities</h2>
            <div className="text-[15px] text-[#414944] leading-relaxed space-y-4">
              <p>You are solely responsible for the content you publish. It must comply with these Terms, our Editorial Guidelines, and all applicable local, national, and international laws.</p>
              <p>You represent and warrant that:</p>
              <ul className="list-none space-y-2 ml-4">
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-[#00261b] rounded-full mt-2 shrink-0" /> You own or have the necessary rights to all content you publish.</li>
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-[#00261b] rounded-full mt-2 shrink-0" /> Your content does not infringe on the intellectual property rights of any third party.</li>
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-[#00261b] rounded-full mt-2 shrink-0" /> Your content does not contain malware, spam, or deceptive material.</li>
              </ul>
            </div>
          </motion.section>

          <motion.section variants={fadeIn} initial="hidden" animate="visible" custom={7}>
            <h2 className="font-newsreader font-bold text-2xl text-[#00261b] mb-4">6. AI-Generated Content</h2>
            <div className="text-[15px] text-[#414944] leading-relaxed space-y-4">
              <p>Scribloom provides AI writing tools. You may use AI assistance in your writing, subject to the following:</p>
              <ul className="list-none space-y-2 ml-4">
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-[#00261b] rounded-full mt-2 shrink-0" /> Content generated or substantially modified by AI must carry our AI disclosure badge.</li>
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-[#00261b] rounded-full mt-2 shrink-0" /> You remain responsible for the accuracy and quality of AI-assisted content.</li>
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-[#00261b] rounded-full mt-2 shrink-0" /> Mass-producing AI content without editorial review is prohibited.</li>
              </ul>
            </div>
          </motion.section>

          <motion.section variants={fadeIn} initial="hidden" animate="visible" custom={8}>
            <h2 className="font-newsreader font-bold text-2xl text-[#00261b] mb-4">7. Prohibited Conduct</h2>
            <div className="text-[15px] text-[#414944] leading-relaxed space-y-4">
              <p>You may not:</p>
              <ul className="list-none space-y-2 ml-4">
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-[#00261b] rounded-full mt-2 shrink-0" /> Use the Service for any unlawful purpose or in violation of any applicable law.</li>
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-[#00261b] rounded-full mt-2 shrink-0" /> Harass, threaten, or harm other users or Scribloom staff.</li>
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-[#00261b] rounded-full mt-2 shrink-0" /> Attempt to access other users' accounts or disrupt the platform's infrastructure.</li>
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-[#00261b] rounded-full mt-2 shrink-0" /> Use automated tools (bots, scrapers) to access the Service without written permission.</li>
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-[#00261b] rounded-full mt-2 shrink-0" /> Engage in spam, phishing, or unauthorized commercial activity.</li>
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-[#00261b] rounded-full mt-2 shrink-0" /> Circumvent or attempt to circumvent any security or rate-limiting measures.</li>
              </ul>
            </div>
          </motion.section>

          <motion.section variants={fadeIn} initial="hidden" animate="visible" custom={9}>
            <h2 className="font-newsreader font-bold text-2xl text-[#00261b] mb-4">8. Termination</h2>
            <div className="text-[15px] text-[#414944] leading-relaxed space-y-4">
              <p><strong className="text-[#00261b]">By you:</strong> You may delete your account at any time through your profile settings. This action is irreversible.</p>
              <p><strong className="text-[#00261b]">By us:</strong> We may suspend or terminate your account if you violate these Terms, our Editorial Guidelines, or engage in conduct that we reasonably believe is harmful to the Service or other users. We will provide notice before termination unless circumstances require immediate action.</p>
              <p>Upon termination, your right to use the Service ceases immediately. We may retain certain data as required by law or for legitimate business purposes.</p>
            </div>
          </motion.section>

          <motion.section variants={fadeIn} initial="hidden" animate="visible" custom={10}>
            <h2 className="font-newsreader font-bold text-2xl text-[#00261b] mb-4">9. Disclaimers</h2>
            <div className="text-[15px] text-[#414944] leading-relaxed space-y-4">
              <p>THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.</p>
              <p>We do not warrant that the Service will be uninterrupted, error-free, or secure. We are not responsible for the content, accuracy, or opinions expressed by users on the platform.</p>
            </div>
          </motion.section>

          <motion.section variants={fadeIn} initial="hidden" animate="visible" custom={11}>
            <h2 className="font-newsreader font-bold text-2xl text-[#00261b] mb-4">10. Limitation of Liability</h2>
            <div className="text-[15px] text-[#414944] leading-relaxed">
              <p>TO THE MAXIMUM EXTENT PERMITTED BY LAW, SCRIBLOOM SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.</p>
            </div>
          </motion.section>

          <motion.section variants={fadeIn} initial="hidden" animate="visible" custom={12}>
            <h2 className="font-newsreader font-bold text-2xl text-[#00261b] mb-4">11. Governing Law</h2>
            <div className="text-[15px] text-[#414944] leading-relaxed">
              <p>These Terms are governed by and construed in accordance with the laws of India. Any disputes arising from or relating to these Terms shall be subject to the exclusive jurisdiction of the courts in Bangalore, Karnataka, India.</p>
            </div>
          </motion.section>

          <motion.section variants={fadeIn} initial="hidden" animate="visible" custom={13}>
            <h2 className="font-newsreader font-bold text-2xl text-[#00261b] mb-4">12. Contact</h2>
            <div className="text-[15px] text-[#414944] leading-relaxed space-y-2">
              <p>For questions about these Terms:</p>
              <p>Operated by Varad Patel, Founder & Developer.</p>
              <p>Email: <a href="mailto:varadpatelo355@gmail.com" className="underline hover:text-[#00261b]">varadpatelo355@gmail.com</a></p>
            </div>
          </motion.section>

        </div>
      </div>
    </div>
  );
};

export default TermsPage;
