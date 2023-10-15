import {useNavigation} from '@react-navigation/native';
import {DetailsScreenParams, DetailsScreenProps} from '../types';

export const useNavigateToDetailsScreen = () => {
  const navigation = useNavigation<DetailsScreenProps['navigation']>();

  const navigateToDetailsScreen = (data: DetailsScreenParams) => {
    navigation.navigate('DetailsScreen', data);
  };

  return navigateToDetailsScreen;
};
