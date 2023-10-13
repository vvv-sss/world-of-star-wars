import React, {useEffect} from 'react';
import {HomeTemplate} from '../components/templates';
import {usePeople} from '../hooks';
import {createContext} from 'react';
import {People} from '../types';

type HomeContextValue = {
  people: People[];
  count: number | null;
  isLoading: boolean;
  error: string | null;
  handleCharNamePress: (url: string) => void;
};

export const HomeContext = createContext<HomeContextValue | null>(null);

const HomeScreen: React.FC = () => {
  const {getPeople, people, count, isLoading, error} = usePeople();

  useEffect(() => {
    getPeople();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCharNamePress = (url: string) => {
    console.log('🔴 url 🔴', url); // XXX remove
  };

  const value = {
    people,
    count,
    isLoading,
    error,
    handleCharNamePress,
  };

  return (
    <HomeContext.Provider value={value}>
      <HomeTemplate />
    </HomeContext.Provider>
  );
};

export default HomeScreen;
