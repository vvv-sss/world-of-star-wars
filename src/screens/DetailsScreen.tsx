import React, {createContext, useEffect, useState} from 'react';
import {DetailsTemplate} from '../components/templates';
import {useNavigation, useRoute} from '@react-navigation/native';
import {People} from '../types';
import {usePeople} from '../hooks';

type DetailsContextValue = {
  data: People;
  isLoading: boolean;
  error: string | null;
  isModalOpen: boolean;
  handleRetryPress: () => void;
  handleModalClose: () => void;
};

export const DetailsContext = createContext<DetailsContextValue | null>(null);

const DetailsScreen: React.FC = () => {
  const [itemExpanded, setItemExpanded] = useState<People | null>(null);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const route = useRoute();

  // XXX type is not inferred
  const {item} = route.params;

  const {isExpandPeopleItemLoading, error, expendPeopleItem} = usePeople();

  const navigation = useNavigation();

  useEffect(() => {
    setIsModalOpen(true);
    expandItem();
  }, []);

  const expandItem = async () => {
    const expandedItem = await expendPeopleItem(item);

    setItemExpanded(expandedItem);
  };

  const value: DetailsContextValue = {
    data: itemExpanded ?? {},
    isLoading: isExpandPeopleItemLoading,
    error,
    isModalOpen,
    handleRetryPress: expandItem,
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
