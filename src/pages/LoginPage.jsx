import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginUser, loginWithGoogle } from "../services/authService";
import { GoogleLogin } from "@react-oauth/google";
import { Loader2, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";

// UI Components
import { useToast } from "@/components/ui/toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const transition = { duration: 1, ease: [0.16, 1, 0.3, 1] };

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await loginUser(email, password);
      if (response && response.success) {
        toast({
          title: "Welcome back",
          description: `Garden reached successfully.`,
        });
        login(response.data.user);
        navigate("/home");
      }
    } catch (err) {
      const errorMessage = err.message || "Failed to login. Please check your credentials.";
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Login Failed",
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
          title: "Welcome back",
          description: `Garden reached successfully.`,
        });
        login(response.data.user);
        navigate("/home");
      }
    } catch (err) {
      const errorMessage = err.message || "Google login failed.";
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Google Login Failed",
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col items-center bg-[var(--background)] font-manrope selection:bg-[#a0d1bc] selection:text-[#00261b] relative overflow-hidden">
      <Helmet>
        <title>Sign In | Scribloom</title>
      </Helmet>

      <motion.main
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="flex-grow flex flex-col items-center justify-center w-full px-4 py-6 relative z-10"
      >
        <div className="text-center mb-5">
          <motion.h1
            variants={itemVariants}
            className="text-[32px] md:text-[40px] font-black tracking-tighter text-[#111] leading-none mb-1.5 font-newsreader"
          >
            Welcome back.
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-[12px] font-medium text-[#111]/50 leading-relaxed font-manrope"
          >
            Ready to access the archives?
          </motion.p>
        </div>

        <motion.div
          variants={itemVariants}
          className="w-full max-w-[360px] bg-white rounded-[2rem] ambient-shadow p-6 md:p-8 flex flex-col items-center text-center relative overflow-hidden"
        >
          <form onSubmit={handleSubmit} className="w-full space-y-4 text-left font-manrope">
            <motion.div variants={itemVariants} className="space-y-1">
              <label className="text-[8px] font-black tracking-widest text-[#111]/40 uppercase ml-1">Email Address</label>
              <div className="relative group">
                <input
                  type="email"
                  placeholder="curator@scribloom.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-5 py-3 bg-[#f5f3ef] border-transparent rounded-full text-[11px] font-bold text-[#00261b] placeholder:text-[#00261b]/20 focus:outline-none focus:ring-4 focus:ring-[#00261b]/5 transition-all"
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-[8px] font-black tracking-widest text-[#111]/40 uppercase ml-1">Password</label>
                <Link to="/forgot-password"
                      className="text-[8px] font-black tracking-widest text-[#111]/60 uppercase hover:text-[#111] cursor-pointer transition-colors">
                  Forgot?
                </Link>
              </div>
              <div className="relative group flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-5 py-3 bg-[#f5f3ef] border-transparent rounded-full text-[11px] font-bold text-[#00261b] placeholder:text-[#00261b]/20 focus:outline-none focus:ring-4 focus:ring-[#00261b]/5 transition-all"
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

            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-2 gradient-primary text-white font-black rounded-full flex items-center justify-center gap-2 ambient-shadow transition-all h-[46px]"
              disabled={loading}
            >
              {loading ? <Loader2 size={14} className="animate-spin" /> : (
                <>
                  <span className="text-[11px] font-manrope uppercase tracking-widest">Access Archives</span>
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </>
              )}
            </motion.button>

            <motion.div variants={itemVariants} className="w-full mt-4">
              <div className="relative flex items-center mb-3">
                <div className="flex-grow border-t border-[#efeeea]"></div>
                <span className="flex-shrink-0 mx-4 text-[8px] font-black text-[#111]/30 uppercase tracking-[0.2em]">secure archives access</span>
                <div className="flex-grow border-t border-[#efeeea]"></div>
              </div>
              <div className="flex justify-center scale-[0.65]">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => setError("Google login failed.")}
                  useOneTap
                  theme="outline"
                  size="large"
                  shape="pill"
                  width="100%"
                />
              </div>
            </motion.div>
          </form>

          <motion.div variants={itemVariants} className="mt-4 text-center font-manrope">
            <p className="text-[11px] font-medium text-[#111]/40">
              New here? <Link to="/register" className="text-[#111] font-black hover:underline cursor-pointer ml-1">Switch to Register</Link>
            </p>
          </motion.div>
        </motion.div>


      </motion.main>



      {/* Decorative Blur Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#a0d1bc]/5 rounded-full blur-[100px] pointer-events-none z-0"></div>
    </div>
  );
};

export default LoginPage;
