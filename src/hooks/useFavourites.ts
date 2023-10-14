import {useDispatch, useSelector} from 'react-redux';
import {Dispatch, RootState} from '../setup/store/store';
import {People} from '../types';

export const useFavourites = () => {
  const {favourites} = useSelector((state: RootState) => state.favourites);

  const dispatch = useDispatch<Dispatch>();

  const handleFavourite = (item: People) => {
    dispatch.favourites.setFavourite(item);
  };

  return {favourites, handleFavourite};
};
