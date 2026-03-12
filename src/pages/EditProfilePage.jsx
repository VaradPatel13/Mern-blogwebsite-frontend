import { React, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { updateUserDetails, updateUserAvatar, changePassword, sendMobileOtp, verifyMobileOtp, getCurrentUser } from '../services/uesrService';
import { useToast } from "@/components/ui/toast";
import { Camera, User, Lock, Smartphone, CheckCircle2, ChevronRight, Loader2 } from 'lucide-react';
import ImageUpload from '../components/ImageUpload';
import { Link } from 'react-router-dom';

const EditProfilePage = () => {
  const { user, login } = useAuth();
  const { toast } = useToast();

  // State for each form section
  const [detailsData, setDetailsData] = useState({
    fullName: user?.fullName || '',
    username: user?.username || '',
  });
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
  });
  const [avatarFile, setAvatarFile] = useState(null);

  // State for OTP flow
  const [mobileNumber, setMobileNumber] = useState(user?.mobileNumber || '');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [mobileLoading, setMobileLoading] = useState(false);

  // Loading and error states for each form
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDetailsChange = (e) => {
    setDetailsData({ ...detailsData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleDetailsSubmit = async (e) => {
    e.preventDefault();
    setDetailsLoading(true);
    setError('');
    try {
      const response = await updateUserDetails(detailsData);
      if (response.success) {
        login(response.data); // Update global user state
        toast({ title: "Profile updated" });
      }
    } catch (err) {
      setError(err.message || 'Failed to update details.');
      toast({ variant: "destructive", title: "Error", description: err.message || 'Failed to update details.' });
    } finally {
      setDetailsLoading(false);
    }
  };

  const handleAvatarSubmit = async (e) => {
    e.preventDefault();
    if (!avatarFile) return;
    setAvatarLoading(true);
    setError('');
    const formData = new FormData();
    formData.append('avatar', avatarFile);
    try {
      const response = await updateUserAvatar(formData);
      if (response.success) {
        login(response.data);
        toast({ title: "Avatar updated" });
        setAvatarFile(null); // Clear the file after upload
      }
    } catch (err) {
      setError(err.message || 'Failed to update avatar.');
      toast({ variant: "destructive", title: "Error", description: err.message || 'Failed to update avatar.' });
    } finally {
      setAvatarLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordLoading(true);
    setError('');
    try {
      const response = await changePassword(passwordData);
      if (response.success) {
        toast({ title: "Password changed successfully" });
        setPasswordData({ oldPassword: '', newPassword: '' }); // Clear fields
      }
    } catch (err) {
      setError(err.message || 'Failed to change password.');
      toast({ variant: "destructive", title: "Error", description: err.message || 'Failed to change password.' });
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleMobileSubmit = async (e) => {
    e.preventDefault();
    setMobileLoading(true);
    setError('');
    try {
      const response = await sendMobileOtp(mobileNumber);
      if (response.success) {
        setShowOtpInput(true);
        toast({ title: "OTP Sent", description: "Please check your email." });
      }
    } catch (err) {
      setError(err.message || 'Failed to send OTP.');
      toast({ variant: "destructive", title: "Error", description: err.message || 'Failed to send OTP.' });
    } finally {
      setMobileLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setMobileLoading(true);
    setError('');
    try {
      const response = await verifyMobileOtp(otp);
      if (response.success) {
        const userResponse = await getCurrentUser();
        login(userResponse.data);
        setShowOtpInput(false);
        toast({ title: "Mobile number verified" });
      }
    } catch (err) {
      setError(err.message || 'Failed to verify OTP.');
      toast({ variant: "destructive", title: "Error", description: err.message || 'Failed to verify OTP.' });
    } finally {
      setMobileLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto font-sans pb-12">

      {/* Breadcrumb / Header */}
      <div className="mb-10 pb-6 border-b border-slate-200">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-500 mb-4">
          <Link to="/my-profile" className="hover:text-slate-900 transition-colors">My Profile</Link>
          <ChevronRight size={14} />
          <span className="text-slate-900">Settings</span>
        </div>
        <h1 className="text-4xl font-serif font-bold text-slate-900 mb-2">Account Settings</h1>
        <p className="text-slate-500 font-medium">Update your personal details, avatar, and security preferences.</p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 border border-red-200 px-4 py-3 rounded-lg mb-8 font-medium shadow-sm">
          {error}
        </div>
      )}

      <div className="space-y-12">

        {/* Avatar Section */}
        <section>
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-4">
            <span><Camera className="inline-block mr-2" size={16} /> Profile Picture</span>
            <div className="h-px bg-slate-200 flex-grow"></div>
          </h2>

          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
            <form onSubmit={handleAvatarSubmit} className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
              <div className="relative shrink-0">
                <img
                  src={avatarFile ? URL.createObjectURL(avatarFile) : user?.avatar || "https://i.pravatar.cc/150"}
                  alt="Avatar preview"
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover bg-slate-100 border-2 border-slate-100"
                />
              </div>
              <div className="flex-1 w-full space-y-4">
                <p className="text-sm text-slate-500 font-medium font-sans">We recommend a square image, at least 400x400px.</p>
                <ImageUpload onFileChange={setAvatarFile} />
                <button
                  type="submit"
                  disabled={!avatarFile || avatarLoading}
                  className={`px-5 py-2.5 rounded-lg font-bold text-sm transition-colors w-full sm:w-auto flex items-center justify-center gap-2
                           ${!avatarFile || avatarLoading ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-slate-900 text-white hover:bg-slate-800 shadow-sm'}`}
                >
                  {avatarLoading ? <><Loader2 size={16} className="animate-spin" /> Uploading</> : 'Save Picture'}
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Personal Details Section */}
        <section>
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-4">
            <span><User className="inline-block mr-2" size={16} /> Personal Information</span>
            <div className="h-px bg-slate-200 flex-grow"></div>
          </h2>

          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
            <form onSubmit={handleDetailsSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={detailsData.fullName}
                  onChange={handleDetailsChange}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-medium rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-teal-600/20 focus:border-teal-600 transition-all outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Username</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 font-medium">@</span>
                  <input
                    type="text"
                    name="username"
                    value={detailsData.username}
                    onChange={handleDetailsChange}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-medium rounded-lg pl-8 pr-4 py-2.5 focus:ring-2 focus:ring-teal-600/20 focus:border-teal-600 transition-all outline-none"
                  />
                </div>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex justify-between">
                  Email Address <span className="text-slate-400 font-medium normal-case tracking-normal">Cannot be changed</span>
                </label>
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="w-full bg-slate-100 border border-slate-200 text-slate-500 font-medium rounded-lg px-4 py-2.5 cursor-not-allowed"
                />
              </div>
              <div className="md:col-span-2 pt-2">
                <button
                  type="submit"
                  disabled={detailsLoading}
                  className="px-6 py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors shadow-sm w-full sm:w-auto flex items-center justify-center gap-2"
                >
                  {detailsLoading && <Loader2 size={16} className="animate-spin" />} Save Details
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Mobile Verification Section */}
        <section>
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-4">
            <span><Smartphone className="inline-block mr-2" size={16} /> Mobile Verification</span>
            <div className="h-px bg-slate-200 flex-grow"></div>
          </h2>

          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
            {user?.isMobileVerified ? (
              <div className="flex items-center gap-4 text-teal-700 bg-teal-50 border border-teal-100 p-5 rounded-lg">
                <CheckCircle2 size={24} className="shrink-0" />
                <div>
                  <p className="font-bold">Verified Mobile Number</p>
                  <p className="text-sm font-medium opacity-90">Your account is secured with {user.mobileNumber}.</p>
                </div>
              </div>
            ) : (
              !showOtpInput ? (
                <form onSubmit={handleMobileSubmit} className="max-w-md space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Mobile Number</label>
                    <input
                      type="tel"
                      name="mobileNumber"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-medium rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-teal-600/20 focus:border-teal-600 transition-all outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={mobileLoading}
                    className="px-6 py-2.5 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors shadow-sm flex items-center gap-2"
                  >
                    {mobileLoading && <Loader2 size={16} className="animate-spin" />} Send Verification Code
                  </button>
                </form>
              ) : (
                <form onSubmit={handleOtpSubmit} className="max-w-md space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500">6-Digit OTP</label>
                    <input
                      type="text"
                      name="otp"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter code from email"
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-medium rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-teal-600/20 focus:border-teal-600 transition-all outline-none tracking-widest text-center text-xl"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={mobileLoading}
                    className="w-full px-6 py-3 bg-teal-700 text-white font-bold rounded-lg hover:bg-teal-800 transition-colors shadow-sm flex justify-center items-center gap-2"
                  >
                    {mobileLoading && <Loader2 size={16} className="animate-spin" />} Verify OTP
                  </button>
                </form>
              )
            )}
          </div>
        </section>

        {/* Security Section */}
        <section>
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-4">
            <span><Lock className="inline-block mr-2" size={16} /> Security</span>
            <div className="h-px bg-slate-200 flex-grow"></div>
          </h2>

          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
            <form onSubmit={handlePasswordSubmit} className="max-w-md space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Current Password</label>
                <input
                  type="password"
                  name="oldPassword"
                  value={passwordData.oldPassword}
                  onChange={handlePasswordChange}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-medium rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-teal-600/20 focus:border-teal-600 transition-all outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-medium rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-teal-600/20 focus:border-teal-600 transition-all outline-none"
                />
              </div>
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={passwordLoading}
                  className="px-6 py-3 bg-red-600/10 text-red-700 hover:bg-red-600 hover:text-white font-bold rounded-lg transition-colors border border-red-200 hover:border-transparent flex items-center gap-2"
                >
                  {passwordLoading && <Loader2 size={16} className="animate-spin" />} Update Password
                </button>
              </div>
            </form>
          </div>
        </section>

      </div>
    </div>
  );
};

export default EditProfilePage;