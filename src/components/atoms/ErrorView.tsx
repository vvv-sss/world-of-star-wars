import React from 'react';
import {TouchableOpacity} from 'react-native';
import {View, Text} from 'react-native-ui-lib';

type Props = {
  errorMessage?: string;
  marginL?: number;
  marginR?: number;
  marginT?: number;
  marginB?: number;
  handleRetryPress?: () => void;
};

const ErrorView: React.FC<Props> = ({
  errorMessage = 'Something went wrong...',
  marginL,
  marginR,
  marginT,
  marginB,
  handleRetryPress,
}) => {
  return (
    <View
      style={{
        marginLeft: marginL,
        marginRight: marginR,
        marginTop: marginT,
        marginBottom: marginB,
      }}>
      <Text text90 surface600>
        {errorMessage}
      </Text>
      <TouchableOpacity onPress={handleRetryPress}>
        <Text text40 primary300>
          Retry
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ErrorView;
