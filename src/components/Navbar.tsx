import { Brain, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const navItems = [
    { label: "Real world results", href: "#" },
    { label: "Features", href: "#" },
    { label: "Paths", href: "#" },
    { label: "Pricing", href: "#" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-3 bg-white/90 backdrop-blur-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            {/* Logo */}
            <a href="#" className="flex-shrink-0 flex items-center space-x-2">
              <Brain className="h-10 w-10 text-purple-600" />
              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-900 leading-tight">AI Productivity</span>
                <span className="text-xl font-bold text-gray-900 leading-tight">Coach</span>
              </div>
            </a>
            {/* Desktop Tagline */}
            <div className="hidden lg:flex items-center space-x-2 text-sm">
                <span className="text-gray-500">is the</span>
                <span className="bg-yellow-300 px-2 py-0.5 text-sm font-bold text-gray-900 transform -rotate-1 whitespace-nowrap">refreshingly clear</span>
                <span className="text-gray-500">productivity system by</span>
                <div className="flex items-center space-x-1">
                  <Brain className="h-4 w-4 text-purple-600" />
                  <span className="font-semibold text-gray-900">AI insights</span>
                </div>
            </div>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
              <ul className="flex items-center space-x-6 text-sm">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-gray-600 hover:text-gray-900 transition-colors font-medium whitespace-nowrap"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="flex items-center space-x-4">
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors font-medium text-sm whitespace-nowrap">
                  Sign in
                </a>
                <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-semibold text-sm transition-all duration-200 hover:shadow-lg whitespace-nowrap">
                  Sign up free
                </button>
              </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none">
              <span className="sr-only">Open main menu</span>
              {menuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                >
                  {item.label}
                </a>
              ))}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200 bg-white">
              <div className="px-5 flex flex-col space-y-3">
                <a href="#" className="text-base font-medium text-gray-600 hover:text-gray-900">
                  Sign in
                </a>
                <button className="bg-green-600 hover:bg-green-700 text-white w-full py-2.5 rounded-lg font-semibold">
                  Sign up free
                </button>
              </div>
            </div>
          </div>
        )}
    </nav>
  );
};

export default Navbar; 