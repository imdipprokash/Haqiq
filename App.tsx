import * as React from 'react';
import {NavigationContainer, useFocusEffect} from '@react-navigation/native';
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
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import NoInternet from './src/components/NoInternet';
import DeckSwiper from './src/TryNew/DeckSwiper';

export default function App() {
  const [showFlashScreen, setShowFlashScreen] = React.useState(true);
  const [refresh, setRefresh] = React.useState(1);

  const [isOffline, setIsOffline] = React.useState(false);
  React.useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener(
      (state: NetInfoState) => {
        const offline = !(state.isConnected && state.isInternetReachable);
        setIsOffline(offline);
      },
    );

    return () => removeNetInfoSubscription();
  }, [refresh]);

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
              ) : isOffline ? (
                <NoInternet
                  onPress={() => {
                    setRefresh(refresh + 1);
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
