import React, {useContext, useEffect} from 'react';
import {Colors, Spacings, Text, View} from 'react-native-ui-lib';
import {Dimensions} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import {StyleSheet} from 'react-native';
import {DetailsContext} from '../../screens/DetailsScreen';
import {ErrorView, FontIcon} from '../atoms';

const ICON_SIZE = 80;

const DetailsTemplate: React.FC = () => {
  const value = useContext(DetailsContext);

  const {
    data,
    isLoading,
    error,
    isModalOpen,
    handleModalClose,
    handleRetryPress,
  } = value || {};

  const modalRef = React.useRef<Modalize>(null);

  const windowHeight = Dimensions.get('window').height;

  useEffect(() => {
    if (modalRef.current) {
      isModalOpen ? modalRef.current.open() : modalRef.current.close();
    }
  }, [isModalOpen]);

  const renderHeader = () => {
    return (
      <View marginT-s5>
        <Text text30BL cashmere100 center style={styles.header}>
          {data?.name ?? ''}
        </Text>
        <View
          width="100%"
          height={1}
          backgroundColor={Colors.rgba(Colors.cashmere100, 0.4)}
        />
      </View>
    );
  };

  const renderArrayOfNames = (title: string, array: string[]) => {
    return (
      <>
        <Text text60 cashmere100 marginT-s4>
          {title}: {array.join(', ')}
        </Text>
        <View style={styles.divider} />
      </>
    );
  };

  return (
    <Portal>
      <Modalize
        ref={modalRef}
        modalHeight={windowHeight * 0.75}
        scrollViewProps={{showsVerticalScrollIndicator: false}}
        modalStyle={styles.modal}
        handleStyle={styles.handle}
        overlayStyle={styles.overlay}
        childrenStyle={styles.children}
        HeaderComponent={renderHeader()}
        handlePosition="inside"
        closeOnOverlayTap
        withOverlay
        onClosed={handleModalClose}
        onOverlayPress={handleModalClose}>
        {isLoading && (
          <Text text60 cashmere200>
            Loading...
          </Text>
        )}
        {error && (
          <ErrorView errorMessage={error} handleRetryPress={handleRetryPress} />
        )}
        {!isLoading && data && (
          <>
            <View row centerV>
              <FontIcon
                name="arrow-right"
                size={ICON_SIZE}
                color={Colors.cashmere100}
              />
              <View flex marginL-s4 right>
                <Text text60 cashmere100>
                  Gender: {data.gender}
                </Text>
                <Text text60 cashmere100>
                  Birth year: {data.birth_year}
                </Text>
              </View>
            </View>
            <View row centerV>
              <View flex marginR-s4>
                <Text text60 cashmere100>
                  Height: {data.height}
                </Text>
                <Text text60 cashmere100>
                  Mass: {data.mass}
                </Text>
                <Text text60 cashmere100>
                  Hair color: {data.hair_color}
                </Text>
                <Text text60 cashmere100>
                  Skin color: {data.skin_color}
                </Text>
                <Text text60 cashmere100>
                  Eye color: {data.eye_color}
                </Text>
              </View>
              <FontIcon
                name="arrow-left"
                size={ICON_SIZE}
                color={Colors.cashmere100}
              />
            </View>
            <Text text40 cashmere100 marginT-s4>
              Homeworld: {data.homeworld as string}
            </Text>
            <View style={styles.divider} />
            {data.films &&
              data.films.length > 0 &&
              renderArrayOfNames('Films', data.films as string[])}
            {data.species &&
              data.species.length > 0 &&
              renderArrayOfNames('Species', data.species as string[])}
            {data.starships &&
              data.starships.length > 0 &&
              renderArrayOfNames('Starships', data.starships as string[])}
            {data.vehicles &&
              data.vehicles.length > 0 &&
              renderArrayOfNames('Vehicles', data.vehicles as string[])}
            <View height={50} />
          </>
        )}
      </Modalize>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: Colors.bluewood100,
  },
  handle: {
    width: 36,
    backgroundColor: Colors.cashmere100,
  },
  overlay: {
    backgroundColor: Colors.rgba('#000000', 0.9),
  },
  children: {
    paddingTop: Spacings.s3,
    paddingHorizontal: Spacings.s4,
  },
  header: {
    minHeight: 50,
  },

  divider: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: Colors.rgba(Colors.cashmere100, 0.4),
  },
});

export default DetailsTemplate;
