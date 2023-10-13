import {Models} from '@rematch/core';
import {people} from './people';

export interface RootModel extends Models<RootModel> {
  people: typeof people;
}

export const models: RootModel = {
  people,
};
