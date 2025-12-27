
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { Product, Category } from '../types';
import { DEMO_PRODUCTS } from '../constants.tsx';
import ProductCard from '../components/ProductCard';
import { useTheme } from '../App';

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', category)
        .eq('is_active', true);

      if (error || !data || data.length === 0) {
        setProducts(DEMO_PRODUCTS.filter(p => p.category === category));
      } else {
        setProducts(data);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [category]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="mb-12">
        <h1 className="text-4xl font-black mb-2">{category}s</h1>
        <p className="text-zinc-500">Explore our curated collection of {category.toLowerCase()}s.</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="animate-pulse bg-zinc-800 h-96 rounded-2xl"></div>
          ))}
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-xl text-zinc-500">No products found in this category yet.</p>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
