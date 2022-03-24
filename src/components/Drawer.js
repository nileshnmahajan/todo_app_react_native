import React, {Component} from 'react';
import {
  Text,
  View,
  StatusBar,
  SafeAreaView,
  Animated,
  Image,
  Button,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  colors,
  strings,
  assets,
  connect,
  mapStateToProps,
  mapDispatchToProps,
  okDialog,
  RenderOkDialog,
  width,
  RenderYesNoDialog,
  yesNoDialog,
  log,
  jsonLog,
  wip,
  navigation,
} from '../App';

class Drawer extends Component {
  constructor(props) {
    super(props);
  }
  handelClick(action) {
    this.props.navigation.toggleDrawer();
    action();
  }
  render() {
    return (
      <SafeAreaView
        style={{
          alignItems: 'center',
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
        <View>
          <Image
            source={assets.drawerHeader}
            style={{width: 140, height: 140, resizeMode: 'center'}}
          />
        </View>

        <ScrollView>
          {/* This option will be available only for logged in user. */}

          <TouchableOpacity
            onPress={() =>
              this.handelClick(() =>
                this.props.apiToken
                  ? navigation.navigate(this, 'changePassword')
                  : navigation.replace(this, 'loginScreen', {
                      navigate: true,
                    }),
              )
            }
            style={styles.drawerItem}>
            <Image source={assets.user} style={styles.drawerItemIcon} />
            <Text style={styles.drawerItemText}>{strings.account}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              this.handelClick(() =>
                navigation.navigate(this, 'selectLanguage'),
              )
            }
            style={styles.drawerItem}>
            <Image source={assets.heartEmpty} style={styles.drawerItemIcon} />
            <Text style={styles.drawerItemText}>{strings.changeLanguage}</Text>
          </TouchableOpacity>
          {/* This option will be available only for logged in user. */}
          {this.props.apiToken && (
            <TouchableOpacity
              onPress={() => {
                this.handelClick(() => yesNoDialog(this, strings.logoutPromt));
              }}
              style={styles.drawerItem}>
              <Image source={assets.logout} style={styles.drawerItemIcon} />
              <Text style={styles.drawerItemText}>{strings.logOut}</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
        <RenderYesNoDialog
          yesAction={() => {
            if (!this.props.rememberMe) {
              //remember me unticked
              this.props.setEmail(null);
              this.props.setPassword(null);
            }
            this.props.setApiToken(null);
            okDialog(this, strings.loggedOutSuccess);
            navigation.replace(this, 'loginScreen', {navigate: true});
          }}
          noAction={() => {}}
        />
      </SafeAreaView>
    );
  }
}

const styles = {
  drawerItem: {
    alignItems: 'center',
    marginTop: 40,
  },
  drawerItemText: {
    textAlign: 'center',
    marginTop: 5,
    fontSize: 15,
  },
  drawerItemIcon: {
    width: 45,
    height: 45,
    resizeMode: 'cover',
    tintColor: 'white',
  },
};
export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
