import { Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import MainHeader from './Header/MainHeader';
import UserHeader from './Header/UserHeader';
import Footer from './Footer';

export default function Layout() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {isAuthenticated ? <UserHeader /> : <MainHeader />}
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}