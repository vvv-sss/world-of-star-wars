import {createModel} from '@rematch/core';
import {getRequest} from '../../api/services';
import {
  Film,
  GetRequestPayload,
  People,
  PeopleRecord,
  PeopleResponse,
  Planet,
  Specie,
  Starship,
  Vehicle,
} from '../../../types';
import {RootModel} from '.';
import {
  checkArrayForStrings,
  convertArrayToKeyedObject,
  fetchAllSettled,
  getNamesOfTruthyItems,
  getTitlesOfTruthyItems,
} from '../../../utils';

type PeopleState = {
  data: PeopleRecord | null;
  totalCount: number | null;
  nextPage: string | null;
  previousPage: string | null;
  error: string | null;
};

const initialState: PeopleState = {
  data: null,
  totalCount: null,
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
    async getPeople(payload: GetRequestPayload) {
      dispatch.people.resetError();

      const response = await getRequest<PeopleResponse>(payload);

      if ('error' in response) {
        dispatch.people.setError('Something went wrong...');
        return {error: 'Something went wrong...'};
      }

      const {results, count, next, previous} = response.data;

      const keyedPeople = convertArrayToKeyedObject<People>(results);

      dispatch.people.setData(keyedPeople);
      dispatch.people.setTotalCount(count);
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
    async expandPeopleItem(payload: People): Promise<People> {
      const {homeworld, films, species, starships, vehicles} = payload;

      let homeworldName: string = 'Unknown';

      if (typeof homeworld === 'string') {
        const homeworldResponse = await getRequest<Planet>({url: homeworld});

        if ('data' in homeworldResponse) {
          homeworldName = homeworldResponse.data.name;
        }
      }

      let filmNames: string[] = [];

      if (checkArrayForStrings(films)) {
        const filmResults = await fetchAllSettled<Film>(films as string[]);

        const filmNamesArray = getTitlesOfTruthyItems<Film>(filmResults);

        filmNames = filmNamesArray;
      }

      let specieNames: string[] = [];

      if (checkArrayForStrings(species)) {
        const specieResults = await fetchAllSettled<Specie>(
          species as string[],
        );

        const specieNamesArray = getNamesOfTruthyItems<Specie>(specieResults);

        specieNames = specieNamesArray;
      }

      let starshipNames: string[] = [];

      if (checkArrayForStrings(starships)) {
        const starshipResults = await fetchAllSettled<Starship>(
          starships as string[],
        );

        const starshipNamesArray =
          getNamesOfTruthyItems<Starship>(starshipResults);

        starshipNames = starshipNamesArray;
      }

      let vehicleNames: string[] = [];

      if (checkArrayForStrings(vehicles)) {
        const vehicleResults = await fetchAllSettled<Vehicle>(
          vehicles as string[],
        );

        const vehicleNamesArray =
          getNamesOfTruthyItems<Vehicle>(vehicleResults);

        vehicleNames = vehicleNamesArray;
      }

      return {
        ...payload,
        homeworld: homeworldName,
        films: filmNames,
        species: specieNames,
        starships: starshipNames,
        vehicles: vehicleNames,
      };
    },
  }),
});
