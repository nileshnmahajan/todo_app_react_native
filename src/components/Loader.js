import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';
import {
  Modal,
  Portal,
  Text,
  ActivityIndicator,
  Colors,
} from 'react-native-paper';

import {connect, mapDispatchToProps, mapStateToProps} from '../redux';
import colors from '../common/Colors';
import strings from '../common/Strings';
import {jsonAlert, jsonLog} from '../App';

class RenderLoader extends Component {
  constructor(props) {
    super(props);
  }

  hideModal = () => this.props.setOkDialogShown(false);
  render() {
    return (
      <Portal>
        <Modal
          visible={this.props.loaderShown}
          onDismiss={() => this.hideModal()}
          contentContainerStyle={{backgroundColor: 'transperent'}}>
          <ActivityIndicator
            animating={this.props.loaderShown}
            color={Colors.red800}
            size="large"
          />
        </Modal>
      </Portal>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RenderLoader);
