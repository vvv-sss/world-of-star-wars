import React from 'react';
import {Button} from 'react-native';
import {Colors, View} from 'react-native-ui-lib';
import {Appearance} from 'react-native';
import {theme} from './src/setup/theme';
import {Test} from './src/pages';

function App(): JSX.Element {
  Colors.loadSchemes(theme.colors);

  return (
    <View flex center bg-surface100>
      <View center flex row>
        <Button
          title="light"
          onPress={() => Appearance.setColorScheme('light')}
        />
        <Button
          title="dark"
          onPress={() => Appearance.setColorScheme('dark')}
        />
      </View>
      <Test />
    </View>
  );
}

export default App;
