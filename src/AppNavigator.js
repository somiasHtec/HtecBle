import 'react-native-gesture-handler';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './Home';
import Spread from './screens/Spread';
import Stimulated from './screens/Stimulated';
import Surrounded from './screens/Surrounded';
import Jumped from './screens/Jumped';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Spread" component={Spread} />
        <Stack.Screen name="Stimulated" component={Stimulated} />
        <Stack.Screen name="Surrounded" component={Surrounded} />
        <Stack.Screen name="Jumped" component={Jumped} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
