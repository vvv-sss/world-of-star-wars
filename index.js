/**
 * @format
 */

require('react-native-ui-lib/config').setConfig({appScheme: 'default'});
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
