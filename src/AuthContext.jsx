import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState('');
  const [role, setRole] = useState('');
  const [mote, setMote] = useState('');

  const login = (newToken) => {
    setToken(newToken);

    const partes = newToken.split('.');
    if (partes.length !== 3) {
        throw new Error('El token no tiene el formato esperado');
    }

    const payloadBase64 = partes[1];
    const payload = JSON.parse(atob(payloadBase64));

    // Aquí asumimos que hay un campo 'rol' en el payload, ajusta según tu estructura de token
    setRole(payload.authorities[0].authority);
    setMote(payload.sub)

  };

  const logout = () => {
    setToken('');
    setRole('');
  };

  return (
    <AuthContext.Provider value={{ mote, role, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};