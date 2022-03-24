//write Dispatch functions here
import {connect as _} from 'react-redux';
import __ from './Reducer';

export function mapStateToProps(state) {
  return {
    //common
    userLatLang: state.userLatLang,
    connected: state.connected,
    //Okdialog
    okDialogShown: state.okDialogShown,
    okDialogText: state.okDialogText,
    loaderShown: state.loaderShown,
    fcmToken: state.fcmToken,
    apiToken: state.apiToken,
    rememberMe: state.rememberMe,
    userId: state.userId,
    email: state.email,
    password: state.password,
    statusBarHidden: state.statusBarHidden,
    yesNoDialogShown: state.yesNoDialogShown,
    virgin: state.virgin, //app lunch first time?
    lang: state.lang,
  };
}

//action functions to update redux state value
export function mapDispatchToProps(dispatch) {
  return {
    setOkDialogShown: val =>
      dispatch({type: 'SET_OK_DIALOG_SHOWN', value: val}),
    setConnected: val => dispatch({type: 'SET_CONNECTED', value: val}),
    setYesNoDialogShown: val =>
      dispatch({type: 'SET_YES_NO_DIALOG_SHOWN', value: val}),
    setOkDialogText: val => dispatch({type: 'SET_OK_DIALOG_TEXT', value: val}),
    setLoaderShown: val => dispatch({type: 'SET_LOADER_SHOWN', value: val}),
    setRememberMe: val => dispatch({type: 'SET_LOGIN_STATUS', value: val}),
    setFcmToken: val => dispatch({type: 'SET_FCM_TOKEN', value: val}),
    setApiToken: val => dispatch({type: 'SET_API_TOKEN', value: val}),
    setUserId: val => dispatch({type: 'SET_USER_ID', value: val}),
    setEmail: val => dispatch({type: 'SET_EMAIL', value: val}),
    setPassword: val => dispatch({type: 'SET_PASSWORD', value: val}),
    setStatusBarHidden: val =>
      dispatch({type: 'SET_STATUS_BAR_HIDDEN', value: val}),
    setUserLatLang: val => dispatch({type: 'SET_USER_LAT_LANG', value: val}),
    setVirgin: val => dispatch({type: 'SET_VIRGIN', value: val}),
    setLang: val => dispatch({type: 'SET_LANG', value: val}),
  };
}

export const connect = _;

export const Reducer = __;
