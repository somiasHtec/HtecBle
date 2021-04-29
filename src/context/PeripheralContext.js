import React, { useState, createContext } from 'react';

const PeripheralContext = createContext({
  peripheralId: '',
  setPeripheralId: () => {},
});

const PeripheralProvider = ({ children }) => {
  const [peripheralId, setPeripheralId] = useState('');

  const value = {
    peripheralId,
    setPeripheralId,
  };

  return (
    <PeripheralContext.Provider value={value}>
      {children}
    </PeripheralContext.Provider>
  );
};

export default PeripheralProvider;
