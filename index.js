import { AppRegistry } from 'react-native';

import React from 'react';

import App from './src/AppNavigator';

import { name as appName } from './app.json';

import PeripheralProvider from '~/context/PeripheralContext';

const MainApp = () => {
  return (
    <PeripheralProvider>
      <App />
    </PeripheralProvider>
  );
};

AppRegistry.registerComponent(appName, () => MainApp);
