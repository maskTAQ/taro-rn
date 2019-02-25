var _class, _temp2;

import React, { Component } from 'react';
import { View, Text } from "../index";


import indexStyleSheet from "./index_styles";
var _styleSheet = indexStyleSheet;
let NoticeTool = (_temp2 = _class = class NoticeTool extends Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = {
      currentIndex: 0,
      list: ['二胎妈妈为什么要都做孕前检查?', '二胎妈妈为什么要都做孕前检查as!']
    }, _temp;
  }

  componentDidMount() {
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      const { currentIndex, list } = this.state;
      if (list.length === 1) {
        return;
      }
      if (currentIndex === list.length - 1) {
        return this.setState({
          currentIndex: 0
        });
      }
      this.setState({
        currentIndex: currentIndex + 1
      });
    }, 2000);
  }

  componentWillUnmount() {
    console.log('componentDidHide');
    clearInterval(this.interval);
  }
  render() {
    const { currentIndex, list } = this.state;
    return <View style={_styleSheet["container"]}>
      <Text style={_styleSheet["label"]}>棉讯</Text>
      <View style={_styleSheet["border"]}></View>
      <View style={_styleSheet["content"]}>
        <Text style={_styleSheet["content-text"]}>{list[currentIndex]}</Text>
      </View>
    </View>;
  }
}, _class.options = {
  addGlobalClass: true
}, _temp2);
export { NoticeTool as default };