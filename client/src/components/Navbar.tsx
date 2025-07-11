import { Brain, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleWaitlistClick = () => {
    navigate('/waitlist');
    setMenuOpen(false);
  };

  const navItems = [
    { label: "Real world results", href: "/#results" },
    { label: "Features", href: "/features" },
    { label: "Paths", href: "/#paths" },
    { label: "Pricing", href: "/pricing" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-3 bg-white/90 backdrop-blur-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 flex items-center space-x-2">
              <Brain className="h-8 w-8 sm:h-10 sm:w-10 text-purple-600" />
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">AI Productivity</span>
                <span className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">Coach</span>
              </div>
            </Link>
            {/* Desktop Tagline */}
            <div className="hidden lg:flex items-center space-x-2 text-sm">
                <span className="text-gray-500">is the</span>
                <span className="bg-yellow-300 px-2 py-0.5 text-sm font-bold text-gray-900 transform -rotate-1 whitespace-nowrap">root-cause</span>
                <span className="text-gray-500">productivity system that asks</span>
                <span className="font-semibold text-gray-900">why.</span>
           
            </div>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <ul className="flex items-center space-x-4 lg:space-x-6 text-sm">
                {navItems.map((item) => (
                  <li key={item.label}>
                      <Link
                        to={item.href}
                        className={`transition-colors font-medium whitespace-nowrap ${
                          location.pathname === item.href 
                            ? 'text-gray-900' 
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        {item.label}
                      </Link>
                  </li>
                ))}
              </ul>
              <div className="flex items-center space-x-3 lg:space-x-4">
                <button 
                  onClick={handleWaitlistClick}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 lg:px-5 py-2 rounded-lg font-semibold text-sm transition-all duration-200 hover:shadow-lg whitespace-nowrap">
                  Join Waitlist
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
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-100">
              {navItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    className={`block px-3 py-3 rounded-md text-base font-medium transition-colors ${
                      location.pathname === item.href 
                        ? 'text-gray-900 bg-gray-50' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
              ))}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200 bg-white">
              <div className="px-5 flex flex-col space-y-3">
                <button 
                  onClick={handleWaitlistClick}
                  className="bg-green-600 hover:bg-green-700 text-white w-full py-3 rounded-lg font-semibold transition-colors">
                  Join Waitlist
                </button>
              </div>
            </div>
          </div>
        )}
    </nav>
  );
};

export default Navbar; 