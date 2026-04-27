import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ShieldAlert, Loader2, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import Logo from '../components/Logo';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, logout } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) { toast.error('Please fill all fields'); return; }
    setIsLoading(true);
    try {
      const res = await login(email, password);
      if (res.user && res.user.role === 'admin') { toast.success('Admin Protocol Engaged'); navigate('/admin-dashboard'); }
      else { toast.error('Invalid Credentials'); logout(); }
    } catch (err) { toast.error('Invalid Credentials'); }
    finally { setIsLoading(false); }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative p-4 overflow-hidden"
      style={{ 
        backgroundImage: 'url("https://image.slidesdocs.com/responsive-images/background/the-plane-is-flying-high-through-the-clouds-powerpoint-background_ab34e154dc__960_540.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px] pointer-events-none" />
      <div className="w-full max-w-md bg-white border border-gray-100 p-10 rounded-[40px] shadow-2xl relative z-10">
        <div className="flex flex-col items-center mb-8">
          <Logo className="mb-4" />
          <h2 className="text-3xl font-bold text-gray-900">Admin Access</h2>
          <p className="text-gray-500 text-sm mt-2 text-center">SkyFly Restricted Terminal</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label className="text-sm font-medium text-primary ml-1">Admin Identity</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" size={18} />
              <input type="email" placeholder="admin@gmail.com" className="w-full bg-surface border border-gray-100 rounded-2xl p-4 text-dark font-bold focus:border-primary transition-colors outline-none pl-12" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-primary ml-1">Passcode</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" size={18} />
              <input type={showPassword ? 'text' : 'password'} placeholder="Enter Passcode" className="w-full bg-surface border border-gray-100 rounded-2xl p-4 text-dark font-bold focus:border-primary transition-colors outline-none pl-12 pr-12" value={password} onChange={(e) => setPassword(e.target.value)} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/40 hover:text-secondary transition-colors">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-primary-deep text-white font-black uppercase tracking-widest text-[10px] py-4 rounded-2xl shadow-xl shadow-primary/20 transition-all active:scale-95 flex items-center justify-center space-x-2 group mt-4">
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : (<><span>Authenticate</span><ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>)}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
