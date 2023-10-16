import {Models} from '@rematch/core';
import {people} from './people';
import {search} from './search';
import {favourites} from './favourites';

export interface RootModel extends Models<RootModel> {
  people: typeof people;
  search: typeof search;
  favourites: typeof favourites;
}

export const models: RootModel = {
  people,
  search,
  favourites,
};
