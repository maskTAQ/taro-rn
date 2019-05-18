import React from './node_modules/react';
import { Component } from '../../platform';
import Main from './main';
import './component.scss'

export default class MyDemand extends Component {
  config = {
    navigationBarTitleText: '我的物流'
  }
  render() {
    return <Main />
  }
}

