import React, {useEffect} from 'react';
import {HomeTemplate} from '../components/templates';
import {useFavourites} from '../hooks';
import {createContext} from 'react';
import {People, PeopleRecord} from '../types';
import {useNavigation} from '@react-navigation/native';
import {Dispatch, RootState} from '../setup/store/store';
import {useDispatch, useSelector} from 'react-redux';
import {PEOPLE_URL} from '../setup/api/url';

type HomeContextValue = {
  people: People[];
  favourites: PeopleRecord;
  totalCount: number | null;
  isLoading: boolean;
  error: string | null;
  handleListItemNamePress: (item: People) => void;
  handleListItemHeartIconPress: (item: People) => void;
  handleNextPress: () => void;
  handlePreviousPress: () => void;
  handleRetryPress: () => void;
};

export const HomeContext = createContext<HomeContextValue | null>(null);

const HomeScreen: React.FC = () => {
  const {favourites, handleFavourite} = useFavourites();

  const navigation = useNavigation();

  const {data, totalCount, error} = useSelector(
    (state: RootState) => state.people,
  );

  const isLoading = useSelector(
    (state: RootState) => state.loading.models.people,
  );

  const dispatch = useDispatch<Dispatch>();

  useEffect(() => {
    if (!data) {
      getPeople();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPeople = () => {
    dispatch.people.getPeople({url: PEOPLE_URL.PEOPLE});
  };

  const handleListItemNamePress = (item: People) => {
    navigation.navigate('DetailsScreen', {item});
  };

  const value = {
    people: Object.values(data ?? {}),
    favourites: favourites ?? {},
    totalCount,
    isLoading,
    error,
    handleListItemNamePress,
    handleListItemHeartIconPress: handleFavourite,
    handleNextPress: () => {
      // @ts-ignore
      dispatch.people.getNextPage();
    },
    handlePreviousPress: () => {
      // @ts-ignore
      dispatch.people.getPreviousPage();
    },
    handleRetryPress: getPeople,
  };

  return (
    <HomeContext.Provider value={value}>
      <HomeTemplate />
    </HomeContext.Provider>
  );
};

export default HomeScreen;
