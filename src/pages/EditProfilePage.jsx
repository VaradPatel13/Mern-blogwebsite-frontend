// src/pages/EditProfilePage.jsx

import {React, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { updateUserDetails, updateUserAvatar, changePassword, sendMobileOtp, verifyMobileOtp, getCurrentUser } from '../services/uesrService';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/toast";
import { Camera, User, Lock, Smartphone, CheckCircle2 } from 'lucide-react';
import ImageUpload from '../components/ImageUpload';

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
        toast({ title: "Success", description: "Profile details updated successfully." });
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
        toast({ title: "Success", description: "Avatar updated successfully." });
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
        toast({ title: "Success", description: "Password changed successfully." });
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
            toast({ title: "OTP Sent", description: "Please check your email for the verification code." });
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
            // Refetch user data to get the updated isMobileVerified status
            const userResponse = await getCurrentUser(); 
            login(userResponse.data);
            setShowOtpInput(false);
            toast({ title: "Success!", description: "Your mobile number has been verified." });
        }
    } catch (err) {
        setError(err.message || 'Failed to verify OTP.');
        toast({ variant: "destructive", title: "Error", description: err.message || 'Failed to verify OTP.' });
    } finally {
        setMobileLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md mb-6" role="alert"><p>{error}</p></div>}
      
      {/* Avatar Update Card */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-amber-800"><Camera size={24} className="mr-3"/> Profile Picture</CardTitle>
          <CardDescription>Update your avatar. A square image is recommended.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAvatarSubmit}>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <img src={avatarFile ? URL.createObjectURL(avatarFile) : user?.avatar} alt="Avatar preview" className="w-24 h-24 rounded-full object-cover" />
              <div className="flex-1 w-full">
                <ImageUpload onFileChange={setAvatarFile} />
              </div>
            </div>
            <Button type="submit" disabled={!avatarFile || avatarLoading} className="mt-4 bg-amber-500 hover:bg-amber-600">
              {avatarLoading ? 'Uploading...' : 'Save Avatar'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Personal Details Card */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-amber-800"><User size={24} className="mr-3"/> Personal Details</CardTitle>
          <CardDescription>Update your personal information. Email cannot be changed.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleDetailsSubmit} className="space-y-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input type="text" name="fullName" value={detailsData.fullName} onChange={handleDetailsChange} />
            </div>
            <div>
              <Label htmlFor="username">Username</Label>
              <Input type="text" name="username" value={detailsData.username} onChange={handleDetailsChange} />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input type="email" name="email" value={user?.email || ''} disabled className="bg-gray-100"/>
            </div>
            <Button type="submit" disabled={detailsLoading} className="bg-amber-500 hover:bg-amber-600">
              {detailsLoading ? 'Saving...' : 'Save Details'}
            </Button>
          </form>
        </CardContent>
      </Card>
      
      {/* Mobile Number Card */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-amber-800"><Smartphone size={24} className="mr-3"/> Mobile Number</CardTitle>
          <CardDescription>Verify your mobile number to enhance account security.</CardDescription>
        </CardHeader>
        <CardContent>
            {user?.isMobileVerified ? (
                <div className="flex items-center space-x-2 text-green-600 bg-green-50 p-4 rounded-lg">
                    <CheckCircle2 size={20} />
                    <p>Your mobile number <span className="font-semibold">{user.mobileNumber}</span> is verified.</p>
                </div>
            ) : (
                !showOtpInput ? (
                    <form onSubmit={handleMobileSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="mobileNumber">Mobile Number</Label>
                            <Input type="tel" name="mobileNumber" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} placeholder="Enter your mobile number" />
                        </div>
                        <Button type="submit" disabled={mobileLoading} className="bg-amber-500 hover:bg-amber-600">
                            {mobileLoading ? 'Sending OTP...' : 'Save & Send OTP'}
                        </Button>
                    </form>
                ) : (
                    <form onSubmit={handleOtpSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="otp">Enter OTP</Label>
                            <Input type="text" name="otp" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="6-digit code from your email" />
                        </div>
                        <Button type="submit" disabled={mobileLoading} className="bg-amber-500 hover:bg-amber-600">
                            {mobileLoading ? 'Verifying...' : 'Verify OTP'}
                        </Button>
                    </form>
                )
            )}
        </CardContent>
      </Card>

      {/* Change Password Card */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-amber-800"><Lock size={24} className="mr-3"/> Change Password</CardTitle>
          <CardDescription>Update your password. Make sure it's a strong one.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <Label htmlFor="oldPassword">Current Password</Label>
              <Input type="password" name="oldPassword" value={passwordData.oldPassword} onChange={handlePasswordChange} />
            </div>
            <div>
              <Label htmlFor="newPassword">New Password</Label>
              <Input type="password" name="newPassword" value={passwordData.newPassword} onChange={handlePasswordChange} />
            </div>
            <Button type="submit" disabled={passwordLoading} className="bg-amber-500 hover:bg-amber-600">
              {passwordLoading ? 'Saving...' : 'Change Password'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditProfilePage;