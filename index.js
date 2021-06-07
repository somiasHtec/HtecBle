import { AppRegistry } from 'react-native';

// import App from './ExampleApp';
import App from './src/App';
// import App from './src/screens/Jumped';
// import App from './src/screens/Stimulated';
// import App from './src/screens/Spread';
// import App from './src/screens/Surrounded';

import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
