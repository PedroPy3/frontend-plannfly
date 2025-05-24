
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white shadow-md py-2" 
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-gradient">Plannfly</Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-gray-700 hover:text-plannfly-blue transition-colors">Ferramentas</a>
            <a href="#about" className="text-gray-700 hover:text-plannfly-blue transition-colors">Sobre</a>
            <a href="#pricing" className="text-gray-700 hover:text-plannfly-blue transition-colors">Nossos planos</a>
            <Link to="/login">
              <Button variant="outline" className="border-plannfly-blue text-plannfly-blue hover:bg-plannfly-blue hover:text-white">
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-plannfly-blue hover:bg-plannfly-purple">
                Register
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-500 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t mt-2 py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <a href="#features" className="text-gray-700 hover:text-plannfly-blue transition-colors px-2 py-1" onClick={() => setIsMobileMenuOpen(false)}>Features</a>
            <a href="#about" className="text-gray-700 hover:text-plannfly-blue transition-colors px-2 py-1" onClick={() => setIsMobileMenuOpen(false)}>About</a>
            <a href="#pricing" className="text-gray-700 hover:text-plannfly-blue transition-colors px-2 py-1" onClick={() => setIsMobileMenuOpen(false)}>Pricing</a>
            <div className="flex flex-col space-y-2 pt-2">
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full border-plannfly-blue text-plannfly-blue hover:bg-plannfly-blue hover:text-white">
                  Login
                </Button>
              </Link>
              <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full bg-plannfly-blue hover:bg-plannfly-purple">
                  Register
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
