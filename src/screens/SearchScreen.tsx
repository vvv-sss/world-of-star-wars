import React, {createContext, useEffect, useState} from 'react';
import {SearchTemplate} from '../components/templates';
import {DetailsScreenParams, People, PeopleRecord} from '../types';
import {useDebounce, useFavourites, useNavigateToDetailsScreen} from '../hooks';
import {PEOPLE_URL} from '../setup/api/url';
import {useDispatch, useSelector} from 'react-redux';
import {Dispatch, RootState} from '../setup/store/store';

type SearchContextValue = {
  results: People[];
  resultsCount: number | null;
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
    totalCount,
    error,
  } = useSelector((state: RootState) => state.search);

  const isLoading = useSelector(
    (state: RootState) => state.loading.effects.search.makeSearchRequest,
  );

  const {data: favourites, toggleFavourite} = useFavourites();

  const navigateToDetailsScreen = useNavigateToDetailsScreen();

  const dispatch = useDispatch<Dispatch>();

  useEffect(() => {
    if (debouncedQuery.trim() === '') {
      dispatch.search.setDefaultState();
    }

    if (debouncedQuery.trim() !== '') {
      dispatch.search.setDefaultState();
      makeSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

  const makeSearch = () => {
    dispatch.search.makeSearchRequest({
      url: PEOPLE_URL.PEOPLE,
      configs: {params: {search: debouncedQuery}},
    });
  };

  const value: SearchContextValue = {
    results: Object.values(people ?? {}),
    resultsCount: totalCount,
    favourites: favourites ?? {},
    searchValue: query,
    nextPage,
    previousPage,
    isLoading,
    error,
    handleSearchValueChange: setQuery,
    handleArrowLeftPress: () => {
      // @ts-ignore
      dispatch.search.getPreviousPage();
    },
    handleArrowRightPress: () => {
      // @ts-ignore
      dispatch.search.getNextPage();
    },
    handleListItemNamePress: navigateToDetailsScreen,
    handleListItemIconPress: toggleFavourite,
    handleRetryPress: makeSearch,
  };

  return (
    <SearchContext.Provider value={value}>
      <SearchTemplate />
    </SearchContext.Provider>
  );
};

export default SearchScreen;
