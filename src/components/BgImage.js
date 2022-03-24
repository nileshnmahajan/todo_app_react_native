import React, {Component} from 'react';
import {assets, width, height} from '../App';
import {Image} from 'react-native';

class BgImage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Image
        source={assets.bgImage}
        style={{
          width: width,
          height: height,
          marginHorizontal: 0,
          resizeMode: 'cover',
        }}
      />
    );
  }
}

export default BgImage;
