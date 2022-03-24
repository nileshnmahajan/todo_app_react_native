import React, {Component} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Modal, Portal, Text} from 'react-native-paper';
import {connect, mapDispatchToProps, mapStateToProps} from '../redux';
import colors from '../common/Colors';
import strings from '../common/Strings';
import {jsonAlert, jsonLog} from '../App';
import translate from '../common/translator';

class RenderYesNoDialog extends Component {
  constructor(props) {
    super(props);
  }
  //onDismiss={() => this.hideModal()}

  hideModal = () => this.props.setYesNoDialogShown(false);
  render() {
    return (
      <Portal>
        <Modal
          visible={this.props.yesNoDialogShown}
          contentContainerStyle={{
            backgroundColor: 'white',
            marginHorizontal: 17,
            borderRadius: 3,
          }}>
          <Text
            style={{
              backgroundColor: colors.themeColor,
              color: 'white',
              fontWeight: 'bold',
              textAlign: 'center',
              paddingVertical: 10,
            }}>
            {strings.okdialogHeader}
          </Text>
          <Text
            style={{
              textAlign: 'center',
              paddingVertical: 16,
              paddingHorizontal: 15,
              color: colors.black,
            }}>
            {translate(this.props.okDialogText)}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={{
                borderTopColor: colors.themeColor,
                borderTopWidth: 1,
                paddingVertical: 12,
                flex: 1,
              }}
              onPress={() => {
                this.hideModal();
                this.props.yesAction();
              }}>
              <Text style={{textAlign: 'center', color: colors.black}}>
                {strings.yes}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderTopColor: colors.themeColor,
                borderTopWidth: 1,
                paddingVertical: 12,
                flex: 1,
                borderLeftWidth: 1,
                borderLeftColor: colors.themeColor,
              }}
              onPress={() => {
                this.hideModal();
                this.props.noAction();
              }}>
              <Text style={{textAlign: 'center', color: colors.black}}>
                {strings.no}
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </Portal>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RenderYesNoDialog);
