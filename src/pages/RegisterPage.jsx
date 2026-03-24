import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser, loginWithGoogle } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";  
import { Loader2, User, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";

// UI Components
import { useToast } from "@/components/ui/toast";
import { Checkbox } from "@/components/animate-ui/components/radix/checkbox";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeInput, setActiveInput] = useState(null);

  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();

  const transition = { duration: 1, ease: [0.16, 1, 0.3, 1] };
  
  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await registerUser(
        formData.fullName,
        formData.username,
        formData.email,
        formData.password
      );
      if (response && response.success) {
        toast({
          title: "Welcome to Scribloom",
          description: "Your garden has been prepared. Please log in.",
        });
        navigate("/login");
      }
    } catch (err) {
      const errorMessage = err.message || "Failed to register. Please try again.";
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    try {
      const response = await loginWithGoogle(credentialResponse.credential);
      if (response && response.success) {
        toast({
          title: "Welcome to Scribloom",
          description: `Garden reached successfully.`,
        });
        login(response.data.user);
        navigate("/home");
      }
    } catch (err) {
      const errorMessage = err.message || "Google registration failed.";
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Google Registration Failed",
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col items-center bg-[var(--background)] font-sans selection:bg-[#a0d1bc] selection:text-[#00261b] relative overflow-hidden">
      <Helmet>
        <title>Sign Up | Scribloom</title>
      </Helmet>

      <motion.main 
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="flex-grow flex flex-col items-center justify-center w-full px-4 py-6 relative z-10"
      >
        <motion.div 
          variants={itemVariants}
          className="w-full max-w-[360px] bg-white rounded-[2rem] ambient-shadow p-6 md:p-8 flex flex-col items-center text-center relative overflow-hidden"
        >
          <div className="mb-3 w-full">
            <motion.span variants={itemVariants} className="text-[7px] font-black tracking-[0.2em] text-[#00261b] uppercase mb-1 block font-manrope">
              CREATE YOUR ACCOUNT
            </motion.span>
            <motion.h1 variants={itemVariants} className="text-[28px] font-black tracking-tighter text-[#111] leading-tight mb-0.5 font-newsreader">
              Start your garden.
            </motion.h1>
            <motion.p variants={itemVariants} className="text-[11px] font-medium text-[#111]/50 leading-relaxed max-w-[240px] mx-auto font-manrope">
              Ready to document your journey?
            </motion.p>
          </div>

          <form onSubmit={handleSubmit} className="w-full space-y-3 text-left font-manrope">
            <div className="grid grid-cols-2 gap-2.5">
              <motion.div variants={itemVariants} className="space-y-1">
                <label className="text-[8px] font-black tracking-widest text-[#111]/40 uppercase ml-1">Full Name</label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 bg-[#f5f3ef] border-transparent rounded-full text-[11px] font-bold text-[#00261b] placeholder:text-[#00261b]/20 focus:outline-none focus:ring-4 focus:ring-[#00261b]/5 transition-all"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-1">
                <label className="text-[8px] font-black tracking-widest text-[#111]/40 uppercase ml-1">Username</label>
                <input
                  id="username"
                  type="text"
                  placeholder="jdoe"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 bg-[#f5f3ef] border-transparent rounded-full text-[11px] font-bold text-[#00261b] placeholder:text-[#00261b]/20 focus:outline-none focus:ring-4 focus:ring-[#00261b]/5 transition-all"
                />
              </motion.div>
            </div>

            <motion.div variants={itemVariants} className="space-y-1">
              <label className="text-[8px] font-black tracking-widest text-[#111]/40 uppercase ml-1">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="hello@scribloom.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-5 py-3 bg-[#f5f3ef] border-transparent rounded-full text-[12px] font-bold text-[#00261b] placeholder:text-[#00261b]/20 focus:outline-none focus:ring-4 focus:ring-[#00261b]/5 transition-all"
              />
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-1">
              <label className="text-[8px] font-black tracking-widest text-[#111]/40 uppercase ml-1">Password</label>
              <div className="relative group flex items-center">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 bg-[#f5f3ef] border-transparent rounded-full text-[11px] font-bold text-[#00261b] placeholder:text-[#00261b]/20 focus:outline-none focus:ring-4 focus:ring-[#00261b]/5 transition-all"
                />
                <button
                  type="button"
                  onClick={(e) => { e.preventDefault(); setShowPassword(!showPassword); }}
                  className="absolute right-4 text-[#111]/30 hover:text-[#111] transition-colors"
                >
                  {showPassword ? <Eye size={14} /> : <EyeOff size={14} />}
                </button>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center gap-2.5 pt-1">
              <Checkbox 
                id="terms" 
                required 
                className="w-4 h-4 rounded border-[#efeeea] bg-[#f5f3ef] data-[state=checked]:bg-[#111] data-[state=checked]:border-[#111] data-[state=checked]:text-white" 
              />
              <p className="text-[10px] font-medium text-[#111]/50 leading-none">
                <label htmlFor="terms" className="cursor-pointer">I agree to the <span className="text-[#111] font-bold underline">Terms</span> and <span className="text-[#111] font-bold underline">Privacy</span>.</label>
              </p>
            </motion.div>

            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-2 gradient-primary text-white font-black rounded-full flex items-center justify-center gap-2 ambient-shadow transition-all h-[44px]"
              disabled={loading}
            >
              {loading ? <Loader2 size={14} className="animate-spin" /> : (
                <>
                  <span className="text-[11px] uppercase tracking-widest font-manrope">Create Garden</span>
                  <ArrowRight size={14} />
                </>
              )}
            </motion.button>
          </form>

          <motion.div variants={itemVariants} className="w-full mt-3">
            <div className="relative flex items-center mb-3">
              <div className="flex-grow border-t border-[#efeeea]"></div>
              <span className="flex-shrink-0 mx-3 text-[7px] font-black text-[#111]/30 uppercase tracking-[0.2em]">SIGN IN WITH GOOGLE</span>
              <div className="flex-grow border-t border-[#efeeea]"></div>
            </div>
            <div className="flex justify-center scale-[0.65]">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => setError("Google registration failed.")}
                useOneTap
                theme="outline"
                size="large"
                shape="pill"
                width="100%"
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-3">
             <p className="text-[11px] font-medium text-[#111]/40">
                Found your garden? <Link to="/login" className="text-[#111] font-black hover:underline ml-1">Log In</Link>
             </p>
          </motion.div>
        </motion.div>

        {/* TRUST BADGE */}
        <motion.div variants={itemVariants} className="mt-3 flex items-center gap-3 scale-[0.65]">
            <div className="flex -space-x-3">
                {[1,2,3].map(i => (
                    <img key={i} src={`https://i.pravatar.cc/100?u=${i+10}`} className="w-7 h-7 rounded-full border-[2px] border-[var(--background)] grayscale" alt="curator" />
                ))}
            </div>
            <span className="text-[9px] font-black tracking-[0.2em] text-[#111]/30 uppercase">Trusted by 20,000+ Curators</span>
        </motion.div>
      </motion.main>

      {/* <footer className="w-full px-8 py-3 flex flex-col md:flex-row items-center justify-between border-t border-[#efeeea] mt-auto relative z-10">
          <span className="text-[11px] font-black tracking-tighter text-[#111] mb-2 md:mb-0">SCRIBLOOM</span>
          <div className="flex flex-wrap justify-center gap-5 mb-2 md:mb-0">
              {['PRIVACY', 'TERMS', 'ARCHIVE', 'ABOUT'].map(item => (
                  <span key={item} className="text-[9px] font-black tracking-widest text-[#111]/30 hover:text-[#111] cursor-pointer transition-colors">{item}</span>
              ))}
          </div>
          <span className="text-[8px] font-bold text-[#111]/30 uppercase">© 2024 Scribloom.</span>
      </footer> */}

      {/* Decorative Blur Background (to match the subtle aura in screenshot) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#a0d1bc]/5 rounded-full blur-[120px] pointer-events-none z-0"></div>
    </div>
  );
};

export default RegisterPage;
