import React, { Component } from 'react';

import { Text } from '../';
import indexStyleSheet from "./index_styles";
import mergeStyle from '../mergeStyle';

export default class TTag extends Component {
  render() {
    const { style } = this.props;
    console.log({ ...indexStyleSheet.tag, ...style },style,'style')
    return (
      <Text style={mergeStyle(indexStyleSheet,style)}>{this.props.children}</Text>
    )
  }
}
