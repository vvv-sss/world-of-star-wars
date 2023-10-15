import React, {createContext, useEffect, useState} from 'react';
import {DetailsTemplate} from '../components/templates';
import {useNavigation, useRoute} from '@react-navigation/native';
import {People} from '../types';
import {useDispatch, useSelector} from 'react-redux';
import {Dispatch, RootState} from '../setup/store/store';

type DetailsContextValue = {
  data: People;
  isLoading: boolean;
  isModalOpen: boolean;
  handleModalClose: () => void;
};

export const DetailsContext = createContext<DetailsContextValue | null>(null);

const DetailsScreen: React.FC = () => {
  const [itemExpanded, setItemExpanded] = useState<People | null>(null);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const route = useRoute();

  // XXX type is not inferred
  const {item} = route.params;

  const isLoading = useSelector(
    (state: RootState) => state.loading.effects.people.expandPeopleItem,
  );

  const dispatch = useDispatch<Dispatch>();

  const navigation = useNavigation();

  useEffect(() => {
    setIsModalOpen(true);

    const expandItem = async () => {
      const result = await dispatch.people.expandPeopleItem(item);

      setItemExpanded(result);
    };

    expandItem();
  }, []);

  const value = {
    data: itemExpanded ?? {},
    isLoading,
    isModalOpen,
    handleModalClose: () => {
      setIsModalOpen(false);
      navigation.goBack();
    },
  };

  return (
    <DetailsContext.Provider value={value}>
      <DetailsTemplate />
    </DetailsContext.Provider>
  );
};

export default DetailsScreen;
