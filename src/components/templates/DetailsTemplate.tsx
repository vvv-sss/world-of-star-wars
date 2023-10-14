import React, {useContext, useEffect} from 'react';
import {Colors, Spacings, Text, View} from 'react-native-ui-lib';
import {Dimensions} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import {StyleSheet} from 'react-native';
import {DetailsContext} from '../../screens/DetailsScreen';
import {FontIcon} from '../atoms';

const ICON_SIZE = 100;

const DetailsTemplate: React.FC = () => {
  const value = useContext(DetailsContext);

  const {data, isLoading, isModalOpen, handleModalClose} = value || {};

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
        <Text text30BL surface200 center style={styles.header}>
          {data?.name ?? ''}
        </Text>
        <View width="100%" height={1} bg-surface100 />
      </View>
    );
  };

  const renderArrayOfNames = (title: string, array: string[]) => {
    return (
      <>
        <Text text60 surface200 marginT-s4>
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
        scrollViewProps={{showsHorizontalScrollIndicator: false}}
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
          <Text text60 surface200>
            Loading...
          </Text>
        )}
        {!isLoading && data && (
          <>
            <View row centerV>
              <FontIcon
                name="arrow-right"
                size={ICON_SIZE}
                color={Colors.surface200}
              />
              <View marginL-s4>
                <Text text60 surface200>
                  Gender: {data.gender}
                </Text>
                <Text text60 surface200>
                  Birth year: {data.birth_year}
                </Text>
              </View>
            </View>
            <View row centerV right>
              <View marginR-s4>
                <Text text60 surface200>
                  Height: {data.height}
                </Text>
                <Text text60 surface200>
                  Mass: {data.mass}
                </Text>
                <Text text60 surface200>
                  Hair color: {data.hair_color}
                </Text>
                <Text text60 surface200>
                  Skin color: {data.skin_color}
                </Text>
                <Text text60 surface200>
                  Eye color: {data.eye_color}
                </Text>
              </View>
              <FontIcon
                name="arrow-left"
                size={ICON_SIZE}
                color={Colors.surface200}
              />
            </View>
            <Text text40 surface200 marginT-s4>
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
          </>
        )}
      </Modalize>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: Colors.surface500,
  },
  handle: {
    width: 36,
    backgroundColor: Colors.surface200,
  },
  overlay: {
    backgroundColor: Colors.rgba(Colors.primary100, 0.5),
  },
  children: {
    paddingTop: Spacings.s3,
    paddingHorizontal: Spacings.s4,
  },
  header: {
    height: 50,
  },
  divider: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: Colors.rgba(Colors.surface100, 0.4),
  },
});

export default DetailsTemplate;
