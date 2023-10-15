import {createModel} from '@rematch/core';
import {People, PeopleRecord} from '../../../types';
import {RootModel} from '.';

type FavouritesState = {
  data: PeopleRecord | null;
  maleCount: number;
  femaleCount: number;
  otherCount: number;
};

const initialState: FavouritesState = {
  data: null,
  maleCount: 0,
  femaleCount: 0,
  otherCount: 0,
};

export const favourites = createModel<RootModel>()({
  state: initialState,
  reducers: {
    setDefaultState() {
      return initialState;
    },
    toggleFavourite(state, payload: People) {
      const item = state.data && state.data[payload.url];

      const isMale = payload?.gender === 'male';
      const isFemale = payload?.gender === 'female';

      if (state.data && item) {
        const {[payload.url]: _, ...rest} = state.data;

        return {
          ...state,
          data: rest,
          maleCount:
            isMale && state.maleCount > 0
              ? state.maleCount - 1
              : state.maleCount,
          femaleCount:
            isFemale && state.femaleCount > 0
              ? state.femaleCount - 1
              : state.femaleCount,
          otherCount:
            !isMale && !isFemale && state.otherCount > 0
              ? state.otherCount - 1
              : state.otherCount,
        };
      } else if (state.data && !item) {
        return {
          ...state,
          data: {
            ...state.data,
            [payload.url]: payload,
          },
          maleCount: isMale ? state.maleCount + 1 : state.maleCount,
          femaleCount: isFemale ? state.femaleCount + 1 : state.femaleCount,
          otherCount:
            !isMale && !isFemale ? state.otherCount + 1 : state.otherCount,
        };
      } else {
        return {
          ...state,
          data: {
            [payload.url]: payload,
          },
          maleCount: isMale ? state.maleCount + 1 : state.maleCount,
          femaleCount: isFemale ? state.femaleCount + 1 : state.femaleCount,
          otherCount:
            !isMale && !isFemale ? state.otherCount + 1 : state.otherCount,
        };
      }
    },
  },
});
