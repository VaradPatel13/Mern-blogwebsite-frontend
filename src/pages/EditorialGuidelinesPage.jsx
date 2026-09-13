import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, AlertTriangle, CheckCircle2, Mail, Ban, Eye } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

const fadeIn = {
  hidden: { opacity: 0, y: 12 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
  })
};

const EditorialGuidelinesPage = () => {
  return (
    <div className="min-h-screen bg-[var(--background)] font-manrope selection:bg-[#a0d1bc]/30 selection:text-[#00261b]">
      <Helmet>
        <title>Editorial Guidelines | Scribloom</title>
        <meta name="description" content="Standards and expectations for writers publishing on Scribloom." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://scribloom.vercel.app/editorial-guidelines" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Editorial Guidelines | Scribloom" />
        <meta property="og:description" content="Standards and expectations for writers publishing on Scribloom." />
        <meta property="og:url" content="https://scribloom.vercel.app/editorial-guidelines" />
        <meta property="og:site_name" content="Scribloom" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Editorial Guidelines | Scribloom" />
        <meta name="twitter:description" content="Standards and expectations for writers publishing on Scribloom." />
      </Helmet>

      <div className="max-w-[800px] mx-auto px-6 py-16 lg:py-24">

        <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={0}>
          <Link to="/home" className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-[#00261b]/40 hover:text-[#00261b] transition-colors mb-16 group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Garden
          </Link>
        </motion.div>

        <motion.header variants={fadeIn} initial="hidden" animate="visible" custom={1} className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-[#eae8e4] rounded-2xl flex items-center justify-center">
              <FileText size={20} className="text-[#00261b]" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#00261b]/40">Editorial Guidelines</span>
          </div>
          <h1 className="font-newsreader text-5xl md:text-6xl lg:text-[72px] font-bold text-[#00261b] tracking-tighter leading-[1.05] mb-6">
            The standard we hold<br />ourselves to.
          </h1>
          <p className="text-lg text-[#414944] font-medium leading-relaxed max-w-2xl">
            These guidelines exist to protect readers, support writers, and maintain the quality that defines Scribloom. They apply to every story published on the platform.
          </p>
        </motion.header>

        <div className="space-y-20">

          {/* 1. Originality */}
          <motion.section variants={fadeIn} initial="hidden" animate="visible" custom={2}>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-8 bg-[#00261b] text-white rounded-lg flex items-center justify-center text-[11px] font-black">1</span>
              <h2 className="font-newsreader font-bold text-2xl text-[#00261b]">Originality & Attribution</h2>
            </div>
            <div className="bg-[#f5f3ef] border border-[#c0c8c3]/20 rounded-[2rem] p-8 md:p-10 space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 size={16} className="text-[#0b3d2e] mt-1 shrink-0" />
                <p className="text-[15px] text-[#1a382c] leading-relaxed"><strong>All stories must be original work.</strong> Republishing someone else's content, in whole or in part, without explicit permission and attribution is grounds for immediate removal.</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 size={16} className="text-[#0b3d2e] mt-1 shrink-0" />
                <p className="text-[15px] text-[#1a382c] leading-relaxed"><strong>Cite your sources.</strong> If you reference data, quotes, or ideas from other works, link to them or name the source. This isn't optional — it's how trust works.</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 size={16} className="text-[#0b3d2e] mt-1 shrink-0" />
                <p className="text-[15px] text-[#1a382c] leading-relaxed"><strong>Syndication is welcome.</strong> If you've published something elsewhere and want to share it here too, just note where it originally appeared.</p>
              </div>
            </div>
          </motion.section>

          {/* 2. Quality */}
          <motion.section variants={fadeIn} initial="hidden" animate="visible" custom={3}>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-8 bg-[#00261b] text-white rounded-lg flex items-center justify-center text-[11px] font-black">2</span>
              <h2 className="font-newsreader font-bold text-2xl text-[#00261b]">Writing Quality</h2>
            </div>
            <div className="bg-[#f5f3ef] border border-[#c0c8c3]/20 rounded-[2rem] p-8 md:p-10 space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 size={16} className="text-[#0b3d2e] mt-1 shrink-0" />
                <p className="text-[15px] text-[#1a382c] leading-relaxed"><strong>Write clearly.</strong> Avoid unnecessary jargon, filler, and padding. If a sentence can be removed without losing meaning, remove it.</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 size={16} className="text-[#0b3d2e] mt-1 shrink-0" />
                <p className="text-[15px] text-[#1a382c] leading-relaxed"><strong>Edit before publishing.</strong> Typos happen, but repeated carelessness signals disrespect for the reader. Use our built-in preview to review your work.</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 size={16} className="text-[#0b3d2e] mt-1 shrink-0" />
                <p className="text-[15px] text-[#1a382c] leading-relaxed"><strong>Structure matters.</strong> Break long-form content with headings. Use short paragraphs for mobile readability. Add a cover image — stories with images receive 3x more reads.</p>
              </div>
            </div>
          </motion.section>

          {/* 3. Accuracy */}
          <motion.section variants={fadeIn} initial="hidden" animate="visible" custom={4}>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-8 bg-[#00261b] text-white rounded-lg flex items-center justify-center text-[11px] font-black">3</span>
              <h2 className="font-newsreader font-bold text-2xl text-[#00261b]">Factual Accuracy</h2>
            </div>
            <div className="bg-[#f5f3ef] border border-[#c0c8c3]/20 rounded-[2rem] p-8 md:p-10 space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 size={16} className="text-[#0b3d2e] mt-1 shrink-0" />
                <p className="text-[15px] text-[#1a382c] leading-relaxed"><strong>Get your facts right.</strong> Verify claims, statistics, and dates before publishing. Incorrect information erodes reader trust — and ours.</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 size={16} className="text-[#0b3d2e] mt-1 shrink-0" />
                <p className="text-[15px] text-[#1a382c] leading-relaxed"><strong>Opinion ≠ fact.</strong> Label opinion pieces as opinion. Clearly distinguish between your analysis and verified reporting.</p>
              </div>
            </div>
          </motion.section>

          {/* 4. AI Disclosure */}
          <motion.section variants={fadeIn} initial="hidden" animate="visible" custom={5}>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-8 bg-[#00261b] text-white rounded-lg flex items-center justify-center text-[11px] font-black">4</span>
              <h2 className="font-newsreader font-bold text-2xl text-[#00261b]">AI-Generated Content</h2>
            </div>
            <div className="bg-[#f5f3ef] border border-[#c0c8c3]/20 rounded-[2rem] p-8 md:p-10 space-y-4">
              <div className="flex items-start gap-3">
                <AlertTriangle size={16} className="text-[#ba1a1a] mt-1 shrink-0" />
                <p className="text-[15px] text-[#1a382c] leading-relaxed"><strong>Disclose AI involvement.</strong> If your story was generated or substantially rewritten by AI, you must use Scribloom's built-in AI disclosure badge. Readers deserve to know.</p>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle size={16} className="text-[#ba1a1a] mt-1 shrink-0" />
                <p className="text-[15px] text-[#1a382c] leading-relaxed"><strong>No AI-generated spam.</strong> Mass-producing AI content without editorial review is prohibited. Every story should reflect genuine human thought and effort.</p>
              </div>
            </div>
          </motion.section>

          {/* 5. Prohibited */}
          <motion.section variants={fadeIn} initial="hidden" animate="visible" custom={6}>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-8 bg-[#ba1a1a] text-white rounded-lg flex items-center justify-center text-[11px] font-black">!</span>
              <h2 className="font-newsreader font-bold text-2xl text-[#00261b]">Prohibited Content</h2>
            </div>
            <div className="bg-[#ffdad6]/20 border border-[#fecbcb]/40 rounded-[2rem] p-8 md:p-10 space-y-4">
              {[
                "Hate speech or content that incites violence against individuals or groups.",
                "Deliberate misinformation or conspiracy theories presented as fact.",
                "Harassment, doxxing, or threats targeting other users.",
                "Spam, affiliate marketing, or promotional content disguised as stories.",
                "Content that sexualizes minors or depicts non-consensual violence.",
                "Plagiarism or copyright infringement."
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Ban size={16} className="text-[#ba1a1a] mt-1 shrink-0" />
                  <p className="text-[15px] text-[#1a382c] leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* 6. Enforcement */}
          <motion.section variants={fadeIn} initial="hidden" animate="visible" custom={7}>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-8 bg-[#00261b] text-white rounded-lg flex items-center justify-center text-[11px] font-black">6</span>
              <h2 className="font-newsreader font-bold text-2xl text-[#00261b]">Enforcement</h2>
            </div>
            <div className="bg-[#f5f3ef] border border-[#c0c8c3]/20 rounded-[2rem] p-8 md:p-10 space-y-4">
              <p className="text-[15px] text-[#1a382c] leading-relaxed">
                Our editorial team reviews flagged content within 48 hours. Depending on severity, responses include:
              </p>
              <div className="space-y-3 mt-4">
                {[
                  "Content removal with a written explanation sent to the author.",
                  "A warning with specific guidance on what needs to change.",
                  "Temporary suspension from publishing (7–30 days).",
                  "Permanent account termination for repeat or severe violations."
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-[#7b5455] rounded-full shrink-0" />
                    <p className="text-[15px] text-[#1a382c]">{text}</p>
                  </div>
                ))}
              </div>
              <p className="text-[14px] text-[#414944] mt-4">
                Authors may appeal any decision by emailing <a href="mailto:varadpatelo355@gmail.com" className="underline hover:text-[#00261b]">varadpatelo355@gmail.com</a>.
              </p>
            </div>
          </motion.section>

        </div>

        <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={8} className="text-center pt-20 mt-20 border-t border-[#c0c8c3]/20">
          <p className="text-[15px] text-[#414944] font-medium mb-6">Questions about these guidelines?</p>
          <a href="mailto:varadpatelo355@gmail.com" className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#00261b] text-white font-manrope font-bold text-[11px] uppercase tracking-widest rounded-xl hover:bg-[#214f3f] transition-all shadow-lg">
            <Mail size={14} /> Contact Editorial
          </a>
        </motion.div>

      </div>
    </div>
  );
};

export default EditorialGuidelinesPage;
