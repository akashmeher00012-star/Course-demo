
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sun, Moon, Menu, X, User, LogOut } from 'lucide-react';
import { useTheme } from '../App';
import { NAV_ITEMS } from '../constants.tsx';
import { supabase } from '../supabaseClient';

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => authListener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      theme === 'dark' ? 'bg-black/80 border-b border-zinc-800' : 'bg-white/80 border-b border-zinc-200'
    } backdrop-blur-md`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className={`text-xl font-bold tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
              DP<span className="text-blue-500">MARKET</span><span className="text-green-500">PRO</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`transition-colors ${
                  location.pathname === item.path
                    ? 'text-blue-500'
                    : theme === 'dark' ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-black'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors ${
                theme === 'dark' ? 'hover:bg-zinc-800 text-zinc-400' : 'hover:bg-zinc-100 text-zinc-600'
              }`}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/admin" className="text-sm font-medium hover:underline">Admin</Link>
                <button onClick={handleLogout} className="text-zinc-400 hover:text-red-500"><LogOut size={20} /></button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-sm font-medium">Login</Link>
                <Link 
                  to="/signup" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all neon-blue-glow"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            <button onClick={toggleTheme} className="p-2">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-40 md:hidden transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div 
          className="absolute inset-0 bg-black/50" 
          onClick={() => setIsOpen(false)} 
        />
        <div className={`absolute right-0 top-0 h-full w-64 p-6 ${theme === 'dark' ? 'bg-zinc-950 text-white' : 'bg-white text-black'}`}>
          <div className="flex flex-col space-y-6 mt-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`text-lg font-medium ${location.pathname === item.path ? 'text-blue-500' : ''}`}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-6 border-t border-zinc-800">
              {user ? (
                <div className="flex flex-col space-y-4">
                  <Link to="/admin" onClick={() => setIsOpen(false)} className="text-lg">Admin Dashboard</Link>
                  <button onClick={() => { handleLogout(); setIsOpen(false); }} className="text-lg text-red-500 flex items-center">
                    Logout <LogOut size={18} className="ml-2" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-4">
                  <Link to="/login" onClick={() => setIsOpen(false)} className="text-lg">Login</Link>
                  <Link 
                    to="/signup" 
                    onClick={() => setIsOpen(false)} 
                    className="bg-blue-600 text-center py-3 rounded-xl font-bold"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
