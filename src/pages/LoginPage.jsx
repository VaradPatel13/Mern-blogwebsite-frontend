import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginUser, loginWithGoogle } from "../services/authService";
import { GoogleLogin } from "@react-oauth/google";
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowLeft } from "lucide-react";

// UI Components
import { Button } from "@/components/ui/button";
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
    <div className="min-h-screen w-full flex bg-white font-sans selection:bg-teal-100 selection:text-teal-900">

      {/* Absolute positioned Back Link for mobile */}
      <Link to="/" className="lg:hidden absolute top-4 left-4 z-50 text-xs font-semibold text-slate-900 hover:text-teal-700 transition-colors flex items-center gap-1.5 bg-white/80 backdrop-blur-md py-1.5 px-3 rounded-full shadow-sm">
        <ArrowLeft size={14} /> Back
      </Link>

      {/* Left Side - Immersive Image & Branding (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-1/2 relative overflow-hidden bg-slate-900">
        <img
          src="https://images.unsplash.com/photo-1455390582262-044cdead27d4?auto=format&fit=crop&q=80&w=1400"
          alt="Writing desk"
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
        />
        {/* Deep gradient overlay to ensure text is readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-transparent"></div>

        <div className="relative z-10 w-full h-full flex flex-col justify-between p-12">
          <div>
            <Link to="/" className="inline-flex items-center gap-1.5 text-slate-200 hover:text-teal-300 transition-colors text-sm group">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span className="font-semibold tracking-wide">Return to Homepage</span>
            </Link>
          </div>

          <div className="max-w-md">
            <h1 className="text-4xl font-serif font-bold text-white mb-4 leading-tight">
              MindLoom.
            </h1>
            <p className="text-xl font-serif text-slate-300 mb-8 italic">
              "The most powerful tool a writer has is a platform they can trust."
            </p>
            {/* <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-slate-700 shadow-md">
                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150" alt="Editor portrait" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="font-bold text-white text-base tracking-tight">Sarah Jenkins</div>
                <div className="text-teal-400 font-semibold text-xs uppercase tracking-widest">Editor in Chief</div>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* Right Side - Detailed Login Form */}
      <div className="w-full lg:w-[55%] xl:w-1/2 flex items-center justify-center p-6 sm:p-10 bg-white relative">
        <div className="w-full max-w-[380px]">

          <div className="mb-8 hidden lg:block">
            {/* Minimal Brand logo for mobile context or extra polish */}
            <div className="w-8 h-8 bg-slate-900 rounded-md flex items-center justify-center text-white font-serif font-bold text-lg mb-6 shadow-sm">
              M
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-1.5 tracking-tight">Sign in</h2>
            <p className="text-slate-500 font-medium text-sm">
              Welcome back to your dashboard.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Email Input */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-teal-600 transition-colors">
                  <Mail size={16} strokeWidth={2.5} />
                </div>
                <input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50/50 border border-slate-200 rounded-lg font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600/20 focus:border-teal-600 transition-all"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5 ">
              <div className="flex justify-between items-center mt-4">
                <label htmlFor="password" className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                  Password
                </label>
                <Link to="/forgot-password" className="text-xs font-bold text-teal-700 hover:text-teal-800 transition-colors">
                  Forgot?
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-teal-600 transition-colors">
                  <Lock size={16} strokeWidth={2.5} />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-10 py-2.5 text-sm bg-slate-50/50 border border-slate-200 rounded-lg font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600/20 focus:border-teal-600 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} strokeWidth={2.5} /> : <Eye size={16} strokeWidth={2.5} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded-r-md mt-4">
                <p className="text-xs font-bold text-red-700">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full py-5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg transition-all shadow-md hover:shadow-lg hover:-translate-y-px mt-6 flex items-center justify-center gap-2 text-sm"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          {/* Social Login Divider */}
          <div className="mt-8 relative flex items-center py-4">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink-0 mx-3 text-slate-400 text-xs font-bold uppercase tracking-widest">
              Or
            </span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          {/* Google Login */}
          <div className="mt-4 flex justify-center w-full">
            <div className="w-full [&>div]:w-full [&>div>div]:w-full flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => setError("Google login failed.")}
                useOneTap
                theme="outline"
                size="large"
                text="signin_with"
                shape="rectangular"
                width="100%"
              />
            </div>
          </div>

          {/* Registration Link */}
          <p className="mt-10 text-center text-sm text-slate-600 font-medium pb-4">
            New to MindLoom?{" "}
            <Link to="/register" className="font-bold text-teal-700 hover:text-teal-800 transition-colors underline decoration-2 underline-offset-4 pointer-events-auto">
              Create an account
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;
