import { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('travel_user') || 'null'));

  const login = ({ token, user: userPayload }) => {
    localStorage.setItem('travel_token', token);
    localStorage.setItem('travel_user', JSON.stringify(userPayload));
    setUser(userPayload);
  };

  const logout = () => {
    localStorage.removeItem('travel_token');
    localStorage.removeItem('travel_user');
    setUser(null);
  };

  const value = useMemo(() => ({ user, login, logout }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
