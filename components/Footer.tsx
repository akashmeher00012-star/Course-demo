
import React from 'react';
import { useTheme } from '../App';

const Footer: React.FC = () => {
  const { theme } = useTheme();

  return (
    <footer className={`py-12 px-4 border-t ${
      theme === 'dark' ? 'bg-black border-zinc-800 text-zinc-500' : 'bg-zinc-50 border-zinc-200 text-zinc-600'
    }`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        <div>
          <span className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
            DP<span className="text-blue-500">MARKET</span><span className="text-green-500">PRO</span>
          </span>
          <p className="mt-2 text-sm">Empowering digital creators with premium resources.</p>
        </div>
        
        <div className="flex space-x-8 text-sm font-medium">
          <a href="#" className="hover:text-blue-500 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-blue-500 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-blue-500 transition-colors">Refund Policy</a>
        </div>
        
        <p className="text-xs">© 2024 DPMARKETPRO. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
