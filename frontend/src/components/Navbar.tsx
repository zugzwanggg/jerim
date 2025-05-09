import { useState, useEffect } from 'react';
import { useWindowSize } from "../hooks/useWindowSize";
import SearchBar from "./SearchBar";
import { Avatar } from "./ui/avatar";
import { Menu } from 'lucide-react';

const Navbar = () => {
  const { isMobile } = useWindowSize();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isLoggedin = false;

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50  ${
      isScrolled ? 'bg-dark-color shadow-md border-b border-zinc-500' : 'bg-transparent'
    }`}>
      <div className="h-16 px-4 md:px-6 flex items-center justify-between">
        <div className={`flex items-center`}>
          <span className={`text-xl font-bold transition-colors duration-300 ${
            isScrolled ? 'text-primary-green' : 'text-white'
          }`}>JERIM</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setMenuOpen(!isMenuOpen)}
            className={`relative p-2 hover:bg-accent/10 rounded-lg transition-colors duration-300 ${
              isScrolled ? 'hover:bg-gray-100' : 'hover:bg-white/10'
            }`}
          >
            <Menu className={`transition-colors duration-300 ${
              isScrolled ? 'text-primary-green' : 'text-white'
            }`} />
            
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-border">
                Hello there!
              </div>
            )}
          </button>

          {isLoggedin ? (
            <Avatar className="h-8 w-8">
              <div className="h-full w-full bg-primary/20 rounded-full flex items-center justify-center">
                <span className="text-primary text-sm">U</span>
              </div>
            </Avatar>
          ) : (
            <button className={`font-semibold px-4 py-2 rounded-full transition-all duration-300 ${
              isScrolled 
                ? 'bg-primary-green text-black hover:bg-primary-green/90' 
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}>
              Sign in
            </button>
          )}
        </div>
      </div>

      <div className={`px-4 pb-4 ${isMobile ? '' : 'absolute top-1/2 -translate-y-1/2 left-40'}`}>
        <SearchBar />
      </div>
    </nav>
  );
};

export default Navbar; 