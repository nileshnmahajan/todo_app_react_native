import React, {Component} from 'react';
import {
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';

import {Text, Button, TextInput, Divider} from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import {
  RenderStatusBar,
  assets,
  colors,
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
  height,
} from '../App';
class NewToDoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nightMode: false,
      //lable dropdown
      showLableDropDown: false,
      selectedLable: '',
      labels: [],
      //---------------
      //priority dropdown
      showPriorityDropDown: false,
      selectedPriority: '',
      priorities: [
        {
          label: 'High',
          value: 2,
        },
        {
          label: 'Medium',
          value: 1,
        },
        {
          label: 'Low',
          value: 0,
        },
      ],
      //---------------
      task: '',
      taskError: false,
      //-------------------
      newLabelBoxShown: false,
      newLabel: '',
    };
  }
  componentDidMount() {
    ToDoDatabase.createTable();
    LabelDatabase.createTable();
    this.loadData();
    this.props.navigation.addListener('focus', () => this.loadData());
  }
  loadData = () => {
    const options = {
      columns: 'id,label',
      where: {},
    };
    LabelDatabase.query(options).then(data => {
      console.log(JSON.stringify(data));
      data = data.map(item => {
        item.value = item.id;
        return item;
      });
      console.log(JSON.stringify(data));

      this.setState({labels: data});
    });
  };
  render() {
    return (
      <SafeAreaView style={{justifyContent: 'space-between', flex: 1}}>
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
              Add new task here
            </Text>
          </View>
        </View>
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: 20,
              paddingBottom: 5,
            }}>
            <View style={{flex: 1}}>
              <DropDown
                label={'Label'}
                mode={'outlined'}
                visible={this.state.showLableDropDown}
                showDropDown={() => this.setState({showLableDropDown: true})}
                onDismiss={() => this.setState({showLableDropDown: false})}
                value={this.state.selectedLable}
                setValue={value => this.setState({selectedLable: value})}
                list={this.state.labels}
              />
            </View>
            <TouchableOpacity
              style={{paddingHorizontal: 10}}
              onPress={() => this.setState({newLabelBoxShown: true})}>
              <Image
                source={assets.newList}
                style={{
                  width: 35,
                  height: 35,
                  resizeMode: 'contain',
                  tintColor: 'white',
                }}
              />
            </TouchableOpacity>
          </View>
          <DropDown
            label={'Priority'}
            mode={'outlined'}
            visible={this.state.showPriorityDropDown}
            showDropDown={() => this.setState({showPriorityDropDown: true})}
            onDismiss={() => this.setState({showPriorityDropDown: false})}
            value={this.state.selectedPriority}
            setValue={value => this.setState({selectedPriority: value})}
            list={this.state.priorities}
            style={{paddingTop: 20, paddingBottom: 5}}
          />
          <TextInput
            error={this.state.taskError}
            mode="outlined"
            label={'Task'}
            value={this.state.task}
            onChangeText={text =>
              this.setState({
                task: text,
                taskError: false,
                error: false,
              })
            }
            style={{paddingTop: 20, paddingBottom: 5}}
          />
        </ScrollView>
        <TouchableOpacity
          onPress={() => this.saveToDo()}
          style={{
            backgroundColor: colors.themeColor,
            paddingHorizontal: 15,
            paddingVertical: 10,
            borderRadius: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            marginTop: 5,
            marginBottom: 15,
            marginHorizontal: 10,
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'center',
              flex: 1,
            }}>
            Save
          </Text>
        </TouchableOpacity>
        {this.state.newLabelBoxShown && (
          <View
            style={{
              position: 'absolute',
              zIndex: 101,
              width,
              height,
              backgroundColor: 'rgba(255,255,255,0.3)',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                backgroundColor: 'black',
                width: width - 30,
                padding: 15,
                borderRadius: 5,
              }}>
              <TextInput
                error={this.state.newLableError}
                mode="outlined"
                label={'Label'}
                value={this.state.newLabel}
                onChangeText={text =>
                  this.setState({
                    newLabel: text,
                    newLableError: false,
                    error: false,
                  })
                }
              />
              <Button
                mode="contained"
                style={{marginTop: 20}}
                onPress={() => this.saveNewLabel()}>
                Save label
              </Button>
            </View>
          </View>
        )}
      </SafeAreaView>
    );
  }

  saveNewLabel = () => {
    if (this.state.newLabel == '') this.setState({newLableError: true});
    else {
      const data = {label: this.state.newLabel + ''};
      LabelDatabase.create(new LabelDatabase(data));
      this.loadData();
      this.setState({
        newLabelBoxShown: false,
        selectedLable: data.label,
        newLabel: '',
      });
    }
  };
  saveToDo = () => {
    const {selectedLable, selectedPriority, task} = this.state;
    jsonLog({selectedLable, selectedPriority, task});
    const data = {
      labelId: selectedLable,
      value: task,
      priority: selectedPriority,
    };
    ToDoDatabase.create(new ToDoDatabase(data));
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewToDoScreen);
