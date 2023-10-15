import React from 'react';
import {Colors, Spacings} from 'react-native-ui-lib';
import {StyleSheet} from 'react-native';
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
  Colors.loadColors(theme.colors);
  Spacings.loadSpacings(theme.spacings);

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
