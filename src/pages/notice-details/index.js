import React from './node_modules/react';
import { Component,injectNavParams } from '../../platform';
import Main from './main';
import './component.scss'

export default class NoticeDetails extends Component {
  config = {
    navigationBarTitleText: '棉讯详情'
  }
  render() {
    const navigation = injectNavParams(this.$router);
    return <Main navigation={navigation}/>
  }
}

