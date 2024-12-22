import 'react-native-gesture-handler';
if (__DEV__) {
  require('./ReactotronConfig');
}
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import AppRouter from './app/router/AppRouter';
import {persistor, store} from './app/redux/store';
import {Provider} from 'react-redux';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {PersistGate} from 'redux-persist/integration/react';

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <BottomSheetModalProvider>
        <Provider store={store}>
          <PersistGate persistor={persistor} loading={null}>
            <AppRouter />
          </PersistGate>
        </Provider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

export default App;
