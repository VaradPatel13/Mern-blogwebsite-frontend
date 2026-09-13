import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

const fadeIn = {
  hidden: { opacity: 0, y: 12 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
  })
};

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-[var(--background)] font-manrope selection:bg-[#a0d1bc]/30 selection:text-[#00261b]">
      <Helmet>
        <title>Privacy Policy | Scribloom</title>
        <meta name="description" content="How Scribloom collects, uses, stores, and protects your personal information." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://scribloom.vercel.app/privacy" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Privacy Policy | Scribloom" />
        <meta property="og:description" content="How Scribloom collects, uses, stores, and protects your personal information." />
        <meta property="og:url" content="https://scribloom.vercel.app/privacy" />
        <meta property="og:site_name" content="Scribloom" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Privacy Policy | Scribloom" />
        <meta name="twitter:description" content="How Scribloom collects, uses, stores, and protects your personal information." />
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
              <Shield size={20} className="text-[#00261b]" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#00261b]/40">Privacy Policy</span>
          </div>
          <h1 className="font-newsreader text-5xl md:text-6xl font-bold text-[#00261b] tracking-tighter leading-[1.1] mb-4">
            Your data. Your rights.
          </h1>
          <p className="text-sm text-[#414944]/60 font-medium">Effective Date: September 1, 2026 &nbsp;|&nbsp; Last Updated: September 1, 2026</p>
        </motion.header>

        <div className="space-y-16">

          <motion.section variants={fadeIn} initial="hidden" animate="visible" custom={2}>
            <h2 className="font-newsreader font-bold text-2xl text-[#00261b] mb-4">1. Introduction</h2>
            <div className="text-[15px] text-[#414944] leading-relaxed space-y-4">
              <p>Scribloom ("we," "our," or "us") operates the scribloom.com platform. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service. By using Scribloom, you agree to the practices described here.</p>
              <p>We are committed to protecting your privacy and earning your trust. We do not sell personal data. We do not run advertisements. We do not track you across the web.</p>
            </div>
          </motion.section>

          <motion.section variants={fadeIn} initial="hidden" animate="visible" custom={3}>
            <h2 className="font-newsreader font-bold text-2xl text-[#00261b] mb-4">2. Information We Collect</h2>
            <div className="text-[15px] text-[#414944] leading-relaxed space-y-4">
              <p><strong className="text-[#00261b]">Account Information:</strong> When you create an account, we collect your full name, email address, and username. If you choose to verify your mobile number, we store it alongside your profile.</p>
              <p><strong className="text-[#00261b]">Content:</strong> Stories, comments, and profile information you create are stored on our servers and associated with your account.</p>
              <p><strong className="text-[#00261b]">Usage Data:</strong> We automatically collect information about how you interact with Scribloom — pages viewed, time spent, search queries, and feature usage. This data is aggregated and cannot identify you personally.</p>
              <p><strong className="text-[#00261b]">Device & Browser Data:</strong> We collect your browser type, operating system, IP address (for security logging only), and referring URL. IP addresses are not linked to your identity and are rotated regularly.</p>
              <p><strong className="text-[#00261b]">Cookies:</strong> We use essential cookies for authentication and session management. These are strictly necessary for Scribloom to function. We do not use advertising or third-party tracking cookies.</p>
            </div>
          </motion.section>

          <motion.section variants={fadeIn} initial="hidden" animate="visible" custom={4}>
            <h2 className="font-newsreader font-bold text-2xl text-[#00261b] mb-4">3. How We Use Your Information</h2>
            <div className="text-[15px] text-[#414944] leading-relaxed space-y-4">
              <p>We use your information for the following purposes:</p>
              <ul className="list-none space-y-2 ml-4">
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-[#00261b] rounded-full mt-2 shrink-0" /> Providing, maintaining, and improving the Scribloom platform.</li>
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-[#00261b] rounded-full mt-2 shrink-0" /> Authenticating your identity and securing your account.</li>
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-[#00261b] rounded-full mt-2 shrink-0" /> Sending transactional emails (password resets, account notifications).</li>
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-[#00261b] rounded-full mt-2 shrink-0" /> Analyzing aggregated usage patterns to improve the product.</li>
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-[#00261b] rounded-full mt-2 shrink-0" /> Detecting and preventing abuse, fraud, and security incidents.</li>
              </ul>
            </div>
          </motion.section>

          <motion.section variants={fadeIn} initial="hidden" animate="visible" custom={5}>
            <h2 className="font-newsreader font-bold text-2xl text-[#00261b] mb-4">4. Data Sharing & Third Parties</h2>
            <div className="text-[15px] text-[#414944] leading-relaxed space-y-4">
              <p><strong className="text-[#00261b]">We do not sell your personal data.</strong> We never have, and we never will.</p>
              <p>We share data with the following service providers, each bound by data processing agreements:</p>
              <ul className="list-none space-y-2 ml-4">
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-[#00261b] rounded-full mt-2 shrink-0" /> <strong>MongoDB Atlas</strong> — database hosting (data encrypted at rest and in transit).</li>
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-[#00261b] rounded-full mt-2 shrink-0" /> <strong>ImageKit</strong> — image hosting and optimization.</li>
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-[#00261b] rounded-full mt-2 shrink-0" /> <strong>Vercel</strong> — frontend hosting and CDN.</li>
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-[#00261b] rounded-full mt-2 shrink-0" /> <strong>Upstash</strong> — Redis caching infrastructure.</li>
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-[#00261b] rounded-full mt-2 shrink-0" /> <strong>Google OAuth</strong> — optional sign-in authentication.</li>
              </ul>
              <p>We may disclose information if required by law, or if we believe in good faith that disclosure is necessary to protect our rights, your safety, or the safety of others.</p>
            </div>
          </motion.section>

          <motion.section variants={fadeIn} initial="hidden" animate="visible" custom={6}>
            <h2 className="font-newsreader font-bold text-2xl text-[#00261b] mb-4">5. Data Security</h2>
            <div className="text-[15px] text-[#414944] leading-relaxed space-y-4">
              <p>We implement industry-standard security measures:</p>
              <ul className="list-none space-y-2 ml-4">
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-[#00261b] rounded-full mt-2 shrink-0" /> TLS encryption for all data in transit.</li>
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-[#00261b] rounded-full mt-2 shrink-0" /> AES-256 encryption for data at rest in our database.</li>
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-[#00261b] rounded-full mt-2 shrink-0" /> httpOnly, Secure cookies for authentication tokens.</li>
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-[#00261b] rounded-full mt-2 shrink-0" /> Regular security audits and dependency updates.</li>
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-[#00261b] rounded-full mt-2 shrink-0" /> Rate limiting and brute-force protection on authentication endpoints.</li>
              </ul>
              <p>While we take every reasonable precaution, no system is completely secure. We encourage you to use a strong, unique password and enable two-factor authentication when available.</p>
            </div>
          </motion.section>

          <motion.section variants={fadeIn} initial="hidden" animate="visible" custom={7}>
            <h2 className="font-newsreader font-bold text-2xl text-[#00261b] mb-4">6. Your Rights</h2>
            <div className="text-[15px] text-[#414944] leading-relaxed space-y-4">
              <p>You have the following rights regarding your personal data:</p>
              <ul className="list-none space-y-2 ml-4">
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-[#00261b] rounded-full mt-2 shrink-0" /> <strong>Access:</strong> Request a copy of all data we hold about you.</li>
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-[#00261b] rounded-full mt-2 shrink-0" /> <strong>Correction:</strong> Update inaccurate information from your profile settings.</li>
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-[#00261b] rounded-full mt-2 shrink-0" /> <strong>Deletion:</strong> Delete your account and all associated data permanently.</li>
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-[#00261b] rounded-full mt-2 shrink-0" /> <strong>Export:</strong> Download your published stories in a portable format.</li>
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-[#00261b] rounded-full mt-2 shrink-0" /> <strong>Objection:</strong> Opt out of non-essential data processing at any time.</li>
              </ul>
              <p>To exercise any of these rights, contact us at <a href="mailto:privacy@scribloom.com" className="underline hover:text-[#00261b]">privacy@scribloom.com</a>.</p>
            </div>
          </motion.section>

          <motion.section variants={fadeIn} initial="hidden" animate="visible" custom={8}>
            <h2 className="font-newsreader font-bold text-2xl text-[#00261b] mb-4">7. Data Retention</h2>
            <div className="text-[15px] text-[#414944] leading-relaxed space-y-4">
              <p>We retain your personal data for as long as your account is active. When you delete your account, we remove your personal information from active systems within 30 days. Anonymized usage data may be retained indefinitely for aggregate analytics.</p>
              <p>Published stories marked for deletion are removed from public access immediately, but may persist in CDN caches for up to 24 hours.</p>
            </div>
          </motion.section>

          <motion.section variants={fadeIn} initial="hidden" animate="visible" custom={9}>
            <h2 className="font-newsreader font-bold text-2xl text-[#00261b] mb-4">8. Children's Privacy</h2>
            <div className="text-[15px] text-[#414944] leading-relaxed">
              <p>Scribloom is not intended for users under 13 years of age. We do not knowingly collect personal information from children. If we discover that a child under 13 has provided us with personal data, we will delete it immediately.</p>
            </div>
          </motion.section>

          <motion.section variants={fadeIn} initial="hidden" animate="visible" custom={10}>
            <h2 className="font-newsreader font-bold text-2xl text-[#00261b] mb-4">9. Changes to This Policy</h2>
            <div className="text-[15px] text-[#414944] leading-relaxed">
              <p>We may update this Privacy Policy periodically. Material changes will be communicated via email to registered users and prominently displayed on the platform. Your continued use of Scribloom after changes take effect constitutes acceptance of the updated policy.</p>
            </div>
          </motion.section>

          <motion.section variants={fadeIn} initial="hidden" animate="visible" custom={11}>
            <h2 className="font-newsreader font-bold text-2xl text-[#00261b] mb-4">10. Contact Us</h2>
            <div className="text-[15px] text-[#414944] leading-relaxed space-y-2">
              <p>For questions about this Privacy Policy or our data practices:</p>
              <p>Operated by Varad Patel, Founder & Developer.</p>
              <p>Email: <a href="mailto:varadpatelo355@gmail.com" className="underline hover:text-[#00261b]">varadpatelo355@gmail.com</a></p>
            </div>
          </motion.section>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
