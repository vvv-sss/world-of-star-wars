import {useDispatch, useSelector} from 'react-redux';
import {Dispatch, RootState} from '../setup/store/store';
import {People} from '../types';
import {FavouritesState} from '../setup/store/models/favourites';

export const useFavourites = () => {
  const {data, maleCount, femaleCount, otherCount} = useSelector(
    (state: RootState) => state.favourites,
  );

  const dispatch = useDispatch<Dispatch>();

  const setFavouritesState = (payload: FavouritesState) => {
    dispatch.favourites.setState(payload);
  };

  const toggleFavourite = (item: People) => {
    dispatch.favourites.toggleFavourite(item);
  };

  const resetFavourites = () => {
    dispatch.favourites.resetFavouritesState();
  };

  return {
    data,
    maleCount,
    femaleCount,
    otherCount,
    setFavouritesState,
    toggleFavourite,
    resetFavourites,
  };
};
