import React from 'react';
import Taro from '@tarojs/taro'
import { Component, injectNavParams } from '../../platform';

import Main from './main';
import './component.scss'

export default class CottonDetail extends Component {
  config = {
    navigationBarTitleText: '|详情'
  }
  componentWillMount() {
    
    
  }
  onShareAppMessage() {
    return {
      path: `pages/cotton-detail/index?id=1`
    }
  }
  render() {
    const data = Taro.getLaunchOptionsSync()
   
    const navigation = injectNavParams(this.$router);
    //此页面获取不到 小程序扫码进来的参数 手动合并
    Object.assign(navigation.state.params,data.query)
    return <Main navigation={navigation} />
  }
}

