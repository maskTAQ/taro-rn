import React, { Component } from 'react';

import { Text } from '../';
import indexStyleSheet from "./index_styles";
const mergeStyle = (target,source=[])=>{
  const result = {...target};
  source.forEach(style=>{
      Object.assign(result,style);
  });
  return result;
};

export default class TTag extends Component {
  render() {
    const { style } = this.props;
    console.log({ ...indexStyleSheet.tag, ...style },style,'style')
    return (
      <Text style={mergeStyle(indexStyleSheet,style)}>{this.props.children}</Text>
    )
  }
}
