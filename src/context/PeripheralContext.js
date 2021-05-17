import React, { useState, createContext } from 'react';

export const PeripheralContext = createContext({
  peripheralId: '',
  setPeripheralId: (id) => {},
  peripheralConnected: false,
  setIsPeripheralConnected: () => {},
});

const PeripheralProvider = ({ children }) => {
  const [peripheralId, setPeripheralId] = useState('');
  const [peripheralConnected, setIsPeripheralConnected] = useState('');

  const value = {
    peripheralId,
    setPeripheralId,
    peripheralConnected,
    setIsPeripheralConnected,
  };

  return (
    <PeripheralContext.Provider value={value}>
      {children}
    </PeripheralContext.Provider>
  );
};

export default PeripheralProvider;
