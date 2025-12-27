
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CheckCircle, ShieldCheck, Zap, ArrowLeft, Star, Lock, ShoppingBag } from 'lucide-react';
import { supabase } from '../supabaseClient';
import { Product } from '../types';
import { DEMO_PRODUCTS } from '../constants.tsx';
import { useTheme } from '../App';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<string>('');
  const { theme } = useTheme();

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !data) {
        const demo = DEMO_PRODUCTS.find(p => p.id === id) || null;
        setProduct(demo);
        if (demo) setActiveImage(demo.image_url);
      } else {
        setProduct(data);
        setActiveImage(data.image_url);
      }
      setLoading(false);
      window.scrollTo(0, 0);
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-black text-white">Loading Asset Data...</div>;
  if (!product) return <div className="min-h-screen flex items-center justify-center bg-black text-white">Asset not found.</div>;

  const handleBuyNow = () => {
    window.open(product.payment_link, '_blank');
  };

  const gallery = product.images && product.images.length > 0 ? product.images : [product.image_url];

  return (
    <div className={`min-h-screen py-12 md:py-24 px-4 ${theme === 'dark' ? 'dark-grid' : 'light-grid'}`}>
      <div className="max-w-7xl mx-auto">
        <button 
          onClick={() => window.history.back()}
          className="flex items-center text-zinc-500 hover:text-blue-400 transition-all mb-12 font-black uppercase tracking-widest text-xs"
        >
          <ArrowLeft size={18} className="mr-2" /> Back to Collection
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Side: Gallery */}
          <div className="space-y-8 fade-in-section">
            <div className="aspect-video rounded-[3rem] overflow-hidden border-2 border-zinc-900 shadow-2xl group">
              <img 
                src={activeImage} 
                alt={product.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            
            {/* Gallery Thumbnails */}
            {gallery.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {gallery.map((img, i) => (
                  <button 
                    key={i}
                    onClick={() => setActiveImage(img)}
                    className={`w-24 h-24 rounded-2xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                      activeImage === img ? 'border-blue-500 scale-105' : 'border-zinc-900 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            <div className="p-10 rounded-[3rem] bg-zinc-950/60 border-2 border-zinc-900 backdrop-blur-md">
              <h3 className="text-2xl font-black mb-8 flex items-center text-white">
                <Lock size={24} className="text-blue-500 mr-3" /> Inside the Vault
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(product.features || ['Elite Strategies', 'Lifetime Access', 'Premium Resources', 'Direct Support']).map((feat, i) => (
                  <li key={i} className="flex items-center space-x-3">
                    <div className="bg-green-500/10 p-1 rounded-full"><CheckCircle size={18} className="text-green-500" /></div>
                    <span className="text-zinc-400 font-bold">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Side: Copy & CTA */}
          <div className="space-y-10 fade-in-section" style={{animationDelay: '0.2s'}}>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <span className="px-5 py-2 rounded-full bg-blue-600/20 text-blue-400 text-xs font-black uppercase tracking-[0.2em] border border-blue-500/20">
                  {product.category}
                </span>
                <div className="flex items-center space-x-1 text-yellow-500">
                  <Star size={18} fill="currentColor" />
                  <span className="font-black text-sm uppercase tracking-widest ml-1">4.9/5 Elite Tier</span>
                </div>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black mb-6 leading-[0.9] text-white tracking-tighter">
                {product.title}
              </h1>
              
              <p className={`text-xl font-medium leading-relaxed ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                {product.description}
              </p>
            </div>

            <div className={`p-10 rounded-[3.5rem] border-2 transition-all hover:border-blue-500/30 ${
              theme === 'dark' ? 'bg-[#0a0a0a] border-zinc-900 shadow-2xl' : 'bg-zinc-50 border-zinc-100 shadow-xl'
            }`}>
              <div className="flex flex-col mb-10">
                <span className="text-xs font-black text-zinc-500 uppercase tracking-[0.3em] block mb-2">Investment</span>
                <div className="flex items-baseline space-x-3">
                  <span className={`text-6xl font-black neon-green-glow-text ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-zinc-500 text-sm font-bold uppercase tracking-widest">Single Payment</span>
                </div>
              </div>

              <button 
                onClick={handleBuyNow}
                className="w-full py-7 rounded-[2rem] bg-blue-600 hover:bg-blue-700 text-white font-black text-2xl transition-all neon-blue-glow transform active:scale-95 flex items-center justify-center group"
              >
                Unlock Access <ShoppingBag className="ml-3 group-hover:scale-110 transition-transform" size={28} />
              </button>

              <div className="mt-8 grid grid-cols-2 gap-4 text-[10px] font-black uppercase tracking-widest text-zinc-500 text-center">
                <div className="flex items-center justify-center bg-zinc-900/50 py-3 rounded-xl border border-zinc-800">
                  <ShieldCheck size={14} className="mr-2 text-blue-400" /> Secure Checkout
                </div>
                <div className="flex items-center justify-center bg-zinc-900/50 py-3 rounded-xl border border-zinc-800">
                  <Zap size={14} className="mr-2 text-blue-400" /> Instant Vault Entry
                </div>
              </div>
            </div>
            
            <div className="text-center p-6 border-2 border-dashed border-zinc-900 rounded-[2rem]">
               <p className="text-zinc-600 text-sm font-bold italic italic">Join 500+ successful entrepreneurs who recently purchased this asset.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
