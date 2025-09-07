import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginUser, loginWithGoogle } from "../services/authService";
import { GoogleLogin } from "@react-oauth/google";

// UI Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/toast";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      if (response.success) {
        toast({
          title: "Login Successful 🚀",
          description: `Welcome back, ${response.data.user.fullName}!`,
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
      if (response.success) {
        toast({
          title: "Login Successful 🎉",
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

  return (
    <div className="relative flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-amber-50 via-white to-amber-100 dark:from-gray-900 dark:via-gray-800 dark:to-amber-950">
      <BackgroundBeamsWithCollision className="absolute top-0 left-0 w-full h-full z-0" beamColor="from-amber-300 via-amber-300 to-transparent" beamCount={30} speed={1.2} />

      <div className="relative z-10 w-full max-w-5xl px-4">
        <Card className="grid md:grid-cols-2 shadow-2xl rounded-2xl overflow-hidden bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border border-amber-200 max-w-4xl mx-auto">

          {/* Left Side - Branding */}
          <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-amber-500 to-amber-700 text-white p-10 space-y-6">
            <h2 className="text-4xl font-extrabold">Welcome Back</h2>
            <p className="text-lg text-amber-100">Access your account and continue your journey.</p>
            <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => setError("Google login failed.")} useOneTap />
            <p className="text-sm text-amber-100">
              Don’t have an account?{" "}
              <Link to="/register" className="font-semibold underline hover:text-amber-200">Register here</Link>
            </p>

            <p className="text-sm text-amber-100 dark:text-gray-300 mt-2">
              Forgot your password?{" "}
              <Link to="/forgot-password" className="font-semibold text-amber-200 hover:underline">
                Reset it here
              </Link>
            </p>
          </div>

          {/* Right Side - Login Form */}
          <div className="p-8 flex flex-col justify-center">
            <CardHeader className="text-center space-y-1 mb-6">
              <CardTitle className="text-3xl font-bold text-amber-900 dark:text-amber-400">Login to Your Account</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">Enter your credentials to access your account.</CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="Your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>

                {error && <p className="text-sm text-red-500 text-center">{error}</p>}

                <Button type="submit" aria-label="Login" className="w-full bg-amber-600 hover:bg-amber-700" disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </form>

              {/* Mobile Only - Google + Register */}
              <div className="mt-6 space-y-4 text-center md:hidden">
                <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => setError("Google login failed.")} useOneTap />
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Don’t have an account?{" "}
                  <Link to="/register" className="font-semibold text-amber-600 hover:underline">
                    Register here
                  </Link>
                </p>

                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                  Forgot your password?{" "}
                  <Link to="/forgot-password" className="font-semibold text-amber-600 hover:underline">
                    Reset it here
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

export default LoginPage;
