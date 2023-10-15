import React, {useEffect} from 'react';
import {HomeTemplate} from '../components/templates';
import {createContext} from 'react';
import {People, PeopleRecord} from '../types';
import {PEOPLE_URL} from '../setup/api/url';
import {useFavourites, useNavigateToDetailsScreen, usePeople} from '../hooks';

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
  const {
    data: people,
    totalCount,
    isPeopleLoading,
    error,
    getPeople,
    handleNextPagePress,
    handlePreviousPagePress,
    setDefaultPeopleState,
  } = usePeople();

  const {data: favourites, toggleFavourite} = useFavourites();

  const navigateToDetailsScreen = useNavigateToDetailsScreen();

  useEffect(() => {
    setDefaultPeopleState();

    getPeople({url: PEOPLE_URL.PEOPLE});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value: HomeContextValue = {
    people: Object.values(people ?? {}),
    favourites: favourites ?? {},
    totalCount,
    isLoading: isPeopleLoading,
    error,
    handleListItemNamePress: navigateToDetailsScreen,
    handleListItemIconPress: toggleFavourite,
    handleNextPress: handleNextPagePress,
    handlePreviousPress: handlePreviousPagePress,
    handleRetryPress: () => getPeople({url: PEOPLE_URL.PEOPLE}),
  };

  return (
    <HomeContext.Provider value={value}>
      <HomeTemplate />
    </HomeContext.Provider>
  );
};

export default HomeScreen;
