import React, {Component} from 'react';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import RNLocation from 'react-native-location';
import Navigation from './src/Navigation';
import messaging from '@react-native-firebase/messaging';
import {_getAsyncStorage, _saveAsyncStorage} from './src/common/util';
import {
  connect,
  mapStateToProps,
  mapDispatchToProps,
  jsonLog,
  jsonEncode,
  strings,
} from './src/App';
import {Platform} from 'react-native';

async function registerAppWithFCM(obj) {
  // Register the device with FCM
  await messaging().registerDeviceForRemoteMessages();
  // Get the token
  const token = await messaging().getToken();
  //console.log('Token : ', token);
  if (token) {
    obj.props.setFcmToken(token);
  }
}

messaging().onMessage(async remoteMessage => {
  //console.log('Message handled in the Foreground!', remoteMessage);
});

class App_ extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    registerAppWithFCM(this);

    RNLocation.requestPermission({
      ios: 'whenInUse',
      android: {
        detail: 'coarse',
      },
    }).then(granted => {
      if (granted) {
        if (Platform.OS == 'android') {
          RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
            interval: 10000,
            fastInterval: 5000,
          })
            .then(data => {
              // The user has accepted to enable the location services
              // data can be :
              //  - "already-enabled" if the location services has been already enabled
              //  - "enabled" if user has clicked on OK button in the popup
            })
            .catch(err => {
              // The user has not accepted to enable the location services or something went wrong during the process
              // "err" : { "code" : "ERR00|ERR01|ERR02|ERR03", "message" : "message"}
              // codes :
              //  - ERR00 : The user has clicked on Cancel button in the popup
              //  - ERR01 : If the Settings change are unavailable
              //  - ERR02 : If the popup has failed to open
              //  - ERR03 : Internal error
            });
        }

        RNLocation.configure({
          distanceFilter: 1, // Meters
          desiredAccuracy: {
            ios: 'best',
            android: 'balancedPowerAccuracy',
          },
          // Android only
          androidProvider: 'auto',
          interval: 5000, // Milliseconds
          fastestInterval: 10000, // Milliseconds
          maxWaitTime: 5000, // Milliseconds
          // iOS Only
          activityType: 'other',
          allowsBackgroundLocationUpdates: false,
          headingFilter: 1, // Degrees
          headingOrientation: 'portrait',
          pausesLocationUpdatesAutomatically: false,
          showsBackgroundLocationIndicator: false,
        });
        this.locationSubscription = RNLocation.subscribeToLocationUpdates(
          locations => {
            const {latitude, longitude} = locations[0];
            this.props.setUserLatLang(jsonEncode({latitude, longitude}));
            /* Example location returned
        {
          speed: -1,
          longitude: -0.1337,
          latitude: 51.50998,
          accuracy: 5,
          heading: -1,
          altitude: 0,
          altitudeAccuracy: -1
          floor: 0
          timestamp: 1446007304457.029,
          fromMockProvider: false
        }
        */
          },
        );
      }
    });
  }
  componentDidMount() {
    strings.setLanguage(this.props.lang);
  }
  render() {
    return <Navigation />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App_);
