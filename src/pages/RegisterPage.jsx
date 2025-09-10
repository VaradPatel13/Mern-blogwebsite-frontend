import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser, loginWithGoogle } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";

// UI Components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/toast";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });
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
      if (response.success) {
        toast({
          title: "Registration Successful 🎉",
          description: "You can now log in with your new account.",
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
      if (response.success) {
        toast({
          title: "Login Successful 🚀",
          description: `Welcome, ${response.data.user.fullName}!`,
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

  const handleGoogleError = () => {
    setError("Google login was unsuccessful. Please try again.");
  };

  return (
    <div
      className="relative flex items-center justify-center min-h-screen w-full 
                 bg-gradient-to-br from-amber-50 via-white to-amber-100 
                 dark:from-gray-900 dark:via-gray-800 dark:to-amber-950"
    >
      {/* Animated background */}
      <BackgroundBeamsWithCollision
        className="absolute top-0 left-0 w-full h-full z-0"
        beamColor="from-amber-300 via-amber-300 to-transparent"
        beamCount={30}
        speed={1.2}
      />

      <div className="relative z-10 w-full max-w-5xl px-4">
        <Card
          className="grid md:grid-cols-2 shadow-2xl rounded-2xl overflow-hidden 
             bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border border-amber-200
             max-w-4xl mx-auto"
        >
          {/* Left Side - Branding (hidden on mobile) */}
          <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-amber-500 to-amber-700 text-white p-10 space-y-6">
            <div className="text-center">
              <h2 className="text-4xl font-extrabold mb-4">Welcome to MindLoom</h2>
              <p className="text-lg text-amber-100">
                Share your stories, connect with others, and grow your journey.
              </p>
            </div>

            {/* Google Login */}
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              useOneTap
            />

            {/* Already have account */}
            <p className="text-sm text-amber-100">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold underline text-white hover:text-amber-200"
              >
                Login here
              </Link>
            </p>
          </div>

          {/* Right Side - Form */}
          <div className="p-8 flex flex-col justify-center">
            <CardHeader className="text-center space-y-1">
              <CardTitle className="text-3xl font-bold text-amber-900 dark:text-amber-400">
                Create an Account
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Join MindLoom today and start your journey ✨
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="johndoe"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Your secure password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-500 text-center">{error}</p>
                )}

                <Button
                  type="submit"
                  className="w-full bg-amber-600 hover:bg-amber-700"
                  disabled={loading}
                >
                  {loading ? "Creating Account..." : "Register"}
                </Button>
              </form>

              {/* Mobile-only Google + Login link (below Register button) */}
              <div className="mt-6 space-y-4 text-center md:hidden">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  useOneTap
                />
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-semibold text-amber-600 hover:text-amber-700"
                  >
                    Login here
                  </Link>
                </p>
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    </div>  
  );
};

export default RegisterPage;
