import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, ShieldCheck, ArrowRight, Loader2, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../components/Logo';

const ForgotPasswordPage = () => {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: Reset
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      toast.success('OTP sent! Please check your email');
      setStep(2);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post('http://localhost:5000/api/auth/verify-otp', { email, otp });
      toast.success('OTP Verified!');
      setStep(3);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid or expired OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setIsLoading(true);
    try {
      await axios.post('http://localhost:5000/api/auth/reset-password', { email, otp, password });
      toast.success('Password updated successfully!');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Reset failed');
    } finally {
      setIsLoading(false);
    }
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-surface overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-white blur-[120px] opacity-50" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-white blur-[120px] opacity-50" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-gray-100 rounded-[40px] shadow-2xl w-full max-w-md p-10 relative z-10"
      >
        <Link to="/login" className="absolute top-8 left-8 text-gray-400 hover:text-primary transition-colors">
            <ArrowLeft size={20} />
        </Link>

        <div className="flex flex-col items-center mb-8">
          <Logo className="mb-4" />
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Reset Password</h1>
          <p className="text-gray-500 text-center text-sm font-medium mt-2">
            {step === 1 && "Enter your email to receive a recovery code"}
            {step === 2 && "Enter the 6-digit code sent to your email"}
            {step === 3 && "Create a secure new password for your account"}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.form 
              key="step1"
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onSubmit={handleSendOtp} 
              className="space-y-6"
            >
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                  <input
                    type="email"
                    required
                    className="bg-surface border border-gray-100 rounded-2xl p-4 text-dark font-bold focus:border-primary transition-colors outline-none w-full pl-12"
                    placeholder="example@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <button 
                type="submit" 
                disabled={isLoading}
                className="bg-primary hover:bg-primary-deep text-white rounded-2xl shadow-lg shadow-primary/20 transition-all active:scale-95 py-4 w-full flex items-center justify-center space-x-2"
              >
                {isLoading ? <Loader2 className="animate-spin" size={20} /> : (
                  <>
                    <span className="font-black uppercase tracking-widest text-xs">Send OTP</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </motion.form>
          )}

          {step === 2 && (
            <motion.form 
              key="step2" 
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onSubmit={handleVerifyOtp} 
              className="space-y-6"
            >
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">6-Digit OTP</label>
                <div className="relative group">
                  <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                  <input
                    type="text"
                    required
                    maxLength="6"
                    className="bg-surface border border-gray-100 rounded-2xl p-4 text-dark font-bold focus:border-primary transition-colors outline-none w-full pl-12 tracking-[0.5em] text-center text-xl font-black text-primary-deep"
                    placeholder="000000"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
              </div>
              <button 
                type="submit" 
                disabled={isLoading}
                className="bg-primary hover:bg-primary-deep text-white rounded-2xl shadow-lg shadow-primary/20 transition-all active:scale-95 py-4 w-full flex items-center justify-center space-x-2"
              >
                {isLoading ? <Loader2 className="animate-spin" size={20} /> : (
                  <>
                    <span className="font-black uppercase tracking-widest text-xs">Verify OTP</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
              <button 
                type="button" 
                onClick={() => setStep(1)}
                className="w-full text-center text-xs font-bold text-gray-400 hover:text-primary transition-colors uppercase tracking-widest"
              >
                Change Email Address
              </button>
            </motion.form>
          )}

          {step === 3 && (
            <motion.form 
              key="step3" 
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onSubmit={handleResetPassword} 
              className="space-y-5"
            >
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">New Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                  <input
                    type="password"
                    required
                    className="bg-surface border border-gray-100 rounded-2xl p-4 text-dark font-bold focus:border-primary transition-colors outline-none w-full pl-12"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Confirm New Password</label>
                <div className="relative group">
                  <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                  <input
                    type="password"
                    required
                    className="bg-surface border border-gray-100 rounded-2xl p-4 text-dark font-bold focus:border-primary transition-colors outline-none w-full pl-12"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
              <button 
                type="submit" 
                disabled={isLoading}
                className="bg-primary hover:bg-primary-deep text-white rounded-2xl shadow-lg shadow-primary/20 transition-all active:scale-95 py-4 w-full flex items-center justify-center space-x-2"
              >
                {isLoading ? <Loader2 className="animate-spin" size={20} /> : <span className="font-black uppercase tracking-widest text-xs">Reset Password</span>}
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        <div className="mt-8 text-center pt-6 border-t border-gray-100">
          <Link to="/login" className="text-primary font-black hover:text-primary-deep transition-colors text-[10px] uppercase tracking-widest">
            Back to Sign In
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage;
