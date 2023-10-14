import {useDispatch, useSelector} from 'react-redux';
import {PEOPLE_URL} from '../setup/api/url';
import {Dispatch, RootState} from '../setup/store/store';

export const usePeople = () => {
  const {people, count, error} = useSelector(
    (state: RootState) => state.people,
  );

  const isLoading = useSelector(
    (state: RootState) => state.loading.models.people,
  );

  const dispatch = useDispatch<Dispatch>();

  const getPeople = () => {
    dispatch.people.getPeople({url: PEOPLE_URL.PEOPLE});
  };

  const getNextPage = () => {
    //@ts-ignore
    dispatch.people.getNextPage();
  };

  const getPreviousPage = () => {
    //@ts-ignore
    dispatch.people.getPreviousPage();
  };

  return {
    getPeople,
    getNextPage,
    getPreviousPage,
    people,
    count,
    isLoading,
    error,
  };
};
