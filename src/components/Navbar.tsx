import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Zap } from 'lucide-react';
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navLinks = [
  {
    name: 'Home',
    path: '/'
  },
  {
    name: 'Claim Bonus',
    path: '/claim'
  },
  {
    name: 'Recovery',
    path: '/recovery'
  },
  {
    name: 'Prices',
    path: '/prices'
  },
  {
    name: 'Contact',
    path: '/contact'
  }];

  const isActive = (path: string) => location.pathname === path;
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-purple-neon/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-2">
              <Zap className="h-6 w-6 text-gold-neon fill-gold-neon" />
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-neon to-gold-neon">
                NeonCrypto
              </span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) =>
              <Link
                key={link.name}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${isActive(link.path) ? 'text-white bg-purple-neon/20 border border-purple-neon/50 shadow-[0_0_10px_rgba(139,92,246,0.3)]' : 'text-gray-300 hover:text-white hover:bg-white/5'}`}>

                  {link.name}
                </Link>
              )}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none">

              {isOpen ?
              <X className="h-6 w-6" /> :

              <Menu className="h-6 w-6" />
              }
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen &&
      <div className="md:hidden glass border-t border-purple-neon/20">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) =>
          <Link
            key={link.name}
            to={link.path}
            onClick={() => setIsOpen(false)}
            className={`block px-3 py-2 rounded-md text-base font-medium ${isActive(link.path) ? 'text-white bg-purple-neon/20 border border-purple-neon/50' : 'text-gray-300 hover:text-white hover:bg-white/5'}`}>

                {link.name}
              </Link>
          )}
          </div>
        </div>
      }
    </nav>);

}