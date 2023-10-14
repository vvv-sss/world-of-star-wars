import {createModel} from '@rematch/core';
import {People, PeopleRecord} from '../../../types';
import {RootModel} from '.';

type FavouritesState = {
  favourites: PeopleRecord | null;
};

const initialState: FavouritesState = {
  favourites: null,
};

export const favourites = createModel<RootModel>()({
  state: initialState,
  reducers: {
    setFavourite(state, payload: People) {
      const item = state.favourites && state.favourites[payload.url];

      if (state.favourites && item) {
        const {[payload.url]: _, ...rest} = state.favourites;

        return {
          ...state,
          favourites: rest,
        };
      } else if (state.favourites && !item) {
        return {
          ...state,
          favourites: {
            ...state.favourites,
            [payload.url]: payload,
          },
        };
      } else {
        return {
          ...state,
          favourites: {
            [payload.url]: payload,
          },
        };
      }
    },
  },
});
