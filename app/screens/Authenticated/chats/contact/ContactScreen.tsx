import React, {useMemo} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
  SNAP_POINT_TYPE,
} from '@gorhom/bottom-sheet';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {BottomSheetDefaultBackdropProps} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import {SharedValue} from 'react-native-reanimated';

type Props = {
  bottomSheetModalRef: React.RefObject<BottomSheetModalMethods>;
  handleSheetChanges?: (
    index: number,
    position: number,
    type: SNAP_POINT_TYPE,
  ) => void;
  animatedPosition: SharedValue<number>;
};

const ContactScreen = ({bottomSheetModalRef, animatedPosition}: Props) => {
  const renderBackdrop = (
    props: React.JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps,
  ) => (
    <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
  );
  const snapPoints = useMemo(() => ['95%'], []);

  const handleOnAnimate = (fromIndex: number, toIndex: number) => {
    console.log(fromIndex, toIndex);
  };

  return (
    <View>
      <BottomSheetModal
        name="Contact"
        snapPoints={snapPoints}
        index={1}
        ref={bottomSheetModalRef}
        backdropComponent={renderBackdrop}
        onAnimate={handleOnAnimate}
        animatedPosition={animatedPosition}>
        <BottomSheetView style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default ContactScreen;
