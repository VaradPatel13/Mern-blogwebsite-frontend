import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../api/api";
import { Loader2, ArrowLeft, KeyRound } from "lucide-react";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please try again.");
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
    <div className="min-h-screen w-full flex bg-slate-50 font-sans selection:bg-teal-100 selection:text-teal-900 justify-center items-center p-4">
      <div className="w-full max-w-[420px] bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8 sm:p-10">

          {/* Header */}
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 bg-slate-50 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 shadow-sm">
              <KeyRound size={24} />
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-serif font-bold text-slate-900 mb-2 tracking-tight">Set new password</h1>
            <p className="text-slate-500 font-medium text-sm">
              Your new password must be different to previously used passwords.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm font-medium text-center">
              {error}
            </div>
          )}

          {success ? (
            <div className="text-center space-y-4">
              <div className="p-4 bg-teal-50 text-teal-700 border border-teal-200 rounded-lg text-sm font-medium">
                Password reset successfully! Redirecting you to login...
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600/20 focus:border-teal-600 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5 mt-4">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600/20 focus:border-teal-600 transition-all"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg transition-colors shadow-sm mt-6 flex justify-center items-center gap-2 text-sm"
              >
                {loading ? <><Loader2 size={16} className="animate-spin" /> Resetting</> : "Reset Password"}
              </button>
            </form>
          )}

          <div className="mt-8 text-center">
            <Link to="/login" className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">
              <ArrowLeft size={14} /> Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
