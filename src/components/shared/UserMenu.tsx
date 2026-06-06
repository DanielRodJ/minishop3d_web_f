import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircleIcon } from '@heroicons/react/24/outline';

import { useAuth } from '../../context/AuthContext';
import { loginWithGoogle, logout } from '@/features/auth/services/firebaseAuth';
import { loginWithBackend } from '@/features/auth/services/apiAuth';

interface ItemMenuProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

const ItemMenu = ({ text, ...props }: ItemMenuProps) => (
  <button
    className="block w-full text-left px-4 py-2 hover:bg-blue-50 text-blue-600 font-medium cursor-pointer"
    {...props}
  >
    <span className="font-semibold text-sm">{text}</span>
  </button>
);

const AdminLoggedMenu = ({ onAdminPanel, onLogout }: { onAdminPanel: () => void; onLogout: () => void }) => (
  <>
    <ItemMenu text='Panel de Administración' onClick={onAdminPanel} />
    <ItemMenu text='Mi Carrito' />
    <ItemMenu text='Historial' />
    <ItemMenu text='Cerrar Sesión' onClick={onLogout} />
  </>
);

const UserLoggedMenu = ({ onLogout }: { onLogout: () => void }) => (
  <>
    <ItemMenu text='Mi Carrito' />
    <ItemMenu text='Historial' />
    <ItemMenu text='Cerrar Sesión' onClick={onLogout} />
  </>
);

const VisitorMenu = ({ onLogin }: { onLogin: () => void }) => (
  <ItemMenu text='Iniciar Sesión' onClick={onLogin} />
);

export const UserMenu = () => {
  const { loading, esAdmin, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isLogging, setIsLogging] = useState(false);
  const navigate = useNavigate();

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };

  }, []);

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
  };

  const handleLogin = async () => {
    try {
      setIsLogging(true);
      const firebaseUser = await loginWithGoogle();
      if (!firebaseUser) return;
      await loginWithBackend();
    } catch (error) {
      await logout();
    } finally {
      setIsLogging(false);
      setIsOpen(false);
    }
  };

  const handleNavigateAdminPanel = () => {
    navigate("/admin");
    setIsOpen(false);
  }

  if (loading) return null;

  return (
    <div className="relative" ref={menuRef}>
      <button
        disabled={isLogging}
        onClick={() => setIsOpen(prev => !prev)}
        className="p-2 rounded-full hover:bg-white transition-colors duration-300 cursor-pointer"
      >
        <UserCircleIcon className="w-8 h-8 text-orange-300" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg py-2 z-50">
          {!isAuthenticated ? (
            <VisitorMenu onLogin={handleLogin} />
          ) : esAdmin ? (
            <AdminLoggedMenu onAdminPanel={handleNavigateAdminPanel} onLogout={handleLogout} />
          ) : (
            <UserLoggedMenu onLogout={handleLogout} />
          )}
        </div>
      )}
    </div>
  );
};