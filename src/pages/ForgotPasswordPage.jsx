// src/pages/ForgotPasswordPage.jsx

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../services/authService";

// UI Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/toast";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await forgotPassword(email);
      if (response.success) {
        toast({
          title: "Check Your Email 📧",
          description:
            "If an account exists with this email, you’ll receive a password reset link shortly.",
        });
        setEmail("");
      }
    } catch (err) {
      toast({
        title: "Error ❌",
        description: err.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-amber-50 via-white to-amber-100 dark:from-gray-900 dark:via-gray-800 dark:to-amber-950">
      <BackgroundBeamsWithCollision
        className="absolute top-0 left-0 w-full h-full z-0"
        beamColor="from-amber-300 via-amber-300 to-transparent"
        beamCount={30}
        speed={1.2}
      />

      <div className="relative z-10 w-full max-w-md px-4">
        <Card className="shadow-2xl rounded-2xl overflow-hidden bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border border-amber-200">
          <CardHeader className="text-center space-y-1 mb-6">
            <CardTitle className="text-3xl font-bold text-amber-900 dark:text-amber-400">
              Forgot Password?
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              Enter your email address and we’ll send you a link to reset your password.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <Button
                type="submit"
                aria-label="Send reset link"
                className="w-full bg-amber-600 hover:bg-amber-700"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>

            <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
              Remember your password?{" "}
              <Link to="/login" className="font-semibold text-amber-600 hover:underline">
                Back to Login
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
