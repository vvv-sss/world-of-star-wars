import {createModel} from '@rematch/core';
import {getRequest} from '../../api/services';
import {
  GetRequestPayload,
  People,
  PeopleRecord,
  PeopleResponse,
} from '../../../types';
import {RootModel} from '.';
import {convertArrayToKeyedObject} from '../../../utils';

type PeopleState = {
  people: PeopleRecord | null;
  count: number | null;
  nextPage: string | null;
  previousPage: string | null;
  error: string | null;
};

const initialState: PeopleState = {
  people: null,
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
    setPeople(state, payload: PeopleRecord) {
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
        dispatch.people.setError('Something went wrong...');
        return;
      }

      const {results, count, next, previous} = response.data;

      const keyedPeople = convertArrayToKeyedObject<People>(results);

      dispatch.people.setPeople(keyedPeople);
      dispatch.people.setCount(count);
      dispatch.people.setNextPage(next);
      dispatch.people.setPreviousPage(previous);
    },
    async getNextPage(_, store) {
      const {nextPage} = store.people;

      if (!nextPage) {
        return;
      }

      dispatch.people.getPeople({url: nextPage});
    },
    async getPreviousPage(_, store) {
      const {previousPage} = store.people;

      if (!previousPage) {
        return;
      }

      dispatch.people.getPeople({url: previousPage});
    },
  }),
});
