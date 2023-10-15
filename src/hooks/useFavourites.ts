import {useDispatch, useSelector} from 'react-redux';
import {Dispatch, RootState} from '../setup/store/store';
import {People} from '../types';

export const useFavourites = () => {
  const {data, maleCount, femaleCount, otherCount} = useSelector(
    (state: RootState) => state.favourites,
  );

  const dispatch = useDispatch<Dispatch>();

  const toggleFavourite = (item: People) => {
    dispatch.favourites.toggleFavourite(item);
  };

  const resetFavourites = () => {
    dispatch.favourites.setDefaultState();
  };

  return {
    data,
    maleCount,
    femaleCount,
    otherCount,
    toggleFavourite,
    resetFavourites,
  };
};
