import React from 'react';
import {View, Text} from 'react-native-ui-lib';

type Props = {
  marginL?: number;
  marginR?: number;
  marginT?: number;
  marginB?: number;
};

const LoadingView: React.FC<Props> = ({marginL, marginR, marginT, marginB}) => {
  return (
    <View
      paddingH-s1
      bg-surface400
      style={{
        marginLeft: marginL,
        marginRight: marginR,
        marginTop: marginT,
        marginBottom: marginB,
      }}>
      <Text text90 surface100>
        Loading...
      </Text>
    </View>
  );
};

export default LoadingView;
