import React, {Component} from 'react';
import {View, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './scenes/HomeScreen';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();

const {Navigator, Screen} = createStackNavigator();

import {
  colors,
  assets,
  connect,
  mapStateToProps,
  mapDispatchToProps,
  theme,
} from './App';

import NewToDoScreen from './scenes/NewToDoScreen';
import CompletedTaskScreen from './scenes/CompletedTaskScreen';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  BottomTab = () => {
    return (
      <Tab.Navigator
        shifting={true}
        barStyle={{
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          height: 55,
          paddingVertical: 3,
          backgroundColor: colors.themeColor,
        }}>
        <Tab.Screen
          name="homeScreen"
          component={HomeScreen}
          options={{
            title: 'Home',
            tabBarColor: 'transparent',
            tabBarIcon: ({active, color}) => {
              return (
                <View>
                  <Image
                    source={assets.home}
                    style={{width: 25, height: 25, tintColor: color}}
                  />
                </View>
              );
            },
          }}
          tabPress={() => alert()}
        />
        <Tab.Screen
          name="newToDoScreen"
          component={NewToDoScreen}
          options={{
            tabBarStyle: {borderTopLeftRadius: 55, borderTopRightRadius: 55},
            title: 'New To DO',
            tabBarColor: 'transparent',
            tabBarIcon: ({active, color}) => {
              return (
                <View>
                  <Image
                    source={assets.plus}
                    style={{
                      width: 25,
                      height: 25,
                      tintColor: color,
                    }}
                  />
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name="completedToDo"
          component={CompletedTaskScreen}
          options={{
            tabBarStyle: {borderTopLeftRadius: 55, borderTopRightRadius: 55},
            title: 'Completed',
            tabBarColor: 'transparent',
            tabBarIcon: ({active, color}) => {
              return (
                <View>
                  <Image
                    source={assets.tick1}
                    style={{width: 25, height: 25, tintColor: color}}
                  />
                </View>
              );
            },
          }}
        />
      </Tab.Navigator>
    );
  };

  render() {
    return (
      <NavigationContainer
        theme={theme}
        onStateChange={async () => {
          try {
            const currentRouteName = this.props.navigation.state.routeName;
            console.log(currentRouteName);
          } catch (e) {}
        }}>
        <Navigator screenOptions={{headerShown: false}}>
          <Screen name="root" component={this.BottomTab} />
        </Navigator>
      </NavigationContainer>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
