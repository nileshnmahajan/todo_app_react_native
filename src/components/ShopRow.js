import React, {Component} from 'react';
import {TouchableOpacity, View, Image} from 'react-native';
import {Text, Divider} from 'react-native-paper';
import ImageLoad from 'react-native-image-placeholder';
import {connect, mapDispatchToProps, mapStateToProps} from '../redux';
import colors from '../common/Colors';
import strings from '../common/Strings';
import assets from '../assets';
import HTML from 'react-native-render-html';
import {width, height, navigation, handleClick, exist} from '../common/util';
class ShopRow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {obj, shop, index, header} = this.props;
    return (
      <View key={index}>
        <TouchableOpacity
          style={{
            flex: 1,
            marginVertical: 3,
            paddingTop: 4,
            paddingBottom: 8,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
          onPress={() => {
            if (exist(shop.link_api))
              navigation.push(obj, 'shopDetails', {
                header,
                shop,
              });
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignContent: 'center',
            }}>
            <ImageLoad
              loadingStyle={{size: 'large', color: 'black'}}
              borderRadius={15}
              source={
                shop.enclosure != ''
                  ? {uri: shop.enclosure}
                  : assets.drawerHeader
              }
              style={{width: 80, height: 80, marginLeft: 4}}
            />
            <View
              style={{
                width: width - 80 - 110,
                paddingVertical: 5,
                paddingHorizontal: 15,
                justifyContent:
                  shop.address == undefined ? 'center' : 'flex-start',
              }}>
              <Text
                style={{
                  color: colors.black,
                  fontWeight: 'bold',
                }}
                numberOfLines={2}>
                {`${shop.title}`}
              </Text>
              {shop.address != undefined && (
                <Text
                  style={{
                    color: colors.black,
                    fontSize: 11,
                  }}
                  numberOfLines={2}>
                  <Text style={{color: colors.themeColor}}>{'INDRIZZO: '}</Text>
                  {`${shop.address}`}
                </Text>
              )}
              {shop.budget != undefined && shop.budget != '' && (
                <HTML
                  source={{
                    html: `<div>
                    <span style="color: ${colors.themeColor}">BUDGET: </span>
                  <span>${shop.budget}</span>
                  </div>`,
                  }}
                  baseFontStyle={{
                    color: colors.black,
                    fontSize: 12,
                    fontFamily: 'Roboto-Medium',
                    lineHeight: 24,
                  }}
                />
              )}
              {shop.telefono != undefined && shop.telefono != '' && (
                <TouchableOpacity
                  onPress={() => handleClick('tel:' + shop.telefono)}
                  style={styles_.infoRow}>
                  <Image source={assets.phone} style={styles_.infoRowIcon} />
                  <Text style={styles_.infoRowText} numberOfLines={1}>
                    {shop.telefono}
                  </Text>
                </TouchableOpacity>
              )}
              {shop.email != undefined && shop.email != '' && (
                <TouchableOpacity
                  onPress={() => handleClick('mailto:' + shop.email)}
                  style={styles_.infoRow}>
                  <Image source={assets.mail} style={styles_.infoRowIcon} />
                  <Text style={styles_.infoRowText} numberOfLines={1}>
                    {shop.email}
                  </Text>
                </TouchableOpacity>
              )}
              {exist(shop.fav_type) && (
                <Text style={{color: colors.themeColor}}>{shop.fav_type}</Text>
              )}
            </View>
          </View>
          <View
            style={{
              alignContent: 'flex-end',
              alignItems: 'flex-end',
            }}>
            <Text
              style={{color: colors.black, paddingVertical: 5, fontSize: 14}}
              numberOfLines={1}>
              {shop.distance ? shop.distance : ''}
            </Text>
            {shop.link_api != undefined && shop.link_api != '' && (
              <Image
                source={assets.rightNav}
                style={{width: 25, height: 25, resizeMode: 'center'}}
              />
            )}
          </View>
        </TouchableOpacity>
        <Divider />
      </View>
    );
  }
}

const styles_ = {
  SectionTitleText: {
    textAlign: 'center',
    color: colors.themeColor,
    fontWeight: 'bold',
    fontSize: 17,
    paddingTop: 25,
    paddingBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'flex-start',
    alignContent: 'center',
  },
  infoRowIcon: {width: 20, height: 20},
  infoRowText: {color: colors.black, marginLeft: 15, width: width - 75},
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopRow);
