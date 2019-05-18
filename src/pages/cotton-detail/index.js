import React from 'react';
import Taro from '@tarojs/taro'
import { Component, injectNavParams } from '../../platform';

import Main from './main';
import './component.scss'

export default class CottonDetail extends Component {
  config = {
    navigationBarTitleText: '|详情'
  }
  onShareAppMessage() {
    return {
      title: '棉花详情',
    }
  }
  render() {
    const navigation = injectNavParams(this.$router);
    console.log(navigation, 'navigation')
    return <Main navigation={navigation} />
  }
}

