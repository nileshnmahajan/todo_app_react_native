import React, {Component} from 'react';

import {
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import {Text} from 'react-native-paper';
import {
  RenderStatusBar,
  assets,
  connect,
  mapStateToProps,
  mapDispatchToProps,
  RenderOkDialog,
  width,
  sendData,
  API,
  RenderLoader,
  navigation,
  RenderYesNoDialog,
  FixedHeader,
  jsonLog,
  ToDoDatabase,
  LabelDatabase,
  colors,
} from '../App';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    this.props.setStatusBarHidden(false);

    ToDoDatabase.createTable();
    LabelDatabase.createTable();
    this.loadData();
    this.props.navigation.addListener('focus', () => this.loadData());
  }
  loadData = () => {
    this.setState({data: []});
    const options = {
      columns: 'id,label',
      where: {},
    };
    LabelDatabase.query(options).then(data => {
      data = data.map(item => {
        let labelSection = {label: item.label, evenets: []};
        const options2 = {
          columns: 'id,value,priority',
          where: {status_eq: 1, labelId_eq: item.id},
        };
        ToDoDatabase.query(options2).then(data2 => {
          labelSection.evenets = data2;
          jsonLog(labelSection);
          this.setState({data: [...this.state.data, labelSection]});
        });
      });
    });
  };
  markAsDone = (label, item) => {
    jsonLog({label, item});
    const {id} = item;
    const options = {
      id,
      status: 1,
    };
    ToDoDatabase.update(options);
    this.setState({
      data: this.state.data.filter(item => {
        if (item.label == label) {
          item.evenets = item.evenets.filter(item => {
            if (item.id == id) return false;
            return true;
          });
          return true;
        } else return true;
      }),
    });
  };
  renderToDO = (item, index, label) => {
    //jsonLog({item, index, label});
    const {time = '', value, priority = 0} = item;
    return (
      <View
        style={{
          marginVertical: 4,
          backgroundColor: 'black',
          paddingHorizontal: 10,
          paddingVertical: 15,
          borderRadius: 5,
          borderLeftColor:
            priority == 0
              ? colors.themeColor
              : priority == 1
              ? 'orange'
              : 'red',
          borderLeftWidth: 6,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              width: width - 135,
              alignItems: 'center',
            }}>
            <Text
              style={{paddingHorizontal: 7, fontSize: 16, fontWeight: '100'}}>
              {time}
            </Text>
            <Text style={{fontWeight: 'bold', fontSize: 16}} numberOfLines={1}>
              {value}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              width: 20,
              height: 20,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 2,
              borderColor:
                priority == 0
                  ? colors.themeColor
                  : priority == 1
                  ? 'orange'
                  : 'red',
              borderRadius: 4,
            }}>
            <Image
              source={assets.check}
              style={{
                width: 12,
                height: 12,
                resizeMode: 'contain',
                tintColor:
                  priority == 0
                    ? colors.themeColor
                    : priority == 1
                    ? 'orange'
                    : 'red',
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
        }}>
        <RenderStatusBar />

        <ScrollView>
          <View
            style={{
              marginVertical: 15,
              marginHorizontal: 8,
              backgroundColor: colors.themeColor,
              paddingVertical: 15,
              paddingHorizontal: 15,

              borderRadius: 7,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                Hello {'User'}!
              </Text>
              <Text style={{fontSize: 16, fontWeight: '100'}}>
                Here are your completed tasks
              </Text>
            </View>
            <TouchableOpacity
              style={{backgroundColor: 'black', padding: 5, borderRadius: 30}}>
              <Image
                source={assets.user}
                style={{width: 20, height: 20, tintColor: 'white', margin: 5}}
              />
            </TouchableOpacity>
          </View>
          {this.state.data.map((item, index) => {
            const {label} = item;
            if (item.evenets.length == 0) return null;
            return (
              <View style={{padding: 15}}>
                <Text
                  style={{
                    fontSize: 19,
                    fontWeight: 'bold',
                    paddingVertical: 7,
                  }}>
                  {label}
                </Text>
                <FlatList
                  data={item.evenets}
                  renderItem={({item, index}) =>
                    this.renderToDO(item, index, label)
                  }
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            );
          })}
        </ScrollView>

        <RenderLoader />
        <RenderOkDialog />
        <RenderYesNoDialog />
      </SafeAreaView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
