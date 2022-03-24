import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';

//import {createStore, combineReducers, applyMiddleware} from 'redux';

const initialState = {
  userLatLang: null,
  //dialogs
  yesNoDialogShown: false,
  okDialogShown: false,
  okDialogText: '',
  loaderShown: false,
  //login
  fcmToken: '',
  rememberMe: false,
  apiToken: null,
  userId: null,
  email: __DEV__ ? 'test@example.com' : '',
  password: __DEV__ ? 'Test@123' : '',
  //statusbar
  statusBarHidden: true,
  connected: false,
  //is app lunch first time?
  virgin: true,
  lang: 'mr',
};

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [
    'lang',
    'virgin',
    'rememberMe',
    'userId',
    'fcmToken',
    'email',
    'password',
    'apiToken',
    'userLatLang',
  ], //it will  save in persist load from initial state object
};

_update = (key, value) => {
  let t = Object.create(initialState);
  t[key] = value;
  return t;
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_VIRGIN':
      return {...state, virgin: action.value};
    case 'SET_LOGIN_STATUS':
      return {...state, rememberMe: action.value};
    case 'SET_FCM_TOKEN':
      return {...state, fcmToken: action.value};
    case 'SET_USER_ID':
      return {...state, userId: action.value};

    case 'SET_API_TOKEN':
      return {...state, apiToken: action.value};

    case 'SET_EMAIL':
      return {...state, email: action.value};

    case 'SET_PASSWORD':
      return {...state, password: action.value};

    case 'SET_OK_DIALOG_SHOWN':
      return {...state, okDialogShown: action.value};
    case 'SET_YES_NO_DIALOG_SHOWN':
      return {...state, yesNoDialogShown: action.value};

    case 'SET_OK_DIALOG_TEXT':
      return {...state, okDialogText: action.value};
    case 'SET_LOADER_SHOWN':
      return {...state, loaderShown: action.value};
    case 'SET_STATUS_BAR_HIDDEN':
      return {...state, statusBarHidden: action.value};
    case 'SET_USER_LAT_LANG':
      return {...state, userLatLang: action.value};
    case 'SET_CONNECTED':
      return {...state, connected: action.value};
    case 'SET_LANG':
      return {...state, lang: action.value};
  }
  return state;
};

//export default userReducer;

//const rootReducer = combineReducers({userReducer});

export default persistReducer(persistConfig, userReducer);
