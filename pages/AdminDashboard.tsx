
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Product, Category } from '../types';
import { Plus, Edit, Trash2, Eye, EyeOff, Save, X, ExternalLink, ListChecks, Image as ImageIcon, Upload, Loader2, Check } from 'lucide-react';
import { useTheme } from '../App';

const AdminDashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (successToast) {
      const timer = setTimeout(() => setSuccessToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [successToast]);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) setProducts(data);
    setLoading(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const uploadedUrls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `product-images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file);

      if (uploadError) {
        alert(`Error uploading image: ${uploadError.message}`);
        continue;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      uploadedUrls.push(publicUrl);
    }

    if (editingProduct) {
      const existingImages = editingProduct.images || [];
      const newImages = [...existingImages, ...uploadedUrls].slice(0, 5); // Limit to 5
      setEditingProduct({
        ...editingProduct,
        images: newImages,
        image_url: editingProduct.image_url || newImages[0] || ''
      });
    }
    setUploading(false);
  };

  const removeImage = (index: number) => {
    if (!editingProduct || !editingProduct.images) return;
    const newImages = [...editingProduct.images];
    newImages.splice(index, 1);
    setEditingProduct({
      ...editingProduct,
      images: newImages,
      image_url: newImages[0] || ''
    });
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    const payload = {
      ...editingProduct,
      is_active: editingProduct.is_active ?? true,
      image_url: editingProduct.images && editingProduct.images.length > 0 ? editingProduct.images[0] : editingProduct.image_url
    };

    let error;
    if (editingProduct.id) {
      const { error: updateError } = await supabase
        .from('products')
        .update(payload)
        .eq('id', editingProduct.id);
      error = updateError;
    } else {
      const { error: insertError } = await supabase
        .from('products')
        .insert([payload]);
      error = insertError;
    }

    if (!error) {
      setIsModalOpen(false);
      setEditingProduct(null);
      setSuccessToast(editingProduct.id ? 'Asset updated successfully!' : 'New asset created!');
      fetchProducts();
    } else {
      alert(error.message);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!window.confirm('CRITICAL ACTION: Are you sure you want to delete this asset forever?')) return;
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (!error) {
      setSuccessToast('Asset deleted successfully');
      fetchProducts();
    }
  };

  const toggleVisibility = async (product: Product) => {
    const { error } = await supabase
      .from('products')
      .update({ is_active: !product.is_active })
      .eq('id', product.id);
    if (!error) {
      setSuccessToast(`Asset is now ${!product.is_active ? 'LIVE' : 'DRAFT'}`);
      fetchProducts();
    }
  };

  const openAddModal = () => {
    setEditingProduct({
      title: '',
      description: '',
      price: 0,
      images: [],
      image_url: '',
      category: 'Course',
      payment_link: '',
      is_active: true,
      features: []
    });
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div className={`min-h-screen py-12 md:py-24 px-4 bg-black`}>
      {/* Toast */}
      {successToast && (
        <div className="fixed top-24 right-4 z-[100] bg-green-600 text-white px-8 py-4 rounded-2xl font-black flex items-center shadow-2xl animate-bounce">
          <Check className="mr-3" /> {successToast}
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 space-y-6 md:space-y-0">
          <div className="text-center md:text-left">
            <h1 className="text-5xl md:text-7xl font-black mb-3 tracking-tighter text-white">Elite Console</h1>
            <p className="text-zinc-500 font-bold uppercase tracking-[0.3em] text-xs">Manage Your Digital Empire</p>
          </div>
          <button 
            onClick={openAddModal}
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-2xl font-black text-lg transition-all transform hover:scale-105 neon-blue-glow flex items-center justify-center"
          >
            <Plus size={24} className="mr-2" /> Forge New Asset
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 space-y-4">
               <Loader2 className="animate-spin text-blue-500" size={48} />
               <p className="text-zinc-500 font-black uppercase tracking-widest">Accessing Mainframe...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-32 border-4 border-dashed border-zinc-900 rounded-[3rem]">
               <ImageIcon size={64} className="mx-auto text-zinc-800 mb-6" />
               <h3 className="text-2xl font-black text-zinc-500 mb-4">The Vault is Empty</h3>
               <button onClick={openAddModal} className="text-blue-500 font-bold hover:underline">Add Your First Asset</button>
            </div>
          ) : (
            products.map(p => (
              <div key={p.id} className="group p-8 rounded-[2.5rem] border-2 border-zinc-900 bg-[#080808] hover:border-blue-500/30 transition-all flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                <div className="w-40 h-40 rounded-3xl overflow-hidden flex-shrink-0 border-2 border-zinc-900">
                  <img src={p.image_url} alt="" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                </div>
                
                <div className="flex-grow text-center md:text-left">
                  <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4 mb-2 justify-center md:justify-start">
                    <h3 className="text-3xl font-black text-white">{p.title}</h3>
                    <span className="bg-zinc-900 text-zinc-500 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{p.category}</span>
                  </div>
                  <p className="text-zinc-500 line-clamp-2 max-w-2xl mb-6 font-medium leading-relaxed">{p.description}</p>
                  
                  <div className="flex flex-wrap items-center gap-6 justify-center md:justify-start">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-zinc-600 font-black uppercase tracking-widest mb-1">Asset Value</span>
                      <span className="text-2xl font-black text-green-400 neon-green-glow-text">₹{p.price.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-zinc-600 font-black uppercase tracking-widest mb-1">Asset Status</span>
                      <button onClick={() => toggleVisibility(p)} className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${p.is_active ? 'bg-green-600/10 text-green-500' : 'bg-zinc-900 text-zinc-600'}`}>
                         {p.is_active ? 'LIVE IN VAULT' : 'DRAFT MODE'}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex md:flex-col space-x-2 md:space-x-0 md:space-y-2 w-full md:w-auto">
                   <button onClick={() => openEditModal(p)} className="flex-1 md:flex-none p-4 bg-zinc-900 hover:bg-blue-600 text-zinc-500 hover:text-white rounded-2xl transition-all flex items-center justify-center">
                      <Edit size={20} />
                   </button>
                   <button onClick={() => handleDeleteProduct(p.id)} className="flex-1 md:flex-none p-4 bg-zinc-900 hover:bg-red-600 text-zinc-500 hover:text-white rounded-2xl transition-all flex items-center justify-center">
                      <Trash2 size={20} />
                   </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && editingProduct && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => !uploading && setIsModalOpen(false)} />
          <div className="relative w-full max-w-3xl p-8 md:p-14 rounded-[4rem] border-2 border-zinc-900 bg-[#0a0a0a] overflow-y-auto max-h-[90vh] shadow-2xl">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-4xl font-black tracking-tighter text-white">{editingProduct.id ? 'Modify Asset' : 'Forge New Asset'}</h2>
              <button disabled={uploading} onClick={() => setIsModalOpen(false)} className="p-3 bg-zinc-900 rounded-full text-zinc-500 hover:text-white transition-all"><X size={28} /></button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-10">
              {/* Image Section */}
              <div className="space-y-4">
                <label className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500">Asset Visuals (Max 5)</label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                  {(editingProduct.images || []).map((img, idx) => (
                    <div key={idx} className="relative group aspect-square rounded-2xl overflow-hidden border-2 border-zinc-900">
                      <img src={img} className="w-full h-full object-cover" />
                      <button 
                        type="button" 
                        onClick={() => removeImage(idx)} 
                        className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                  {(editingProduct.images?.length || 0) < 5 && (
                    <label className={`aspect-square rounded-2xl border-2 border-dashed border-zinc-800 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500/50 hover:bg-blue-500/5 transition-all ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
                      {uploading ? <Loader2 className="animate-spin text-blue-500" /> : <Upload className="text-zinc-600" />}
                      <span className="text-[10px] font-black uppercase tracking-widest mt-2 text-zinc-600">Upload</span>
                      <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
                    </label>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-widest text-zinc-500">Title</label>
                  <input required value={editingProduct.title || ''} onChange={e => setEditingProduct({...editingProduct, title: e.target.value})} className="w-full p-6 rounded-2xl bg-zinc-900 border-2 border-zinc-800 focus:border-blue-500 transition-all font-black text-xl text-white outline-none" />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-widest text-zinc-500">Price (₹)</label>
                  <input type="number" required value={editingProduct.price || 0} onChange={e => setEditingProduct({...editingProduct, price: Number(e.target.value)})} className="w-full p-6 rounded-2xl bg-zinc-900 border-2 border-zinc-800 focus:border-blue-500 transition-all font-black text-2xl text-green-400 outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-widest text-zinc-500">Category</label>
                  <select value={editingProduct.category || 'Course'} onChange={e => setEditingProduct({...editingProduct, category: e.target.value as Category})} className="w-full p-6 rounded-2xl bg-zinc-900 border-2 border-zinc-800 focus:border-blue-500 transition-all font-black text-lg text-white outline-none">
                    <option value="Course">Course</option>
                    <option value="Digital Product">Digital Product</option>
                    <option value="Offer">Offer</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-widest text-zinc-500">Payment Gateway Link</label>
                  <div className="relative">
                    <input required value={editingProduct.payment_link || ''} onChange={e => setEditingProduct({...editingProduct, payment_link: e.target.value})} className="w-full p-6 pr-14 rounded-2xl bg-zinc-900 border-2 border-zinc-800 focus:border-blue-500 transition-all font-bold text-white outline-none" placeholder="https://rzp.io/l/..." />
                    <ExternalLink size={20} className="absolute right-6 top-1/2 -translate-y-1/2 text-zinc-600" />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-widest text-zinc-500">Briefing (Description)</label>
                <textarea required rows={4} value={editingProduct.description || ''} onChange={e => setEditingProduct({...editingProduct, description: e.target.value})} className="w-full p-6 rounded-2xl bg-zinc-900 border-2 border-zinc-800 focus:border-blue-500 transition-all font-medium text-lg text-zinc-300 outline-none" />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-widest text-zinc-500">Key Deliverables (One per line)</label>
                <textarea rows={3} value={(editingProduct.features || []).join('\n')} onChange={e => setEditingProduct({...editingProduct, features: e.target.value.split('\n').filter(f => f.trim() !== '')})} className="w-full p-6 rounded-2xl bg-zinc-900 border-2 border-zinc-800 focus:border-blue-500 transition-all font-medium text-lg text-zinc-300 outline-none" placeholder="Instant access&#10;Lifetime updates" />
              </div>

              <div className="pt-8 flex flex-col sm:flex-row gap-6">
                <button type="submit" disabled={uploading} className="flex-1 py-6 bg-blue-600 hover:bg-blue-700 text-white rounded-[2rem] font-black text-2xl transition-all neon-blue-glow transform hover:scale-105 active:scale-95 disabled:opacity-50">
                   <Save className="inline mr-2" size={24} /> Commit to Vault
                </button>
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-6 border-2 border-zinc-800 hover:bg-zinc-900 text-zinc-500 rounded-[2rem] font-black text-2xl transition-all">
                   Discard
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
