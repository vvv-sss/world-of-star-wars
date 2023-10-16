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

type SearchState = {
  data: PeopleRecord | null;
  totalCount: number | null;
  nextPage: string | null;
  previousPage: string | null;
  error: string | null;
};

const initialState: SearchState = {
  data: null,
  totalCount: null,
  nextPage: null,
  previousPage: null,
  error: null,
};

export const search = createModel<RootModel>()({
  state: initialState,
  reducers: {
    setDefaultState() {
      return initialState;
    },
    setData(state, payload: PeopleRecord) {
      return {
        ...state,
        data: payload,
      };
    },
    setTotalCount(state, payload: number) {
      return {
        ...state,
        totalCount: payload,
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
    async makeSearchRequest(payload: GetRequestPayload) {
      dispatch.search.resetError();

      const response = await getRequest<PeopleResponse>(payload);

      if ('error' in response) {
        dispatch.search.setError('Something went wrong...');
        return;
      }

      const {results, count, next, previous} = response.data;

      if (results.length === 0) {
        dispatch.search.setError('No results found');
        return;
      }

      const keyedPeople = convertArrayToKeyedObject<People>(results);

      dispatch.search.setData(keyedPeople);
      dispatch.search.setTotalCount(count);
      dispatch.search.setNextPage(next);
      dispatch.search.setPreviousPage(previous);
    },
    async getNextPage(_, store) {
      const {nextPage} = store.search;

      if (!nextPage) {
        return;
      }

      dispatch.search.makeSearchRequest({url: nextPage});
    },
    async getPreviousPage(_, store) {
      const {previousPage} = store.search;

      if (!previousPage) {
        return;
      }

      dispatch.search.makeSearchRequest({url: previousPage});
    },
  }),
});
