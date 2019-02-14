import React , { Component } from 'react'
import { View } from 'react-native'
import { TButton, Text } from "components";
import { connect } from 'react-redux'

import {  } from 'actions';

import _styleSheet from "./index_styles";

export default class Demo extends Component {

    config = {
    navigationBarTitleText: 'title'
  }

  componentWillReceiveProps (nextProps) {
   
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View style={_styleSheet["container"]}>
        <TButton onClick={this.props.add} style={_styleSheet["add_btn"]}>+</TButton>
        <TButton onClick={this.props.dec} style={_styleSheet["dec_btn"]}>-</TButton>
        <TButton onClick={this.props.asyncAdd} style={_styleSheet["dec_btn"]}>async</TButton>
        <View><Text>{this.props.counter.num}</Text></View>
        <View><Text>Hello, World</Text></View>
      </View>
    )
  }
}



