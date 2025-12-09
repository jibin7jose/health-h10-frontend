import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    AsyncStorage.getItem('role').then(setRole);
  }, []);

  return (
    <AuthContext.Provider value={{ role, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
