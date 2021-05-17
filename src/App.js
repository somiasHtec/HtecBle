import React from 'react';

import AppNavigator from './AppNavigator';

import PeripheralProvider from './context/PeripheralContext';

const App = () => {
  return (
    <PeripheralProvider>
      <AppNavigator />
    </PeripheralProvider>
  );
};

export default App;
