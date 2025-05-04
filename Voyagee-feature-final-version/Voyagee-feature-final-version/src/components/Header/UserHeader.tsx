import { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import useClickOutside from '../../hooks/useClickOutside';

const UserHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const isActivePath = (path: string) => location.pathname === path;
  const activeClass = "text-blue-500 border-b-2 border-blue-500";

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
  };

  const dropdownRef = useRef<HTMLDivElement>(null);
  
  useClickOutside(dropdownRef, () => {
    if (isDropdownOpen) setIsDropdownOpen(false);
  });

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-blue-500 hover:text-blue-600 transition-colors">
            Voyagee
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {[
              { to: "/", label: "Home" },
              { to: "/roteiros", label: "Roteiros" },
              { to: "/contato", label: "Contato" }
            ].map(({ to, label }) => (
              <Link 
                key={to}
                to={to} 
                className={`${isActivePath(to) ? activeClass : 'text-gray-600'} 
                  hover:text-blue-500 hover:border-b-2 hover:border-blue-500 
                  transition-all pb-1 font-medium`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                  {user?.nome.charAt(0).toUpperCase()}
                </div>
                <span className="font-medium text-gray-700">{user?.nome}</span>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border">
                  {user?.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Painel de Controle
                  </Link>
                  )}

                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Meu Perfil
                  </Link>
                  
                    <Link
                      to="/meus-roteiros"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Meus Roteiros
                    </Link>
                  
                  <Link
                    to="/configuracoes"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Configurações
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                  >
                    Sair
                  </button>
                </div>
              )}
            </div>
          </div>

          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden text-gray-500 hover:text-gray-700"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Menu móvel */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <nav className="px-6 py-4 space-y-4 bg-white border-t">
          {[
            { to: "/", label: "Home" },
            { to: "/roteiros", label: "Roteiros" },
            { to: "/contato", label: "Contato" }
          ].map(({ to, label }) => (
            <Link 
              key={to}
              to={to} 
              className={`block ${isActivePath(to) ? 'text-blue-500' : 'text-gray-600'} 
                hover:text-blue-500 transition-colors font-medium`}
              onClick={() => setIsOpen(false)}
            >
              {label}
            </Link>
          ))}
          <div className="pt-4 space-y-2">
            <Link 
              to="/perfil" 
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Meu Perfil
            </Link>
            
              <Link 
                to="/meus-roteiros" 
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                Meus Roteiros
              </Link>
            
            <Link 
              to="/configuracoes" 
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Configurações
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
            >
              Sair
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default UserHeader;