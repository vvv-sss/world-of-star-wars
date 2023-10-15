import React, {createContext, useEffect, useState} from 'react';
import {SearchTemplate} from '../components/templates';
import {People, PeopleRecord} from '../types';
import {useFavourites} from '../hooks';
import {useDispatch, useSelector} from 'react-redux';
import {Dispatch, RootState} from '../setup/store/store';
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

  const {data, totalCount, error} = useSelector(
    (state: RootState) => state.people,
  );

  const {data: favourites, toggleFavourite} = useFavourites();

  const dispatch = useDispatch<Dispatch>();

  useEffect(() => {
    if (query.trim() !== '') {
      getPeople();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPeople = () => {
    dispatch.people.getPeople({
      url: PEOPLE_URL.PEOPLE,
      configs: {params: {search: query}},
    });
  };

  const value: SearchContextValue = {
    people: Object.values(data ?? {}),
    favourites: favourites ?? {},
    handleListItemIconPress: toggleFavourite,
  };

  return (
    <SearchContext.Provider value={value}>
      <SearchTemplate />
    </SearchContext.Provider>
  );
};

export default SearchScreen;
