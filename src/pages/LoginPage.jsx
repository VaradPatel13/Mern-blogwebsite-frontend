import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginUser, loginWithGoogle } from "../services/authService";
import { GoogleLogin } from "@react-oauth/google";
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowLeft, ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await loginUser(email, password);
      if (response && response.success) {
        toast({
          title: "Welcome back",
          description: `Logged in successfully.`,
        });
        login(response.data.user);
        navigate("/home");
      }
    } catch (err) {
      setError(err.message || "Failed to login. Please check your credentials.");
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
          description: `Logged in successfully.`,
        });
        login(response.data.user);
        navigate("/home");
      }
    } catch (err) {
      setError(err.message || "Google login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-slate-50 font-sans selection:bg-teal-100 selection:text-teal-900 relative overflow-hidden">
      <Helmet>
        <title>Sign In | MindLoom</title>
      </Helmet>

      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-white -skew-x-12 translate-x-32 z-0"></div>
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-teal-400/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

      {/* Back Link */}
      <Link to="/" className="absolute top-8 left-8 z-50 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-500 hover:text-slate-900 hover:shadow-md transition-all">
        <ArrowLeft size={16} /> Home
      </Link>

      <div className="container mx-auto px-6 flex items-center justify-center relative z-10">
        <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Branding & Message */}
          <div className="hidden lg:block text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-7xl font-bold tracking-tighter text-slate-900 leading-[0.9] mb-8">
                Ideas. <br />
                <span className="text-teal-500">Sign In.</span>
              </h1>
              <p className="text-xl text-slate-500 max-w-sm font-medium leading-relaxed">
                Enter your portal to continue weaving stories that matter.
              </p>
            </motion.div>
          </div>

          {/* Right: Login Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-[440px] bg-white rounded-[2.5rem] p-10 md:p-14 shadow-2xl shadow-slate-200/50 border border-slate-100 mx-auto"
          >
            <div className="mb-10 text-center lg:text-left">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h2>
              <p className="text-slate-500 font-medium">Please enter your details.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-4 focus:ring-teal-500/5 focus:border-teal-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <Lock size={18} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-12 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-4 focus:ring-teal-500/5 focus:border-teal-500 focus:bg-white transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-[11px] font-bold text-red-600">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl transition-all hover:bg-slate-800 hover:shadow-xl hover:-translate-y-0.5"
                disabled={loading}
              >
                {loading ? <Loader2 size={18} className="animate-spin mx-auto" /> : "Sign In"}
              </button>
            </form>

            <div className="mt-8 relative flex items-center">
              <div className="flex-grow border-t border-slate-100"></div>
              <span className="flex-shrink-0 mx-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">or</span>
              <div className="flex-grow border-t border-slate-100"></div>
            </div>

            <div className="mt-8">
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

            <p className="mt-10 text-center text-[13px] font-medium text-slate-500">
              New here?{" "}
              <Link to="/register" className="text-teal-600 font-bold hover:text-teal-700 transition-colors">
                Join MindLoom
              </Link>
            </p>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;
