import React, {createContext} from 'react';
import {FavouritesTemplate} from '../components/templates';
import {DetailsScreenParams, People} from '../types';
import {useFavourites, useNavigateToDetailsScreen} from '../hooks';

type FavouritesContextValue = {
  favourites: People[];
  maleCount: number;
  femaleCount: number;
  otherCount: number;
  handleListItemNamePress: (data: DetailsScreenParams) => void;
  handleListItemIconPress: (item: People) => void;
  handleResetTheListPress: () => void;
};

export const FavouritesContext = createContext<FavouritesContextValue | null>(
  null,
);

const FavouritesScreen: React.FC = () => {
  const {
    data,
    maleCount,
    femaleCount,
    otherCount,
    toggleFavourite,
    resetFavourites,
  } = useFavourites();

  const navigateToDetailsScreen = useNavigateToDetailsScreen();

  const value: FavouritesContextValue = {
    favourites: Object.values(data ?? {}),
    maleCount,
    femaleCount,
    otherCount,
    handleListItemNamePress: navigateToDetailsScreen,
    handleListItemIconPress: toggleFavourite,
    handleResetTheListPress: resetFavourites,
  };

  return (
    <FavouritesContext.Provider value={value}>
      <FavouritesTemplate />
    </FavouritesContext.Provider>
  );
};

export default FavouritesScreen;
