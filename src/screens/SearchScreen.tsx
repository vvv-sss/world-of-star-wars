import React, {createContext, useEffect, useState} from 'react';
import {SearchTemplate} from '../components/templates';
import {DetailsScreenParams, People, PeopleRecord} from '../types';
import {
  useDebounce,
  useFavourites,
  useNavigateToDetailsScreen,
  usePeople,
} from '../hooks';
import {PEOPLE_URL} from '../setup/api/url';

type SearchContextValue = {
  people: People[];
  favourites: PeopleRecord;
  searchValue: string;
  nextPage: string | null;
  previousPage: string | null;
  isLoading: boolean;
  error: string | null;
  handleSearchValueChange: (value: string) => void;
  handleArrowLeftPress: () => void;
  handleArrowRightPress: () => void;
  handleListItemNamePress: (data: DetailsScreenParams) => void;
  handleListItemIconPress: (item: People) => void;
  handleRetryPress: () => void;
};

export const SearchContext = createContext<SearchContextValue | null>(null);

const SearchScreen: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const debouncedQuery = useDebounce(query, 500);

  const {
    data: people,
    nextPage,
    previousPage,
    isPeopleLoading,
    error,
    getPeople,
    setDefaultPeopleState,
    handleNextPagePress,
    handlePreviousPagePress,
  } = usePeople();

  const {data: favourites, toggleFavourite} = useFavourites();

  const navigateToDetailsScreen = useNavigateToDetailsScreen();

  useEffect(() => {
    setDefaultPeopleState();

    if (debouncedQuery.trim() !== '') {
      getPeople({
        url: PEOPLE_URL.PEOPLE,
        configs: {params: {search: debouncedQuery}},
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

  const value: SearchContextValue = {
    people: Object.values(people ?? {}),
    favourites: favourites ?? {},
    searchValue: query,
    nextPage,
    previousPage,
    isLoading: isPeopleLoading,
    error,
    handleSearchValueChange: setQuery,
    handleArrowLeftPress: handlePreviousPagePress,
    handleArrowRightPress: handleNextPagePress,
    handleListItemNamePress: navigateToDetailsScreen,
    handleListItemIconPress: toggleFavourite,
    handleRetryPress: () =>
      getPeople({
        url: PEOPLE_URL.PEOPLE,
        configs: {params: {search: debouncedQuery}},
      }),
  };

  return (
    <SearchContext.Provider value={value}>
      <SearchTemplate />
    </SearchContext.Provider>
  );
};

export default SearchScreen;
