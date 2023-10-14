import React, {useEffect} from 'react';
import {HomeTemplate} from '../components/templates';
import {useFavourites, usePeople} from '../hooks';
import {createContext} from 'react';
import {People, PeopleRecord} from '../types';

type HomeContextValue = {
  people: People[];
  favourites: PeopleRecord;
  count: number | null;
  isLoading: boolean;
  error: string | null;
  handleListItemNamePress: (item: People) => void;
  handleListItemHeartIconPress: (item: People) => void;
  handleNextPress: () => void;
  handlePreviousPress: () => void;
};

export const HomeContext = createContext<HomeContextValue | null>(null);

const HomeScreen: React.FC = () => {
  const {
    getPeople,
    getNextPage,
    getPreviousPage,
    people,
    count,
    isLoading,
    error,
  } = usePeople();

  const {favourites, handleFavourite} = useFavourites();

  useEffect(() => {
    if (!people) {
      getPeople();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleListItemNamePress = (item: People) => {};

  const value = {
    people: Object.values(people ?? {}),
    favourites: favourites ?? {},
    count,
    isLoading,
    error,
    handleListItemNamePress,
    handleListItemHeartIconPress: handleFavourite,
    handleNextPress: getNextPage,
    handlePreviousPress: getPreviousPage,
  };

  return (
    <HomeContext.Provider value={value}>
      <HomeTemplate />
    </HomeContext.Provider>
  );
};

export default HomeScreen;
