import React, { useState, useEffect, useRef } from 'react';
import PasswordStrengthMeter from './components/PasswordStrengthMeter';
import PasswordStrengthTable from './components/PasswordStrengthTable';
import FAQSection from './components/FAQSection';
import { Menu, X } from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Tester', href: '#password-tester' },
    { name: 'Guide', href: '#guide' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-bw-900 text-white font-sans selection:bg-bw-500 selection:text-white">
      {/* Header */}
      <header className="border-b border-bw-800 bg-bw-900 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <img src="/nexlock.png" alt="Logo" className="flex items-center gap-2 h-4 md:h-8" />
            </div>
            
            {/* Desktop Nav */}
            <nav className="hidden lg:flex gap-6 text-sm font-medium text-gray-300">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Desktop CTA */}
            <div className="hidden lg:block">
              <a href="#password-tester" className="bg-white text-bw-900 px-6 py-2.5 rounded-full text-sm font-bold hover:bg-gray-100 transition-colors">
                Get Started Free
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              ref={buttonRef}
              className="lg:hidden text-gray-300 hover:text-white focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div ref={menuRef} className="lg:hidden bg-bw-900 border-b border-bw-800 px-4 py-4 space-y-4 shadow-xl absolute w-full left-0 top-20 z-50">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-gray-300 hover:text-white font-medium text-base block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <hr className="border-bw-800" />
              <a 
                href="#password-tester" 
                className="bg-white text-bw-900 px-6 py-3 rounded-full text-sm font-bold hover:bg-gray-100 transition-colors text-center block"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started Free
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col pt-10 lg:pt-0">
        
        {/* Hero Section */}
        <section className="bg-bw-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-8">
                <h1 className="text-5xl sm:text-6xl font-bold leading-tight tracking-tight text-white">
                  How strong is <br/>
                  your password?
                </h1>

                <p className="text-xl text-gray-400 max-w-lg leading-relaxed">
                  With Nexlock you can instantly generate and save strong passwords for each of your accounts
                </p>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <a href="#password-tester" className="bg-white text-bw-900 px-8 py-3 rounded-full font-bold text-base hover:bg-gray-100 transition-colors">
                    Get Started
                  </a>
                </div>
              </div>

              {/* Right Content - Image Placeholder */}
              <div className="hidden w-full lg:flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="bg-bw-900 p-3 rounded text-left overflow-x-auto">
                    <img src="/nexlock-hero_section.png" alt="Hero" className="w-full h-auto" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Password Strength Meter Section */}
        <div id="password-tester" className="pt-24">
          <PasswordStrengthMeter />
        </div>

        {/* Password Strength Table Section */}
        <div id="guide" className='pt-24'>
          <PasswordStrengthTable />
        </div>

        {/* FAQ Section */}
        <div id="faq">
          <FAQSection />
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-bw-800 bg-bw-900 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p className="mb-4">
            This tool is a client-side simulation using Finite State Automata logic. 
            No data is sent to any server.
          </p>
          <p>&copy; 2025 Secure Password Checker. Nexlock.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
