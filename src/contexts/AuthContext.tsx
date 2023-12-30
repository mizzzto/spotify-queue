import { createContext, useContext, FC, ReactNode } from 'react';

import { useAuth, defaultAuth } from '../hooks/useAuth';

import { Auth } from '../types/Auth';

interface IAuthContext {
  auth: Auth;
  saveAuth: (auth: Auth) => void;
  clearAuth: () => void;
  attemptRefresh: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  auth: defaultAuth,
  saveAuth: () => {},
  clearAuth: () => {},
  attemptRefresh: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { auth, saveAuth, clearAuth, attemptRefresh } = useAuth(defaultAuth);

  return (
    <AuthContext.Provider value={{ auth, saveAuth, clearAuth, attemptRefresh }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
