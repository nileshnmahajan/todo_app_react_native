import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import {connect, mapDispatchToProps, mapStateToProps} from '../redux';
import colors from '../common/Colors';

class RenderLoader extends Component {
  constructor(props) {
    super(props);
  }

  hideModal = () => this.props.setOkDialogShown(false);
  render() {
    return (
      <StatusBar
        animated={true}
        backgroundColor={
          this.props.backgroundColor
            ? this.props.backgroundColor
            : colors.themeColor
        }
        barStyle={'dark-content'}
        showHideTransition={'fade'}
        hidden={this.props.statusBarHidden}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RenderLoader);
