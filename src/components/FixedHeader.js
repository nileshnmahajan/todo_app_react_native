import React, {Component} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import assets from '../assets';
import colors from '../common/Colors';
import {connect, mapDispatchToProps, mapStateToProps} from '../redux';
import {width, exist} from '../common/util';
import StatusBar from './RenderStatusBar';

class FixedHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
          width,
          backgroundColor: this.props.backgroundColor
            ? this.props.backgroundColor
            : colors.themeColor,
          padding: 10,
          alignItems: 'center',
          alignContent: 'center',
        }}>
        <StatusBar
          backgroundColor={
            this.props.backgroundColor
              ? this.props.backgroundColor
              : colors.themeColor
          }
        />
        <TouchableOpacity
          onPress={() => {
            this.props.backAction();
          }}
          style={{zIndex: 1}}>
          <Image
            source={this.props.leftNavIcon}
            style={{
              tintColor: this.props.leftIconColor
                ? this.props.leftIconColor
                : false,
              width: this.props.leftIconSize ? this.props.leftIconSize : 30,
              height: this.props.leftIconSize ? this.props.leftIconSize : 30,
              zIndex: 1,
            }}
          />
        </TouchableOpacity>
        <Text
          style={{
            flex: 1,
            textAlign: 'center',
            color: this.props.pageTitleColor
              ? this.props.pageTitleColor
              : colors.white,
            fontSize: 18,
            marginHorizontal: 15,
            fontWeight: 'bold',
            textTransform: 'capitalize',
          }}
          numberOfLines={1}>
          {this.props.pageTitle}
        </Text>
        <TouchableOpacity
          onPress={() => {
            exist(this.props.rightAction)
              ? this.props.rightAction()
              : alert('123');
          }}
          style={{
            zIndex: 1,
            width: exist(this.props.iconSize) ? this.props.iconSize : 20,
            height: exist(this.props.iconSize) ? this.props.iconSize : 20,
          }}>
          {exist(this.props.rightActionIcon) && (
            <Image
              source={this.props.rightActionIcon}
              style={{
                tintColor: colors.black,
                width: exist(this.props.iconSize) ? this.props.iconSize : 20,
                height: exist(this.props.iconSize) ? this.props.iconSize : 20,
                zIndex: 1,
                resizeMode: 'center',
              }}
            />
          )}
        </TouchableOpacity>
      </View>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(FixedHeader);
