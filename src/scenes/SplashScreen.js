import React, {Component} from 'react';
import {Text, View, Animated, Image} from 'react-native';
import {
  colors,
  strings,
  assets,
  connect,
  mapStateToProps,
  mapDispatchToProps,
} from '../App';
import NetInfo from '@react-native-community/netinfo';

class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      connectivityAvailable: false,
    };
  }

  subscribe = NetInfo.addEventListener(
    function (state) {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      this.props.setConnected(state.isConnected);
    }.bind(this),
  );
  componentDidMount() {
    if (this.props.loading) return;
  }
  render() {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
          flex: 1,
          backgroundColor: 'black',
        }}>
        <Image
          source={assets.logo}
          style={{
            width: 100,
            height: 100,
            resizeMode: 'contain',
          }}
        />
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
