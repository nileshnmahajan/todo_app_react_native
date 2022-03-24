import React, {Component} from 'react';
import {View, Image, Animated, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import {Text, Divider} from 'react-native-paper';

import {
  colors,
  strings,
  assets,
  connect,
  mapStateToProps,
  mapDispatchToProps,
  height,
  width,
} from '../App';

class MappaScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      from: 100,
    };
    this.screenMarginLeft = new Animated.Value(100);
  }

  componentDidMount() {}

  filter = async () => {
    let categories = [...this.props.categories];
    let ids = [];
    categories.forEach(element => {
      if (element.SELECTED) ids.push(element.ID);
    });
    this.props.save(ids);
  };

  slideDrawer = () => {
    let to,
      from = this.state.from;
    if (this.state.from == 100) {
      to = height;
    } else {
      to = 100;
      this.filter();
    }
    this.setState({from: to});
    this.screenMarginLeft = new Animated.Value(from);
    Animated.timing(this.screenMarginLeft, {
      toValue: to,
      duration: 800,
      useNativeDriver: false,
    }).start();
  };

  render() {
    return (
      <Animated.View
        style={{
          position: 'absolute',
          width: width * 0.9,
          height: this.screenMarginLeft,
          maxHeight: height * 0.8,
          bottom: 0,
          left: width * 0.05,
          backgroundColor: 'white',
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          paddingHorizontal: 15,
          paddingTop: 15,
        }}>
        <Text
          style={{
            color: colors.black,
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 20,
          }}>
          {strings.whatAreYouLookingFor}
        </Text>
        <TouchableOpacity
          style={{padding: 10, width: 55, height: 55, alignSelf: 'center'}}
          onPress={() => this.slideDrawer()}>
          <Image
            source={this.state.from == 100 ? assets.upArrow : assets.downArrow}
            style={{
              width: 35,
              height: 35,
              resizeMode: 'center',
            }}
          />
        </TouchableOpacity>

        <ScrollView>
          {this.props.categories.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  let items = [...this.props.categories];
                  items[index]['SELECTED'] = !items[index]['SELECTED'];
                  this.props.setCategories(items);
                }}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingBottom: 4,
                  marginTop: 4,
                  marginHorizontal: 25,
                  paddingVertical: 3,
                  alignItems: 'center',
                  alignContent: 'center',
                  borderBottomWidth: 1,
                  borderColor: 'rgba(0,0,0,0.1)',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignContent: 'center',
                    flex: 1,
                  }}>
                  <Image
                    source={{uri: item.MAP_ICON}}
                    style={{width: 25, height: 25, resizeMode: 'center'}}
                  />
                  <Text style={{color: colors.black, marginHorizontal: 10}}>
                    {item.NAME}
                  </Text>
                </View>
                <View
                  style={{
                    margin: 2,
                    backgroundColor: colors.themeColor,
                    borderRadius: 15,
                    borderWidth: 1,
                    borderColor: colors.themeColor,
                    width: 17,
                    height: 17,
                  }}>
                  <View
                    style={{
                      width: 13,
                      height: 13,
                      margin: 1,
                      backgroundColor: item.SELECTED
                        ? colors.themeColor
                        : colors.white,
                      borderRadius: 10,
                      borderWidth: 2,
                      borderColor: colors.white,
                    }}></View>
                </View>
                <Divider style={{color: 'red'}} />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </Animated.View>
    );
  }
}

//export default MappaScreen;

export default connect(mapStateToProps, mapDispatchToProps)(MappaScreen);
