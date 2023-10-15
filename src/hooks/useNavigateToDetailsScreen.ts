import {useNavigation} from '@react-navigation/native';
import {People} from '../types';

export const useNavigateToDetailsScreen = () => {
  const navigation = useNavigation();

  // XXX type is not inferred
  const navigateToDetailsScreen = (item: People) => {
    navigation.navigate('DetailsScreen', {item});
  };

  return navigateToDetailsScreen;
};
