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
    className="w-full h-12 hover:shadow-md transition-all duration-300"
    style={{ borderColor: '#BDC4A7' }}
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

const AppleIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.017 0C8.396 0 8.025.044 7.333.06 5.301.179 3.712 1.49 3.712 3.525c0 1.648.825 2.876 2.168 2.876.37 0 .713-.07 1.005-.168 1.186-.4 2.536-.641 4.132-.641 1.596 0 2.946.241 4.132.641.292.098.635.168 1.005.168 1.343 0 2.168-1.228 2.168-2.876C18.322 1.49 16.733.179 14.701.06 14.009.044 13.638 0 12.017 0zM12.017 23.973c4.624 0 8.374-3.75 8.374-8.374 0-1.077-.204-2.105-.576-3.049-.372-.944-.918-1.79-1.605-2.477-.687-.687-1.533-1.233-2.477-1.605-.944-.372-1.972-.576-3.049-.576-1.077 0-2.105.204-3.049.576-.944.372-1.79.918-2.477 1.605-.687.687-1.233 1.533-1.605 2.477-.372.944-.576 1.972-.576 3.049 0 4.624 3.75 8.374 8.374 8.374z"/>
  </svg>
);

export default function Auth() {
  const [mode, setMode] = useState('signin'); // 'signin', 'signup', 'email', 'mobile', 'verify'
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    verificationCode: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSocialAuth = async (provider) => {
    setIsLoading(true);
    // In a real app, this would integrate with the authentication service
    console.log(`Authenticating with ${provider}`);
    
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to app or handle success
    }, 2000);
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // In a real app, this would handle email authentication
    console.log('Email auth:', formData);
    
    setTimeout(() => {
      setIsLoading(false);
      if (mode === 'signup') {
        setMode('verify');
      }
    }, 2000);
  };

  const handleMobileAuth = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    console.log('Mobile auth:', formData);
    
    setTimeout(() => {
      setIsLoading(false);
      setMode('verify');
    }, 2000);
  };

  const handleVerification = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    console.log('Verifying code:', formData.verificationCode);
    
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to main app
    }, 2000);
  };

  const renderWelcomeScreen = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center space-y-8"
    >
      <div>
        <div className="w-20 h-20 mx-auto rounded-2xl mb-6 flex items-center justify-center shadow-xl" 
             style={{ background: 'linear-gradient(135deg, #93827F, #92B4A7)' }}>
          <CheckCircle2 className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold mb-2" style={{ color: '#2F2F2F' }}>
          Welcome to ChoreChamp
        </h1>
        <p className="text-lg" style={{ color: '#5A5A5A' }}>
          Turn chores into achievements for your family
        </p>
      </div>

      <div className="space-y-4">
        <SocialButton 
          icon={GoogleIcon} 
          provider="Google" 
          onClick={() => handleSocialAuth('google')}
          disabled={isLoading}
        />
        <SocialButton 
          icon={FacebookIcon} 
          provider="Facebook" 
          onClick={() => handleSocialAuth('facebook')}
          disabled={isLoading}
        />
        <SocialButton 
          icon={AppleIcon} 
          provider="Apple" 
          onClick={() => handleSocialAuth('apple')}
          disabled={isLoading}
        />
      </div>

      <div className="flex items-center">
        <Separator className="flex-1" />
        <span className="px-4 text-sm" style={{ color: '#5A5A5A' }}>or continue with</span>
        <Separator className="flex-1" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button 
          variant="outline" 
          onClick={() => setMode('email')}
          className="h-12"
          style={{ borderColor: '#BDC4A7' }}
        >
          <Mail className="w-5 h-5 mr-2" />
          Email
        </Button>
        <Button 
          variant="outline" 
          onClick={() => setMode('mobile')}
          className="h-12"
          style={{ borderColor: '#BDC4A7' }}
        >
          <Smartphone className="w-5 h-5 mr-2" />
          Mobile
        </Button>
      </div>

      <div className="text-center">
        <p className="text-sm" style={{ color: '#5A5A5A' }}>
          Already have an account?{' '}
          <button 
            onClick={() => setMode('signin')}
            className="font-medium underline hover:no-underline"
            style={{ color: '#93827F' }}
          >
            Sign in
          </button>
        </p>
      </div>
    </motion.div>
  );

  const renderEmailForm = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setMode('signup')}
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h2 className="text-2xl font-bold" style={{ color: '#2F2F2F' }}>
          {mode === 'signin' ? 'Sign In' : 'Create Account'}
        </h2>
      </div>

      <form onSubmit={handleEmailAuth} className="space-y-4">
        {mode === 'signup' && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  style={{ borderColor: '#BDC4A7' }}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                  style={{ borderColor: '#BDC4A7' }}
                  required
                />
              </div>
            </div>
          </>
        )}

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            style={{ borderColor: '#BDC4A7' }}
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
              style={{ borderColor: '#BDC4A7' }}
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
              style={{ borderColor: '#BDC4A7' }}
              required
            />
          </div>
        )}

        <Button 
          type="submit" 
          className="w-full text-white" 
          style={{ backgroundColor: '#93827F' }}
          disabled={isLoading}
        >
          {isLoading ? 'Please wait...' : mode === 'signin' ? 'Sign In' : 'Create Account'}
        </Button>
      </form>

      <div className="text-center">
        <p className="text-sm" style={{ color: '#5A5A5A' }}>
          {mode === 'signin' ? "Don't have an account?" : "Already have an account?"}{' '}
          <button 
            onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
            className="font-medium underline hover:no-underline"
            style={{ color: '#93827F' }}
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
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setMode('signup')}
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h2 className="text-2xl font-bold" style={{ color: '#2F2F2F' }}>
          Continue with Mobile
        </h2>
      </div>

      <form onSubmit={handleMobileAuth} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="mobile">Mobile Number</Label>
          <Input
            id="mobile"
            type="tel"
            placeholder="+61 4XX XXX XXX"
            value={formData.mobile}
            onChange={(e) => setFormData(prev => ({ ...prev, mobile: e.target.value }))}
            style={{ borderColor: '#BDC4A7' }}
            required
          />
          <p className="text-xs" style={{ color: '#5A5A5A' }}>
            We'll send you a verification code via SMS
          </p>
        </div>

        <Button 
          type="submit" 
          className="w-full text-white" 
          style={{ backgroundColor: '#93827F' }}
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
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h2 className="text-2xl font-bold" style={{ color: '#2F2F2F' }}>
          Enter Verification Code
        </h2>
      </div>

      <div className="text-center mb-6">
        <p style={{ color: '#5A5A5A' }}>
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
            className="text-center text-lg font-mono tracking-widest"
            style={{ borderColor: '#BDC4A7' }}
            required
          />
        </div>

        <Button 
          type="submit" 
          className="w-full text-white" 
          style={{ backgroundColor: '#93827F' }}
          disabled={isLoading || formData.verificationCode.length !== 6}
        >
          {isLoading ? 'Verifying...' : 'Verify & Continue'}
        </Button>
      </form>

      <div className="text-center">
        <p className="text-sm" style={{ color: '#5A5A5A' }}>
          Didn't receive a code?{' '}
          <button 
            onClick={() => console.log('Resend code')}
            className="font-medium underline hover:no-underline"
            style={{ color: '#93827F' }}
          >
            Resend
          </button>
        </p>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: '#F8F9F0' }}>
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