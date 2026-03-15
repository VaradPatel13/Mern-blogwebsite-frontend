import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import landingData from '../data/landingData.json';

const FeaturesSection = () => {
  const { latestPosts } = landingData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Simple Header */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">Recent Ideas.</h2>
          <p className="mt-4 text-slate-500 font-medium">Curated thoughts from our community.</p>
        </motion.div>

        {/* AI-Style Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {latestPosts.slice(0, 6).map((post, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <Link to="/home" className="group flex flex-col h-full bg-slate-50/50 p-6 rounded-[2rem] border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-teal-900/5 transition-all duration-500">

                <div className="w-full aspect-[16/10] rounded-[1.5rem] overflow-hidden mb-6 relative shadow-sm">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                    src={post.image}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>

                <div className="flex-1">
                  <span className="text-[10px] font-bold text-teal-600 uppercase tracking-widest mb-2 block">{post.category}</span>
                  <h3 className="text-2xl font-bold text-slate-900 leading-tight mb-4 tracking-tight">
                    {post.title}
                  </h3>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-8 flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-widest pt-6 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-900">{post.author}</span>
                  </div>
                  <span>{post.readTime}</span>
                </div>

              </Link>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default FeaturesSection;
