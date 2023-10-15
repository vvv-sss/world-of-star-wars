import {useDispatch, useSelector} from 'react-redux';
import {Dispatch, RootState} from '../setup/store/store';
import {GetRequestPayload, People} from '../types';

export const usePeople = () => {
  const {data, nextPage, previousPage, totalCount, error} = useSelector(
    (state: RootState) => state.people,
  );

  const isPeopleLoading = useSelector(
    (state: RootState) => state.loading.effects.people.getPeople,
  );

  const isExpandPeopleItemLoading = useSelector(
    (state: RootState) => state.loading.effects.people.expandPeopleItem,
  );

  const dispatch = useDispatch<Dispatch>();

  const getPeople = (payload: GetRequestPayload) => {
    dispatch.people.getPeople(payload);
  };

  const expendPeopleItem = async (item: People) => {
    const result = await dispatch.people.expandPeopleItem(item);

    return result;
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
    nextPage,
    previousPage,
    totalCount,
    isPeopleLoading,
    isExpandPeopleItemLoading,
    error,
    getPeople,
    expendPeopleItem,
    handleNextPagePress,
    handlePreviousPagePress,
    setDefaultPeopleState,
  };
};
