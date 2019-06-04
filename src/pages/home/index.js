import React from 'react';
import { Component, injectNavParams } from '../../platform';

import Main from './main';
import './component.scss';


export default class Home extends Component {
  state = {
    timeStamp: '',
  }
  config = {
    navigationBarTitleText: '首页'
  }
  onShareAppMessage() {
    return {
      path: `pages/home/index?params=${JSON.stringify(this.main.getParams())}`
    }
  }
  changeTimeStamp = () => {
    this.setState({
      timeStamp: Date.now()
    });
  }
  render() {
    const { timeStamp } = this.state;
    const navigation = injectNavParams(this.$router);
    return <Main onChange={this.changeTimeStamp} timeStamp={timeStamp} navigation={navigation} />
  }
}

