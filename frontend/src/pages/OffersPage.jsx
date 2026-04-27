import React from 'react';
import { Tag, Copy, Plane, Gift, Clock, ShieldCheck, Zap, Globe, Sparkles } from 'lucide-react';
import MainLayout from '../components/MainLayout';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const OfferCard = ({ title, description, code, image, category, discount }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    toast.success(`Code ${code} copied!`);
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden group border-surface hover:border-primary/30 transition-all duration-500"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-deep via-primary-deep/40 to-transparent" />
        <div className="absolute top-4 left-4 bg-secondary text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
          {category}
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-3xl font-black text-white italic">{discount}</p>
        </div>
      </div>
      
      <div className="p-6 space-y-4 bg-white">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-500 leading-relaxed font-medium">{description}</p>
        </div>
        
        <div className="flex items-center justify-between p-3 bg-surface rounded-2xl border border-dashed border-gray-100 group-hover:border-secondary transition-colors">
          <div>
            <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Promo Code</p>
            <p className="text-sm font-black text-primary tracking-[0.2em]">{code}</p>
          </div>
          <button 
            onClick={handleCopy}
            className="p-3 bg-white text-secondary hover:bg-secondary hover:text-white rounded-xl transition-all active:scale-90 border border-gray-100 shadow-sm"
          >
            <Copy size={18} />
          </button>
        </div>
        
        <button className="w-full py-4 bg-accent hover:bg-accent-deep text-white rounded-2xl shadow-xl shadow-accent/20 transition-all active:scale-95 text-[10px] font-black uppercase tracking-widest flex items-center justify-center space-x-2">
          <span>Apply Now</span>
          <Zap size={14} className="fill-current" />
        </button>
      </div>
    </motion.div>
  );
};

const OffersPage = () => {
  const offers = [
    {
      title: 'Summer Getaway',
      description: 'Get exclusive discounts on all domestic beach destinations. Valid for travel until August 31st.',
      code: 'SUMMER20',
      discount: '20% OFF',
      category: 'Domestic',
      image: '/summer_beach_offer_1777210906423.png'
    },
    {
      title: 'International Explorer',
      description: 'Explore the world for less. Flat discount on your first international flight booking this season.',
      code: 'GLOBE15',
      discount: '15% OFF',
      category: 'International',
      image: '/international_city_offer_1777211013432.png'
    },
    {
      title: 'Business Class Upgrade',
      description: 'Experience luxury at a fraction of the cost. Upgrade your seat and fly in ultimate comfort.',
      code: 'LUXFLY',
      discount: 'UP TO $200',
      category: 'Premium',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=400'
    },
    {
      title: 'Weekend Flash Sale',
      description: 'Spontaneous trip? Book this weekend and get additional cashback on your SkyFly wallet.',
      code: 'FLASH40',
      discount: '40% CASHBACK',
      category: 'Flash Sale',
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=400'
    }
  ];

  return (
    <MainLayout>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-surface rounded-full border border-gray-100 text-secondary mb-2">
            <Sparkles size={14} />
            <span className="text-[10px] font-black uppercase tracking-widest">Exclusive Deals</span>
          </div>
          <h2 className="text-4xl font-black tracking-tight text-gray-900 uppercase">Travel <span className="text-secondary">Offers</span></h2>
          <p className="text-sm text-gray-500 font-medium max-w-xs mx-auto">Handpicked deals and promo codes just for you.</p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {offers.map((offer, i) => (
            <motion.div
              key={offer.code}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <OfferCard {...offer} />
            </motion.div>
          ))}
        </div>

        {/* Quick Features */}
        <div className="grid grid-cols-3 gap-4 pt-4">
           {[
             { icon: Clock, label: 'Limited Time' },
             { icon: ShieldCheck, label: 'Verified' },
             { icon: Globe, label: 'Global' }
           ].map((item, i) => (
             <div key={i} className="bg-white border border-gray-100 rounded-3xl shadow-sm p-4 flex flex-col items-center space-y-2 text-center">
                <item.icon size={20} className="text-secondary" />
                <span className="text-[8px] font-black uppercase tracking-widest text-gray-400">{item.label}</span>
             </div>
           ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default OffersPage;
