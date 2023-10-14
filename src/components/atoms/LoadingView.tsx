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
      style={{
        marginLeft: marginL,
        marginRight: marginR,
        marginTop: marginT,
        marginBottom: marginB,
      }}>
      <Text text90 surface600>
        Loading...
      </Text>
    </View>
  );
};

export default LoadingView;
