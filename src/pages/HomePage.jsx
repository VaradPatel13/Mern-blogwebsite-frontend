import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import BlogPostCard from '../components/BlogPostCard';
import CategorySlider from '../components/CategorySlider';
import HomeSidebar from '../components/HomeSidebar';
import FeaturedPostCard from '../components/FeaturedPostCard';
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from 'react-router-dom';
import useBlogs from '../hooks/useBlogs';
import useCategories from '../hooks/useCategories';

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { categories } = useCategories();
  const {
    blogs, loading, error,
    page, totalPages, totalDocs, hasNextPage, hasPrevPage, goToPage
  } = useBlogs(selectedCategory);

  const featuredPost = blogs.length > 0 && page === 1 && !selectedCategory ? blogs[0] : null;
  const remainingPosts = featuredPost ? blogs.slice(1) : blogs;

  return (
    <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-[var(--background)] min-h-screen selection:bg-[#a0d1bc]/30 selection:text-[#00261b]"
    >
      <Helmet>
        <title>Scribloom | Digital Archives for Writers and Readers</title>
        <meta name="description" content="A digital greenhouse for writers and readers. Discover essays, stories, and long-form journalism from independent voices." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://scribloom.vercel.app/home" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Scribloom | Digital Archives for Writers and Readers" />
        <meta property="og:description" content="A digital greenhouse for writers and readers. Discover essays, stories, and long-form journalism from independent voices." />
        <meta property="og:url" content="https://scribloom.vercel.app/home" />
        <meta property="og:site_name" content="Scribloom" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Scribloom" />
        <meta name="twitter:description" content="A digital greenhouse for writers and readers." />
      </Helmet>

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Scribloom",
          "url": "https://scribloom.vercel.app",
          "description": "A digital greenhouse for writers and readers to cultivate compelling stories.",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://scribloom.vercel.app/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        })}
      </script>

      <div className="sticky top-16 md:top-[72px] z-[45] bg-[var(--background)]">
          <CategorySlider
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 pt-10 pb-20 font-manrope">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-20 relative">

          <div className="lg:col-span-3 order-2 lg:order-1">
             <div className="sticky top-40">
                <HomeSidebar />
             </div>
          </div>

          <main className="lg:col-span-9 order-1 lg:order-2">
            {loading ? (
               <div className="space-y-12 animate-pulse">
                   <div className="w-full aspect-[21/10] bg-[#efeeea] rounded-[40px]" />
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                       {[1, 2, 3, 4].map(i => <div key={i} className="aspect-square bg-[#efeeea] rounded-[24px]" />)}
                   </div>
               </div>
            ) : error ? (
              <div className="p-10 bg-red-50 text-red-600 rounded-[32px] border border-red-100 text-center">
                 <p className="text-sm font-black uppercase tracking-widest">{error}</p>
              </div>
            ) : (
              <div className="flex flex-col gap-16">
                {featuredPost && !selectedCategory && <FeaturedPostCard post={featuredPost} />}
                
                <div className="flex flex-col gap-10">
                   <div className="flex items-center justify-between px-2">
                      <div className="flex items-center gap-4">
                          <h3 className="text-[32px] font-black text-[#111] font-newsreader">
                              {selectedCategory ? `${selectedCategory} Archives` : 'Recent Thoughts'}
                          </h3>
                          {totalDocs > 0 && (
                            <span className="text-[11px] font-bold text-[#111]/30 uppercase tracking-widest">
                              {totalDocs} {totalDocs === 1 ? 'story' : 'stories'}
                            </span>
                          )}
                      </div>
                      <Link to="#" className="flex items-center gap-1 text-[11px] font-black uppercase tracking-widest text-[#111]/30 hover:text-[#a0d1bc] transition-all">
                          View All <ArrowUpRight size={14} />
                      </Link>
                   </div>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10 md:gap-y-16">
                      {remainingPosts.map((post) => (
                        <BlogPostCard key={post._id} post={post} />
                      ))}
                   </div>

                   {blogs.length === 0 && (
                      <div className="text-center py-40 bg-white/50 rounded-[40px] border border-[#efeeea] border-dashed">
                        <h3 className="text-2xl font-black text-[#111] font-newsreader mb-4">The archives are silent.</h3>
                        <p className="text-[#111]/40 text-sm font-medium">Be the first to curate a thought here.</p>
                      </div>
                   )}

                   {totalPages > 1 && (
                     <div className="flex items-center justify-center gap-2 pt-8">
                       <button
                         onClick={() => goToPage(page - 1)}
                         disabled={!hasPrevPage || loading}
                         className="flex items-center gap-1 px-4 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest border border-[#c0c8c3]/30 text-[#414944] hover:bg-[#efeeea] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                       >
                         <ChevronLeft size={14} /> Prev
                       </button>

                       {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                         <button
                           key={pageNum}
                           onClick={() => goToPage(pageNum)}
                           className={`w-10 h-10 rounded-full text-[12px] font-bold transition-all ${
                             pageNum === page
                               ? 'bg-[#00261b] text-white shadow-lg'
                               : 'text-[#414944] hover:bg-[#efeeea]'
                           }`}
                         >
                           {pageNum}
                         </button>
                       ))}

                       <button
                         onClick={() => goToPage(page + 1)}
                         disabled={!hasNextPage || loading}
                         className="flex items-center gap-1 px-4 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest border border-[#c0c8c3]/30 text-[#414944] hover:bg-[#efeeea] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                       >
                         Next <ChevronRight size={14} />
                       </button>
                     </div>
                   )}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </motion.div>
  );
};

export default HomePage;
