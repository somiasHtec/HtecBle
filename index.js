import { AppRegistry } from 'react-native';
import App from './src/AppNavigator';
// import App from './src/App';
// import App from './ExampleApp';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
