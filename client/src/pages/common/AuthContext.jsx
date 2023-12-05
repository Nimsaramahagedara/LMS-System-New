import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const initialUserRole = Cookies.get('userRole') || null;
  const [userRole, setUserRole] = useState(Number(initialUserRole));

  // Check if the user role is stored in cookies when the component mounts
  useEffect(() => {
    const storedUserRole = Number(Cookies.get('userRole'));
    if (storedUserRole) {
      setUserRole(storedUserRole);
    }else{
      toast.error('Please Login');

    }
  }, []);

  const login = (role) => {
    setUserRole(role);
    // Save the user role in cookies
    Cookies.set('userRole', role, { expires: 1, path: '/' }); // Adjust 'expires' as needed
  };

  const logout = () => {
    setUserRole(null);
    // Remove the user role from cookies
    Cookies.remove('userRole', { path: '/' });
    toast.warning('Log Out Success!')
    navigate('/')
  };

  return (
    <AuthContext.Provider value={{ userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
