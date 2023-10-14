import {Models} from '@rematch/core';
import {people} from './people';
import {favourites} from './favourites';

export interface RootModel extends Models<RootModel> {
  people: typeof people;
  favourites: typeof favourites;
}

export const models: RootModel = {
  people,
  favourites,
};
