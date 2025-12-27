
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { useTheme } from '../App';
import { Lock, Mail, User, AlertCircle } from 'lucide-react';

const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { data, error: signupError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signupError) {
      setError(signupError.message);
      setLoading(false);
    } else {
      // In a real app, you would create a profile record here with role = 'user'
      // For this demo, we assume the user check logic works.
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className={`w-full max-w-md p-8 rounded-3xl border ${theme === 'dark' ? 'bg-zinc-950 border-zinc-800 shadow-2xl' : 'bg-white border-zinc-200 shadow-xl'}`}>
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black mb-2">Create Account</h1>
          <p className="text-zinc-500">Join our digital product marketplace.</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl mb-6 flex items-center space-x-3">
            <AlertCircle size={20} />
            <span className="text-sm font-medium">{error}</span>
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-widest text-zinc-500">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full pl-12 pr-4 py-4 rounded-xl border focus:outline-none focus:ring-2 transition-all ${
                  theme === 'dark' 
                    ? 'bg-zinc-900 border-zinc-800 focus:ring-blue-500 focus:border-transparent text-white' 
                    : 'bg-zinc-50 border-zinc-200 focus:ring-blue-500 text-black'
                }`}
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-widest text-zinc-500">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full pl-12 pr-4 py-4 rounded-xl border focus:outline-none focus:ring-2 transition-all ${
                  theme === 'dark' 
                    ? 'bg-zinc-900 border-zinc-800 focus:ring-blue-500 focus:border-transparent text-white' 
                    : 'bg-zinc-50 border-zinc-200 focus:ring-blue-500 text-black'
                }`}
                placeholder="At least 6 characters"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg transition-all neon-blue-glow disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-zinc-500">
          Already have an account? <Link to="/login" className="text-blue-500 font-bold hover:underline">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
