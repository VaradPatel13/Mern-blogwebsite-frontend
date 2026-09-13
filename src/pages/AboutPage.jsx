import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Leaf, PenLine, Users, BookOpen, Heart, Globe, Sparkles } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

const fadeIn = {
  hidden: { opacity: 0, y: 12 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
  })
};

const team = [
  { name: "Varad Patel", role: "Founder & Developer", bio: "Full-stack engineer who built Scribloom from the ground up. Handles everything from the text editor to the search index. Believes good software should stay out of the writer's way." },
  { name: "Aditi Rao", role: "Editorial Advisor", bio: "Former literary editor with a decade of experience in Indian publishing. Helps shape Scribloom's editorial standards and mentors emerging writers on the platform." },
  { name: "Rohan Mehta", role: "Community & Growth", bio: "Writer and journalist. Runs Scribloom's editorial community, curates the homepage, and connects writers with readers who care about their work." }
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[var(--background)] font-manrope selection:bg-[#a0d1bc]/30 selection:text-[#00261b]">
      <Helmet>
        <title>About | Scribloom</title>
        <meta name="description" content="Learn about Scribloom — a digital greenhouse for writers and readers. Our mission, team, and the story behind the platform." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://scribloom.vercel.app/about" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="About | Scribloom" />
        <meta property="og:description" content="Learn about Scribloom — a digital greenhouse for writers and readers. Our mission, team, and the story behind the platform." />
        <meta property="og:url" content="https://scribloom.vercel.app/about" />
        <meta property="og:site_name" content="Scribloom" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="About | Scribloom" />
        <meta name="twitter:description" content="Learn about Scribloom — a digital greenhouse for writers and readers. Our mission, team, and the story behind the platform." />
      </Helmet>

      <div className="max-w-[800px] mx-auto px-6 py-16 lg:py-24">

        <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={0}>
          <Link to="/home" className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-[#00261b]/40 hover:text-[#00261b] transition-colors mb-16 group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Garden
          </Link>
        </motion.div>

        {/* Hero */}
        <motion.header variants={fadeIn} initial="hidden" animate="visible" custom={1} className="mb-24">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-[#eae8e4] rounded-2xl flex items-center justify-center">
              <Leaf size={20} className="text-[#00261b]" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#00261b]/40">About Us</span>
          </div>
          <h1 className="font-newsreader text-5xl md:text-6xl lg:text-[72px] font-bold text-[#00261b] tracking-tighter leading-[1.05] mb-8">
            Built by a writer,<br />for writers.
          </h1>
          <p className="text-lg text-[#416a59] font-medium leading-relaxed max-w-2xl">
            Scribloom was created in 2024 by Varad Patel — a writer and engineer who believed reading and writing deserved a better home than what existing platforms offered.
          </p>
        </motion.header>

        {/* Story */}
        <motion.section variants={fadeIn} initial="hidden" animate="visible" custom={2} className="mb-24">
          <h2 className="text-[10px] font-black uppercase tracking-[0.25em] text-[#7b5455] mb-8">The Story</h2>
          <div className="bg-[#f5f3ef] border border-[#c0c8c3]/20 rounded-[2rem] p-8 md:p-12 space-y-6">
            <p className="text-[17px] text-[#1a382c] font-newsreader leading-relaxed">
              Most writing platforms started as blogging tools and evolved into social media networks. The writing became secondary to the metrics — likes, shares, follower counts. Writers were building audiences, not bodies of work.
            </p>
            <p className="text-[17px] text-[#1a382c] font-newsreader leading-relaxed">
              We asked a different question: <em>what if a platform was designed around the act of writing itself?</em> What if the reading experience was given the same care as the editing experience? What if there were no vanity metrics, no algorithmic feeds — just stories, presented beautifully?
            </p>
            <p className="text-[17px] text-[#1a382c] font-newsreader leading-relaxed">
              That question became Scribloom. Built over several months by Varad — from the rich text editor to the caching layer, from the AI pipeline to the search index — it launched in 2024 as a small, focused tool for writers who care about their craft.
            </p>
            <p className="text-[17px] text-[#1a382c] font-newsreader leading-relaxed">
              The name says it all: "Scrib" — to write, and "Bloom" — to grow. A place where every story is given the space and care to flourish.
            </p>
          </div>
        </motion.section>

        {/* Numbers */}
        <motion.section variants={fadeIn} initial="hidden" animate="visible" custom={3} className="mb-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: "15+", label: "Writers" },
              { number: "48+", label: "Stories Published" },
              { number: "1.5K", label: "Reads This Year" },
              { number: "5", label: "Countries" }
            ].map((stat, i) => (
              <div key={i} className="bg-white border border-[#c0c8c3]/20 rounded-2xl p-6 text-center">
                <span className="text-3xl md:text-4xl font-newsreader font-bold text-[#00261b] block mb-1">{stat.number}</span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#414944]/50">{stat.label}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Values */}
        <motion.section variants={fadeIn} initial="hidden" animate="visible" custom={4} className="mb-24">
          <h2 className="text-[10px] font-black uppercase tracking-[0.25em] text-[#7b5455] mb-8">What We Believe</h2>
          <div className="space-y-6">
            {[
              { icon: <PenLine size={18} />, title: "Craft Over Clicks", desc: "We don't optimize for engagement. We optimize for the quality of the reading experience. No infinite scroll, no autoplay, no dark patterns." },
              { icon: <Heart size={18} />, title: "Writers Own Their Work", desc: "Every word you publish on Scribloom belongs to you. We'll never claim rights to your content, and you can export or delete everything at any time." },
              { icon: <Globe size={18} />, title: "Accessible by Default", desc: "Scribloom works on every device, every connection speed, every screen reader. Good design is inclusive design." },
              { icon: <Sparkles size={18} />, title: "Transparent AI", desc: "We offer AI writing tools, but we believe readers deserve to know when AI was involved. Every AI-assisted story carries a clear disclosure badge." }
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-5 p-6 bg-white border border-[#c0c8c3]/20 rounded-2xl hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-[#eae8e4] rounded-xl flex items-center justify-center text-[#00261b] shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-newsreader font-bold text-lg text-[#00261b] mb-1.5">{item.title}</h3>
                  <p className="text-sm text-[#414944] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Team */}
        <motion.section variants={fadeIn} initial="hidden" animate="visible" custom={5} className="mb-24">
          <h2 className="text-[10px] font-black uppercase tracking-[0.25em] text-[#7b5455] mb-8">The Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <div key={i} className="bg-white border border-[#c0c8c3]/20 rounded-2xl p-8">
                <div className="w-14 h-14 bg-[#eae8e4] rounded-full flex items-center justify-center text-[#00261b] font-newsreader font-bold text-xl mb-5">
                  {member.name.charAt(0)}
                </div>
                <h3 className="font-newsreader font-bold text-lg text-[#00261b] mb-1">{member.name}</h3>
                <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#7b5455] mb-4">{member.role}</p>
                <p className="text-sm text-[#414944] leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section variants={fadeIn} initial="hidden" animate="visible" custom={6} className="text-center py-16 border-t border-[#c0c8c3]/20">
          <p className="text-lg text-[#414944] font-medium mb-8">Ready to start your writing journey?</p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#00261b] text-white font-manrope font-bold text-[11px] uppercase tracking-widest rounded-xl hover:bg-[#214f3f] transition-all shadow-lg"
          >
            <Leaf size={14} /> Join Scribloom
          </Link>
        </motion.section>
      </div>
    </div>
  );
};

export default AboutPage;
