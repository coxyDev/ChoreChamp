import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { User } from "@/entities/all";
import { 
  Mail, 
  Smartphone, 
  Eye, 
  EyeOff,
  ArrowLeft,
  CheckCircle2
} from "lucide-react";
import { motion } from "framer-motion";

const SocialButton = ({ icon: Icon, provider, onClick, disabled = false }) => (
  <Button 
    variant="outline" 
    onClick={onClick}
    disabled={disabled}
    className="w-full h-12 hover:shadow-md transition-all duration-300 border-border hover:bg-accent hover:text-accent-foreground"
  >
    <Icon className="w-5 h-5 mr-3" />
    Continue with {provider}
  </Button>
);

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

export default function Auth() {
  const [mode, setMode] = useState('signin'); // 'signin', 'signup', 'email', 'mobile', 'verify'
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    verificationCode: ''
  });

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Simulate auth process
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Email auth completed');
    } catch (error) {
      console.error('Auth error:', error);
    }
    setIsLoading(false);
  };

  const handleMobileAuth = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setMode('verify');
    } catch (error) {
      console.error('Mobile auth error:', error);
    }
    setIsLoading(false);
  };

  const handleVerification = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Verification completed');
    } catch (error) {
      console.error('Verification error:', error);
    }
    setIsLoading(false);
  };

  const renderWelcomeScreen = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center space-y-6"
    >
      <div className="space-y-4">
        <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">Welcome to ChoreChamp!</h2>
          <p className="text-muted-foreground mt-2">
            Turn chores into fun, rewarding experiences for your family.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <SocialButton icon={GoogleIcon} provider="Google" onClick={() => console.log('Google auth')} />
        <SocialButton icon={FacebookIcon} provider="Facebook" onClick={() => console.log('Facebook auth')} />
      </div>

      <div className="relative">
        <Separator />
        <span className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 bg-card text-muted-foreground text-sm px-2 w-fit mx-auto">
          or continue with
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button 
          variant="outline" 
          onClick={() => setMode('email')}
          className="h-12 border-border hover:bg-accent hover:text-accent-foreground"
        >
          <Mail className="w-4 h-4 mr-2" />
          Email
        </Button>
        <Button 
          variant="outline" 
          onClick={() => setMode('mobile')}
          className="h-12 border-border hover:bg-accent hover:text-accent-foreground"
        >
          <Smartphone className="w-4 h-4 mr-2" />
          Phone
        </Button>
      </div>
    </motion.div>
  );

  const renderEmailForm = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground">
          {mode === 'signin' ? 'Welcome back!' : 'Create your account'}
        </h2>
        <p className="text-muted-foreground mt-2">
          {mode === 'signin' 
            ? 'Sign in to your ChoreChamp account' 
            : 'Start making chores fun for your family'
          }
        </p>
      </div>

      <form onSubmit={handleEmailAuth} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            placeholder="Enter your email"
            className="border-border focus:ring-ring"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              placeholder="Enter your password"
              className="border-border focus:ring-ring pr-10"
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {mode === 'signup' && (
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
              placeholder="Confirm your password"
              className="border-border focus:ring-ring"
              required
            />
          </div>
        )}

        <Button 
          type="submit" 
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          disabled={isLoading}
        >
          {isLoading ? 'Please wait...' : mode === 'signin' ? 'Sign In' : 'Create Account'}
        </Button>
      </form>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          {mode === 'signin' ? "Don't have an account?" : "Already have an account?"}{' '}
          <button 
            onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
            className="font-medium underline hover:no-underline text-primary"
          >
            {mode === 'signin' ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </motion.div>
  );

  const renderMobileForm = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground">Enter your phone number</h2>
        <p className="text-muted-foreground mt-2">
          We'll send you a verification code to get started.
        </p>
      </div>

      <form onSubmit={handleMobileAuth} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="mobile">Mobile Number</Label>
          <Input
            id="mobile"
            type="tel"
            value={formData.mobile}
            onChange={(e) => setFormData(prev => ({ ...prev, mobile: e.target.value }))}
            placeholder="+1 (555) 123-4567"
            className="border-border focus:ring-ring"
            required
          />
        </div>

        <Button 
          type="submit" 
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          disabled={isLoading}
        >
          {isLoading ? 'Sending code...' : 'Send Verification Code'}
        </Button>
      </form>
    </motion.div>
  );

  const renderVerificationForm = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setMode('mobile')}
          className="hover:bg-accent"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h2 className="text-2xl font-bold text-foreground">
          Enter Verification Code
        </h2>
      </div>

      <div className="text-center mb-6">
        <p className="text-muted-foreground">
          We sent a code to {formData.mobile || formData.email}
        </p>
      </div>

      <form onSubmit={handleVerification} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="verificationCode">6-Digit Code</Label>
          <Input
            id="verificationCode"
            value={formData.verificationCode}
            onChange={(e) => setFormData(prev => ({ ...prev, verificationCode: e.target.value }))}
            placeholder="000000"
            maxLength={6}
            className="text-center text-lg font-mono tracking-widest border-border focus:ring-ring"
            required
          />
        </div>

        <Button 
          type="submit" 
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          disabled={isLoading || formData.verificationCode.length !== 6}
        >
          {isLoading ? 'Verifying...' : 'Verify & Continue'}
        </Button>
      </form>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Didn't receive a code?{' '}
          <button 
            onClick={() => console.log('Resend code')}
            className="font-medium underline hover:no-underline text-primary"
          >
            Resend
          </button>
        </p>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <Card className="w-full max-w-md border-0 shadow-2xl">
        <CardContent className="p-8">
          {mode === 'signup' && renderWelcomeScreen()}
          {(mode === 'email' || mode === 'signin') && renderEmailForm()}
          {mode === 'mobile' && renderMobileForm()}
          {mode === 'verify' && renderVerificationForm()}
        </CardContent>
      </Card>
    </div>
  );
}