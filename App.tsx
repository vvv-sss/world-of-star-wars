import React, {useEffect} from 'react';
import {Colors} from 'react-native-ui-lib';
import {Appearance} from 'react-native';
import {theme} from './src/setup/theme';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppNavigator from './src/setup/navigation/AppNavigator';

function App(): JSX.Element {
  // Theme setup
  Colors.loadSchemes(theme.colors);

  useEffect(() => {
    Appearance.setColorScheme('dark');
  }, []);

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

export default App;
