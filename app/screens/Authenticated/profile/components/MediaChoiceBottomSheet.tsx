import React, {useMemo} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
  SNAP_POINT_TYPE,
} from '@gorhom/bottom-sheet';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {BottomSheetDefaultBackdropProps} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import {colors} from '../../../../common/colors';
import {Camera} from 'lucide-react-native';
import {useNavigation} from '@react-navigation/native';

type Props = {
  bottomSheetModalRef: React.RefObject<BottomSheetModalMethods>;
  handleSheetChanges?: (
    index: number,
    position: number,
    type: SNAP_POINT_TYPE,
  ) => void;
};

const MediaChoiceBottomSheet = ({bottomSheetModalRef}: Props) => {
  const renderBackdrop = (
    props: React.JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps,
  ) => (
    <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
  );
  const {navigate} = useNavigation();
  const handleNavigateToCameraScreen = () => {
    bottomSheetModalRef.current?.dismiss();
    navigate('Camera');
  };
  const snapPoints = useMemo(() => ['30%'], []);

  return (
    <View style={styles.bottomSheetStyle}>
      <BottomSheetModal
        name="MediaChoice"
        snapPoints={snapPoints}
        index={1}
        backgroundStyle={{
          backgroundColor: colors.lightGray,
        }}
        ref={bottomSheetModalRef}
        backdropComponent={renderBackdrop}>
        <BottomSheetView style={styles.contentContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleNavigateToCameraScreen}>
            <>
              <Text>Take photo</Text>
              <Camera color={colors.black} />
            </>
          </TouchableOpacity>
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  button: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 40,
    backgroundColor: colors.white,
  },
  bottomSheetStyle: {
    backgroundColor: colors.lightGray,
  },
});

export default MediaChoiceBottomSheet;
