import { useEffect, useState } from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Menu,
  X,
  Home,
  Info,
  Shirt,
  Phone,
  Mail,
  Sparkles,
  User,
  LogOut,
  Settings,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentText, setCurrentText] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const loading = false;
  const user = null; // Replace with actual user state from context or state management
  const isAdmin = false; // Replace with actual admin check
  
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isTypingPaused, setIsTypingPaused] = useState(false);
  
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  // Helper function to check if route is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Handle logout function
  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logout clicked");
    // Example: logout(), navigate("/"), etc.
  };

  const NavLink = ({ to, label, icon: Icon, onClick, active, className = "" }) => (
    <button
      onClick={onClick || (() => navigate(to))}
      className={`group relative flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ease-in-out ${
        active
          ? "text-[#3D516B] bg-[#F3ECEE]/80"
          : "text-[#F3ECEE]/80 hover:text-[#F3ECEE] hover:bg-[#F3ECEE]/10"
      } ${className}`}
    >
      {Icon && <Icon className="w-4 h-4" />}
      <span className="tracking-wide text-sm font-medium uppercase">{label}</span>
      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-[#ACC5E1] to-[#F3ECEE] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out" />
    </button>
  );

  const MobileNavLink = ({ to, label, icon: Icon, onClick }) => (
    <button
      onClick={() => {
        if (onClick) {
          onClick();
        } else {
          navigate(to);
        }
        setMenuOpen(false); // Close menu after navigation
      }}
      className="flex items-center space-x-3 w-full px-4 py-3 text-left text-[#3D516B] hover:text-[#ACC5E1] hover:bg-[#ACC5E1]/10 rounded-lg transition-all duration-150 ease-in-out"
    >
      {Icon && <Icon className="w-5 h-5" />}
      <span className="font-medium tracking-wide">{label}</span>
    </button>
  );


  return (
    <>
      {/* Mobile Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 w-full z-50 lg:hidden transition-all duration-300 ease-in-out ${
          scrolled
            ? "bg-[#3D516B]/95 backdrop-blur-md shadow-lg"
            : "bg-[#3D516B]/80 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0"> 
              <button
                onClick={() => navigate("/")}
                className='flex items-center space-x-2 group'
              >
                <div className="w-8 h-8 bg-gradient-to-br from-[#ACC5E1] to-[#F3ECEE] rounded-lg flex items-center justify-center flex-shrink-0">
                </div> 
                <div className="min-w-[200px] text-left">
                  <span className="text-lg font-medium text-[#F3ECEE] inline-block">
                    <span className="inline-block min-h-[1.5rem]">
                      nomissaan
                    </span>
                  </span>
                </div>
              </button>
            </div>
            
            <div className="hidden md:flex items-center space-x-1">
              <NavLink to="/" label="Home" icon={Home} active={isActive("/")} />
              <NavLink to="/about" label="About Us" icon={Info} active={isActive("/about")} />
              <NavLink to="/products" label="Products" icon={Shirt} active={isActive("/products")} />
              {!loading && isAdmin && (
                <NavLink to="/Dashboard" label="Dashboard" icon={Settings} active={isActive("/Dashboard")} />
              )}
            </div>

            <div className="hidden md:flex items-center space-x-3">
              {!loading && !user && (
                <>
                  <button
                    onClick={() => navigate("/login")}
                    className="px-6 py-2 bg-gradient-to-r from-[#ACC5E1] to-[#F3ECEE] text-[#3D516B] font-medium rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 shadow-md"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => navigate("/register")}
                    className="px-6 py-2 border-2 border-[#ACC5E1] text-[#ACC5E1] font-medium rounded-lg hover:bg-[#ACC5E1] hover:text-[#3D516B] transform hover:scale-105 transition-all duration-200"
                  >
                    Create Account
                  </button>
                </>
              )}
              
              {!loading && user && (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 px-3 py-2 bg-[#F3ECEE]/20 rounded-lg">
                    <User className="w-4 h-4 text-[#F3ECEE]" />
                    <span className="text-sm font-medium text-[#F3ECEE]">
                      {user.name || user.email}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-2 text-[#F3ECEE] hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-150"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              )}
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 rounded-lg text-[#F3ECEE] hover:text-[#ACC5E1] hover:bg-[#F3ECEE]/10 transition-all duration-150"
                aria-label="Toggle menu"
              >
                {menuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>   

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            menuOpen
              ? "max-h-96 opacity-100 border-t border-[#F3ECEE]/20"
              : "max-h-0 opacity-0"
          } overflow-hidden bg-[#F3ECEE]/95 backdrop-blur-md`}
        >
          <div className="px-4 py-3 space-y-1">
            <MobileNavLink to="/" label="Home" icon={Home} />
            <MobileNavLink to="/about" label="About Us" icon={Info} />
            <MobileNavLink to="/products" label="Products" icon={Shirt} active={isActive("/products")} />

            {!loading && isAdmin && (
              <MobileNavLink to="/Dashboard" label="Dashboard" icon={Settings} />
            )}
            
            {!loading && user && (
              <div className="border-t border-[#3D516B]/20 pt-3 mt-3">
                <div className="flex items-center space-x-3 px-4 py-2 mb-2">
                  <User className="w-5 h-5 text-[#3D516B]" />
                  <span className="text-sm font-medium text-[#3D516B]">
                    {user.name || user.email}
                  </span>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="flex items-center space-x-3 w-full px-4 py-3 text-left text-red-600 hover:text-red-700 hover:bg-red-50/50 rounded-lg transition-all duration-150"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            )}

            {!loading && !user && (
              <div className="border-t border-[#3D516B]/20 pt-3 mt-3 space-y-2">
                <button
                  onClick={() => {
                    navigate("/login");
                    setMenuOpen(false);
                  }}
                  className="w-full px-4 py-3 bg-gradient-to-r from-[#ACC5E1] to-[#F3ECEE] text-[#3D516B] font-medium rounded-lg hover:shadow-lg transition-all duration-200 shadow-md"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    navigate("/register");
                    setMenuOpen(false);
                  }}
                  className="w-full px-4 py-3 border-2 border-[#ACC5E1] text-[#ACC5E1] font-medium rounded-lg hover:bg-[#ACC5E1] hover:text-[#3D516B] transition-all duration-200"
                >
                  Create Account
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-t border-red-200/50 px-4 py-3">
            <div className="text-red-600 text-sm text-center font-medium">{error}</div>
          </div>
        )}
      </nav>

      {/* Desktop Navigation - Added for completeness */}
      <nav
        className={`fixed top-0 left-0 right-0 w-full z-50 hidden lg:block transition-all duration-300 ease-in-out ${
          scrolled
            ? "bg-[#3D516B]/95 backdrop-blur-md shadow-lg"
            : "bg-[#3D516B]/80 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0"> 
              <button
                onClick={() => navigate("/")}
                className='flex items-center space-x-2 group'
              >
                <div className="w-8 h-8 bg-gradient-to-br from-[#ACC5E1] to-[#F3ECEE] rounded-lg flex items-center justify-center flex-shrink-0">
                </div> 
                <div className="min-w-[200px] text-left">
                  <span className="text-lg font-medium text-[#F3ECEE] inline-block">
                    <span className="inline-block min-h-[1.5rem]">
                      nomissaan
                    </span>
                  </span>
                </div>
              </button>
            </div>
            
            <div className="flex items-center space-x-1">
              <NavLink to="/" label="Home" icon={Home} active={isActive("/")} />
              <NavLink to="/about" label="About Us" icon={Info} active={isActive("/about")} />
              <NavLink to="/products" label="Products" icon={Shirt} active={isActive("/products")} />
              {!loading && isAdmin && (
                <NavLink to="/Dashboard" label="Dashboard" icon={Settings} active={isActive("/Dashboard")} />
              )}
            </div>

            <div className="flex items-center space-x-3">
              {!loading && !user && (
                <>
                  <button
                    onClick={() => navigate("/login")}
                    className="px-6 py-2 bg-gradient-to-r from-[#ACC5E1] to-[#F3ECEE] text-[#3D516B] font-medium rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 shadow-md"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => navigate("/register")}
                    className="px-6 py-2 border-2 border-[#ACC5E1] text-[#ACC5E1] font-medium rounded-lg hover:bg-[#ACC5E1] hover:text-[#3D516B] transform hover:scale-105 transition-all duration-200"
                  >
                    Create Account
                  </button>
                </>
              )}
              
              {!loading && user && (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 px-3 py-2 bg-[#F3ECEE]/20 rounded-lg">
                    <User className="w-4 h-4 text-[#F3ECEE]" />
                    <span className="text-sm font-medium text-[#F3ECEE]">
                      {user.name || user.email}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-2 text-[#F3ECEE] hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-150"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-16" />
    </>
  );
}