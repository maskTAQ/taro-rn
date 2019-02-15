import React, { Component } from 'react';

import { Text } from '../';
import indexStyleSheet from "./index_styles";

export default class TTag extends Component {
  render() {
    const { style } = this.props;
    return (
      <Text style={{ ...style, ...indexStyleSheet.tag }}>{this.props.children}</Text>
    )
  }
}
