import { useState, useEffect } from 'react';
import { useWindowSize } from "../hooks/useWindowSize";
import SearchBar from "./SearchBar";
import { Link, useLocation } from 'react-router-dom';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from './ui/navigation-menu';
import { Map, Trophy, Home, AlertCircle } from 'lucide-react';
import Profile from './Profile';
import { useAppSelector } from '@/hooks/hooks';

const mobileLinks = [
  {
    label: 'Home',
    href: '/',
    icon: <Home size={20} />,
    description: 'Go to home page'
  },
  {
    label: 'Map',
    href: '/map',
    icon: <Map size={20} />,
    description: 'Navigate with JERIM'
  },
  {
    label: 'Leaderboard',
    href: '/leaderboard',
    icon: <Trophy size={20} />,
    description: 'Track your progress'
  },
  {
    label: 'Report',
    href: '/report',
    icon: <AlertCircle size={20} />,
    description: 'Send location of dirty areas'
  },
]

const desktopLinks = mobileLinks.filter(link => link.label !== 'Home');

const Navbar = () => {
  const { isTablet, isMobile } = useWindowSize();
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const {isLogged} = useAppSelector((state)=>state.user);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100]  ${
        isScrolled ? 'bg-dark-color shadow-md border-b border-zinc-500' : 'bg-transparent'
      }`}>
        <div className="h-16 px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to={`/`} className="flex items-center gap-2">
              <img src="/Leaf.svg" alt="leaf" className='size-5 sm:size-6' />
              <span className={`text-lg sm:text-xl font-bold transition-colors duration-300 ${
                isScrolled ? 'text-primary-green' : 'text-white'
              }`}>
                JERIM
              </span>
            </Link>

            {!isMobile && (
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className='bg-transparent border border-dark-color text-white'>
                      Getting Started
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                        <li className="row-span-3 hidden md:block">
                          <NavigationMenuLink asChild>
                            <Link
                              className="flex h-full w-full select-none flex-col justify-center rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md hover:bg-muted/80 transition-colors"
                              to="/"
                            >
                              <img src="/Leaf.svg" alt="leaf" className='size-6' />
                              <div className="mb-2 mt-4 text-lg font-bold flex items-center gap-2">
                                <span>JERIM</span>
                              </div>
                              <p className="text-sm leading-tight text-muted-foreground">
                                Help the planet, Navigate with JERIM. Make the switch to the greenest map navigator on the planet  
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li className="flex flex-col gap-2">
                          {desktopLinks.map((item) => (
                            <NavigationMenuLink asChild key={item.label}>
                              <Link 
                                className="flex h-full w-full select-none flex-col justify-end rounded-md p-4 no-underline outline-none focus:shadow-md hover:bg-muted/50 transition-colors" 
                                to={item.href}
                              >
                                <div className="flex items-center gap-2.5">
                                  {item.icon}
                                  <h3 className="text-base font-semibold mb-1">{item.label}</h3>
                                </div>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                              </Link>
                            </NavigationMenuLink>
                          ))}
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            )}
          </div>

          <div className="flex items-center gap-3">
            {isLogged ? (
              <Profile />
            ) : (
              <Link to={`/auth/signin`} className={`font-semibold text-sm sm:text-base px-4 py-2 rounded-full transition-all duration-300 ${
                isScrolled 
                  ? 'bg-primary-green text-black hover:bg-primary-green/90' 
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}>
                Sign in
              </Link>
            )}
          </div>
        </div>

        <div className={`px-4 pb-4 ${isTablet ? '' : 'absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'}`}>
          <SearchBar />
        </div>
      </nav>

      {isMobile && (
        <nav className="fixed bottom-0 left-0 right-0 bg-dark-color border-t border-zinc-500 z-[100]">
          <div className="flex items-center justify-between h-16 px-8">
            {mobileLinks.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`flex flex-col items-center justify-center gap-1 ${
                  location.pathname === item.href ? 'text-primary-green' : 'text-white'
                }`}
              >
                {item.icon}
                <span className="text-xs">{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar; 