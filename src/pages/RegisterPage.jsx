import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser, loginWithGoogle } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowLeft, User, AtSign } from "lucide-react";
import { Helmet } from "react-helmet-async";

// UI Components
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";

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

  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();

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
          title: "Welcome to MindLoom",
          description: "Your account has been created successfully. Please log in.",
        });
        navigate("/login");
      }
    } catch (err) {
      setError(err.message || "Failed to register. Please try again.");
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
          title: "Welcome to MindLoom",
          description: `Logged in successfully.`,
        });
        login(response.data.user);
        navigate("/home");
      }
    } catch (err) {
      setError(err.message || "Google registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-white font-sans selection:bg-teal-100 selection:text-teal-900 overflow-x-hidden">
      <Helmet>
        <title>Sign Up | MindLoom</title>
        <meta name="description" content="Join MindLoom today to start your journey as an independent writer. Create your account and join a global network of thinkers." />
      </Helmet>

      {/* Back Link */}
      <Link to="/" className="absolute top-6 left-6 z-50 text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors flex items-center gap-1.5 py-2 px-4 rounded-full border border-slate-100 bg-white/50 backdrop-blur-sm lg:bg-transparent lg:border-none lg:text-slate-200 lg:hover:text-white">
        <ArrowLeft size={14} strokeWidth={2.5} /> Back to Homepage
      </Link>

      {/* Left Side - Editorial Branding */}
      <div className="hidden lg:flex lg:w-[40%] xl:w-[45%] relative bg-slate-900 items-center justify-center p-12 overflow-hidden text-center">
        <img
          src="https://images.unsplash.com/photo-1455390582262-044cdead27d4?auto=format&fit=crop&q=80&w=1400"
          alt="Vintage typewriter"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
        
        <div className="relative z-10 max-w-sm">
          <h1 className="text-6xl font-serif font-bold text-white mb-6 tracking-tight">
            MindLoom.
          </h1>
          <div className="w-12 h-1 bg-teal-500 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl font-serif text-slate-300 leading-relaxed italic">
            "Join a global circle of writers committed to clarity and insight."
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
             <div className="flex -space-x-2">
                {[12, 45, 67].map(i => (
                  <img key={i} src={`https://i.pravatar.cc/100?u=${i}`} className="w-8 h-8 rounded-full border-2 border-slate-900" alt="Member" />
                ))}
             </div>
             <p className="text-slate-400 text-xs font-bold tracking-widest uppercase">12k+ Writers Linked</p>
          </div>
        </div>
      </div>

      {/* Right Side - Register Form */}
      <div className="w-full lg:w-[60%] xl:w-[55%] flex items-center justify-center p-8 sm:p-12">
        <div className="w-full max-w-[450px] animate-in fade-in slide-in-from-bottom-4 duration-700">

          <div className="mb-10 text-left">
            <h2 className="text-3xl font-serif font-bold text-slate-900 mb-2">Create Account</h2>
            <p className="text-slate-500 font-medium tracking-tight">Begin your publishing journey today.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="fullName" className="block text-sm font-semibold text-slate-700">
                  Full Name
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <User size={18} strokeWidth={2} />
                  </div>
                  <input
                    id="fullName"
                    type="text"
                    placeholder="Jane Doe"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 focus:bg-white transition-all shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="username" className="block text-sm font-semibold text-slate-700">
                  Username
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <AtSign size={18} strokeWidth={2} />
                  </div>
                  <input
                    id="username"
                    type="text"
                    placeholder="janedoe"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 focus:bg-white transition-all shadow-sm"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Mail size={18} strokeWidth={2} />
                </div>
                <input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 focus:bg-white transition-all shadow-sm"
                />
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <label htmlFor="password" className="block text-sm font-semibold text-slate-700">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Lock size={18} strokeWidth={2} />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a secure password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 focus:bg-white transition-all shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff size={18} strokeWidth={2} /> : <Eye size={18} strokeWidth={2} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-xs font-bold text-red-600 leading-tight">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full py-6 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all shadow-sm hover:shadow-md mt-2"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 size={18} className="animate-spin" />
                  <span>Creating account...</span>
                </div>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          <div className="mt-8 relative flex items-center py-2">
            <div className="flex-grow border-t border-slate-100"></div>
            <span className="flex-shrink-0 mx-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
              or
            </span>
            <div className="flex-grow border-t border-slate-100"></div>
          </div>

          <div className="mt-6">
            <div className="w-full flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => setError("Google registration failed.")}
                useOneTap
                theme="outline"
                size="large"
                shape="pill"
                width="450"
              />
            </div>
          </div>

          <p className="mt-10 text-center text-sm font-medium text-slate-500">
            Already a member?{" "}
            <Link to="/login" className="text-teal-600 font-bold hover:text-teal-700 transition-colors">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
