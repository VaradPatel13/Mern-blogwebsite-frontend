import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, PenTool, Sparkles } from 'lucide-react';
import landingData from '../data/landingData.json';
import { Link } from 'react-router-dom';

const TrendingSection = () => {
  const posts = landingData.latestPosts.slice(0, 6);

  return (
    <section className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-12">
          <div className="p-2 bg-teal-50 rounded-lg text-teal-600">
            <TrendingUp size={20} />
          </div>
          <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Trending on MindLoom</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-16">
          {posts.map((post, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex gap-6 group cursor-pointer"
            >
              <div className="text-3xl font-black text-slate-100 group-hover:text-teal-100 transition-colors">
                0{idx + 1}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                   <div className="w-5 h-5 rounded-full bg-slate-200 overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?u=${idx + 20}`} alt="" className="w-full h-full object-cover" />
                   </div>
                   <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">{post.author}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-teal-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <div className="mt-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {post.date} · {post.readTime}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const BenefitsSection = () => {
    const benefits = [
        { icon: <Sparkles />, title: "AI-Inspired Craft", desc: "A clean, modern space that focuses purely on your words." },
        { icon: <Users />, title: "Connected Minds", desc: "Reach a community that values deep thoughts over short clicks." },
        { icon: <PenTool />, title: "Data is Yours", desc: "Your stories, your audience, your platform. Always." }
    ];

    return (
        <section className="py-24 bg-slate-50">
            <div className="max-w-5xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {benefits.map((b, i) => (
                        <div key={i} className="text-left group">
                            <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-teal-500 mb-6 shadow-sm group-hover:scale-110 transition-transform">
                                {React.cloneElement(b.icon, { size: 24 })}
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{b.title}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">{b.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export { TrendingSection, BenefitsSection };
