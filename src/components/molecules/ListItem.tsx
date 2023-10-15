import React from 'react';
import {Spacings, Text, View} from 'react-native-ui-lib';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {People} from '../../types';

type Props = {
  item: People;
  index: number;
  title: string;
  icon: React.ReactNode;
  handleTitlePress?: (item: People) => void;
  handleIconPress?: (item: People) => void;
};

const ListItem: React.FC<Props> = ({
  item,
  index,
  title,
  icon,
  handleTitlePress,
  handleIconPress,
}) => {
  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={styles.itemTitleContainer}
        onPress={() => handleTitlePress?.(item)}>
        <Text text40T marginR-s3>
          {index}.
        </Text>
        <Text text40T marginR-s3>
          {title}
        </Text>
      </TouchableOpacity>
      <View flex />
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => handleIconPress?.(item)}>
        {icon}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacings.s4,
  },
  itemTitleContainer: {
    flexDirection: 'row',
  },
  iconContainer: {
    alignItems: 'flex-end',
  },
});

export default ListItem;
