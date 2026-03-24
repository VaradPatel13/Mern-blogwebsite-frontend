import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { updateUserDetails, updateUserAvatar, changePassword, sendMobileOtp, verifyMobileOtp, getCurrentUser } from '../services/uesrService';
import { useToast } from "@/components/ui/toast";
import { Camera, User, Lock, Smartphone, CheckCircle2, ChevronRight, Loader2, Shield, ArrowLeft, Home, Edit3 } from 'lucide-react';
import ImageUpload from '../components/ImageUpload';

const EditProfilePage = () => {
  const { user, login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

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
        login(response.data);
        toast({ title: "Profile updated successfully.", description: "Your digital identity has blossomed." });
      }
    } catch (err) {
      setError(err.message || 'Failed to update details.');
      toast({ variant: "destructive", title: "Update Failed", description: err.message || 'Failed to update details.' });
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
        toast({ title: "Avatar updated", description: "Your portrait has been cultivated." });
        setAvatarFile(null);
      }
    } catch (err) {
      setError(err.message || 'Failed to update avatar.');
      toast({ variant: "destructive", title: "Update Failed", description: err.message || 'Failed to update avatar.' });
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
        toast({ title: "Vault Re-keyed", description: "Your password has been changed successfully." });
        setPasswordData({ oldPassword: '', newPassword: '' });
      }
    } catch (err) {
      setError(err.message || 'Failed to change password.');
      toast({ variant: "destructive", title: "Security Alert", description: err.message || 'Failed to change password.' });
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
        toast({ title: "Verification Sent", description: "A code has been sown to your mobile device." });
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
        toast({ title: "Mobile Verified", description: "Your security roots are firmly planted." });
      }
    } catch (err) {
      setError(err.message || 'Failed to verify OTP.');
      toast({ variant: "destructive", title: "Verification Failed", description: err.message || 'Failed to verify OTP.' });
    } finally {
      setMobileLoading(false);
    }
  };

  return (
    <div className="text-[#1b1c1a] font-manrope antialiased selection:bg-[#ffdad9] selection:text-[#2f1314] relative w-full h-full">
      


      <div className="flex min-h-screen pt-20 max-w-[1400px] mx-auto">
        
        {/* Main Content Canvas */}
        <main className="flex-1 px-6 lg:px-16 pt-12 pb-32 max-w-5xl w-full mx-auto">
          
          {/* Breadcrumb */}
          <div className="mb-8 flex items-center gap-2 text-xs font-bold font-manrope text-[#414944]/60 tracking-widest uppercase">
            <Link to="/my-profile" className="hover:text-[#00261b] transition-colors">My Profile</Link>
            <ChevronRight size={14} />
            <span className="text-[#00261b]">Settings</span>
          </div>

          {/* Header Section */}
          <header className="mb-16">
            <h1 className="text-5xl md:text-6xl lg:text-[72px] font-newsreader font-bold text-[#00261b] tracking-tighter mb-6 leading-[1.1]">Account Settings</h1>
            <p className="text-lg md:text-xl font-manrope text-[#414944] max-w-2xl leading-relaxed font-medium">
              Refine your digital presence and safeguard your creative flourishing. These details define your identity within the Scribloom ecosystem.
            </p>
          </header>

          {error && (
            <div className="bg-[#ffdad6]/30 border border-[#ffdad6] text-[#ba1a1a] px-6 py-4 rounded-2xl mb-12 font-bold flex items-center gap-3 text-sm shadow-sm backdrop-blur-sm">
              <Shield size={18} /> {error}
            </div>
          )}

          {/* Settings Grid (Asymmetric Bento) */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8" id="profile">
            
            {/* Left Column: Avatar & Personal Info */}
            <div className="xl:col-span-8 flex flex-col gap-8">
              
              {/* Avatar Section */}
              <section className="bg-[#f5f3ef] border border-[#c0c8c3]/20 p-8 md:p-10 rounded-[2rem] shadow-sm relative overflow-hidden group">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#bcedd7]/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-[1.5s]"></div>
                <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-8">
                  <div className="relative w-32 h-32 shrink-0 group/avatar cursor-pointer">
                    <div className="w-full h-full rounded-full overflow-hidden border-4 border-[var(--background)] shadow-xl bg-[#eae8e4] group-hover/avatar:shadow-2xl transition-all duration-500">
                      <img 
                        src={avatarFile ? URL.createObjectURL(avatarFile) : user?.avatar || `https://i.pravatar.cc/150?u=${user?.username}`} 
                        alt="Avatar Preview" 
                        className="w-full h-full object-cover group-hover/avatar:scale-110 transition-transform duration-700" 
                      />
                    </div>
                    <div className="absolute inset-0 bg-[#00261b]/0 group-hover/avatar:bg-[#00261b]/20 rounded-full transition-colors duration-300 pointer-events-none"></div>
                    <div className="absolute -bottom-2 -right-2 bg-[#00261b] text-white p-3 rounded-full shadow-lg scale-90 group-hover/avatar:scale-100 transition-transform duration-300 hover:bg-[#214f3f]">
                      <Camera size={18} strokeWidth={2.5} />
                    </div>
                    {/* Invisible file input covering the avatar for easy clicking */}
                    <div className="absolute inset-0 opacity-0 cursor-pointer">
                       <ImageUpload onFileChange={setAvatarFile} className="w-full h-full cursor-pointer" />
                    </div>
                  </div>
                  
                  <div className="flex-1 text-center sm:text-left pt-2">
                    <h3 className="font-newsreader font-bold text-3xl text-[#00261b] mb-2 tracking-tight">Display Portrait</h3>
                    <p className="text-[#414944] text-sm font-medium mb-6">JPEG, PNG, or WEBP. Recommended size 400x400px.</p>
                    <form onSubmit={handleAvatarSubmit} className="inline-block relative">
                       <button 
                         type="submit" 
                         disabled={!avatarFile || avatarLoading}
                         className={`px-8 py-3.5 rounded-xl font-manrope font-bold uppercase tracking-widest text-[11px] shadow-lg transition-all flex items-center gap-2 relative overflow-hidden
                         ${!avatarFile || avatarLoading ? 'bg-[#eae8e4] text-[#414944]/50 cursor-not-allowed shadow-none border border-[#c0c8c3]/30' : 'bg-[#00261b] text-white hover:-translate-y-1 hover:shadow-xl active:translate-y-0 active:scale-95 hover:bg-[#214f3f]'}`}
                       >
                         {avatarLoading && <Loader2 size={16} className="animate-spin" />}
                         {avatarFile ? 'Cultivate Picture' : 'Select a picture above'}
                       </button>
                    </form>
                  </div>
                </div>
              </section>

              {/* Personal Information */}
              <section className="bg-[#f5f3ef] border border-[#c0c8c3]/20 p-8 md:p-10 rounded-[2rem] shadow-sm relative">
                <h3 className="font-newsreader font-bold text-3xl text-[#00261b] mb-8 pb-6 border-b border-[#c0c8c3]/20 flex items-center gap-3">
                  <User size={28} className="text-[#7b5455]" />
                  Identifiable Traits
                </h3>
                <form onSubmit={handleDetailsSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                  <div className="flex flex-col gap-2 relative group">
                    <label className="text-[10px] uppercase tracking-widest font-black text-[#414944]/70 absolute -top-3 left-4 bg-[#f5f3ef] px-2 z-10 transition-colors group-focus-within:text-[#00261b]">Full Name</label>
                    <input 
                      type="text" 
                      name="fullName" 
                      value={detailsData.fullName} 
                      onChange={handleDetailsChange}
                      className="bg-white border-2 border-[#e4e2de] focus:ring-0 focus:border-[#00261b] transition-all font-manrope font-bold text-lg p-4 rounded-xl shadow-inner w-full hover:border-[#c0c8c3] outline-none" 
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2 relative group">
                    <label className="text-[10px] uppercase tracking-widest font-black text-[#414944]/70 absolute -top-3 left-4 bg-[#f5f3ef] px-2 z-10 transition-colors group-focus-within:text-[#00261b]">Username Handle</label>
                    <div className="relative flex items-center">
                      <span className="absolute left-4 text-[#00261b]/50 font-bold text-lg select-none">@</span>
                      <input 
                        type="text" 
                        name="username" 
                        value={detailsData.username} 
                        onChange={handleDetailsChange}
                        className="bg-white border-2 border-[#e4e2de] focus:ring-0 focus:border-[#00261b] transition-all font-manrope font-bold text-lg p-4 pl-10 rounded-xl shadow-inner w-full hover:border-[#c0c8c3] outline-none" 
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 md:col-span-2 relative">
                    <label className="text-[10px] uppercase tracking-widest font-black text-[#414944]/70 absolute -top-3 left-4 bg-[#f5f3ef] px-2 z-10">Primary Contact (Read-Only)</label>
                    <div className="flex items-center gap-3 bg-[#e4e2de]/50 border-2 border-[#e4e2de]/50 p-4 rounded-xl cursor-not-allowed">
                      <Lock size={18} className="text-[#414944]/50" />
                      <span className="font-manrope font-bold text-[#1b1c1a]/70 select-all">{user?.email}</span>
                    </div>
                  </div>

                  <div className="md:col-span-2 pt-4">
                     <button 
                       type="submit" 
                       disabled={detailsLoading}
                       className="w-full sm:w-auto px-10 py-4 rounded-xl bg-[#00261b] text-[#bcedd7] hover:text-white font-manrope font-bold uppercase tracking-widest text-xs transition-all shadow-lg shadow-[#00261b]/20 hover:-translate-y-1 hover:shadow-xl active:translate-y-0 active:scale-[0.98] flex items-center justify-center gap-3"
                     >
                       {detailsLoading ? <Loader2 size={16} className="animate-spin" /> : <Edit3 size={16} />} Save Biological Traits
                     </button>
                  </div>
                </form>
              </section>
            </div>

            {/* Right Column: Verification & Security */}
            <div className="xl:col-span-4 flex flex-col gap-8" id="security">
              
              {/* Mobile Verification */}
              <section className="bg-[#f5f3ef] border border-[#c0c8c3]/20 p-8 rounded-[2rem] shadow-[0_10px_30px_rgba(0,38,27,0.03)] relative overflow-hidden">
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#ffdad9]/30 rounded-full blur-xl pointer-events-none"></div>
                <h3 className="font-newsreader font-bold text-2xl text-[#00261b] mb-6 flex items-center gap-2">
                  <Smartphone size={22} className="text-[#7b5455]" />
                  Verification Root
                </h3>
                
                {user?.isMobileVerified ? (
                  <div className="p-5 rounded-2xl bg-[#bcedd7]/20 border border-[#bcedd7]/50 mb-6 backdrop-blur-sm">
                    <div className="flex items-center gap-3 text-[#00261b] mb-1">
                      <CheckCircle2 size={24} className="text-[#0b3d2e] fill-[#bcedd7]" />
                      <span className="font-manrope font-black text-sm uppercase tracking-widest">Mobile Verified</span>
                    </div>
                    <p className="text-xs font-bold text-[#414944] mt-2 tracking-wide pl-9 opacity-80">Linked: {user?.mobileNumber}</p>
                  </div>
                ) : (
                  <div className="mb-6 relative z-10">
                    {!showOtpInput ? (
                      <form onSubmit={handleMobileSubmit} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] uppercase tracking-widest font-black text-[#414944]/70 px-1">Register Root Number</label>
                          <input 
                            type="tel" 
                            name="mobileNumber" 
                            value={mobileNumber} 
                            onChange={(e) => setMobileNumber(e.target.value)} 
                            placeholder="+1 (555) 000-0000"
                            className="bg-white border-2 border-[#e4e2de] focus:ring-0 focus:border-[#00261b] transition-all font-manrope font-bold text-sm p-3.5 rounded-xl shadow-inner outline-none w-full"
                          />
                        </div>
                        <button type="submit" disabled={mobileLoading} className="py-3.5 rounded-xl border border-[#00261b]/20 text-[#00261b] font-manrope font-black text-[11px] uppercase tracking-[0.2em] hover:bg-[#eae8e4] transition-colors flex items-center justify-center gap-2 shadow-sm bg-white">
                          {mobileLoading ? <Loader2 size={16} className="animate-spin" /> : 'Send Pulse Code'}
                        </button>
                      </form>
                    ) : (
                      <form onSubmit={handleOtpSubmit} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] uppercase tracking-widest font-black text-[#7b5455] px-1">Awaiting 6-Digit Pulse</label>
                          <input 
                            type="text" 
                            name="otp" 
                            value={otp} 
                            onChange={(e) => setOtp(e.target.value)} 
                            placeholder="Enter code"
                            className="bg-white border-2 border-[#fecbcb]/50 focus:ring-0 focus:border-[#7b5455] transition-all font-manrope font-bold text-base p-3.5 rounded-xl shadow-inner text-center tracking-[0.5em] outline-none"
                          />
                        </div>
                        <button type="submit" disabled={mobileLoading} className="py-3.5 rounded-xl bg-[#0b3d2e] text-[#bcedd7] border border-[#0b3d2e] font-manrope font-black text-[11px] uppercase tracking-[0.2em] hover:bg-[#00261b] transition-all flex items-center justify-center gap-2 shadow-[0_10px_20px_rgba(11,61,46,0.2)]">
                          {mobileLoading ? <Loader2 size={16} className="animate-spin" /> : 'Verify Pulse'}
                        </button>
                      </form>
                    )}
                  </div>
                )}
                
                {user?.isMobileVerified && (
                  <button className="w-full py-3 rounded-xl border-2 border-[#e4e2de] text-[#414944] font-manrope font-bold text-xs uppercase tracking-widest hover:bg-white hover:border-[#c0c8c3] transition-colors relative z-10 shadow-sm bg-transparent">
                    Update Root Number
                  </button>
                )}
              </section>

              {/* Security Anchor */}
              <section className="bg-[#e4e2de]/40 border border-[#c0c8c3]/30 p-8 rounded-[2rem] shadow-[inset_0_-10px_40px_rgba(255,255,255,0.5),0_10px_20px_rgba(0,38,27,0.02)]">
                <h3 className="font-newsreader font-bold text-2xl text-[#00261b] mb-6 flex items-center gap-2 border-b border-[#c0c8c3]/30 pb-4">
                  <Lock size={22} className="text-[#00261b]/60" /> Security Anchor
                </h3>
                <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2 relative group">
                    <label className="text-[10px] uppercase tracking-widest font-black text-[#414944]/70 absolute -top-3 left-3 bg-[#eae8e4] px-1.5 z-10 transition-colors group-focus-within:text-[#00261b] rounded-sm">Current Key</label>
                    <input 
                      type="password" 
                      name="oldPassword"
                      value={passwordData.oldPassword}
                      onChange={handlePasswordChange}
                      placeholder="••••••••" 
                      className="bg-[var(--background)] border-2 border-[#c0c8c3] focus:ring-0 focus:border-[#00261b] transition-all font-manrope font-bold text-lg p-3.5 rounded-xl outline-none" 
                    />
                  </div>
                  <div className="flex flex-col gap-2 relative group">
                    <label className="text-[10px] uppercase tracking-widest font-black text-[#414944]/70 absolute -top-3 left-3 bg-[#eae8e4] px-1.5 z-10 transition-colors group-focus-within:text-[#00261b] rounded-sm">New Ascendant Key</label>
                    <input 
                      type="password" 
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      placeholder="••••••••" 
                      className="bg-[var(--background)] border-2 border-[#c0c8c3] focus:ring-0 focus:border-[#00261b] transition-all font-manrope font-bold text-lg p-3.5 rounded-xl outline-none" 
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={passwordLoading}
                    className="mt-4 bg-[#7b5455] text-white py-4 rounded-xl font-manrope font-black uppercase tracking-[0.2em] text-[11px] shadow-[0_10px_20px_rgba(123,84,85,0.2)] hover:bg-[#613d3e] transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    {passwordLoading ? <Loader2 size={16} className="animate-spin" /> : 'Re-key Vault Context'}
                  </button>
                </form>
              </section>

            </div>
          </div>


          
        </main>
      </div>



      {/* Bottom Floating Navigation (Mobile Only) */}
      <nav className="md:hidden fixed bottom-5 left-1/2 -translate-x-1/2 w-[90%] sm:w-[80%] rounded-[2rem] z-[90] bg-[var(--background)]/85 backdrop-blur-2xl border border-white/40 shadow-[0_20px_40px_rgba(0,38,27,0.15)] flex justify-around items-end px-2 pb-3 pt-3">
        <Link to="/home" className="flex flex-col items-center justify-center text-[#00261b]/60 p-2 hover:text-[#7b5455] transition-all duration-300 active:scale-90 opacity-80 hover:opacity-100 flex-1">
          <Home size={22} strokeWidth={2} />
          <span className="font-manrope font-bold text-[9px] tracking-widest uppercase mt-1.5">Home</span>
        </Link>
        
        <a href="#profile" className="flex flex-col items-center justify-center text-[#00261b]/60 p-2 hover:text-[#7b5455] transition-all duration-300 active:scale-90 opacity-80 hover:opacity-100 flex-1">
          <User size={22} strokeWidth={2} />
          <span className="font-manrope font-bold text-[9px] tracking-widest uppercase mt-1.5">Profile</span>
        </a>

        {/* Floating Action Button Style Center Icon */}
        <div className="flex-1 flex justify-center shrink-0 w-16 -mt-10 relative z-10">
          <Link to="/my-profile" className="flex flex-col items-center justify-center bg-gradient-to-br from-[#00261b] to-[#214f3f] text-[#bcedd7] rounded-full w-[60px] h-[60px] shadow-[0_15px_30px_rgba(0,38,27,0.25)] border-[4px] border-[var(--background)] hover:-translate-y-2 active:scale-90 transition-all duration-300">
            <CheckCircle2 size={24} strokeWidth={2.5} />
          </Link>
        </div>
        
        <a href="#security" className="flex flex-col items-center justify-center text-[#00261b]/60 p-2 hover:text-[#7b5455] transition-all duration-300 active:scale-90 opacity-80 hover:opacity-100 flex-1">
          <Lock size={22} strokeWidth={2} />
          <span className="font-manrope font-bold text-[9px] tracking-widest uppercase mt-1.5">Security</span>
        </a>
        
        <button onClick={() => navigate(-1)} className="flex flex-col items-center justify-center text-[#00261b]/60 p-2 hover:text-[#7b5455] transition-all duration-300 active:scale-90 opacity-80 hover:opacity-100 flex-1">
          <ArrowLeft size={22} strokeWidth={2} />
          <span className="font-manrope font-bold text-[9px] tracking-widest uppercase mt-1.5">Back</span>
        </button>
      </nav>
      
    </div>
  );
};

export default EditProfilePage;
