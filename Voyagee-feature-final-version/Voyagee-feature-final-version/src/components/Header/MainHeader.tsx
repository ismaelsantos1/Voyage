import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PersonOutline, Menu, Close } from '@mui/icons-material';

const MainHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActivePath = (path: string) => location.pathname === path;
  const activeClass = "text-blue-500 border-b-2 border-blue-500";

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
            <Link 
              to="/login" 
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 font-medium"
            >
              <PersonOutline />
              Fazer login
            </Link>
            <Link 
              to="/signup" 
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-lg font-medium"
            >
              Criar conta
            </Link>
          </div>

          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden text-gray-500 hover:text-gray-700"
          >
            {isOpen ? <Close sx={{ fontSize: 28 }} /> : <Menu sx={{ fontSize: 28 }} />}
          </button>
        </div>
      </div>

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
          <div className="pt-4 space-y-3">
            <Link 
              to="/login" 
              className="block w-full px-4 py-2 text-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-gray-700 font-medium"
              onClick={() => setIsOpen(false)}
            >
              Fazer login
            </Link>
            <Link 
              to="/signup" 
              className="block w-full px-4 py-2 text-center bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
              onClick={() => setIsOpen(false)}
            >
              Criar conta
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default MainHeader;