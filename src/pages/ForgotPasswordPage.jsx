import React, { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../services/authService";
import { ArrowLeft, Loader2, Mail } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await forgotPassword(email);
      if (response.success) {
        setSuccess(true);
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-slate-50 font-sans selection:bg-teal-100 selection:text-teal-900 justify-center items-center p-4">

      <div className="w-full max-w-[420px] bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden">

        <div className="p-8 sm:p-10">
          {/* Brand Logo Mini */}
          <div className="flex justify-center mb-8">
            <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center text-white font-serif font-bold text-xl shadow-sm">
              M
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-serif font-bold text-slate-900 mb-2 tracking-tight">Forgot password?</h1>
            <p className="text-slate-500 font-medium text-sm">
              No worries, we'll send you reset instructions.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm font-medium text-center">
              {error}
            </div>
          )}

          {success ? (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-teal-100">
                <Mail size={32} />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Check your email</h2>
              <p className="text-slate-500 font-medium text-sm">
                We sent a password reset link to <br /><span className="font-bold text-slate-900">{email}</span>
              </p>
              <Link to="/login" className="mt-8 w-full py-3 inline-flex justify-center bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg transition-colors shadow-sm text-sm">
                Return to login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label htmlFor="email" className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600/20 focus:border-teal-600 transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg transition-colors shadow-sm mt-6 flex items-center justify-center gap-2 text-sm"
                disabled={loading}
              >
                {loading ? (
                  <><Loader2 size={16} className="animate-spin" /> Sending...</>
                ) : (
                  "Reset password"
                )}
              </button>
            </form>
          )}

          {!success && (
            <div className="mt-8 text-center">
              <Link to="/login" className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">
                <ArrowLeft size={14} /> Back to login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
