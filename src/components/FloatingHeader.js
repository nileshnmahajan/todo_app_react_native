import React, {Component} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import assets from '../assets';
import colors from '../common/Colors';
import {connect, mapDispatchToProps, mapStateToProps} from '../redux';
import {width} from '../common/util';
import StatusBar from '../components/RenderStatusBar';

class FloatingHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          flexDirection: 'row',
          width,
          flex: 1,
          backgroundColor: colors.themeColor,
          borderRadius: 2,
          paddingVertical: 10,
          paddingHorizontal: 10,
        }}>
        <StatusBar />
        <TouchableOpacity
          onPress={() => {
            this.props.backAction();
          }}
          style={{zIndex: 1}}>
          <Image
            source={assets.leftNav}
            style={{
              tintColor: colors.white,
              width: 20,
              height: 20,
              zIndex: 1,
            }}
          />
        </TouchableOpacity>
        <Text
          style={{
            flex: 1,
            textAlign: 'center',
            color: colors.white,
            fontSize: 18,
            marginRight: 15,
            fontWeight: 'bold',
          }}>
          {this.props.pageTitle}
        </Text>
      </View>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(FloatingHeader);
