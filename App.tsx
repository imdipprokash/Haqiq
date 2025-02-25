import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/redux/store';
import {Provider} from 'react-redux';
import './i18n';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {RootSiblingParent} from 'react-native-root-siblings';
import 'react-native-reanimated';
import Route from './Route';

export default function App() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView>
        <RootSiblingParent>
          <PersistGate loading={null} persistor={persistor}>
            <NavigationContainer>
              <Route />
            </NavigationContainer>
          </PersistGate>
        </RootSiblingParent>
      </GestureHandlerRootView>
    </Provider>
  );
}
