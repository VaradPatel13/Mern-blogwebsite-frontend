import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeaturesSection = () => {
  // Creating a list of dummy articles to represent a blog feed
  const latestPosts = [
    {
      title: "Why Silicon Valley is obsessed with stoicism",
      excerpt: "The ancient Greek philosophy has found an unlikely resurgence among tech founders and venture capitalists looking for emotional resilience.",
      category: "Philosophy",
      author: "Marcus Aurelius",
      date: "Oct 20",
      readTime: "7 min",
      image: "https://images.unsplash.com/photo-1563291074-2bf8677ac0e5?auto=format&fit=crop&q=80&w=600"
    },
    {
      title: "The problem with endless scrolling",
      excerpt: "How infinite interfaces are rewiring our attention spans and what designers are doing to build humane software.",
      category: "UX Design",
      author: "Elena Rossi",
      date: "Oct 19",
      readTime: "5 min",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=600"
    },
    {
      title: "Cooking perfectly, slowly",
      excerpt: "In defiance of instant pots and microwaves, the slow food movement is capturing the hearts of home chefs.",
      category: "Food",
      author: "Julia Child",
      date: "Oct 18",
      readTime: "12 min",
      image: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?auto=format&fit=crop&q=80&w=600"
    },
    {
      title: "A beginner's guide to quantum computing",
      excerpt: "It sounds like science fiction, but qubits are already solving problems classical computers could never touch.",
      category: "Technology",
      author: "Dr. Feynman",
      date: "Oct 15",
      readTime: "9 min",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=600"
    },
    {
      title: "The economics of remote work",
      excerpt: "Three years later, the data is clear: remote work changes urban real estate, salaries, and corporate culture permanently.",
      category: "Business",
      author: "Adam Smith",
      date: "Oct 12",
      readTime: "6 min",
      image: "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?auto=format&fit=crop&q=80&w=600"
    },
    {
      title: "Minimalism in the 21st century",
      excerpt: "Is the minimalist aesthetic a genuine philosophical choice or just another luxury commodity?",
      category: "Culture",
      author: "Marie Kondo",
      date: "Oct 10",
      readTime: "11 min",
      image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=600"
    }
  ];

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">

        {/* Section Header */}
        <div className="flex items-end justify-between mb-10 pb-4 border-b border-slate-300">
          <h2 className="text-2xl font-bold font-serif text-slate-900">Latest from the network</h2>
          <Link to="/home" className="text-sm font-semibold text-teal-700 hover:text-teal-900 flex items-center group transition-colors">
            View all stories
            <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Blog Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {latestPosts.map((post, idx) => (
            <Link to="/home" key={idx} className="group cursor-pointer flex flex-col h-full bg-white p-5 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">

              {/* Image Placeholder */}
              <div className="w-full h-48 bg-slate-100 rounded-lg overflow-hidden mb-5 relative shrink-0">
                <img
                  src={post.image}
                  alt={post.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Meta */}
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-teal-700 mb-2">
                <span>{post.category}</span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-serif font-bold text-slate-900 leading-tight mb-3 group-hover:text-teal-800 transition-colors shrink-0">
                {post.title}
              </h3>

              {/* Excerpt */}
              <p className="text-slate-600 text-sm font-sans leading-relaxed mb-6 flex-grow line-clamp-3">
                {post.excerpt}
              </p>

              {/* Author & Date */}
              <div className="flex items-center justify-between mt-auto pt-4 text-xs shrink-0 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?u=${idx}`} alt={post.author} className="w-full h-full object-cover" />
                  </div>
                  <span className="font-semibold text-slate-800">{post.author}</span>
                </div>
                <div className="text-slate-500">
                  {post.date} · {post.readTime}
                </div>
              </div>

            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturesSection;
