import React, {useEffect} from 'react';
import {Assets, Colors, Spacings, Typography} from 'react-native-ui-lib';
import {Appearance, StyleSheet} from 'react-native';
import {theme} from './src/setup/theme';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {store} from './src/setup/store/store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {RootStack} from './src/setup/navigation';
import {Host} from 'react-native-portalize';

function App(): JSX.Element {
  // Theme setup
  Colors.loadSchemes(theme.colors);
  Spacings.loadSpacings(theme.spacings);

  useEffect(() => {
    Appearance.setColorScheme('dark');
  }, []);

  return (
    <GestureHandlerRootView style={styles.gestureContainer}>
      <Provider store={store}>
        <NavigationContainer>
          <Host>
            <SafeAreaProvider>
              <RootStack />
            </SafeAreaProvider>
          </Host>
        </NavigationContainer>
      </Provider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  gestureContainer: {
    flex: 1,
  },
});

export default App;
