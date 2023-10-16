import {createModel} from '@rematch/core';
import {People, PeopleRecord} from '../../../types';
import {RootModel} from '.';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type FavouritesState = {
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
    setState(state, payload: FavouritesState) {
      return {
        ...state,
        ...payload,
      };
    },
    setData(state, payload: PeopleRecord | null) {
      return {
        ...state,
        data: payload,
      };
    },
    setMaleCount(state, payload: number) {
      return {
        ...state,
        maleCount: payload,
      };
    },
    setFemaleCount(state, payload: number) {
      return {
        ...state,
        femaleCount: payload,
      };
    },
    setOtherCount(state, payload: number) {
      return {
        ...state,
        otherCount: payload,
      };
    },
  },
  effects: {
    async resetFavouritesState() {
      await AsyncStorage.removeItem('favourites');
      this.setDefaultState();
    },
    async toggleFavourite(payload: People, store) {
      const data = store.favourites.data;

      const item = data && data[payload.url];

      const isMale = payload.gender === 'male';
      const isFemale = payload.gender === 'female';

      let maleCount = store.favourites.maleCount;
      let femaleCount = store.favourites.femaleCount;
      let otherCount = store.favourites.otherCount;

      if (data && item) {
        maleCount = isMale && maleCount > 0 ? maleCount - 1 : maleCount;
        femaleCount =
          isFemale && femaleCount > 0 ? femaleCount - 1 : femaleCount;
        otherCount =
          !isMale && !isFemale && otherCount > 0 ? otherCount - 1 : otherCount;
      } else {
        maleCount = isMale ? maleCount + 1 : maleCount;
        femaleCount = isFemale ? femaleCount + 1 : femaleCount;
        otherCount = !isMale && !isFemale ? otherCount + 1 : otherCount;
      }

      let newFavourites: PeopleRecord | null = null;

      if (data && item) {
        const {[payload.url]: _, ...rest} = data;

        newFavourites = rest;
      } else if (data && !item) {
        newFavourites = {
          ...data,
          [payload.url]: payload,
        };
      } else {
        newFavourites = {
          [payload.url]: payload,
        };
      }

      const payloadData: FavouritesState = {
        data: newFavourites,
        maleCount,
        femaleCount,
        otherCount,
      };

      this.setState(payloadData);
      await AsyncStorage.setItem('favourites', JSON.stringify(payloadData));
    },
  },
});
