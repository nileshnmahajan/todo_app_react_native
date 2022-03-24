import React, {Component} from 'react';
import {
  View,
  Image,
  Animated,
  TouchableOpacity,
  BackHandler,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';

import {Text, Button, TextInput} from 'react-native-paper';
import SplashScreen from './SplashScreen';
import BgImage from '../components/BgImage';
import NetInfo from '@react-native-community/netinfo';
import auth from '@react-native-firebase/auth';
import {
  height,
  width,
  colors,
  strings,
  assets,
  connect,
  mapStateToProps,
  mapDispatchToProps,
  log,
  okDialog,
  RenderOkDialog,
  API,
  loading,
  RenderLoader,
  constants,
  sendData,
  device_type,
  RenderStatusBar,
  RenderYesNoDialog,
  navigation,
  jsonLog,
} from '../App';

import {GoogleSignin} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '',
});

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      splashFinish: false,
      email: __DEV__ ? 'test@example.com' : '',
      password: __DEV__ ? 'Test@123' : '',
      rememberMe: false,
      connectivityAvailable: false,
      login: false,
      emailError: false,
      emailErrorText: 'this is error',
      passwordError: false,
      passwordErrorText: 'this is error',
      error: false,
      errorText: '',
    };

    if (this.isLOggedIn()) return;
    var timeOut = 2500;
    var duration = 800;
    try {
      if (this.props.route.params.navigate) {
        timeOut = 100;
        duration = 300;
      }
    } catch (e) {}

    //jsonLog({timeOut, duration});

    this.loginBoxFlex = new Animated.Value(-1 * height);
    setTimeout(() => {
      this.setState({splashFinish: true});
      this.props.setStatusBarHidden(false);
      Animated.timing(this.loginBoxFlex, {
        toValue: 0,
        duration,
        useNativeDriver: false,
      }).start();
    }, timeOut);
  }
  componentDidMount() {
    this.setState({email: this.props.email, password: this.props.password});

    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        this.setState({connectivityAvailable: true});
        this.props.setStatusBarHidden(false);
        if (this.isLOggedIn()) navigation.replace(this, 'homeScreen');
      } else {
        okDialog(this, strings.internetReq);
      }
    });
  }

  subscribe = NetInfo.addEventListener(
    function (state) {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      this.props.setConnected(state.isConnected);
    }.bind(this),
  );

  noInternet = () => {};

  exitApp = () => {
    BackHandler.exitApp();
  };

  isLOggedIn() {
    if (this.props.apiToken) {
      return true;
    } else log('user is not logged  in ' + this.state.rememberMe);
    return false;
  }

  login() {
    const {email, password} = this.state;
    let error = false;
    if (this.state.email == '') {
      this.setState({
        emailError: true,
        emailErrorText: strings.emailReq,
        login: false,
      });
      error = true;
    }

    if (this.state.password == '') {
      this.setState({
        passwordError: true,
        passwordErrorText: strings.passwordReq,
        login: false,
      });
      error = true;
    }

    if (error) return;

    //pass reference of this and string which we want to show in okdialog
    if (email == '' && password == '')
      return okDialog(this, strings.allFeildsRequired);
    if (email == '') return okDialog(this, strings.emailRequired);
    if (!constants.emailRegEx.test(email))
      return okDialog(this, strings.invalidEmail);
    if (password == '') return okDialog(this, strings.passwordRequired);

    loading.start(this);

    auth()
      .signInWithEmailAndPassword(email, password)
      .then(data => {
        console.log('User signed in!');
        jsonLog(data);
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
    loading.stop(this);
    return;

    const data = {
      email,
      password,
      action: 'login',
      device_type,
      device_token: this.props.fcmToken,
    };
  }

  loginCallback(obj, response) {
    const {status, message, data} = response;
    const {email, password, rememberMe} = obj.state;
    if (!status) return okDialog(obj, message);

    obj.props.setUserId(data.ID);
    obj.props.setApiToken(data.API_TOKEN);

    obj.props.setRememberMe(rememberMe);
    obj.props.setEmail(email);
    obj.props.setPassword(password);

    navigation.replace(obj, 'homeScreen');
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <RenderStatusBar />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'height' : null}
          style={{flex: 1}}>
          <View
            style={{
              backgroundColor: 'rgba(0,0,0,0.7)',
              padding: 15,
              marginHorizontal: 5,
              borderRadius: 10,
              flex: 1,
            }}>
            <ScrollView>
              <Image
                source={assets.logo}
                style={{
                  width: 134,
                  height: 134,
                  resizeMode: 'cover',
                  alignSelf: 'center',
                  borderRadius: 15,
                  backgroundColor: 'lightblue',
                  borderRadius: 134,
                }}
              />
              <Text
                style={{
                  fontSize: 30,
                  textAlign: 'center',
                  paddingVertical: 20,
                  color: colors.green,
                  fontWeight: 'bold',
                }}>
                {strings.welcomeBack}
              </Text>

              <View style={styles.inputGroup}>
                <TextInput
                  error={this.state.emailError}
                  mode="outlined"
                  value={this.state.email}
                  label={strings.email}
                  onChangeText={text =>
                    this.setState({
                      email: text,
                      emailError: false,
                      error: false,
                    })
                  }
                />
                {this.state.emailError && (
                  <Text style={{color: colors.errorColor}}>
                    {this.state.emailErrorText}
                  </Text>
                )}
              </View>

              <View style={styles.inputGroup}>
                <TextInput
                  secureTextEntry={true}
                  error={this.state.passwordError}
                  mode="outlined"
                  label={strings.password}
                  value={this.state.password}
                  onChangeText={text =>
                    this.setState({
                      password: text,
                      passwordError: false,
                      error: false,
                    })
                  }
                  style={{paddingTop: 20, paddingBottom: 5}}
                />
                {this.state.passwordError && (
                  <Text style={{color: colors.errorColor}}>
                    {this.state.passwordErrorText}
                  </Text>
                )}
              </View>

              <TouchableOpacity
                onPress={() => {
                  /*navigate to forgot screen*/
                  this.props.navigation.navigate('forgot');
                }}>
                <Text style={{textAlign: 'right'}}>
                  {strings.forgotPassword}
                </Text>
              </TouchableOpacity>
              <Button
                mode="contained"
                onPress={() => this.login()}
                style={{marginTop: 25, paddingVertical: 5, color: 'white'}}
                color={colors.themeColor}
                labelStyle={{color: 'white', fontSize: 15}}>
                {strings.logeIn}
              </Button>
              <View
                style={{
                  marginTop: 15,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: colors.white}}>{strings.register0}</Text>
                <TouchableOpacity
                  onPress={() => {
                    /*navigate to signup screen*/
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 16,
                      color: colors.themeColor,
                    }}>
                    {' '}
                    {strings.register1}
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>

        <RenderOkDialog
          action={
            this.state.connectivityAvailable
              ? false
              : () => BackHandler.exitApp()
          }
        />
        <RenderLoader />
        <RenderYesNoDialog />
      </SafeAreaView>
    );
  }
}

const styles = {
  inputGroup: {
    marginVertical: 5,
  },
};

//export default LoginScreen;

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
