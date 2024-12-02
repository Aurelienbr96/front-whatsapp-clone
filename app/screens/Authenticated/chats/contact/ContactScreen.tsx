/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useMemo, useRef} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

import {
  BottomSheetModal,
  BottomSheetView,
  useBottomSheetModal,
} from '@gorhom/bottom-sheet';

const ContactScreen = () => {
  // ref
  const {dismiss} = useBottomSheetModal();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleCloseModalPress = useCallback(() => {
    dismiss();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const snapPoints = useMemo(() => ['95%'], []);

  // renders
  return (
    <View>
      <Button
        onPress={handlePresentModalPress}
        title="Present Modal"
        color="black"
      />
      <Button
        onPress={handleCloseModalPress}
        title="Close modal"
        color="black"
      />
      <BottomSheetModal
        snapPoints={snapPoints}
        index={1}
        ref={bottomSheetModalRef}
        onChange={handleSheetChanges}>
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
