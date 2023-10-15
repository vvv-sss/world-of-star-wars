import React, {useEffect} from 'react';
import {HomeTemplate} from '../components/templates';
import {createContext} from 'react';
import {People, PeopleRecord} from '../types';
import {useNavigation} from '@react-navigation/native';
import {Dispatch, RootState} from '../setup/store/store';
import {useDispatch, useSelector} from 'react-redux';
import {PEOPLE_URL} from '../setup/api/url';
import {useFavourites, useNavigateToDetailsScreen} from '../hooks';

type HomeContextValue = {
  people: People[];
  favourites: PeopleRecord;
  totalCount: number | null;
  isLoading: boolean;
  error: string | null;
  handleListItemNamePress: (item: People) => void;
  handleListItemIconPress: (item: People) => void;
  handleNextPress: () => void;
  handlePreviousPress: () => void;
  handleRetryPress: () => void;
};

export const HomeContext = createContext<HomeContextValue | null>(null);

const HomeScreen: React.FC = () => {
  const {data, totalCount, error} = useSelector(
    (state: RootState) => state.people,
  );

  const {data: favourites, toggleFavourite} = useFavourites();

  const isLoading = useSelector(
    (state: RootState) => state.loading.models.people,
  );

  const dispatch = useDispatch<Dispatch>();

  const navigateToDetailsScreen = useNavigateToDetailsScreen();

  useEffect(() => {
    if (!data) {
      getPeople();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPeople = () => {
    dispatch.people.getPeople({url: PEOPLE_URL.PEOPLE});
  };

  const value = {
    people: Object.values(data ?? {}),
    favourites: favourites ?? {},
    totalCount,
    isLoading,
    error,
    handleListItemNamePress: navigateToDetailsScreen,
    handleListItemIconPress: toggleFavourite,
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
