import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {Provider as ReduxProvider} from 'react-redux';
import {createStore} from 'redux';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import {
  configureFonts,
  DarkTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import codePush from 'react-native-code-push';

import SplashScreen from './src/scenes/SplashScreen';
import {name as appName} from './app.json';
import {colors, Reducer, theme} from './src/App';
import {_getAsyncStorage, _saveAsyncStorage} from './src/common/util';
const store = createStore(Reducer);
const persistor = persistStore(store);

const Main = () => {
  //Handle Foreground message
  if (__DEV__ == false)
    codePush.sync(
      {installMode: codePush.InstallMode.IMMEDIATE},
      status => {
        switch (status) {
          case codePush.SyncStatus.UP_TO_DATE:
            //alert('up to date');
            break;
          case codePush.SyncStatus.UPDATE_IGNORED:
          //alert('update ignored');
          case codePush.SyncStatus.DOWNLOADING_PACKAGE:
            // Show"downloading" modal
            //alert('downloading');
            break;
          case codePush.SyncStatus.INSTALLING_UPDATE:
            // Hide "downloading" modal
            //alert('installing');
            break;
          case codePush.SyncStatus.UPDATE_INSTALLED:
            //alert('installed');
            break;
        }
      },
      ({receivedBytes, totalBytes}) => {
        /* Update download modal progress */
      },
    );

  return (
    <ReduxProvider store={store}>
      <PersistGate
        loading={<SplashScreen loading={true} />}
        persistor={persistor}>
        <PaperProvider theme={theme}>
          <App />
        </PaperProvider>
      </PersistGate>
    </ReduxProvider>
  );
};

export default __DEV__
  ? Main
  : codePush({
      checkFrequency: codePush.CheckFrequency.ON_APP_START,
    })(Main);

AppRegistry.registerComponent(appName, () => Main);
