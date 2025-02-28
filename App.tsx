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
import './gesture-handler';
import FlashSrc from './src/screen/FlashSrc';

export default function App() {
  const [showFlashScreen, setShowFlashScreen] = React.useState(true);

  setTimeout(() => {
    setShowFlashScreen(false);
  }, 1800);
  return (
    <Provider store={store}>
      <GestureHandlerRootView>
        <RootSiblingParent>
          <PersistGate loading={null} persistor={persistor}>
            <NavigationContainer>
              {showFlashScreen ? (
                <FlashSrc
                  setShowFlashScreen={() => {
                    setShowFlashScreen(!showFlashScreen);
                  }}
                />
              ) : (
                <Route />
              )}
            </NavigationContainer>
          </PersistGate>
        </RootSiblingParent>
      </GestureHandlerRootView>
    </Provider>
  );
}
