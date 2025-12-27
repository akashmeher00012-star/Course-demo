
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { Product } from '../types';
import { DEMO_PRODUCTS } from '../constants.tsx';
import ProductCard from '../components/ProductCard';
import { useTheme } from '../App';
import { Sparkles, TrendingUp, Zap, ChevronRight, Play } from 'lucide-react';

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error || !data || data.length === 0) {
        setProducts(DEMO_PRODUCTS);
      } else {
        setProducts(data);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  return (
    <div className={`transition-all duration-500 min-h-screen ${theme === 'dark' ? 'dark-grid' : 'light-grid'}`}>
      {/* Hero Section */}
      <section className="relative pt-24 pb-24 md:pt-40 md:pb-48 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10 fade-in-section">
          <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 px-6 py-2.5 rounded-full mb-10 backdrop-blur-md">
            <Sparkles size={18} className="text-blue-400 animate-pulse" />
            <span className="text-blue-400 text-xs font-black uppercase tracking-[0.2em]">New Assets Unlocked Daily</span>
          </div>
          
          <h1 className="text-6xl md:text-9xl font-black mb-8 tracking-tighter leading-[0.9] text-white">
            Elite Marketplace <br className="hidden lg:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-400 to-green-400 animate-gradient">Digital Assets</span>
          </h1>
          
          <div className="max-w-3xl mx-auto mb-12">
            <p className={`text-xl md:text-2xl font-medium mb-4 ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}>
              Premium courses, AI tools, and digital products designed to scale your online income.
            </p>
            <p className="text-zinc-500 text-lg">
              Instant access • Secure payments • Mobile-first experience
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-5 sm:space-y-0 sm:space-x-8">
            <button 
              onClick={() => navigate('/category/Course')}
              className="w-full sm:w-auto px-12 py-6 rounded-[2rem] bg-blue-600 hover:bg-blue-700 text-white font-black text-xl transition-all transform hover:scale-110 neon-blue-glow flex items-center justify-center group"
            >
              Start Earning <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={24} />
            </button>
            <button 
              onClick={() => navigate('/category/Digital Product')}
              className={`w-full sm:w-auto px-12 py-6 rounded-[2rem] font-black text-xl border-2 transition-all transform hover:scale-110 flex items-center justify-center ${
                theme === 'dark' ? 'border-zinc-800 bg-zinc-950/50 hover:bg-zinc-900 text-white' : 'border-zinc-200 bg-white hover:bg-zinc-50 text-black shadow-lg'
              }`}
            >
              <Play size={20} className="mr-3 fill-current" /> Explore Assets
            </button>
          </div>

          <div className="mt-20 flex justify-center">
             <div className="glow-divider w-full max-w-lg opacity-50"></div>
          </div>
        </div>

        {/* Ambient background glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-blue-600/10 blur-[160px] rounded-full -z-10"></div>
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-cyan-500/10 blur-[140px] rounded-full -z-10"></div>
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-green-500/10 blur-[140px] rounded-full -z-10"></div>
      </section>

      {/* Featured Products Grid */}
      <section className="max-w-7xl mx-auto px-4 py-24 relative z-10 fade-in-section">
        <div className="flex flex-col md:flex-row justify-between items-center mb-20 space-y-6 md:space-y-0 text-center md:text-left">
          <div>
            <h2 className="text-5xl md:text-6xl font-black mb-4 tracking-tight text-white">Premium Collection</h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mx-auto md:mx-0 mb-4"></div>
            <p className="text-zinc-500 text-xl font-medium">Curated high-performance assets for modern creators.</p>
          </div>
          <button 
            onClick={() => navigate('/category/Course')}
            className="px-8 py-3 rounded-full border border-zinc-800 hover:border-blue-500/50 hover:bg-blue-500/5 text-zinc-400 hover:text-blue-400 font-bold transition-all"
          >
            View All Vault
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse bg-zinc-900/50 h-[500px] rounded-[2.5rem] border border-zinc-800"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
      
      {/* Social Proof Stats */}
      <section className="px-4 py-20 bg-zinc-950/40 border-y border-zinc-900 mb-20">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { value: '10K+', label: 'Active Learners' },
            { value: '500+', label: 'Digital Assets' },
            { value: '4.9/5', label: 'Average Rating' },
            { value: '₹50Cr+', label: 'Student Earnings' },
          ].map((stat, i) => (
            <div key={i} className="space-y-2">
              <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500">{stat.value}</div>
              <div className="text-zinc-500 font-bold uppercase tracking-widest text-xs">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 py-24 pb-48">
        <div className={`p-12 md:p-24 rounded-[3rem] border-2 relative overflow-hidden text-center transition-all hover:scale-[1.01] ${
          theme === 'dark' ? 'bg-[#050505] border-zinc-900' : 'bg-zinc-50 border-zinc-200 shadow-2xl shadow-blue-500/10'
        }`}>
           <div className="relative z-10">
             <h2 className="text-5xl md:text-7xl font-black mb-8 leading-none">Your Future <br /> Starts Today</h2>
             <p className="text-zinc-500 text-xl max-w-2xl mx-auto mb-12 font-medium">Join the elite circle of digital entrepreneurs leveraging our premium resources to build six-figure brands.</p>
             <button 
              onClick={() => navigate('/signup')}
              className="px-16 py-7 bg-blue-600 hover:bg-blue-700 text-white rounded-[2.5rem] font-black text-2xl transition-all neon-blue-glow transform hover:scale-110 active:scale-95"
             >
              Create Account
             </button>
           </div>
           
           {/* Decorative elements inside CTA */}
           <div className="absolute top-[-50px] left-[-50px] w-64 h-64 bg-blue-600/10 rounded-full blur-[80px]"></div>
           <div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[100px]"></div>
        </div>
      </section>
    </div>
  );
};

export default Home;
