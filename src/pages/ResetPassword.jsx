import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../api/api";
import { Loader2, ArrowLeft, KeyRound, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please try again.");
      return;
    }

    if (password.length < 8) {
        setError("Password must be at least 8 characters long.");
        return;
    }

    try {
      setLoading(true);
      await api.patch(
        `auth/reset-password/${token}`,
        { password }
      );
      setSuccess(true);
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong resetting your password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-[var(--background)] font-manrope selection:bg-[#a0d1bc] selection:text-[#00261b] p-4 relative overflow-hidden">
      <Helmet>
        <title>Reset Password | Scribloom</title>
      </Helmet>

      {/* Decorative Blur Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#a0d1bc]/5 rounded-full blur-[100px] pointer-events-none z-0"></div>

      <motion.main
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="w-full max-w-[420px] relative z-10"
      >
        <div className="text-center mb-8">
          <motion.div variants={itemVariants} className="flex justify-center mb-6">
            <div className="w-12 h-12 bg-white rounded-2xl border border-[#efeeea] flex items-center justify-center text-[#111] shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <KeyRound size={24} strokeWidth={1.5} />
            </div>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-[32px] md:text-[40px] font-black tracking-tighter text-[#111] leading-none mb-3 font-newsreader"
          >
            New Beginnings.
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-[12px] font-medium text-[#111]/50 leading-relaxed max-w-[280px] mx-auto"
          >
            Time to secure your access to the archives. Choose a strong new password.
          </motion.p>
        </div>

        <motion.div
          variants={itemVariants}
          className="bg-white rounded-[24px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.04)] border border-[#efeeea] p-8 md:p-10 relative overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-4"
              >
                <div className="w-16 h-16 bg-[#a0d1bc]/20 text-[#00261b] rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShieldCheck size={32} />
                </div>
                <h2 className="text-xl font-black text-[#111] mb-2">Password Updated</h2>
                <p className="text-[13px] font-medium text-[#111]/50 mb-6">
                  Your password has been reset successfully. We're redirecting you to sign in...
                </p>
                <div className="w-full bg-[#f5f3ef] h-1.5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3, ease: "linear" }}
                    className="h-full bg-[#00261b]"
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div key="form">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-red-50 text-red-700 border border-red-100 rounded-[12px] text-[12px] font-bold text-center"
                  >
                    {error}
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black tracking-[0.15em] text-[#111]/40 uppercase ml-1">
                      New Password
                    </label>
                    <div className="relative group">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 bg-[#f5f3ef] border-transparent rounded-[12px] text-[13px] font-bold text-[#111] placeholder:text-[#111]/20 focus:outline-none focus:ring-4 focus:ring-[#00261b]/5 transition-all"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#111]/30 hover:text-[#111] transition-colors"
                      >
                        {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] font-black tracking-[0.15em] text-[#111]/40 uppercase ml-1">
                      Confirm New Password
                    </label>
                    <div className="relative group">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-3 bg-[#f5f3ef] border-transparent rounded-[12px] text-[13px] font-bold text-[#111] placeholder:text-[#111]/20 focus:outline-none focus:ring-4 focus:ring-[#00261b]/5 transition-all"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 bg-[#111] text-white font-black rounded-full flex items-center justify-center gap-2 shadow-xl hover:shadow-[0_20px_40px_-5px_rgba(0,0,0,0.15)] transition-all h-[52px] mt-2 group"
                  >
                    {loading ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <>
                        <span className="text-[12px] uppercase tracking-widest">Update Password</span>
                        <ArrowLeft size={18} className="rotate-180 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-8 text-center">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-[12px] font-black text-[#111]/40 hover:text-[#111] transition-colors group"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            <span>Return to Sign In</span>
          </Link>
        </motion.div>
      </motion.main>
    </div>
  );
};

export default ResetPassword;

