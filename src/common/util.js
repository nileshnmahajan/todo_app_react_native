import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {Platform, Dimensions, Linking, StatusBar} from 'react-native';
import strings from './Strings';

export function isIphoneX() {
  return;
}
export function getStatusBarHeight(skipAndroid) {
  const dimen = Dimensions.get('window');

  return Platform.select({
    ios:
      Platform.OS === 'ios' &&
      (dimen.height === 812 ||
        dimen.width === 812 ||
        dimen.height === 896 ||
        dimen.width === 896)
        ? 44
        : 20,
    android: skipAndroid ? 0 : StatusBar.currentHeight,
    default: 0,
  });
}

export const isDev = () => __DEV__;
export const log = str => {
  if (!isDev) return;
  console.log('====================================');
  console.log(str);
  console.log('====================================');
};

export const jsonLog = str => {
  if (!isDev) return;
  console.log('====================================');
  console.log(JSON.stringify(str));
  console.log('====================================');
};

export const alert = str => {
  if (!isDev) return;
  alert(str);
};

export const jsonAlert = str => {
  if (!isDev) return;
  alert(JSON.stringify(str));
};

export const jsonEncode = obj => JSON.stringify(obj);
export const jsonDecode = obj => JSON.parse(obj);

//obj will set okDialog visible
// first parameter is reference of that class
//seconf parameter is actual string which will shown in dialog
export const okDialog = (obj, text) => {
  try {
    obj.props.setOkDialogShown(true);
    obj.props.setOkDialogText(text);
  } catch (error) {
    obj.setOkDialogShown(true);
    obj.setOkDialogText(text);
  }
};

export const yesNoDialog = (obj, text) => {
  try {
    obj.props.setYesNoDialogShown(true);
    obj.props.setOkDialogText(text);
  } catch (error) {
    obj.setYesNoDialogShown(true);
    obj.setOkDialogText(text);
  }
};

export const loading = {
  start: obj => {
    try {
      obj.props.setLoaderShown(true);
    } catch (error) {
      obj.setLoaderShown(true);
    }

    //TODO:add timer for operation taking long action hide loader and show ok dialog
    // obj.props.setLoaderShown(false);
    // okDialog(obj, strings.timeOut);
  },
  stop: obj => {
    try {
      obj.props.setLoaderShown(false);
    } catch (error) {
      obj.setLoaderShown(false);
    }
  },
};

export const isConnectedToNet = obj => {
  const state = obj.props.connected;

  if (!state) {
    okDialog(obj, strings.internetReq);
    return false;
  }
  return true;
};

export const exist = str => {
  if (str == '') return false;
  if (str == undefined) return false;
  if (str == null) return false;
  return true;
};

export const urlValider = url =>
  url.startsWith('www') ? 'http://' + url : url;

import HaversineGeolocation from 'haversine-geolocation';
export const distance = (lat1, lon1, lat2, lon2) => {
  const points = [
    {
      latitude: lat1,
      longitude: lon1,
    },
    {
      latitude: lat2,
      longitude: lon2,
    },
  ];
  let dist = 0,
    p = ' M';

  // Distance in meters
  dist = HaversineGeolocation.getDistanceBetween(points[0], points[1], 'm'); // 1133062.7 m
  if (dist > 9999) {
    // Distance in kilometers(default value)
    dist = HaversineGeolocation.getDistanceBetween(points[0], points[1]); //
    p = ' KM';

    if (dist > 9999) {
      // Distance in miles
      HaversineGeolocation.getDistanceBetween(points[0], points[1], 'mi'); // 704.1 mi
      p = 'MILE';
    }
  }

  /*
  var p = 0.017453292519943295; // Math.PI / 180
  var c = Math.cos;
  var a =
    0.5 -
    c((lat2 - lat1) * p) / 2 +
    (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;
  let dist = parseInt(12742 * Math.asin(Math.sqrt(a))); // 2 * R; R = 6371 km
  */
  dist = parseInt(dist);
  return dist < 9999 ? dist + p : '9999+' + p;
};

export const sendData = (
  obj,
  method,
  url,
  data,
  callback,
  callbackData = null,
) => {
  const state = isConnectedToNet(obj);

  if (!state) return;
  loading.start(obj);
  log('sending request ....' + url);

  axios(
    method == 'get'
      ? {
          method,
          url,
        }
      : {
          method,
          url,
          data,
        },
  )
    .then(
      function ({data}) {
        loading.stop(obj);
        //console.log("response...."+url+" "+JSON.stringify(data));
        try {
          callback(obj, data, callbackData);
        } catch (e) {
          alert(e);
        }
      }.bind(obj),
    )
    .catch(
      function (error) {
        loading.stop(obj);
        log('error-' + error + ':' + url);
      }.bind(obj),
    );
};

export const device_type = Platform.OS == 'android' ? 1 : 2;

export const {width, height} = Dimensions.get('screen');
export const wip = obj => {
  okDialog(obj, strings.notImplemented);
};

export const _getAppVersion = () => VersionInfo.appVersion;

// Save key-value pair in async storage (preferences)
export const _saveAsyncStorage = async (itemKey, selectedValue) => {
  try {
    // console.log(
    //   'Saving AsyncStorage value: ' + itemKey + ' => ' + selectedValue
    // )
    await AsyncStorage.setItem(itemKey, `${selectedValue}`);
  } catch (error) {
    console.error('AsyncStorage error: ' + error.message);
  }
};

// Get value for itemKey from async storage (preferences)
export const _getAsyncStorage = async itemKey => {
  try {
    const value = await AsyncStorage.getItem(itemKey);
    if (value !== null) {
      // console.log('Returning AsyncStorage value: ' + value)
      return value;
    }
  } catch (e) {
    // error reading value
  }
  return '';
};

export const isLogin = obj => {
  try {
    return exist(obj.props.apiToken);
  } catch (error) {
    return exist(obj.apiToken);
  }
  return false;
};

export const navigation = {
  navigate: (obj, sn, data = {}) => {
    const state = isConnectedToNet(obj);
    if (!state) return;
    try {
      obj.props.navigation.navigate(sn, data);
    } catch (e) {
      try {
        obj.navigation.navigate(sn, data);
      } catch (e) {
        obj.props.props.navigation.navigate(sn, data);
      }
    }
  },
  push: (obj, sn, data = {}) => {
    const state = isConnectedToNet(obj);
    if (!state) return;
    try {
      obj.props.navigation.push(sn, data);
    } catch (e) {
      try {
        obj.navigation.push(sn, data);
      } catch (e) {
        obj.props.props.navigation.push(sn, data);
      }
    }
  },
  replace: (obj, sn, data = {}) => {
    const state = isConnectedToNet(obj);
    if (!state) return;
    try {
      obj.props.navigation.replace(sn, data);
    } catch (e) {
      try {
        obj.navigation.replace(sn, data);
      } catch (e) {
        obj.props.props.navigation.replace(sn, data);
      }
    }
  },
  goBack: (obj, data = {}) => {
    const state = isConnectedToNet(obj);
    if (!state) return;
    try {
      obj.props.navigation.goBack(data);
    } catch (e) {
      try {
        obj.navigation.goBack(data);
      } catch (e) {
        obj.props.props.navigation.goBack(data);
      }
    }
  },
};

export const removeTags = str => {
  if (str === null || str === '') return false;
  else str = str.toString();

  // Regular expression to identify HTML tags in
  // the input string. Replacing the identified
  // HTML tag with a null string.
  return str.replace(/(<([^>]+)>)/gi, '');
};

export const handleClick = url => {
  Linking.canOpenURL(url).then(supported => {
    if (supported) {
      Linking.openURL(url);
    } else {
      console.log("Don't know how to open URI: " + url);
    }
  });
};
