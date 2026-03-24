import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[var(--background)] text-[#1a382c] pt-20 pb-12 px-6 md:px-12 font-manrope w-full mt-auto">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row justify-between gap-16 lg:gap-8 mb-24">
          
          {/* Brand Info */}
          <div className="flex flex-col items-start gap-5 lg:w-[45%]">
            <h2 className="text-[36px] font-bold font-newsreader text-[#1a382c] leading-tight tracking-tight">
              Scribloom
            </h2>
            <p className="text-[17px] font-normal leading-relaxed text-[#416a59] font-newsreader max-w-[340px]">
              Scribloom. Cultivating stories in the digital greenhouse.
            </p>
            <div className="mt-4">
              <button className="flex items-center gap-2.5 px-6 py-3 rounded-full text-[11px] font-bold uppercase tracking-[0.15em] bg-[#eae8e4] text-[#1a382c] hover:bg-[#d5d2cc] transition-colors group">
                <Leaf size={14} className="fill-[#1a382c]" strokeWidth={2} />
                Join the Garden
              </button>
            </div>
          </div>

          {/* Links Area */}
          <div className="flex flex-col sm:flex-row gap-16 sm:gap-32 lg:w-[45%] lg:justify-end">
            {/* Manifesto */}
            <div className="flex flex-col gap-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-[#9a9996]">
                Manifesto
              </h4>
              <div className="flex flex-col gap-5 text-[16px] text-[#416a59] font-normal font-newsreader">
                <Link to="#" className="hover:text-[#1a382c] transition-colors">About</Link>
                <Link to="#" className="hover:text-[#1a382c] transition-colors">Archive</Link>
                <Link to="#" className="hover:text-[#1a382c] transition-colors">Editorial Guidelines</Link>
                <Link to="#" className="hover:text-[#1a382c] transition-colors">Privacy</Link>
                <Link to="#" className="hover:text-[#1a382c] transition-colors">Terms</Link>
              </div>
            </div>

            {/* Connectivity */}
            <div className="flex flex-col gap-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-[#9a9996]">
                Connectivity
              </h4>
              <div className="flex flex-col gap-5 text-[16px] text-[#416a59] font-normal font-newsreader">
                <Link to="#" className="hover:text-[#1a382c] transition-colors">Newsletter</Link>
                <Link to="#" className="hover:text-[#1a382c] transition-colors">RSS</Link>
                <Link to="#" className="hover:text-[#1a382c] transition-colors">Twitter</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="pt-8 border-t border-[#efeeea] flex flex-col md:flex-row justify-between items-center gap-6 text-[12px] font-medium text-[#9a9996]">
          <p>© {new Date().getFullYear()} Scribloom. Cultivating stories in the digital greenhouse.</p>
          <div className="flex items-center gap-4 uppercase tracking-[0.25em] text-[9px] font-bold text-[#b5b4b1]">
             <span className="w-8 h-[1px] bg-[#efeeea]"></span>
             EST. MMXIV
             <span className="w-8 h-[1px] bg-[#efeeea]"></span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;



