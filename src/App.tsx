import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './redux/store';

import SplashScreen from 'react-native-splash-screen';
import Navigator from './navigation/Navigator';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
function App(): JSX.Element {
  useEffect(() => {
    const ac = new AbortController();

    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);

    return function cleanup() {
      ac.abort();
    };
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={{flex: 1}}>
          <StatusBar barStyle="light-content" />
          <Navigator />
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
