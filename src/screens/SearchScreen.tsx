import React, {createContext, useEffect, useState} from 'react';
import {SearchTemplate} from '../components/templates';
import {People, PeopleRecord} from '../types';
import {useDebounce, useFavourites, usePeople} from '../hooks';
import {PEOPLE_URL} from '../setup/api/url';

type SearchContextValue = {
  people: People[];
  favourites: PeopleRecord;
  isLoading: boolean;
  error: string | null;
  handleListItemNamePress: (item: People) => void;
  handleListItemIconPress: (item: People) => void;
  handleRetryPress: () => void;
};

export const SearchContext = createContext<SearchContextValue | null>(null);

const SearchScreen: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const debouncedQuery = useDebounce(query, 500);

  const {
    data: people,
    isLoading,
    error,
    getPeople,
    setDefaultPeopleState,
  } = usePeople();

  const {data: favourites, toggleFavourite} = useFavourites();

  useEffect(() => {
    setDefaultPeopleState();

    if (query.trim() !== '') {
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
    isLoading,
    handleListItemIconPress: toggleFavourite,
  };

  return (
    <SearchContext.Provider value={value}>
      <SearchTemplate />
    </SearchContext.Provider>
  );
};

export default SearchScreen;
