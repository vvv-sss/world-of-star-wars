import {createModel} from '@rematch/core';
import {getRequest} from '../../api/services';
import {GetRequestPayload, People, PeopleResponse} from '../../../types';
import {RootModel} from '.';

type PeopleState = {
  people: People[];
  count: number | null;
  nextPage: string | null;
  previousPage: string | null;
  error: string | null;
};

const initialState: PeopleState = {
  people: [],
  count: null,
  nextPage: null,
  previousPage: null,
  error: null,
};

export const people = createModel<RootModel>()({
  state: initialState,
  reducers: {
    setDefaultState() {
      return initialState;
    },
    setPeople(state, payload: People[]) {
      return {
        ...state,
        people: payload,
      };
    },
    setCount(state, payload: number) {
      return {
        ...state,
        count: payload,
      };
    },
    setNextPage(state, payload: string | null) {
      return {
        ...state,
        nextPage: payload,
      };
    },
    setPreviousPage(state, payload: string | null) {
      return {
        ...state,
        previousPage: payload,
      };
    },
    setError(state, payload: string) {
      return {
        ...state,
        error: payload,
      };
    },
    resetError(state) {
      return {
        ...state,
        error: null,
      };
    },
  },
  effects: dispatch => ({
    async getPeople(payload: GetRequestPayload) {
      dispatch.people.resetError();

      const response = await getRequest<PeopleResponse>(payload);

      if ('error' in response) {
        dispatch.people.setError(response.error);
        return;
      }

      const {results, count, next, previous} = response.data;

      dispatch.people.setPeople(results);
      dispatch.people.setCount(count);
      dispatch.people.setNextPage(next);
      dispatch.people.setPreviousPage(previous);
    },
  }),
});
