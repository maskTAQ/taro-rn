import React from 'react';
import { Component, injectNavParams } from '../../platform';

import Main from './main';
import './component.scss';


export default class Home extends Component {
  config = {
    navigationBarTitleText: '首页'
  }
  onShareAppMessage() {
    return {
      path: `pages/home/index?params=${JSON.stringify(this.main.getParams())}`
    }
  }
  render() {
    const navigation = injectNavParams(this.$router);
    return <Main navigation={navigation} ref={e => this.main = e} />
  }
}

