import React, { useState, useRef } from 'react';
import { 
  User, BookOpen, HelpCircle, Gift, Tag, Share2, Star, ShieldCheck, FileText, LogOut, 
  ChevronRight, Edit2, X, Plane, Bell, CheckCircle2, Heart, Award, Copy, ExternalLink
} from 'lucide-react';
import MainLayout from '../components/MainLayout';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const MenuItem = ({ icon: Icon, title, onClick, color = "text-secondary" }) => (
  <button 
    onClick={onClick}
    className="w-full flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:bg-gray-50 transition-all group active:scale-[0.98]"
  >
    <div className="flex items-center space-x-4">
      <div className={`p-2 rounded-xl bg-surface group-hover:bg-gray-100 transition-colors ${color}`}>
        <Icon size={20} />
      </div>
      <span className="text-sm font-semibold tracking-wide text-dark">{title}</span>
    </div>
    <ChevronRight size={18} className="text-gray-300 group-hover:text-primary transition-colors" />
  </button>
);

const Modal = ({ isOpen, onClose, title, children }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-dark/40 backdrop-blur-sm" />
        <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-md bg-white rounded-[32px] overflow-hidden shadow-2xl border border-gray-100">
          <div className="p-6 flex justify-between items-center border-b border-gray-50">
             <h3 className="text-lg font-bold text-dark">{title}</h3>
             <button onClick={onClose} className="p-2 hover:bg-surface rounded-full text-gray-400 hover:text-primary transition-colors"><X size={20} /></button>
          </div>
          <div className="p-6">{children}</div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: user?.name || 'Vinay',
    image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200'
  });

  const [modals, setModals] = useState({
    edit: false,
    rewards: false,
    share: false,
    rate: false,
    notifications: false,
    legal: false,
    privacy: false,
    help: false
  });

  const fileInputRef = useRef(null);

  const openModal = (key) => setModals(prev => ({ ...prev, [key]: true }));
  const closeModal = (key) => setModals(prev => ({ ...prev, [key]: false }));

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, image: reader.result }));
        toast.success('Profile picture updated!');
      };
      reader.readAsDataURL(file);
    }
  };

  const shareApp = async () => {
    const shareData = { title: 'SkyFly', text: 'Book your next adventure with SkyFly!', url: window.location.origin };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch (err) { console.log('Share canceled'); }
    } else {
      navigator.clipboard.writeText(shareData.url);
      toast.success('Link copied to clipboard!');
    }
  };

  const handleRating = (stars) => {
    toast.success(`Thank you for rating us ${stars} stars!`);
    closeModal('rate');
  };

  return (
    <MainLayout>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
        {/* Profile Card */}
        <div className="bg-white border border-gray-100 p-8 rounded-[40px] flex flex-col items-center relative overflow-hidden shadow-sm">
           <div className="absolute top-4 right-4">
              <button className="p-2.5 rounded-xl bg-surface border border-gray-100 text-primary shadow-sm hover:bg-gray-100 transition-colors">
                <Bell size={18} />
              </button>
           </div>
           
           <div className="relative group">
              <div className="w-32 h-32 rounded-full border-4 border-gray-50 p-1 bg-gradient-to-tr from-primary to-secondary shadow-xl">
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center overflow-hidden">
                   <img src={profile.image} alt="Avatar" className="w-full h-full object-cover" />
                </div>
              </div>
              <button onClick={() => fileInputRef.current.click()} className="absolute bottom-1 right-1 p-3 bg-primary rounded-full shadow-lg border-2 border-white hover:scale-110 transition-transform active:scale-95">
                <Edit2 size={14} className="text-white" />
              </button>
              <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
           </div>
           
           <div className="mt-6 text-center">
              <h2 className="text-2xl font-black tracking-tight text-dark uppercase">{profile.name}</h2>
              <div className="flex items-center justify-center space-x-2 mt-1">
                 <Award size={14} className="text-accent" />
                 <p className="text-[10px] text-primary tracking-[0.3em] font-black uppercase">Prime Member</p>
              </div>
           </div>
           
           <button onClick={() => openModal('edit')} className="mt-8 py-3.5 px-12 text-[10px] bg-primary hover:bg-primary-deep text-white rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-primary/20">
              Edit Profile
           </button>
        </div>

        {/* Menu Sections */}
        <div className="space-y-8">
           <div className="space-y-3">
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-2">General</h3>
              <div className="space-y-2">
                 <MenuItem icon={BookOpen} title="Your Bookings" onClick={() => navigate('/bookings')} />
                 <MenuItem icon={HelpCircle} title="Help Center" onClick={() => openModal('help')} />
                 <MenuItem icon={Gift} title="Rewards" color="text-accent" onClick={() => openModal('rewards')} />
                 <MenuItem icon={Tag} title="Offers" color="text-secondary" onClick={() => navigate('/offers')} />
              </div>
           </div>

           <div className="space-y-3">
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-2">App Support</h3>
              <div className="space-y-2">
                 <MenuItem icon={Share2} title="Share App" onClick={() => openModal('share')} />
                 <MenuItem icon={Star} title="Rate Us" color="text-accent" onClick={() => openModal('rate')} />
              </div>
           </div>

           <div className="space-y-3">
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-2">Legal</h3>
              <div className="space-y-2">
                 <MenuItem icon={FileText} title="Terms & Conditions" onClick={() => openModal('legal')} />
                 <MenuItem icon={ShieldCheck} title="Privacy Policy" onClick={() => openModal('privacy')} />
              </div>
        </div>
        </div>

        <button onClick={logout} className="w-full flex items-center justify-center space-x-3 p-5 bg-red-50 hover:bg-red-100 text-red-600 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all border border-red-100">
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </div>

      {/* MODALS */}
      
      {/* Edit Profile */}
      <Modal isOpen={modals.edit} onClose={() => closeModal('edit')} title="Edit Profile">
         <div className="space-y-6">
            <div className="space-y-2">
               <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Display Name</label>
               <input 
                 type="text" 
                 value={profile.name} 
                 onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                 className="w-full bg-surface border border-gray-100 rounded-2xl p-4 text-dark font-bold focus:border-primary transition-colors outline-none"
               />
            </div>
            <button onClick={() => { toast.success('Profile updated!'); closeModal('edit'); }} className="w-full bg-primary hover:bg-primary-deep text-white rounded-2xl shadow-lg shadow-primary/20 transition-all active:scale-95 py-4 font-black uppercase tracking-widest text-xs">Save Changes</button>
         </div>
      </Modal>

       {/* Rewards */}
      <Modal isOpen={modals.rewards} onClose={() => closeModal('rewards')} title="SkyFly Rewards">
         <div className="space-y-6 text-center">
            <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center mx-auto border-4 border-gray-100">
               <Gift className="text-accent" size={40} />
            </div>
            <div>
               <p className="text-3xl font-black text-dark tracking-tight">2,450</p>
               <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mt-1">SkyPoints Available</p>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
               <div className="w-3/4 h-full bg-secondary"></div>
            </div>
            <p className="text-xs text-gray-500 font-medium">You're 550 points away from your next free flight!</p>
         </div>
      </Modal>

      {/* Share */}
      <Modal isOpen={modals.share} onClose={() => closeModal('share')} title="Invite Friends">
         <div className="space-y-6 text-center">
            <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center mx-auto">
               <Share2 className="text-secondary" size={32} />
            </div>
            <p className="text-sm text-gray-600 font-medium">Share SkyFly with your friends and earn 500 SkyPoints when they book their first flight!</p>
            <div className="flex space-x-4">
               <button onClick={shareApp} className="flex-1 bg-primary hover:bg-primary-deep text-white rounded-2xl shadow-lg shadow-primary/20 transition-all active:scale-95 py-4 text-xs font-black uppercase tracking-widest flex items-center justify-center space-x-2">
                  <ExternalLink size={16} />
                  <span>Share Link</span>
               </button>
            </div>
         </div>
      </Modal>

      {/* Rate Us */}
      <Modal isOpen={modals.rate} onClose={() => closeModal('rate')} title="Rate Your Experience">
         <div className="space-y-6 text-center">
            <p className="text-sm text-gray-600 font-medium">Enjoying SkyFly? Let us know how we're doing!</p>
            <div className="flex justify-center space-x-3">
               {[1, 2, 3, 4, 5].map(s => (
                  <button key={s} onClick={() => handleRating(s)} className="p-2 hover:scale-125 transition-transform text-accent hover:text-accent-deep">
                     <Star size={32} fill={s <= 4 ? "currentColor" : "none"} />
                  </button>
               ))}
            </div>
            <textarea placeholder="Tell us more (Optional)" className="w-full bg-surface border border-gray-100 rounded-2xl p-4 text-dark font-bold focus:border-primary transition-colors outline-none h-24 text-sm" />
            <button onClick={() => { toast.success('Feedback submitted!'); closeModal('rate'); }} className="w-full bg-primary hover:bg-primary-deep text-white rounded-2xl shadow-lg shadow-primary/20 transition-all active:scale-95 py-4 font-black uppercase tracking-widest text-xs">Submit Review</button>
         </div>
      </Modal>

      {/* Legal */}
      <Modal isOpen={modals.legal} onClose={() => closeModal('legal')} title="Terms & Conditions">
         <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
            {[
              "Users must provide accurate personal and travel information while booking tickets.",
              "All bookings are subject to availability and confirmation from airlines.",
              "Prices displayed are subject to change without prior notice.",
              "The platform acts only as an intermediary between users and airlines.",
              "Cancellation and refund policies depend on airline rules.",
              "The platform is not responsible for flight delays, cancellations, or schedule changes.",
              "Users are responsible for checking travel documents and eligibility.",
              "Payment once made is subject to refund rules mentioned in the cancellation policy.",
              "Any misuse of the platform may result in account suspension.",
              "By using this app, users agree to all terms mentioned above."
            ].map((point, i) => (
              <div key={i} className="flex space-x-3 p-3 bg-surface rounded-2xl border border-gray-100">
                 <span className="text-primary font-black text-xs">{i + 1}.</span>
                 <p className="text-xs text-gray-600 font-medium leading-relaxed">{point}</p>
              </div>
            ))}
         </div>
      </Modal>

      {/* Privacy Policy */}
      <Modal isOpen={modals.privacy} onClose={() => closeModal('privacy')} title="Privacy Policy">
         <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {[
              { 
                title: "1. Information We Collect", 
                content: "We collect personal information such as name, email address, phone number, and booking details when users make a reservation on our platform." 
              },
              { 
                title: "2. How We Use Your Information", 
                content: "Your information is used to: process flight bookings, provide booking confirmations and updates, improve user experience, and communicate important notifications." 
              },
              { 
                title: "3. Payment Information", 
                content: "We do not store your payment details. All payments are processed securely through third-party payment gateways." 
              },
              { 
                title: "4. Data Storage and Security", 
                content: "User data is stored securely in our database (MongoDB). We implement reasonable security measures to protect your information from unauthorized access." 
              },
              { 
                title: "5. Data Sharing", 
                content: "We may share necessary information with airlines and service providers only for booking purposes. We do not sell or rent your personal data to third parties." 
              },
              { 
                title: "6. Cookies and Tracking", 
                content: "Our app may use cookies or similar technologies to improve performance and user experience." 
              },
              { 
                title: "7. User Rights", 
                content: "Users can request to update or delete their personal data by contacting us." 
              },
              { 
                title: "8. Third-Party Services", 
                content: "Our platform may contain links or integrations with third-party services. We are not responsible for their privacy practices." 
              },
              { 
                title: "9. Policy Updates", 
                content: "We may update this privacy policy from time to time. Changes will be reflected within the app." 
              },
              { 
                title: "10. Contact Us", 
                content: "If you have any questions about this privacy policy, please contact us at: support@skyfly.com" 
              }
            ].map((section, i) => (
              <div key={i} className="space-y-2">
                 <h4 className="text-sm font-bold text-primary uppercase tracking-widest">{section.title}</h4>
                 <p className="text-xs text-gray-500 font-medium leading-relaxed">{section.content}</p>
              </div>
            ))}
         </div>
      </Modal>
      
      {/* Help Center */}
      <Modal isOpen={modals.help} onClose={() => closeModal('help')} title="Help Center">
         <div className="space-y-6">
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
               {[
                 { q: "How to book a flight?", a: "Go to the Book section, select your destination and date, and follow the steps." },
                 { q: "Can I cancel my booking?", a: "Yes, you can cancel from the 'My Bookings' section, subject to airline policies." },
                 { q: "How to earn SkyPoints?", a: "You earn points with every booking and by referring friends." },
                 { q: "Need technical support?", a: "Contact us at support@skyfly.com for any app-related issues." }
               ].map((item, i) => (
                 <div key={i} className="p-4 bg-surface rounded-2xl border border-gray-100 space-y-2">
                    <p className="text-xs font-black text-primary uppercase tracking-widest">{item.q}</p>
                    <p className="text-xs text-gray-500 font-medium leading-relaxed">{item.a}</p>
                 </div>
               ))}
            </div>
            <button 
              onClick={() => window.location.reload()} 
              className="w-full bg-secondary hover:bg-secondary-deep text-white rounded-2xl shadow-lg shadow-secondary/20 transition-all active:scale-95 py-4 font-black uppercase tracking-widest text-xs flex items-center justify-center space-x-2"
            >
              <LogOut size={16} className="rotate-90" />
              <span>Reload Help Data</span>
            </button>
         </div>
      </Modal>

    </MainLayout>
  );
};

export default ProfilePage;
