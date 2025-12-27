
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowRight, Zap } from 'lucide-react';
import { Product } from '../types';
import { useTheme } from '../App';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { theme } = useTheme();

  return (
    <div className={`group relative rounded-[2.5rem] overflow-hidden transition-all duration-500 border-2 glass-card h-full flex flex-col ${
      theme === 'dark' 
        ? 'border-zinc-900 hover:border-blue-500/40' 
        : 'border-zinc-100 hover:border-blue-500/40 shadow-2xl shadow-blue-500/5'
    }`}>
      {/* Thumbnail */}
      <div className="aspect-[4/3] overflow-hidden relative">
        <img 
          src={product.image_url} 
          alt={product.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute top-6 right-6">
          <span className="bg-blue-600/20 backdrop-blur-xl text-blue-400 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full border border-blue-500/30">
            {product.category}
          </span>
        </div>
        {product.category === 'Offer' && (
          <div className="absolute top-6 left-6">
            <span className="bg-green-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full flex items-center shadow-lg">
              <Zap size={12} className="mr-1 fill-current" /> Special
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-8 flex-grow flex flex-col justify-between">
        <div>
          <div className="flex items-center space-x-1 mb-4">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} size={14} className="text-yellow-500 fill-yellow-500 drop-shadow-md" />
            ))}
            <span className="text-[10px] font-black text-zinc-500 ml-2 uppercase tracking-widest">Premium Rated</span>
          </div>
          
          <h3 className={`text-2xl font-black mb-3 line-clamp-1 transition-colors leading-tight ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
            {product.title}
          </h3>
          
          <p className="text-zinc-500 font-medium mb-8 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-zinc-800/40">
          <div className="flex flex-col">
            <span className="text-[10px] text-zinc-500 uppercase font-black tracking-[0.2em] mb-1">Valuation</span>
            <span className={`text-3xl font-black neon-green-glow-text ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
              ₹{product.price.toLocaleString('en-IN')}
            </span>
          </div>
          
          <Link 
            to={`/product/${product.id}`}
            className="flex items-center justify-center h-14 w-14 group-hover:w-40 rounded-2xl bg-blue-600 text-white hover:bg-blue-700 transition-all duration-500 neon-blue-glow overflow-hidden"
          >
            <span className="hidden group-hover:inline font-black text-lg mr-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">View Vault</span>
            <ArrowRight size={24} className="flex-shrink-0" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
