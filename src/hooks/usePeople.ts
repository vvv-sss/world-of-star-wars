import {useDispatch, useSelector} from 'react-redux';
import {Dispatch, RootState} from '../setup/store/store';
import {GetRequestPayload} from '../types';

export const usePeople = () => {
  const {data, totalCount, error} = useSelector(
    (state: RootState) => state.people,
  );

  const isLoading = useSelector(
    (state: RootState) => state.loading.models.people,
  );

  const dispatch = useDispatch<Dispatch>();

  const getPeople = (payload: GetRequestPayload) => {
    dispatch.people.getPeople(payload);
  };

  const handleNextPagePress = () => {
    // @ts-ignore
    dispatch.people.getNextPage();
  };

  const handlePreviousPagePress = () => {
    // @ts-ignore
    dispatch.people.getPreviousPage();
  };

  const setDefaultPeopleState = () => {
    dispatch.people.setDefaultState();
  };

  return {
    data,
    totalCount,
    isLoading,
    error,
    getPeople,
    handleNextPagePress,
    handlePreviousPagePress,
    setDefaultPeopleState,
  };
};
